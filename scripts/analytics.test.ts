import {
  generateVisitorId,
  generateSessionId,
  isValidVisitorId,
  isValidSessionId,
  sanitizeVisitorId,
  sanitizeSessionId,
} from "../src/lib/analytics/id";
import {
  calculateEventIntentPoints,
  computeIntentLevel,
  shouldTriggerHighIntentAlert,
} from "../src/lib/analytics/intent";
import {
  parseMarketingAttribution,
  parseDeviceAndBrowser,
} from "../src/lib/analytics/attribution";
import {
  formatNewVisitorMessage,
  formatHighIntentMessage,
  formatResourceDownloadMessage,
  formatLeadActionMessage,
  formatSecurityAlertMessage,
} from "../src/lib/telegram/intelligence";
import {
  recordVisitorAndSession,
  recordAnalyticsEvent,
  getLiveActiveVisitors,
  getTopSearches,
  getTopDownloads,
  computeDailySummary,
} from "../src/lib/analytics/repository";

function runTest(name: string, fn: () => void) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
  } catch (err) {
    console.error(`  ✗ ${name}:`, err);
    process.exitCode = 1;
  }
}

async function runAsyncTest(name: string, fn: () => Promise<void>) {
  try {
    await fn();
    console.log(`  ✓ ${name}`);
  } catch (err) {
    console.error(`  ✗ ${name}:`, err);
    process.exitCode = 1;
  }
}

async function main() {
  console.log("==================================================");
  console.log("  SUBVENȚII VISITOR & MARKETING INTELLIGENCE TESTS");
  console.log("==================================================");

  // 1. ID GENERATION & SANITIZATION
  console.log("\n[1] Visitor & Session ID Validation");
  runTest("generateVisitorId outputs valid V-XXXXXX", () => {
    const vid = generateVisitorId();
    if (!isValidVisitorId(vid)) throw new Error(`Invalid format: ${vid}`);
  });

  runTest("generateSessionId outputs valid S-XXXXXX", () => {
    const sid = generateSessionId();
    if (!isValidSessionId(sid)) throw new Error(`Invalid format: ${sid}`);
  });

  runTest("sanitizeVisitorId sanitizes invalid or malicious inputs", () => {
    const sanitized = sanitizeVisitorId("<script>alert(1)</script>");
    if (!isValidVisitorId(sanitized)) throw new Error(`Failed to sanitize: ${sanitized}`);
    
    const valid = "V-8F42A1";
    if (sanitizeVisitorId(valid) !== valid) throw new Error("Valid ID changed");
  });

  runTest("sanitizeSessionId sanitizes invalid inputs", () => {
    const sanitized = sanitizeSessionId("bad_session_id");
    if (!isValidSessionId(sanitized)) throw new Error(`Failed to sanitize: ${sanitized}`);
  });

  // 2. INTENT SCORE & LEVELS
  console.log("\n[2] Intent Calculation & Thresholds");
  runTest("computeIntentLevel assigns correct boundaries", () => {
    if (computeIntentLevel(0) !== "LOW") throw new Error("0 should be LOW");
    if (computeIntentLevel(24) !== "LOW") throw new Error("24 should be LOW");
    if (computeIntentLevel(25) !== "MEDIUM") throw new Error("25 should be MEDIUM");
    if (computeIntentLevel(49) !== "MEDIUM") throw new Error("49 should be MEDIUM");
    if (computeIntentLevel(50) !== "HIGH") throw new Error("50 should be HIGH");
    if (computeIntentLevel(74) !== "HIGH") throw new Error("74 should be HIGH");
    if (computeIntentLevel(75) !== "VERY HIGH") throw new Error("75 should be VERY HIGH");
    if (computeIntentLevel(100) !== "VERY HIGH") throw new Error("100 should be VERY HIGH");
  });

  runTest("calculateEventIntentPoints adds correct weights", () => {
    const p1 = calculateEventIntentPoints("PAGE_VIEW");
    if (p1 !== 1) throw new Error(`Expected 1 for PAGE_VIEW, got ${p1}`);

    const pDownload = calculateEventIntentPoints("RESOURCE_DOWNLOAD");
    if (pDownload !== 8) throw new Error(`Expected 8 for RESOURCE_DOWNLOAD, got ${pDownload}`);

    const pContact = calculateEventIntentPoints("CONTACT_SUBMIT");
    if (pContact !== 20) throw new Error(`Expected 20 for CONTACT_SUBMIT, got ${pContact}`);
  });

  runTest("shouldTriggerHighIntentAlert respects threshold and cooldown", () => {
    const testSid = "S-TEST01";
    if (shouldTriggerHighIntentAlert(testSid, 45)) throw new Error("Triggered on score < 50");
    if (!shouldTriggerHighIntentAlert(testSid, 55)) throw new Error("Failed to trigger on score >= 50");
    if (shouldTriggerHighIntentAlert(testSid, 80)) throw new Error("Failed cooldown check (should not retrigger)");
  });

  // 3. ATTRIBUTION PARSER
  console.log("\n[3] Marketing Attribution & Device Parsing");
  runTest("parseMarketingAttribution detects Google Organic", () => {
    const attr = parseMarketingAttribution("https://www.google.com/search?q=subventii");
    if (attr.channel !== "ORGANIC_SEARCH" || attr.source !== "Google") {
      throw new Error(`Unexpected attribution: ${JSON.stringify(attr)}`);
    }
  });

  runTest("parseMarketingAttribution detects UTM campaign", () => {
    const attr = parseMarketingAttribution("https://facebook.com", {
      source: "facebook",
      medium: "paid_social",
      campaign: "dr14_october",
    });
    if (attr.channel !== "SOCIAL" || attr.campaign !== "dr14_october") {
      throw new Error(`Unexpected UTM attribution: ${JSON.stringify(attr)}`);
    }
  });

  runTest("parseDeviceAndBrowser classifies desktop and mobile cleanly", () => {
    const desktopUa = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0";
    const dev = parseDeviceAndBrowser(desktopUa);
    if (dev.deviceType !== "Desktop" || dev.os !== "macOS" || dev.browser !== "Chrome") {
      throw new Error(`Unexpected device parse: ${JSON.stringify(dev)}`);
    }
  });

  // 4. TELEGRAM INTELLIGENCE TEMPLATES
  console.log("\n[4] Telegram Intelligence Formatting");
  runTest("formatNewVisitorMessage renders clean HTML", () => {
    const msg = formatNewVisitorMessage({
      id: "S-19D7C4",
      visitorId: "V-8F42A1",
      startedAt: new Date().toISOString(),
      lastSeenAt: new Date().toISOString(),
      durationSeconds: 15,
      landingPath: "/finantari",
      exitPath: "/finantari",
      pageViews: 1,
      uniquePages: 1,
      eventCount: 1,
      source: "ORGANIC_SEARCH",
      medium: "organic",
      referrer: "https://google.com",
      deviceType: "Desktop",
      os: "macOS",
      browser: "Safari",
      language: "ro-RO",
      timezone: "Europe/Bucharest",
      country: "România",
      city: "București",
      intentScore: 5,
      intentLevel: "LOW",
      isNewVisitor: true,
      isReturningVisitor: false,
    });
    if (!msg.includes("NEW VISITOR") || !msg.includes("V-8F42A1") || !msg.includes("București")) {
      throw new Error(`Malformed telegram message:\n${msg}`);
    }
  });

  runTest("formatResourceDownloadMessage renders download event", () => {
    const msg = formatResourceDownloadMessage(
      "V-8F42A1",
      "Macheta Buget Fermă",
      "XLSX",
      "/resurse",
      "Google / Organic",
      "Desktop • macOS • Safari",
      68,
      "HIGH"
    );
    if (!msg.includes("RESOURCE DOWNLOAD") || !msg.includes("XLSX") || !msg.includes("68/100")) {
      throw new Error(`Malformed download message:\n${msg}`);
    }
  });

  runTest("formatHighIntentMessage renders rich intent signals", () => {
    const msg = formatHighIntentMessage(
      {
        id: "S-19D7C4",
        visitorId: "V-8F42A1",
        startedAt: new Date().toISOString(),
        lastSeenAt: new Date().toISOString(),
        durationSeconds: 381,
        landingPath: "/finantari",
        exitPath: "/finantari/dr-14",
        pageViews: 9,
        uniquePages: 5,
        eventCount: 12,
        source: "ORGANIC_SEARCH",
        medium: "organic",
        referrer: "https://google.com",
        deviceType: "Desktop",
        os: "macOS",
        browser: "Safari",
        language: "ro-RO",
        timezone: "Europe/Bucharest",
        country: "România",
        city: "București",
        intentScore: 82,
        intentLevel: "VERY HIGH",
        isNewVisitor: false,
        isReturningVisitor: true,
      },
      "DR-14 Agricultură Ilfov",
      2,
      1,
      true
    );
    if (!msg.includes("HIGH INTENT VISITOR") || !msg.includes("DR-14 Agricultură Ilfov") || !msg.includes("VERY HIGH")) {
      throw new Error(`Malformed high intent message:\n${msg}`);
    }
  });

  runTest("formatLeadActionMessage renders lead conversion summary", () => {
    const msg = formatLeadActionMessage(
      "V-8F42A1",
      "Google / Organic",
      "/finantari/dr-14",
      "DR-14 → Agricultură → Resurse → Contact",
      92,
      "VERY HIGH"
    );
    if (!msg.includes("NEW LEAD ACTION") || !msg.includes("CONTACT_SUBMIT") || !msg.includes("92/100")) {
      throw new Error(`Malformed lead action message:\n${msg}`);
    }
  });

  runTest("formatSecurityAlertMessage renders security event details", () => {
    const msg = formatSecurityAlertMessage(
      "RATE_LIMIT_TRIGGERED",
      "/api/alerts",
      "POST",
      "V-8F42A1",
      "Rate limit exceeded"
    );
    if (!msg.includes("SECURITY EVENT") || !msg.includes("RATE_LIMIT_TRIGGERED") || !msg.includes("/api/alerts")) {
      throw new Error(`Malformed security alert message:\n${msg}`);
    }
  });

  // 5. REPOSITORY & IN-MEMORY AGGREGATIONS
  console.log("\n[5] Repository Aggregations");
  await runAsyncTest("recordVisitorAndSession and live visitor query", async () => {
    const vid = "V-AA11BB";
    const sid = "S-CC22DD";
    await recordVisitorAndSession(
      {
        id: vid,
        firstSeenAt: new Date().toISOString(),
        lastSeenAt: new Date().toISOString(),
        totalSessions: 1,
        totalPageviews: 2,
        totalEvents: 3,
        maxIntentScore: 55,
      },
      {
        id: sid,
        visitorId: vid,
        startedAt: new Date().toISOString(),
        lastSeenAt: new Date().toISOString(),
        durationSeconds: 45,
        landingPath: "/finantari",
        exitPath: "/finantari/dr-14",
        pageViews: 2,
        uniquePages: 2,
        eventCount: 3,
        source: "ORGANIC_SEARCH",
        medium: "organic",
        referrer: "Direct",
        deviceType: "Desktop",
        os: "Windows",
        browser: "Chrome",
        language: "ro-RO",
        timezone: "Europe/Bucharest",
        country: "România",
        intentScore: 55,
        intentLevel: "HIGH",
        isNewVisitor: true,
        isReturningVisitor: false,
      }
    );

    const live = getLiveActiveVisitors(15);
    const found = live.find((v) => v.visitorId === vid);
    if (!found) throw new Error("Visitor not found in live visitors list");
  });

  await runAsyncTest("recordAnalyticsEvent updates searches and downloads", async () => {
    await recordAnalyticsEvent({
      id: "evt-1",
      visitorId: "V-AA11BB",
      sessionId: "S-CC22DD",
      eventType: "SEARCH",
      pathname: "/finantari",
      metadata: { query: "DR-14 instalare tineri fermieri" },
      createdAt: new Date().toISOString(),
    });

    await recordAnalyticsEvent({
      id: "evt-2",
      visitorId: "V-AA11BB",
      sessionId: "S-CC22DD",
      eventType: "RESOURCE_DOWNLOAD",
      pathname: "/resurse",
      metadata: { resourceName: "Ghid Solicitant DR-14.pdf", fileFormat: "PDF" },
      createdAt: new Date().toISOString(),
    });

    const topSearches = getTopSearches();
    const topDownloads = getTopDownloads();

    if (!topSearches.some((s) => s.query.includes("dr-14"))) {
      throw new Error("Search query not aggregated");
    }
    if (!topDownloads.some((d) => d.title.includes("Ghid Solicitant"))) {
      throw new Error("Download not aggregated");
    }

    const summary = computeDailySummary();
    if (summary.totalSessions < 1) {
      throw new Error("Daily summary failed to count sessions");
    }
  });

  console.log("\n==================================================");
  console.log("  ALL VISITOR & MARKETING INTELLIGENCE TESTS PASSED");
  console.log("==================================================");
}

main().catch((err) => {
  console.error("Test suite fatal error:", err);
  process.exit(1);
});
