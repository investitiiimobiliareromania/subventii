import { NextResponse } from "next/server";
import { sampleIngestionQueue } from "@/lib/ingestion-data";
import { verifyServerSessionOrToken, sanitizeString } from "@/lib/security";

export async function GET() {
  return NextResponse.json({
    success: true,
    totalIngestedItems: sampleIngestionQueue.length,
    items: sampleIngestionQueue,
  });
}

export async function POST(req: Request) {
  // 1. Strict Server-Side Authentication & Authorization Check
  const auth = await verifyServerSessionOrToken(req);
  if (!auth.authenticated) {
    return NextResponse.json(
      { success: false, error: "Autentificare obligatorie (401 Unauthorized)." },
      { status: 401 }
    );
  }

  if (!auth.isAuthorized) {
    return NextResponse.json(
      { success: false, error: "Acces interzis: permisiuni administrative insuficiente (403 Forbidden)." },
      { status: 403 }
    );
  }

  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, error: "Format payload invalid." },
        { status: 400 }
      );
    }

    const sourceAuthority = sanitizeString(body.sourceAuthority, 100);
    const itemType = sanitizeString(body.itemType, 50) || "Programme";
    const rawTitle = sanitizeString(body.rawTitle, 255);
    const sourceUrl = sanitizeString(body.sourceUrl, 500);
    const detectedChanges = body.detectedChanges || {
      changeType: "New Call",
      details: "Detectat prin pipeline-ul oficial.",
    };

    if (!sourceAuthority || !rawTitle || !sourceUrl) {
      return NextResponse.json(
        {
          success: false,
          error: "Date incomplete pentru introducerea în coada de validare.",
        },
        { status: 400 }
      );
    }

    const newItem = {
      id: `ing-${Date.now()}`,
      sourceAuthority,
      itemType: itemType as "Programme" | "Legislation" | "Document",
      rawTitle,
      sourceUrl,
      detectedChanges,
      detectedAt: new Date().toISOString(),
      status: "Pending Approval" as const,
    };

    return NextResponse.json({
      success: true,
      message: "Modificarea a fost adăugată cu succes în Coada de Validare CMS.",
      item: newItem,
    });
  } catch (error) {
    console.error("[Ingestion API Error]:", error);
    return NextResponse.json(
      { success: false, error: "Eroare la procesarea cererii de ingestie." },
      { status: 500 }
    );
  }
}

export async function PUT() {
  return NextResponse.json(
    { success: false, error: "Method Not Allowed" },
    { status: 405, headers: { Allow: "GET, POST" } }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { success: false, error: "Method Not Allowed" },
    { status: 405, headers: { Allow: "GET, POST" } }
  );
}
