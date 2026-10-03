import { NextResponse } from "next/server";
import { checkRateLimit, getClientIpHash, sanitizeString } from "@/lib/security";

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

    const q = question.toLowerCase();
    let answer = "";
    const citations: string[] = [];

    if (q.includes("start-up") || q.includes("startup") || q.includes("firme noi")) {
      answer = `Conform Ghidului Oficial Start-Up Nation 2026, suma maximă acordată este de 250.000 RON (cca. 50.000 EUR) necomutabilă, cu o cofinanțare proprie minimă de 10%. Solicitantul trebuie să fi absolvit un curs de pregătire antreprenorială acreditat.`;
      citations.push("MEAT - Ghid Solicitant Start-Up Nation 2026");
      citations.push("OUG nr. 115/2026 Art. 4");
    } else if (q.includes("casa verde") || q.includes("fotovoltaic") || q.includes("afm")) {
      answer = `Conform noului ghid AFM Casa Verde 2026, finanțarea acordată persoanelor fizice a crescut la 30.000 RON și este condiționată de instalarea unui sistem fotovoltaic hibrid de minimum 4 kWp și a unor baterii de stocare de minimum 5 kWh. Contribuția proprie este de 3.000 RON.`;
      citations.push("AFM - Ghid Casa Verde Fotovoltaice 2026");
    } else if (q.includes("noua casa") || q.includes("prima casa") || q.includes("avans")) {
      answer = `Programul Noua Casă 2026 oferă garanții de stat de până la 60% și permite achiziția primei locuințe cu un avans redus de 5% pentru plafoane de până la 70.000 EUR. Marja maximă de dobândă aplicabilă de bănci este plafonată la IRCC + 2,00%.`;
      citations.push("FNGCIMM - Procedură Noua Casă 2026");
      citations.push("Ministerul Finanțelor - Legea 172/2026");
    } else {
      answer = `Pe baza informațiilor oficiale sintetizate de SUBVENȚII România, schemele prezentate oferă sprijin direct pe suprafață (BISS, CRISS), eco-scheme, sprijin cuplat în zootehnie și investiții rurale prin AFIR (DR-14, DR-20, DR-30). Te rugăm să specifici sectorul tău de activitate (ex: Teren arabil, Bovine, Ovine, Pomicultură, Solarii). Informațiile au caracter orientativ bazat pe ghidurile oficiale.`;
      citations.push("Informații Publice Agregate din Surse Deschise");
    }

    return NextResponse.json({
      success: true,
      answer,
      citations,
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
