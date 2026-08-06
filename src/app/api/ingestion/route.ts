import { NextResponse } from "next/server";
import { sampleIngestionQueue } from "@/lib/ingestion-data";

export async function GET() {
  return NextResponse.json({
    success: true,
    totalIngestedItems: sampleIngestionQueue.length,
    items: sampleIngestionQueue,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { sourceAuthority, itemType, rawTitle, sourceUrl, detectedChanges } = body;

    if (!sourceAuthority || !rawTitle || !sourceUrl) {
      return NextResponse.json(
        { success: false, error: "Date incomplete pentru introducerea în coada de validare." },
        { status: 400 }
      );
    }

    const newItem = {
      id: `ing-${Date.now()}`,
      sourceAuthority,
      itemType: itemType || "Programme",
      rawTitle,
      sourceUrl,
      detectedChanges: detectedChanges || { changeType: "New Call", details: "Detectat prin pipeline-ul oficial." },
      detectedAt: new Date().toISOString(),
      status: "Pending Approval" as const,
    };

    return NextResponse.json({
      success: true,
      message: "Modificarea a fost adăugată cu succes în Coada de Validare CMS.",
      item: newItem,
    });
  } catch (error) {
    console.error("Ingestion API Error:", error);
    return NextResponse.json({ success: false, error: "Eroare de procesare server." }, { status: 500 });
  }
}
