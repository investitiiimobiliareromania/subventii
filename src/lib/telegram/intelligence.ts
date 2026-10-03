import type { SessionEntity } from "@/lib/analytics/types";
import { escapeHtml } from "@/lib/telegram/notify";

// Cooldown map for Telegram notifications to prevent flooding
const telegramCooldownMap = new Map<string, number>();

function isCooldownActive(key: string, cooldownMs: number): boolean {
  const now = Date.now();
  const lastTime = telegramCooldownMap.get(key);
  if (lastTime && now - lastTime < cooldownMs) {
    return true;
  }
  telegramCooldownMap.set(key, now);
  if (telegramCooldownMap.size > 2000) {
    for (const [k, v] of telegramCooldownMap.entries()) {
      if (now - v > cooldownMs) telegramCooldownMap.delete(k);
    }
  }
  return false;
}

export function formatNewVisitorMessage(session: SessionEntity): string {
  const nowStr = new Date().toLocaleString("ro-RO", { timeZone: "Europe/Bucharest" });
  const location = session.city ? `${session.city}, ${session.country}` : session.country || "România";
  const sourceStr = session.campaign ? `${session.source} / ${session.medium} (${session.campaign})` : `${session.source} / ${session.medium}`;

  return [
    `🔵 <b>NEW VISITOR</b>`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `<b>Visitor:</b> ${escapeHtml(session.visitorId)}`,
    `<b>Session:</b> ${escapeHtml(session.id)}`,
    `<b>Time:</b> ${escapeHtml(nowStr)}`,
    `📍 <b>Location:</b> ${escapeHtml(location)}`,
    `🔎 <b>Source:</b> ${escapeHtml(sourceStr)}`,
    `📄 <b>Landing:</b> ${escapeHtml(session.landingPath)}`,
    `📱 <b>Device:</b> ${escapeHtml(session.deviceType)} • ${escapeHtml(session.os)} • ${escapeHtml(session.browser)}`,
    `🌐 <b>Lang:</b> ${escapeHtml(session.language)}`,
    `<i>Session started.</i>`,
    `━━━━━━━━━━━━━━━━━━━━`,
  ].join("\n");
}

export function formatHighIntentMessage(
  session: SessionEntity,
  topInterest?: string,
  searchesCount = 0,
  downloadsCount = 0,
  contactViewed = false
): string {
  const nowStr = new Date().toLocaleString("ro-RO", { timeZone: "Europe/Bucharest" });
  const durationMin = Math.floor(session.durationSeconds / 60);
  const durationSec = session.durationSeconds % 60;
  const durationStr = `${String(durationMin).padStart(2, "0")}m ${String(durationSec).padStart(2, "0")}s`;
  const location = session.city ? `${session.city}, ${session.country}` : session.country || "România";
  const sourceStr = `${session.source} / ${session.medium}`;

  const lines = [
    `🔥 <b>HIGH INTENT VISITOR</b>`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `<b>Visitor:</b> ${escapeHtml(session.visitorId)}`,
    `<b>Session:</b> ${escapeHtml(session.id)}`,
    `🕐 <b>Time:</b> ${escapeHtml(nowStr)} • ⏱ <b>${durationStr}</b>`,
    `📍 <b>Location:</b> ${escapeHtml(location)}`,
    `🔎 <b>Source:</b> ${escapeHtml(sourceStr)}`,
  ];

  if (topInterest) {
    lines.push(`📄 <b>TOP INTEREST:</b> ${escapeHtml(topInterest)}`);
  }

  lines.push(`👁 <b>Pages Viewed:</b> ${session.pageViews}`);
  if (searchesCount > 0) lines.push(`🔎 <b>Searches:</b> ${searchesCount}`);
  if (downloadsCount > 0) lines.push(`📥 <b>Downloads:</b> ${downloadsCount}`);
  if (contactViewed) lines.push(`📞 <b>Contact viewed</b>`);

  lines.push(`🎯 <b>Intent:</b> ${session.intentScore}/100 • <b>${session.intentLevel}</b>`);
  lines.push(`📄 <b>Current Page:</b> ${escapeHtml(session.exitPath || session.landingPath)}`);
  lines.push(`━━━━━━━━━━━━━━━━━━━━`);

  return lines.join("\n");
}

export function formatResourceDownloadMessage(
  visitorId: string,
  resourceName: string,
  fileType: string,
  pathname: string,
  source: string,
  deviceStr: string,
  intentScore: number,
  intentLevel: string
): string {
  const nowStr = new Date().toLocaleString("ro-RO", { timeZone: "Europe/Bucharest" });

  return [
    `📥 <b>RESOURCE DOWNLOAD</b>`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `<b>Visitor:</b> ${escapeHtml(visitorId)}`,
    `<b>Time:</b> ${escapeHtml(nowStr)}`,
    `<b>Resource:</b> ${escapeHtml(resourceName)}`,
    `<b>Type:</b> ${escapeHtml(fileType.toUpperCase())}`,
    `<b>Page:</b> ${escapeHtml(pathname)}`,
    `<b>Source:</b> ${escapeHtml(source)}`,
    `<b>Device:</b> ${escapeHtml(deviceStr)}`,
    `<b>Intent:</b> ${intentScore}/100 — <b>${intentLevel}</b>`,
    `━━━━━━━━━━━━━━━━━━━━`,
  ].join("\n");
}

export function formatLeadActionMessage(
  visitorId: string,
  source: string,
  landingPage: string,
  journeyStr: string,
  intentScore: number,
  intentLevel: string
): string {
  const nowStr = new Date().toLocaleString("ro-RO", { timeZone: "Europe/Bucharest" });

  return [
    `🔴 <b>NEW LEAD ACTION</b>`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `<b>Event:</b> CONTACT_SUBMIT`,
    `<b>Time:</b> ${escapeHtml(nowStr)}`,
    `<b>Visitor:</b> ${escapeHtml(visitorId)}`,
    `<b>Source:</b> ${escapeHtml(source)}`,
    `<b>Landing:</b> ${escapeHtml(landingPage)}`,
    `<b>Journey:</b> ${escapeHtml(journeyStr)}`,
    `<b>Intent:</b> ${intentScore}/100 — <b>${intentLevel}</b>`,
    `━━━━━━━━━━━━━━━━━━━━`,
  ].join("\n");
}

export function formatSecurityAlertMessage(
  type: string,
  endpoint: string,
  method: string,
  visitorId: string,
  reason: string
): string {
  const nowStr = new Date().toLocaleString("ro-RO", { timeZone: "Europe/Bucharest" });

  return [
    `🛡️ <b>SECURITY EVENT</b>`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `<b>Type:</b> ${escapeHtml(type)}`,
    `<b>Endpoint:</b> ${escapeHtml(endpoint)}`,
    `<b>Time:</b> ${escapeHtml(nowStr)}`,
    `<b>Method:</b> ${escapeHtml(method)}`,
    `<b>Visitor:</b> ${escapeHtml(visitorId || "V-ANON")}`,
    `<b>Action:</b> Request blocked`,
    `<b>Reason:</b> ${escapeHtml(reason)}`,
    `<b>Environment:</b> production`,
    `━━━━━━━━━━━━━━━━━━━━`,
  ].join("\n");
}

export async function sendTelegramIntelligence(
  text: string,
  cooldownKey?: string,
  cooldownMs = 60 * 1000
): Promise<boolean> {
  if (cooldownKey && isCooldownActive(cooldownKey, cooldownMs)) {
    return false;
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return false;
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });
    return res.ok;
  } catch (err) {
    console.warn("[Telegram Intelligence Error]:", err);
    return false;
  }
}
