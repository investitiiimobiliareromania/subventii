import { NextResponse } from "next/server";
import { executeSearch } from "@/lib/search/engine";
import { getProgramsFromDb } from "@/lib/db/repository";
import { sanitizeString } from "@/lib/security";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const q = sanitizeString(searchParams.get("q"), 100) || undefined;
  const caen = sanitizeString(searchParams.get("caen"), 50) || undefined;
  const county = sanitizeString(searchParams.get("county"), 50) || undefined;
  const businessType = sanitizeString(searchParams.get("businessType"), 50) || undefined;
  const industry = sanitizeString(searchParams.get("industry"), 50) || undefined;
  const status = sanitizeString(searchParams.get("status"), 50) || undefined;
  const companyAge = sanitizeString(searchParams.get("companyAge"), 50) || undefined;
  const companySize = sanitizeString(searchParams.get("companySize"), 50) || undefined;
  const sourceCategory = sanitizeString(searchParams.get("sourceCategory"), 50) || undefined;

  const programs = await getProgramsFromDb();

  const filtered = executeSearch(programs, {
    q,
    caen,
    county,
    businessType,
    industry,
    status,
    companyAge,
    companySize,
    sourceCategory,
  });

  return NextResponse.json(
    {
      success: true,
      data: filtered,
      total: filtered.length,
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=120, stale-while-revalidate=600",
      },
    }
  );
}

export async function POST() {
  return NextResponse.json(
    { success: false, error: "Method Not Allowed" },
    { status: 405, headers: { Allow: "GET" } }
  );
}
