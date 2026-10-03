import { NextResponse } from "next/server";
import { notifyTelegram } from "@/lib/telegram/notify";
import {
  checkRateLimit,
  getClientIpHash,
  sanitizeString,
  isValidEmail,
  isValidPhone,
} from "@/lib/security";

export async function POST(req: Request) {
  try {
    // 1. IP-Based Rate Limiting (5 requests per 60 seconds)
    const ipKey = getClientIpHash(req, "alerts");
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

    // 2. Parse & Sanitize Inputs
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, error: "Date cerere invalide." },
        { status: 400 }
      );
    }

    const email = sanitizeString(body.email, 254).toLowerCase();
    const phone = sanitizeString(body.phone, 30);
    const county = sanitizeString(body.county, 50);
    const industry = sanitizeString(body.industry, 100);
    const caen = sanitizeString(body.caen, 50);

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: "Adresa de email este nevalidă." },
        { status: 400 }
      );
    }

    if (phone && !isValidPhone(phone)) {
      return NextResponse.json(
        { success: false, error: "Numărul de telefon este nevalid." },
        { status: 400 }
      );
    }

    // 3. Trigger Telegram notification
    await notifyTelegram("ALERT_CREATED", {
      formName: "Alerte Inteligente Programe Noi",
      email,
      phone: phone || undefined,
      county: county || undefined,
      industry: industry || undefined,
      caen: caen || undefined,
      source: "/alerte",
    });

    return NextResponse.json({
      success: true,
      message: "Abonamentul pentru alerte inteligente a fost salvat cu succes.",
    });
  } catch (error) {
    console.error("Alerts API Error:", error);
    return NextResponse.json(
      { success: false, error: "Eroare de procesare abonament." },
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
