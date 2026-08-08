import { NextResponse } from "next/server";
import { headers } from "next/headers";
import crypto from "crypto";
import { notifyTelegram } from "@/lib/telegram/notify";

const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

export async function POST(req: Request) {
  try {
    const headersList = await headers();
    
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
    const { name, company, email, phone, county, caen, programInterest, message, gdpr, referrer, utm } = body;

    // Server Validation
    if (!name || !company || !email || !phone || !county || !message || !gdpr) {
      return NextResponse.json({ success: false, error: "Te rugăm să completezi toate câmpurile obligatorii." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, error: "Adresa de email nu este validă." }, { status: 400 });
    }

    // Trigger Telegram Notification (server-side, fail-safe)
    const telegramSent = await notifyTelegram("CONTACT_REQUEST", {
      formName: "Contact & Consultanță",
      name,
      company,
      email,
      phone,
      county,
      caen: caen || undefined,
      interest: programInterest || undefined,
      message,
      source: "/contact",
      referrer: referrer || undefined,
      utm: utm || undefined,
    });

    if (!telegramSent) {
      console.warn("[Contact API] Telegram delivery warning, but lead processed successfully.");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ success: false, error: "A apărut o eroare la procesarea solicitării." }, { status: 500 });
  }
}
