import { TelegramEventType, TelegramLeadPayload } from "./types";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function getHeaderForEvent(event: TelegramEventType): string {
  switch (event) {
    case "CONTACT_REQUEST":
    case "LEAD_SUBMISSION":
    case "FORM_SUBMISSION":
      return "📩 <b>NEW AiX EDUCATIONAL LEAD</b>";
    case "ELIGIBILITY_COMPLETED":
      return "📊 <b>ELIGIBILITY CALCULATED</b>";
    case "ALERT_CREATED":
      return "🔔 <b>SMART ALERT CREATED</b>";
    case "RESOURCE_DOWNLOAD":
      return "📥 <b>RESOURCE REQUESTED</b>";
    case "AI_HIGH_INTENT":
      return "🔥 <b>HIGH INTENT VISITOR</b>";
    case "VISITOR_PAGE_VIEW":
      return "👁 <b>AiX Visitor</b>";
    case "VISITOR_SEARCH":
      return "🔍 <b>Visitor Search</b>";
    case "VISITOR_PROGRAM_VIEW":
      return "📋 <b>Program Viewed</b>";
    default:
      return "⚡ <b>AiX EDUCATIONAL INTELLIGENCE</b>";
  }
}

export function formatTelegramMessage(event: TelegramEventType, payload: TelegramLeadPayload): string {
  const header = getHeaderForEvent(event);
  const now = payload.timestamp || new Date().toLocaleString("ro-RO", { timeZone: "Europe/Bucharest" });

  const lines: string[] = [header, "━━━━━━━━━━━━━━━━━━━━"];

  if (payload.formName) {
    lines.push(`<b>Form:</b> ${escapeHtml(payload.formName)}`);
  }

  if (payload.category) {
    lines.push(`<b>Category:</b> ${escapeHtml(payload.category)}`);
  }

  if (payload.name) {
    lines.push(`<b>Name:</b> ${escapeHtml(payload.name)}`);
  }

  if (payload.company) {
    lines.push(`<b>Company:</b> ${escapeHtml(payload.company)}`);
  }

  if (payload.phone) {
    lines.push(`<b>Phone:</b> ${escapeHtml(payload.phone)}`);
  }

  if (payload.email) {
    lines.push(`<b>Email:</b> ${escapeHtml(payload.email)}`);
  }

  if (payload.county) {
    lines.push(`<b>County:</b> ${escapeHtml(payload.county)}`);
  }

  if (payload.caen) {
    lines.push(`<b>CAEN:</b> ${escapeHtml(payload.caen)}`);
  }

  if (payload.industry) {
    lines.push(`<b>Industry:</b> ${escapeHtml(payload.industry)}`);
  }

  if (payload.interest) {
    lines.push(`<b>Interest:</b> ${escapeHtml(payload.interest)}`);
  }

  if (payload.resourceTitle) {
    lines.push(`<b>Resource:</b> ${escapeHtml(payload.resourceTitle)}`);
  }

  if (payload.score !== undefined) {
    lines.push(`<b>Eligibility Score:</b> ${payload.score}/100`);
  }

  if (payload.searchQuery) {
    lines.push(`<b>Query:</b> ${escapeHtml(payload.searchQuery)}`);
  }

  if (payload.programSlug) {
    lines.push(`<b>Program:</b> ${escapeHtml(payload.programSlug)}`);
  }

  if (payload.message) {
    lines.push("");
    lines.push(`<b>Message:</b>`);
    lines.push(`<i>${escapeHtml(payload.message)}</i>`);
  }

  if (payload.sessionId) {
    lines.push(`<b>Session:</b> ${escapeHtml(payload.sessionId)}`);
  }

  lines.push("━━━━━━━━━━━━━━━━━━━━");
  if (payload.source) {
    lines.push(`<b>Source:</b> ${escapeHtml(payload.source)}`);
  }
  if (payload.referrer && payload.referrer !== "Direct" && payload.referrer !== "None") {
    lines.push(`<b>Referrer:</b> ${escapeHtml(payload.referrer)}`);
  }
  lines.push(`<b>Time:</b> ${escapeHtml(now)}`);

  return lines.join("\n");
}

export async function notifyTelegram(event: TelegramEventType, payload: TelegramLeadPayload): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn(`[Telegram Notify] Missing environment credentials for event: ${event}`);
    return false;
  }

  try {
    const text = formatTelegramMessage(event, payload);
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

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`[Telegram Notify] Telegram API HTTP ${res.status}:`, errorText);
      return false;
    }

    return true;
  } catch (error) {
    console.error(`[Telegram Notify] Delivery error for event ${event}:`, error);
    return false;
  }
}
