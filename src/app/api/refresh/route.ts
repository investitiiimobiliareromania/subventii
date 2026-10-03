import { NextResponse } from "next/server";
import { verifyBearerSecret } from "@/lib/security";

/**
 * POST /api/refresh
 * Triggers a server-side refresh of ingestion data.
 *
 * Security:
 * - Requires an Authorization header with a Bearer token matching SUBVENTII_REFRESH_SECRET or CRON_SECRET.
 * - Timing-safe comparison to prevent side-channel timing attacks.
 */
export async function POST(req: Request) {
  const secret = process.env.SUBVENTII_REFRESH_SECRET || process.env.CRON_SECRET;
  if (!secret) {
    return NextResponse.json(
      { success: false, error: "Refresh secret not configured on server." },
      { status: 500 }
    );
  }

  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { success: false, error: "Missing Authorization Bearer header." },
      { status: 401 }
    );
  }

  // Validate authentication securely
  const isAuthorized = verifyBearerSecret(req, secret);
  if (!isAuthorized) {
    return NextResponse.json(
      { success: false, error: "Invalid authorization token (403 Forbidden)." },
      { status: 403 }
    );
  }

  // ---------------------------------------------------------------------
  // Ingestion pipeline – calls the shared fetcher for each source.
  // ---------------------------------------------------------------------
  const { fetchIngestionFromSource } = await import("@/lib/ingestion/fetchers");
  type IngestionSource =
    | "MIPE"
    | "AFIR"
    | "AFM"
    | "MEAT"
    | "Monitorul Oficial"
    | "ANCPI";
  const sources: IngestionSource[] = [
    "MIPE",
    "AFIR",
    "AFM",
    "MEAT",
    "Monitorul Oficial",
    "ANCPI",
  ];
  const results: Record<
    string,
    {
      discovered: number;
      parsed: number;
      imported: number;
      skipped_duplicate: number;
      skipped_invalid: number;
      failed: number;
    }
  > = {};

  // Lazy-load DB client only if configured.
  const { supabase, isDatabaseConfigured } = await import("@/lib/db/client");

  for (const source of sources) {
    try {
      const items = await fetchIngestionFromSource(source);
      const discovered = items.length;
      const parsed = items.length;
      let imported = 0;
      const skipped_duplicate = 0;
      const skipped_invalid = 0;
      let failed = 0;

      if (isDatabaseConfigured()) {
        const dbRows = items.map((item) => ({
          id: item.id,
          sourceAuthority: item.source,
          itemType:
            "itemType" in item
              ? String((item as Record<string, unknown>).itemType)
              : "Programme",
          rawTitle: item.rawTitle,
          sourceUrl: item.sourceUrl,
          detectedChanges: item.detectedChanges,
          status: "Pending Approval",
          created_at: new Date().toISOString(),
        }));
        const { error } = await supabase.from("ingestion_queue").insert(dbRows);
        if (error) {
          console.warn("Ingestion insert error for", source, error.message);
          failed = discovered;
        } else {
          imported = discovered;
        }
      } else {
        imported = discovered;
      }

      results[source.toLowerCase().replace(/\s+/g, "_")] = {
        discovered,
        parsed,
        imported,
        skipped_duplicate,
        skipped_invalid,
        failed,
      };
    } catch (e) {
      console.error("Ingestion error for", source, e);
      results[source.toLowerCase().replace(/\s+/g, "_")] = {
        discovered: 0,
        parsed: 0,
        imported: 0,
        skipped_duplicate: 0,
        skipped_invalid: 0,
        failed: 1,
      };
    }
  }

  return NextResponse.json({ success: true, sources: results });
}

export async function GET() {
  return NextResponse.json(
    { success: false, error: "Method Not Allowed" },
    { status: 405, headers: { Allow: "POST" } }
  );
}
