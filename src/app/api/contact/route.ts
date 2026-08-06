import { NextResponse } from "next/server";
import { headers } from "next/headers";
import crypto from "crypto";

// Rate limiting in-memory store (for production, use Redis or DB)
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 3;

export async function POST(req: Request) {
  try {
    const headersList = await headers();
    
    // IP hash for basic rate limiting
    let ip = headersList.get("x-forwarded-for") || "unknown";
    if (ip.includes(",")) {
      ip = ip.split(",")[0].trim();
    }
    const ipHash = crypto.createHash("sha256").update(ip).digest("hex");

    const now = Date.now();
    const lastRequest = rateLimitMap.get(ipHash) || 0;

    if (now - lastRequest < RATE_LIMIT_WINDOW_MS) {
      const recentRequests = Array.from(rateLimitMap.values()).filter(time => now - time < RATE_LIMIT_WINDOW_MS).length;
      if (recentRequests >= MAX_REQUESTS_PER_WINDOW) {
        return NextResponse.json(
          { success: false, error: "Ai trimis prea multe solicitări. Te rugăm să încerci din nou peste câteva minute." },
          { status: 429 }
        );
      }
    }

    rateLimitMap.set(ipHash, now);

    const body = await req.json();
    const { name, company, email, phone, county, caen, programInterest, message, gdpr, referrer, utm, browser } = body;

    // Server Validation
    if (!name || !company || !email || !phone || !county || !message || !gdpr) {
      return NextResponse.json({ success: false, error: "Te rugăm să completezi toate câmpurile obligatorii." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, error: "Adresa de email nu este validă." }, { status: 400 });
    }

    // Telegram Integration
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.warn("Telegram bot token or chat ID is not configured.");
      // Still return success to user so they don't see ugly errors for server misconfiguration
      return NextResponse.json({ success: true, warning: "System misconfigured, message not sent to admin." });
    }

    const telegramMessage = `
📩 <b>Subvenții.ro - Solicitare Nouă</b>

👤 <b>Nume:</b> ${name}
🏢 <b>Companie:</b> ${company}
✉️ <b>Email:</b> ${email}
📞 <b>Telefon:</b> ${phone}
📍 <b>Județ:</b> ${county}
🔖 <b>CAEN:</b> ${caen || "Nespecificat"}
🎯 <b>Program Interes:</b> ${programInterest || "Nespecificat"}

💬 <b>Mesaj:</b>
<i>${message}</i>

---
🕒 <b>Timp:</b> ${new Date().toLocaleString("ro-RO", { timeZone: "Europe/Bucharest" })}
🔗 <b>Referrer:</b> ${referrer}
🔗 <b>UTM:</b> ${utm}
🖥 <b>Browser:</b> ${browser}
`;

    const telegramResponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: telegramMessage,
        parse_mode: "HTML",
      }),
    });

    if (!telegramResponse.ok) {
      console.error("Failed to send message to Telegram:", await telegramResponse.text());
      throw new Error("Eroare la procesarea mesajului.");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ success: false, error: "A apărut o eroare de server." }, { status: 500 });
  }
}
