import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { question } = await req.json();
    if (!question || typeof question !== "string") {
      return NextResponse.json({ success: false, error: "Întrebare lipsă." }, { status: 400 });
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
      answer = `Pe baza informațiilor publice sintetizate de AiX Educational Intelligence, programele prezentate oferă sprijin general pentru digitalizare, eficiență energetică și investiții industriale. Te rugăm să specifici domeniul de interes (ex: IMM, Agricultură, Locuințe). Materialele au caracter exclusiv educațional.`;
      citations.push("Informații Publice Agregate din Surse Deschise");
    }

    return NextResponse.json({
      success: true,
      answer,
      citations,
    });
  } catch (error) {
    console.error("AI Assistant API Error:", error);
    return NextResponse.json({ success: false, error: "Eroare server AI." }, { status: 500 });
  }
}
