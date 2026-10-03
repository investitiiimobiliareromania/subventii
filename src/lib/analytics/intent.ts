import type { AnalyticsEventType, IntentLevel } from "./types";

const EVENT_WEIGHTS: Record<AnalyticsEventType, number> = {
  PAGE_VIEW: 1,
  PROGRAM_VIEW: 3,
  SEARCH: 5,
  SECTOR_VIEW: 3,
  COUNTY_VIEW: 3,
  COUNTY_SECTOR_VIEW: 4,
  NEWS_VIEW: 2,
  LEGISLATION_VIEW: 3,
  RESOURCE_VIEW: 3,
  RESOURCE_DOWNLOAD: 8,
  GLOSSARY_VIEW: 2,
  INSTITUTION_VIEW: 2,
  OUTBOUND_CLICK: 3,
  PHONE_CLICK: 10,
  WHATSAPP_CLICK: 10,
  EMAIL_CLICK: 8,
  CONTACT_START: 10,
  CONTACT_SUBMIT: 20,
  SCROLL_75: 2,
  RETURN_VISIT: 8,
  SESSION_START: 1,
  SESSION_END: 0,
  HIGH_INTENT: 0,
  SECURITY_EVENT: 0,
};

export function calculateEventIntentPoints(
  eventType: AnalyticsEventType,
  isRepeatProgramView = false,
  isLongEngagement = false
): number {
  let points = EVENT_WEIGHTS[eventType] || 1;
  if (isRepeatProgramView) {
    points += 5;
  }
  if (isLongEngagement) {
    points += 5;
  }
  return points;
}

export function computeIntentLevel(score: number): IntentLevel {
  const bounded = Math.max(0, Math.min(100, score));
  if (bounded >= 75) return "VERY HIGH";
  if (bounded >= 50) return "HIGH";
  if (bounded >= 25) return "MEDIUM";
  return "LOW";
}

// Cooldown tracker for High Intent Telegram alerts (session-level)
// Key: `session_id` -> boolean
const highIntentTriggeredMap = new Map<string, number>();
const INTENT_ALERT_COOLDOWN_MS = 30 * 60 * 1000; // 30 minutes

export function shouldTriggerHighIntentAlert(sessionId: string, newScore: number): boolean {
  if (newScore < 50) return false;

  const now = Date.now();
  const lastTriggered = highIntentTriggeredMap.get(sessionId);

  if (!lastTriggered || now - lastTriggered > INTENT_ALERT_COOLDOWN_MS) {
    highIntentTriggeredMap.set(sessionId, now);

    // Prune map if large
    if (highIntentTriggeredMap.size > 2000) {
      for (const [k, v] of highIntentTriggeredMap.entries()) {
        if (now - v > INTENT_ALERT_COOLDOWN_MS) {
          highIntentTriggeredMap.delete(k);
        }
      }
    }
    return true;
  }

  return false;
}
