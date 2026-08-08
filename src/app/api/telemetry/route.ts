import { NextResponse } from "next/server";
import { classifyRoute, shouldSendVisitorNotification } from "@/lib/analytics/telemetry";
import { notifyTelegram } from "@/lib/telegram/notify";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { pathname, referrer, sessionId } = body;

    if (!pathname || typeof pathname !== "string") {
      return NextResponse.json({ success: false, error: "Invalid pathname" }, { status: 400 });
    }

    const safeSessionId = typeof sessionId === "string" && sessionId ? sessionId : "visitor_anon";
    const { category, label } = classifyRoute(pathname);

    const shouldNotify = shouldSendVisitorNotification(safeSessionId, pathname);

    if (shouldNotify) {
      await notifyTelegram("VISITOR_PAGE_VIEW", {
        formName: "Page View Telemetry",
        category,
        source: pathname,
        referrer: referrer || "Direct",
        sessionId: safeSessionId,
        interest: label,
      });
    }

    return NextResponse.json({ success: true, deduplicated: !shouldNotify });
  } catch (error) {
    console.error("Telemetry API error:", error);
    return NextResponse.json({ success: false, error: "Telemetry processing error" }, { status: 500 });
  }
}
