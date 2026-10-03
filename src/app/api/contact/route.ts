import { NextResponse } from "next/server";
import { notifyTelegram } from "@/lib/telegram/notify";
import {
  checkRateLimit,
  getClientIpHash,
  sanitizeString,
  sanitizeMultilineText,
  isValidEmail,
  isValidPhone,
} from "@/lib/security";

export async function POST(req: Request) {
  try {
    // 1. IP-Based Rate Limiting (5 requests per 60 seconds)
    const ipKey = getClientIpHash(req, "contact");
    const rateLimit = checkRateLimit(ipKey, 5, 60 * 1000);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: "Ai trimis prea multe solicitări. Te rugăm să încerci din nou peste un minut.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimit.resetInSeconds),
          },
        }
      );
    }

    // 2. Body Payload Parsing & Size Protection
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, error: "Formatul cererii este invalid." },
        { status: 400 }
      );
    }

    const name = sanitizeString(body.name, 100);
    const company = sanitizeString(body.company, 150);
    const email = sanitizeString(body.email, 254).toLowerCase();
    const phone = sanitizeString(body.phone, 30);
    const county = sanitizeString(body.county, 50);
    const caen = sanitizeString(body.caen, 50);
    const programInterest = sanitizeString(body.programInterest, 150);
    const message = sanitizeMultilineText(body.message, 3000);
    const gdpr = Boolean(body.gdpr);
    const referrer = sanitizeString(body.referrer, 255);
    const utm = sanitizeString(body.utm, 255);

    // 3. Strict Server-Side Validation
    if (!name || !company || !email || !phone || !county || !message || !gdpr) {
      return NextResponse.json(
        { success: false, error: "Te rugăm să completezi toate câmpurile obligatorii." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: "Adresa de email nu este validă." },
        { status: 400 }
      );
    }

    if (!isValidPhone(phone)) {
      return NextResponse.json(
        { success: false, error: "Numărul de telefon nu este valid." },
        { status: 400 }
      );
    }

    // 4. Trigger Telegram Notification (Fail-safe)
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
      console.warn("[Contact API] Telegram delivery notice (processed successfully).");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, error: "A apărut o eroare la procesarea solicitării." },
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
