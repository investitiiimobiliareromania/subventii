import { supabase, isDatabaseConfigured } from "@/lib/db/client";
import type {
  AuditLogEntity,
  ArticleEntity,
  LegislativeChangeEntity,
  AncpiReportEntity,
  GlossaryTermEntity,
  DownloadableResourceEntity,
  IngestionQueueItemEntity,
} from "@/lib/db/types";
import { type FundingProgram, FUNDING_PROGRAMS } from "@/lib/funding-data";
import { newsroomArticles } from "@/lib/newsroom-data";
import { legislationCatalog } from "@/lib/legislatie-data";
import { ancpiMonthlyDataset } from "@/lib/rapoarte-ancpi-data";
import { glossaryCatalog } from "@/lib/glossary-data";
import { downloadableResourcesCatalog } from "@/lib/resources-data";
import { sampleIngestionQueue } from "@/lib/ingestion-data";

export async function getProgramsFromDb(): Promise<FundingProgram[]> {
  try {
    if (isDatabaseConfigured()) {
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

      if (!error && dbPrograms && dbPrograms.length > 0) {
        return dbPrograms.map((row) => mapDbRowToFundingProgram(row));
      }

      if (error) {
        console.warn("[DB Diagnostic] getProgramsFromDb query error:", error.message);
      } else if (dbPrograms && dbPrograms.length === 0) {
        console.warn("[DB Diagnostic] getProgramsFromDb query returned 0 rows from database.");
      }
    }
  } catch (err) {
    console.warn("[DB Diagnostic] getProgramsFromDb connection exception:", err);
  }

  return FUNDING_PROGRAMS;
}

export async function getActiveProgramsCount(): Promise<number> {
  const programs = await getProgramsFromDb();
  return programs.length;
}

export async function getOpenCallsCount(): Promise<number> {
  const programs = await getProgramsFromDb();
  return programs.filter((p) => p.status === "Deschis").length;
}

export async function getInstitutionsCount(): Promise<number> {
  try {
    if (isDatabaseConfigured()) {
      const { count, error } = await supabase
        .from("institutions")
        .select("*", { count: "exact", head: true });
      if (!error && typeof count === "number" && count > 0) {
        return count;
      }
    }
  } catch (err) {
    console.warn("[DB Diagnostic] getInstitutionsCount exception:", err);
  }
  return 6; // Official institutions monitored (MIPE, ADR, AFIR, AFM, MEAT, ANCPI)
}

export async function getCountiesCovered(): Promise<number> {
  return 41; // All 41 counties of Romania + Bucharest
}

export async function getProgramsUpdatedRecently(): Promise<number> {
  const programs = await getProgramsFromDb();
  return programs.filter((p) => p.status === "Deschis" || p.status === "În curând").length;
}

export async function getProgramBySlugFromDb(slug: string): Promise<FundingProgram | null> {
  const all = await getProgramsFromDb();
  return all.find((p) => p.slug === slug) || null;
}

export async function getAuditLogsFromDb(): Promise<AuditLogEntity[]> {
  try {
    if (isDatabaseConfigured()) {
      const { data, error } = await supabase
        .from("audit_logs")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        return data as AuditLogEntity[];
      }
    }
  } catch (err) {
    console.warn("[DB Diagnostic] getAuditLogsFromDb exception:", err);
  }

  return [
    {
      id: "log-101",
      programId: "start-up-nation-2025",
      adminUserId: "alex.popescu@subventii.ro",
      action: "UPDATE_DEADLINE",
      changes: { field: "deadline", old: "2026-07-31", new: "2026-08-14" },
      justification: "Prelungire termen conform Ordin MEAT nr. 402/2026",
      createdAt: "2026-07-23T18:30:00Z",
    },
    {
      id: "log-102",
      programId: "pnrr-c9-digitalizare-imm",
      adminUserId: "maria.ionescu@subventii.ro",
      action: "UPDATE_STATUS",
      changes: { field: "status", old: "Opening Soon", new: "Applications Open" },
      justification: "Actualizare status la Sesiune Deschisa conform MIPE",
      createdAt: "2026-07-23T14:15:00Z",
    },
  ];
}

export async function createAuditLogDb(
  programId: string,
  adminUserId: string,
  action: string,
  changes: Record<string, unknown>,
  justification?: string
): Promise<boolean> {
  try {
    if (isDatabaseConfigured()) {
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
    }
    return true;
  } catch {
    return false;
  }
}

export async function getArticlesFromDb(): Promise<ArticleEntity[]> {
  try {
    if (isDatabaseConfigured()) {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("status", "Published")
        .order("published_at", { ascending: false });

      if (!error && data && data.length > 0) return data as ArticleEntity[];
      if (error) console.warn("[DB Diagnostic] getArticlesFromDb query error:", error.message);
    }
  } catch (err) {
    console.warn("[DB Diagnostic] getArticlesFromDb exception:", err);
  }

  return newsroomArticles.map((art, idx) => ({
    id: `art-${idx + 1}`,
    slug: art.slug,
    title: art.headline,
    summary: art.summary,
    contentMd: art.content,
    category: art.category,
    author: art.author || "Cristian Văduva",
    readingTimeMin: art.readingTimeMin || 5,
    impactAnalysis: art.impactAnalysis,
    whoIsAffected: art.whoIsAffected,
    publishedAt: art.publishedAt || "2026-07-20T08:00:00Z",
    updatedAt: art.updatedAt || "2026-07-20T08:00:00Z",
    status: "Published" as const,
  }));
}

export async function getLegislativeChangesFromDb(): Promise<LegislativeChangeEntity[]> {
  try {
    if (isDatabaseConfigured()) {
      const { data, error } = await supabase
        .from("legislative_changes")
        .select("*")
        .order("effective_date", { ascending: false });

      if (!error && data && data.length > 0) return data as LegislativeChangeEntity[];
      if (error) console.warn("[DB Diagnostic] getLegislativeChangesFromDb query error:", error.message);
    }
  } catch (err) {
    console.warn("[DB Diagnostic] getLegislativeChangesFromDb exception:", err);
  }

  return legislationCatalog.map((item, idx) => ({
    id: `leg-${idx + 1}`,
    slug: item.slug,
    title: item.title,
    actType: item.actType,
    actNumber: item.actNumber,
    publicationDate: item.publicationDate,
    effectiveDate: item.effectiveDate,
    summary: item.summary,
    fullTextMd: item.fullTextMd,
    affectedSectors: item.affectedSectors,
    officialSourceUrl: item.officialSourceUrl,
    createdAt: "2026-07-01T00:00:00Z",
    updatedAt: "2026-07-01T00:00:00Z",
  }));
}

export async function getAncpiReportsFromDb(): Promise<AncpiReportEntity[]> {
  try {
    if (isDatabaseConfigured()) {
      const { data, error } = await supabase
        .from("ancpi_monthly_reports")
        .select("*")
        .order("report_month", { ascending: false });

      if (!error && data && data.length > 0) return data as AncpiReportEntity[];
      if (error) console.warn("[DB Diagnostic] getAncpiReportsFromDb query error:", error.message);
    }
  } catch (err) {
    console.warn("[DB Diagnostic] getAncpiReportsFromDb exception:", err);
  }

  return ancpiMonthlyDataset.map((item, idx) => ({
    id: `ancpi-${idx + 1}`,
    reportMonth: "2026-06",
    countyCode: item.countyCode,
    countyName: item.countyName,
    individualUnitsTransacted: item.individualUnitsTransacted,
    landPlotsTransacted: item.landPlotsTransacted,
    totalTransactions: item.totalTransactions,
    avgPriceSqmRon: 7500,
    createdAt: "2026-07-01T00:00:00Z",
  }));
}

export async function getGlossaryTermsFromDb(): Promise<GlossaryTermEntity[]> {
  try {
    if (isDatabaseConfigured()) {
      const { data, error } = await supabase
        .from("glossary_terms")
        .select("*")
        .order("term", { ascending: true });

      if (!error && data && data.length > 0) return data as GlossaryTermEntity[];
      if (error) console.warn("[DB Diagnostic] getGlossaryTermsFromDb query error:", error.message);
    }
  } catch (err) {
    console.warn("[DB Diagnostic] getGlossaryTermsFromDb exception:", err);
  }

  return glossaryCatalog.map((item, idx) => ({
    id: `glos-${idx + 1}`,
    slug: item.slug,
    term: item.term,
    definition: item.definition,
    example: item.example,
    category: item.category,
    relatedLegislation: item.relatedLegislation,
    createdAt: "2026-07-01T00:00:00Z",
  }));
}

export async function getDownloadableResourcesFromDb(): Promise<DownloadableResourceEntity[]> {
  try {
    if (isDatabaseConfigured()) {
      const { data, error } = await supabase
        .from("downloadable_resources")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) return data as DownloadableResourceEntity[];
      if (error) console.warn("[DB Diagnostic] getDownloadableResourcesFromDb query error:", error.message);
    }
  } catch (err) {
    console.warn("[DB Diagnostic] getDownloadableResourcesFromDb exception:", err);
  }

  return downloadableResourcesCatalog.map((item, idx) => ({
    id: `res-${idx + 1}`,
    slug: item.slug,
    title: item.title,
    description: item.description,
    category: item.category,
    fileFormat: item.fileFormat,
    fileSizeMb: item.fileSizeMb,
    downloadUrl: item.downloadUrl,
    createdAt: "2026-07-01T00:00:00Z",
  }));
}

export async function getIngestionQueueFromDb(): Promise<IngestionQueueItemEntity[]> {
  try {
    if (isDatabaseConfigured()) {
      const { data, error } = await supabase
        .from("ingestion_queue")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) return data as IngestionQueueItemEntity[];
      if (error) console.warn("[DB Diagnostic] getIngestionQueueFromDb query error:", error.message);
    }
  } catch (err) {
    console.warn("[DB Diagnostic] getIngestionQueueFromDb exception:", err);
  }

  return sampleIngestionQueue.map((item, idx) => ({
    id: `ingest-${idx + 1}`,
    sourceAuthority: item.sourceAuthority,
    itemType: item.itemType as "Programme" | "Legislation" | "Document",
    rawTitle: item.rawTitle,
    sourceUrl: item.sourceUrl,
    detectedChanges: item.detectedChanges,
    status: item.status,
    createdAt: "2026-07-01T00:00:00Z",
  }));
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

