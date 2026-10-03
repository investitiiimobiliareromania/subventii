import { NextResponse } from "next/server";
import { classifyRoute, shouldSendVisitorNotification } from "@/lib/analytics/telemetry";
import { notifyTelegram } from "@/lib/telegram/notify";
import { checkRateLimit, getClientIpHash, sanitizeString } from "@/lib/security";

export async function POST(req: Request) {
  try {
    // 1. IP-Based Rate Limiting on Telemetry endpoint (60 requests / minute)
    const ipKey = getClientIpHash(req, "telemetry");
    const rateLimit = checkRateLimit(ipKey, 60, 60 * 1000);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, error: "Rate limit exceeded" },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const rawPathname = sanitizeString(body.pathname, 200);
    const referrer = sanitizeString(body.referrer, 200);
    const sessionId = sanitizeString(body.sessionId, 64);

    if (!rawPathname) {
      return NextResponse.json(
        { success: false, error: "Invalid pathname" },
        { status: 400 }
      );
    }

    const safeSessionId = sessionId || "visitor_anon";
    const { category, label } = classifyRoute(rawPathname);

    const shouldNotify = shouldSendVisitorNotification(safeSessionId, rawPathname);

    if (shouldNotify) {
      // Global throttle on Telegram notifications to prevent flooding (max 10 / minute)
      const globalTelegramLimit = checkRateLimit("global:telemetry:telegram", 10, 60 * 1000);
      if (globalTelegramLimit.allowed) {
        await notifyTelegram("VISITOR_PAGE_VIEW", {
          formName: "Page View Telemetry",
          category,
          source: rawPathname,
          referrer: referrer || "Direct",
          sessionId: safeSessionId,
          interest: label,
        });
      }
    }

    return NextResponse.json({ success: true, deduplicated: !shouldNotify });
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
