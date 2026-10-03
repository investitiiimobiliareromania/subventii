import { NextResponse } from "next/server";
import { checkRateLimit, getClientIpHash, sanitizeString } from "@/lib/security";
import { sanitizeVisitorId, sanitizeSessionId } from "@/lib/analytics/id";
import { parseMarketingAttribution, parseDeviceAndBrowser, parseGeoFromHeaders } from "@/lib/analytics/attribution";
import { calculateEventIntentPoints, computeIntentLevel, shouldTriggerHighIntentAlert } from "@/lib/analytics/intent";
import {
  recordVisitorAndSession,
  recordAnalyticsEvent,
  getSession,
  getVisitor,
} from "@/lib/analytics/repository";
import {
  formatNewVisitorMessage,
  formatHighIntentMessage,
  formatResourceDownloadMessage,
  formatLeadActionMessage,
  sendTelegramIntelligence,
} from "@/lib/telegram/intelligence";
import type { AnalyticsEventType, SessionEntity, VisitorEntity, AnalyticsEventRecord } from "@/lib/analytics/types";
import crypto from "crypto";

const ALLOWED_EVENT_TYPES: Set<AnalyticsEventType> = new Set([
  "PAGE_VIEW",
  "SEARCH",
  "PROGRAM_VIEW",
  "SECTOR_VIEW",
  "COUNTY_VIEW",
  "COUNTY_SECTOR_VIEW",
  "NEWS_VIEW",
  "LEGISLATION_VIEW",
  "RESOURCE_VIEW",
  "RESOURCE_DOWNLOAD",
  "GLOSSARY_VIEW",
  "INSTITUTION_VIEW",
  "OUTBOUND_CLICK",
  "PHONE_CLICK",
  "WHATSAPP_CLICK",
  "EMAIL_CLICK",
  "CONTACT_START",
  "CONTACT_SUBMIT",
  "SCROLL_75",
  "RETURN_VISIT",
  "SESSION_START",
  "SESSION_END",
  "HIGH_INTENT",
  "SECURITY_EVENT",
]);

export async function POST(req: Request) {
  try {
    // 1. IP-Based Rate Limiting on Telemetry endpoint (120 requests / minute)
    const ipKey = getClientIpHash(req, "telemetry");
    const rateLimit = checkRateLimit(ipKey, 120, 60 * 1000);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, error: "Rate limit exceeded" },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const rawPathname = sanitizeString(body.pathname, 200);
    const rawPageTitle = sanitizeString(body.pageTitle, 200);
    const rawReferrer = sanitizeString(body.referrer, 255);

    if (!rawPathname) {
      return NextResponse.json(
        { success: false, error: "Invalid pathname" },
        { status: 400 }
      );
    }

    // Whitelist Event Type
    let eventType: AnalyticsEventType = "PAGE_VIEW";
    if (typeof body.eventType === "string" && ALLOWED_EVENT_TYPES.has(body.eventType as AnalyticsEventType)) {
      eventType = body.eventType as AnalyticsEventType;
    }

    // 2. Pseudonymized ID Resolution
    const visitorId = sanitizeVisitorId(body.visitorId);
    const sessionId = sanitizeSessionId(body.sessionId);

    // 3. Attribution, Device & Geo Parsing
    const attribution = parseMarketingAttribution(rawReferrer, body.utm);
    const userAgent = req.headers.get("user-agent") || undefined;
    const device = parseDeviceAndBrowser(userAgent, body.device);
    const geo = parseGeoFromHeaders(req);

    const nowIso = new Date().toISOString();
    const nowMs = Date.now();

    // 4. Resolve or initialize Visitor state
    const visitor: VisitorEntity = getVisitor(visitorId) || {
      id: visitorId,
      firstSeenAt: nowIso,
      lastSeenAt: nowIso,
      totalSessions: 1,
      totalPageviews: 0,
      totalEvents: 0,
      maxIntentScore: 0,
    };

    const isNewVisitor = visitor.totalEvents === 0;

    // 5. Resolve or initialize Session state
    const session: SessionEntity = getSession(sessionId) || {
      id: sessionId,
      visitorId,
      startedAt: nowIso,
      lastSeenAt: nowIso,
      durationSeconds: 0,
      landingPath: rawPathname,
      exitPath: rawPathname,
      pageViews: 0,
      uniquePages: 1,
      eventCount: 0,
      source: attribution.channel,
      medium: attribution.medium,
      campaign: attribution.campaign,
      content: attribution.content,
      term: attribution.term,
      referrer: attribution.referrer,
      deviceType: device.deviceType,
      os: device.os,
      browser: device.browser,
      viewportWidth: body.device?.viewportWidth ? Number(body.device.viewportWidth) : undefined,
      viewportHeight: body.device?.viewportHeight ? Number(body.device.viewportHeight) : undefined,
      language: device.language,
      timezone: device.timezone,
      country: geo.country,
      region: geo.region,
      city: geo.city,
      intentScore: 0,
      intentLevel: "LOW",
      isNewVisitor,
      isReturningVisitor: !isNewVisitor,
    };

    // 6. Calculate Intent Points & Session Updates
    const isRepeatProgram = eventType === "PROGRAM_VIEW" && session.pageViews > 3;
    const sessionStartMs = new Date(session.startedAt).getTime() || nowMs;
    const currentDurationSec = Math.max(0, Math.floor((nowMs - sessionStartMs) / 1000));
    const isLongEngagement = currentDurationSec > 180;

    const points = calculateEventIntentPoints(eventType, isRepeatProgram, isLongEngagement);
    const updatedIntentScore = Math.min(100, (session.intentScore || 0) + points);

    session.lastSeenAt = nowIso;
    session.durationSeconds = currentDurationSec;
    session.exitPath = rawPathname;
    session.eventCount += 1;
    if (eventType === "PAGE_VIEW") {
      session.pageViews += 1;
    }
    session.intentScore = updatedIntentScore;
    session.intentLevel = computeIntentLevel(updatedIntentScore);

    // Update Visitor
    visitor.lastSeenAt = nowIso;
    visitor.totalEvents += 1;
    if (eventType === "PAGE_VIEW") {
      visitor.totalPageviews += 1;
    }
    visitor.maxIntentScore = Math.max(visitor.maxIntentScore, updatedIntentScore);

    // Sanitize metadata payload
    const safeMetadata: Record<string, unknown> = {};
    if (body.metadata && typeof body.metadata === "object") {
      const keys = Object.keys(body.metadata).slice(0, 10);
      for (const k of keys) {
        const val = (body.metadata as Record<string, unknown>)[k];
        if (typeof val === "string") {
          safeMetadata[k] = sanitizeString(val, 200);
        } else if (typeof val === "number" || typeof val === "boolean") {
          safeMetadata[k] = val;
        }
      }
    }

    const eventRecord: AnalyticsEventRecord = {
      id: crypto.randomUUID(),
      visitorId,
      sessionId,
      eventType,
      pathname: rawPathname,
      pageTitle: rawPageTitle,
      metadata: safeMetadata,
      createdAt: nowIso,
    };

    // 7. Persist to Dual Layer (In-Memory + Supabase Async)
    await Promise.all([
      recordVisitorAndSession(visitor, session),
      recordAnalyticsEvent(eventRecord),
    ]);

    // 8. Telegram Intelligence Processing (Prioritized & Cooldown Protected)
    // P4: New Visitor Alert (Session start on first pageview)
    if (session.pageViews === 1 && eventType === "PAGE_VIEW") {
      const msg = formatNewVisitorMessage(session);
      await sendTelegramIntelligence(msg, `new_visitor:${session.id}`, 60 * 1000);
    }

    // P3: Resource Download Alert
    if (eventType === "RESOURCE_DOWNLOAD") {
      const resName = String(safeMetadata.resourceName || rawPathname);
      const resType = String(safeMetadata.fileFormat || "PDF");
      const devStr = `${session.deviceType} • ${session.os} • ${session.browser}`;
      const msg = formatResourceDownloadMessage(
        visitorId,
        resName,
        resType,
        rawPathname,
        `${session.source} / ${session.medium}`,
        devStr,
        session.intentScore,
        session.intentLevel
      );
      await sendTelegramIntelligence(msg, `download:${session.id}:${resName}`, 15 * 1000);
    }

    // P2: High Intent Crossing Alert (Threshold >= 50 with 30-minute cooldown)
    if (shouldTriggerHighIntentAlert(session.id, session.intentScore)) {
      const topInterest = rawPageTitle || rawPathname;
      const msg = formatHighIntentMessage(
        session,
        topInterest,
        eventType === "SEARCH" ? 1 : 0,
        eventType === "RESOURCE_DOWNLOAD" ? 1 : 0,
        rawPathname.includes("contact")
      );
      await sendTelegramIntelligence(msg, `high_intent:${session.id}`, 30 * 60 * 1000);
    }

    // P1: Contact / Lead Alert
    if (eventType === "CONTACT_SUBMIT") {
      const msg = formatLeadActionMessage(
        visitorId,
        `${session.source} / ${session.medium}`,
        session.landingPath,
        `${session.landingPath} → ${rawPathname}`,
        session.intentScore,
        session.intentLevel
      );
      await sendTelegramIntelligence(msg, `lead_action:${session.id}`, 10 * 1000);
    }

    return NextResponse.json({
      success: true,
      visitorId,
      sessionId,
      intentScore: session.intentScore,
      intentLevel: session.intentLevel,
    });
  } catch (error) {
    console.error("Telemetry API error:", error);
    return NextResponse.json(
      { success: false, error: "Telemetry processing error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { success: false, error: "Method Not Allowed" },
    { status: 405, headers: { Allow: "POST" } }
  );
}
