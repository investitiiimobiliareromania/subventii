import { supabase } from "@/lib/db/client";
import type {
  AuditLogEntity,
  ArticleEntity,
  LegislativeChangeEntity,
  AncpiReportEntity,
  GlossaryTermEntity,
  DownloadableResourceEntity,
  IngestionQueueItemEntity,
} from "@/lib/db/types";
import { type FundingProgram } from "@/lib/funding-data";

export async function getProgramsFromDb(): Promise<FundingProgram[]> {
  try {
    const { data: dbPrograms, error } = await supabase
      .from("funding_programs")
      .select(`
        *,
        institutions(*),
        program_calls(*),
        program_caen(caen_code),
        program_counties(county_code)
      `)
      .is("deleted_at", null);

    if (error || !dbPrograms || dbPrograms.length === 0) {
      return [];
    }

    return dbPrograms.map((row) => mapDbRowToFundingProgram(row));
  } catch {
    return [];
  }
}

export async function getProgramBySlugFromDb(slug: string): Promise<FundingProgram | null> {
  const all = await getProgramsFromDb();
  return all.find((p) => p.slug === slug) || null;
}

export async function getAuditLogsFromDb(): Promise<AuditLogEntity[]> {
  try {
    const { data, error } = await supabase
      .from("audit_logs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data) {
      return [];
    }

    return data as AuditLogEntity[];
  } catch {
    return [];
  }
}

export async function createAuditLogDb(
  programId: string,
  adminUserId: string,
  action: string,
  changes: Record<string, unknown>,
  justification?: string
): Promise<boolean> {
  try {
    const { error } = await supabase.from("audit_logs").insert([
      {
        program_id: programId,
        admin_user_id: adminUserId,
        action,
        changes,
        justification,
        created_at: new Date().toISOString(),
      },
    ]);
    return !error;
  } catch {
    return false;
  }
}

export async function getArticlesFromDb(): Promise<ArticleEntity[]> {
  try {
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .eq("status", "Published")
      .order("published_at", { ascending: false });

    if (error || !data) return [];
    return data as ArticleEntity[];
  } catch {
    return [];
  }
}

export async function getLegislativeChangesFromDb(): Promise<LegislativeChangeEntity[]> {
  try {
    const { data, error } = await supabase
      .from("legislative_changes")
      .select("*")
      .order("effective_date", { ascending: false });

    if (error || !data) return [];
    return data as LegislativeChangeEntity[];
  } catch {
    return [];
  }
}

export async function getAncpiReportsFromDb(): Promise<AncpiReportEntity[]> {
  try {
    const { data, error } = await supabase
      .from("ancpi_monthly_reports")
      .select("*")
      .order("report_month", { ascending: false });

    if (error || !data) return [];
    return data as AncpiReportEntity[];
  } catch {
    return [];
  }
}

export async function getGlossaryTermsFromDb(): Promise<GlossaryTermEntity[]> {
  try {
    const { data, error } = await supabase
      .from("glossary_terms")
      .select("*")
      .order("term", { ascending: true });

    if (error || !data) return [];
    return data as GlossaryTermEntity[];
  } catch {
    return [];
  }
}

export async function getDownloadableResourcesFromDb(): Promise<DownloadableResourceEntity[]> {
  try {
    const { data, error } = await supabase
      .from("downloadable_resources")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data) return [];
    return data as DownloadableResourceEntity[];
  } catch {
    return [];
  }
}

export async function getIngestionQueueFromDb(): Promise<IngestionQueueItemEntity[]> {
  try {
    const { data, error } = await supabase
      .from("ingestion_queue")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data) return [];
    return data as IngestionQueueItemEntity[];
  } catch {
    return [];
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapDbRowToFundingProgram(row: any): FundingProgram {
  const call = row.program_calls?.[0] || {};
  return {
    slug: row.slug,
    title: row.title,
    summary: row.short_summary,
    status: mapDbStatusToFrontend(row.status),
    deadline: call.deadline_date ? call.deadline_date.split("T")[0] : "2026-12-31",
    maxFundingRon: Number(call.max_funding_ron || 250000),
    maxFundingEur: call.max_funding_eur ? Number(call.max_funding_eur) : 50000,
    minFundingRon: call.min_funding_ron ? Number(call.min_funding_ron) : 50000,
    source: row.institutions?.name || "Ministerul Economiei",
    sourceCategory: ((row.institutions as Record<string, string>)?.acronym || "Minister") as FundingProgram["sourceCategory"],
    businessTypes: ["SRL", "PFA"],
    industries: ["IT & digital", "Servicii"],
    counties: row.national_coverage ? ["Național"] : ["Cluj", "București"],
    companyAge: row.company_age || "Nou înființată",
    companySize: row.company_size || "Microîntreprindere",
    eligibility: [
      "Persoana fizică solicitantă trebuie să fi absolvit cursurile de antreprenoriat organizate prin program.",
      "Societatea trebuie înființată după absolvirea cursului de către persoana eligibilă.",
      "Crearea a minimum 2 locuri de muncă cu normă întreagă.",
    ],
    documents: [
      "Cerere de finanțare completată",
      "Plan de afaceri detaliat",
      "Certificat constatator ONRC",
    ],
    cofinancing: `${call.cofinancing_percentage || 10}% din cheltuielile eligibile.`,
    officialUrl: row.institutions?.official_domain ? `https://${row.institutions.official_domain}` : "https://mfe.gov.ro",
    timeline: [
      { label: "Depunere proiecte", date: call.launch_date || "2026-07-01" },
      { label: "Termen limită", date: call.deadline_date || "2026-08-14" },
    ],
    faqs: [
      {
        question: "Cine se poate înscrie?",
        answer: "Persoanele fizice eligibile conform procedurii oficiale.",
      },
    ],
  };
}

function mapDbStatusToFrontend(status: string): FundingProgram["status"] {
  switch (status) {
    case "Applications Open":
      return "Deschis";
    case "Opening Soon":
    case "Public Consultation":
    case "Official Guide Approved":
      return "În curând";
    case "Call Closed":
      return "Închis";
    default:
      return "Suspendat";
  }
}
