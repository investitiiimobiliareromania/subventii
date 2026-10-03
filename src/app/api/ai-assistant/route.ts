import { NextResponse } from "next/server";
import { checkRateLimit, getClientIpHash, sanitizeString } from "@/lib/security";
import { solveEducationalQuery } from "@/lib/ai-educational-engine";

export async function POST(req: Request) {
  try {
    // 1. IP-Based Rate Limiting (15 requests per 60 seconds)
    const ipKey = getClientIpHash(req, "ai-assistant");
    const rateLimit = checkRateLimit(ipKey, 15, 60 * 1000);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: "Prea multe întrebări într-un interval scurt. Te rugăm să aștepți câteva secunde.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimit.resetInSeconds),
          },
        }
      );
    }

    // 2. Parse and sanitize question
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, error: "Cerere invalidă." },
        { status: 400 }
      );
    }

    const question = sanitizeString(body.question, 500);
    if (!question || question.length < 2) {
      return NextResponse.json(
        { success: false, error: "Întrebare lipsă sau prea scurtă." },
        { status: 400 }
      );
    }

    const result = solveEducationalQuery(question);

    return NextResponse.json({
      success: true,
      intent: result.intent,
      answer: result.answer,
      calculation: result.calculation,
      citations: result.citations,
      contactCta: result.contactCta,
    });
  } catch (error) {
    console.error("AI Assistant API Error:", error);
    return NextResponse.json(
      { success: false, error: "Eroare server AI." },
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
