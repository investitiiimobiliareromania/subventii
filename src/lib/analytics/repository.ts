import { supabase, isDatabaseConfigured } from "@/lib/db/client";
import type {
  VisitorEntity,
  SessionEntity,
  AnalyticsEventRecord,
  DailyIntelligenceSummary,
} from "./types";

// In-Memory Ring Buffer for High Availability & Real-Time Stats
const inMemoryVisitors = new Map<string, VisitorEntity>();
const inMemorySessions = new Map<string, SessionEntity>();
const inMemoryEvents: AnalyticsEventRecord[] = [];
const inMemorySearches: { query: string; count: number; lastSeen: string }[] = [];
const inMemoryDownloads: { title: string; count: number; type: string }[] = [];
const inMemoryConversions: { type: string; timestamp: string; visitorId: string }[] = [];
const inMemorySecurityEvents: { type: string; endpoint: string; reason: string; timestamp: string }[] = [];

const MAX_STORED_EVENTS = 2000;
const MAX_STORED_SESSIONS = 1000;

export async function recordVisitorAndSession(
  visitor: VisitorEntity,
  session: SessionEntity
): Promise<void> {
  // 1. Update in-memory state
  inMemoryVisitors.set(visitor.id, visitor);
  inMemorySessions.set(session.id, session);

  // Prune memory if necessary
  if (inMemorySessions.size > MAX_STORED_SESSIONS) {
    const oldestKeys = Array.from(inMemorySessions.keys()).slice(0, 200);
    for (const k of oldestKeys) inMemorySessions.delete(k);
  }

  // 2. Persist to Supabase if configured (Fail-safe, non-blocking)
  if (isDatabaseConfigured()) {
    try {
      await supabase.from("analytics_visitors").upsert({
        id: visitor.id,
        first_seen_at: visitor.firstSeenAt,
        last_seen_at: visitor.lastSeenAt,
        total_sessions: visitor.totalSessions,
        total_pageviews: visitor.totalPageviews,
        total_events: visitor.totalEvents,
        max_intent_score: visitor.maxIntentScore,
        updated_at: new Date().toISOString(),
      });

      await supabase.from("analytics_sessions").upsert({
        id: session.id,
        visitor_id: session.visitorId,
        started_at: session.startedAt,
        last_seen_at: session.lastSeenAt,
        duration_seconds: session.durationSeconds,
        landing_path: session.landingPath,
        exit_path: session.exitPath,
        page_views: session.pageViews,
        unique_pages: session.uniquePages,
        event_count: session.eventCount,
        source: session.source,
        medium: session.medium,
        campaign: session.campaign || null,
        content: session.content || null,
        term: session.term || null,
        referrer: session.referrer,
        device_type: session.deviceType,
        os: session.os,
        browser: session.browser,
        viewport_width: session.viewportWidth || null,
        viewport_height: session.viewportHeight || null,
        language: session.language,
        timezone: session.timezone,
        country: session.country,
        region: session.region || null,
        city: session.city || null,
        intent_score: session.intentScore,
        intent_level: session.intentLevel,
        is_new_visitor: session.isNewVisitor,
        is_returning_visitor: session.isReturningVisitor,
        updated_at: new Date().toISOString(),
      });
    } catch (err) {
      console.warn("[Analytics DB Error]: Failed to upsert session:", err);
    }
  }
}

export async function recordAnalyticsEvent(event: AnalyticsEventRecord): Promise<void> {
  inMemoryEvents.push(event);
  if (inMemoryEvents.length > MAX_STORED_EVENTS) {
    inMemoryEvents.splice(0, 200);
  }

  // Specific event aggregations
  if (event.eventType === "SEARCH" && event.metadata?.query) {
    const q = String(event.metadata.query).trim().toLowerCase();
    const existing = inMemorySearches.find((s) => s.query === q);
    if (existing) {
      existing.count += 1;
      existing.lastSeen = event.createdAt;
    } else {
      inMemorySearches.push({ query: q, count: 1, lastSeen: event.createdAt });
    }
  }

  if (event.eventType === "RESOURCE_DOWNLOAD" && event.metadata?.resourceName) {
    const title = String(event.metadata.resourceName);
    const type = String(event.metadata.fileFormat || "PDF");
    const existing = inMemoryDownloads.find((d) => d.title === title);
    if (existing) {
      existing.count += 1;
    } else {
      inMemoryDownloads.push({ title, count: 1, type });
    }
  }

  if (
    event.eventType === "CONTACT_SUBMIT" ||
    event.eventType === "PHONE_CLICK" ||
    event.eventType === "WHATSAPP_CLICK" ||
    event.eventType === "EMAIL_CLICK"
  ) {
    inMemoryConversions.push({
      type: event.eventType,
      timestamp: event.createdAt,
      visitorId: event.visitorId,
    });
  }

  // Persist to Supabase if configured
  if (isDatabaseConfigured()) {
    try {
      await supabase.from("analytics_events").insert({
        id: event.id,
        visitor_id: event.visitorId,
        session_id: event.sessionId,
        event_type: event.eventType,
        pathname: event.pathname,
        page_title: event.pageTitle || null,
        metadata: event.metadata || {},
        created_at: event.createdAt,
      });

      if (event.eventType === "PAGE_VIEW") {
        await supabase.from("analytics_pageviews").insert({
          visitor_id: event.visitorId,
          session_id: event.sessionId,
          pathname: event.pathname,
          page_title: event.pageTitle || null,
          created_at: event.createdAt,
        });
      }
    } catch (err) {
      console.warn("[Analytics DB Error]: Failed to insert event:", err);
    }
  }
}

export async function recordSecurityEvent(
  eventType: string,
  endpoint: string,
  reason: string,
  method = "POST",
  visitorId?: string,
  ipHash?: string
): Promise<void> {
  const timestamp = new Date().toISOString();
  inMemorySecurityEvents.push({ type: eventType, endpoint, reason, timestamp });
  if (inMemorySecurityEvents.length > 500) {
    inMemorySecurityEvents.splice(0, 50);
  }

  if (isDatabaseConfigured()) {
    try {
      await supabase.from("analytics_security_events").insert({
        event_type: eventType,
        endpoint,
        method,
        visitor_id: visitorId || null,
        reason,
        ip_hash: ipHash || null,
        created_at: timestamp,
      });
    } catch (err) {
      console.warn("[Analytics DB Error]: Failed to log security event:", err);
    }
  }
}

export function getSession(sessionId: string): SessionEntity | undefined {
  return inMemorySessions.get(sessionId);
}

export function getVisitor(visitorId: string): VisitorEntity | undefined {
  return inMemoryVisitors.get(visitorId);
}

export function getLiveActiveVisitors(windowMinutes = 15): SessionEntity[] {
  const cutoff = Date.now() - windowMinutes * 60 * 1000;
  return Array.from(inMemorySessions.values()).filter(
    (s) => new Date(s.lastSeenAt).getTime() >= cutoff
  );
}

export function getRecentSessions(limit = 20): SessionEntity[] {
  return Array.from(inMemorySessions.values())
    .sort((a, b) => new Date(b.lastSeenAt).getTime() - new Date(a.lastSeenAt).getTime())
    .slice(0, limit);
}

export function getTopSearches(limit = 10): { query: string; count: number }[] {
  return [...inMemorySearches].sort((a, b) => b.count - a.count).slice(0, limit);
}

export function getTopDownloads(limit = 10): { title: string; count: number; type: string }[] {
  return [...inMemoryDownloads].sort((a, b) => b.count - a.count).slice(0, limit);
}

export function getSecurityEvents(limit = 15): { type: string; endpoint: string; reason: string; timestamp: string }[] {
  return [...inMemorySecurityEvents].reverse().slice(0, limit);
}

export function computeDailySummary(dateStr = new Date().toISOString().split("T")[0]): DailyIntelligenceSummary {
  const sessions = Array.from(inMemorySessions.values()).filter((s) => s.startedAt.startsWith(dateStr));
  const totalSessions = sessions.length;
  const uniqueVisitors = new Set(sessions.map((s) => s.visitorId)).size;
  const newVisitors = sessions.filter((s) => s.isNewVisitor).length;
  const returningVisitors = sessions.filter((s) => s.isReturningVisitor).length;

  const totalDuration = sessions.reduce((acc, s) => acc + (s.durationSeconds || 0), 0);
  const avgDurationSeconds = totalSessions > 0 ? Math.round(totalDuration / totalSessions) : 0;
  const totalPages = sessions.reduce((acc, s) => acc + (s.pageViews || 0), 0);
  const avgPagesPerSession = totalSessions > 0 ? Number((totalPages / totalSessions).toFixed(1)) : 0;

  // Source counts
  const sourceMap = new Map<string, number>();
  for (const s of sessions) {
    const src = `${s.source} (${s.medium})`;
    sourceMap.set(src, (sourceMap.get(src) || 0) + 1);
  }
  const topSources = Array.from(sourceMap.entries())
    .map(([source, count]) => ({ source, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Top locations
  const locMap = new Map<string, number>();
  for (const s of sessions) {
    const loc = s.city ? `${s.city}, ${s.country}` : s.country;
    locMap.set(loc, (locMap.get(loc) || 0) + 1);
  }
  const topLocations = Array.from(locMap.entries())
    .map(([location, count]) => ({ location, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const highIntentCount = sessions.filter((s) => s.intentScore >= 50).length;

  return {
    date: dateStr,
    totalVisitors: uniqueVisitors || (totalSessions ? 1 : 0),
    newVisitors,
    returningVisitors,
    totalSessions,
    avgDurationSeconds,
    avgPagesPerSession,
    topSources,
    topLocations,
    topPrograms: [],
    topSectors: [],
    topCounties: [],
    topPages: [],
    totalDownloads: inMemoryDownloads.reduce((a, d) => a + d.count, 0),
    conversions: {
      phoneClicks: inMemoryConversions.filter((c) => c.type === "PHONE_CLICK").length,
      whatsappClicks: inMemoryConversions.filter((c) => c.type === "WHATSAPP_CLICK").length,
      emailClicks: inMemoryConversions.filter((c) => c.type === "EMAIL_CLICK").length,
      contactStarts: 0,
      contactSubmits: inMemoryConversions.filter((c) => c.type === "CONTACT_SUBMIT").length,
    },
    highIntentCount,
  };
}
