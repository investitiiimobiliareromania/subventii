import { NextResponse } from "next/server";
import { executeSearch } from "@/lib/search/engine";
import { getProgramsFromDb } from "@/lib/db/repository";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const q = searchParams.get("q") || undefined;
  const caen = searchParams.get("caen") || undefined;
  const county = searchParams.get("county") || undefined;
  const businessType = searchParams.get("businessType") || undefined;
  const industry = searchParams.get("industry") || undefined;
  const status = searchParams.get("status") || undefined;
  const companyAge = searchParams.get("companyAge") || undefined;
  const companySize = searchParams.get("companySize") || undefined;
  const sourceCategory = searchParams.get("sourceCategory") || undefined;

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

  return NextResponse.json({
    success: true,
    data: filtered,
    total: filtered.length,
  });
}
