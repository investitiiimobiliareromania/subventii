export type LifecycleStatus = 
  | "Draft"
  | "Public Consultation"
  | "Official Guide Approved"
  | "Opening Soon"
  | "Applications Open"
  | "Call Suspended"
  | "Call Closed"
  | "Evaluation Stage"
  | "Contracting"
  | "Archived";

export type PaymentMechanism = "Pre-finanțare" | "Decontare" | "Mixt";
export type DocCategory = "Ghid Principal" | "Anexă" | "Corrigendum" | "Clarificare" | "Ordin Oficial";
export type CompanyAge = "Orice vechime" | "Nou înființată" | "Peste 1 an" | "Peste 2 ani" | "Peste 3 ani";
export type CompanySize = "Microîntreprindere" | "Întreprindere mică" | "Întreprindere mijlocie" | "IMM" | "Întreprindere mare" | "Toate mărimile";

export type InstitutionEntity = {
  id: string;
  slug: string;
  name: string;
  acronym: string;
  officialDomain: string;
  supportEmail?: string;
  createdAt: string;
  updatedAt: string;
};

export type FundingProgramEntity = {
  id: string;
  slug: string;
  title: string;
  acronym?: string;
  shortSummary: string;
  overviewMd: string;
  institutionId: string;
  status: LifecycleStatus;
  totalBudgetEur?: number;
  minScoreRequired?: number;
  companyAge: CompanyAge;
  companySize: CompanySize;
  paymentMechanism: PaymentMechanism;
  deMinimisFlag: boolean;
  allCaenEligible: boolean;
  nationalCoverage: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
};

export type ProgramCallEntity = {
  id: string;
  programId: string;
  editionName: string;
  consultationDate?: string;
  publishedDate?: string;
  launchDate?: string;
  deadlineDate: string;
  maxFundingRon: number;
  maxFundingEur?: number;
  minFundingRon?: number;
  cofinancingPercentage: number;
  allocatedBudgetRon?: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CaenCodeEntity = {
  code: string;
  name: string;
  section: string;
  sectionName: string;
};

export type OfficialDocumentEntity = {
  id: string;
  programId: string;
  title: string;
  category: DocCategory;
  currentVersion: string;
  fileUrl: string;
  fileHashSha256: string;
  fileSizeBytes: number;
  createdAt: string;
  updatedAt: string;
};

export type AuditLogEntity = {
  id: string;
  programId?: string;
  adminUserId: string;
  action: string;
  changes: Record<string, unknown>;
  justification?: string;
  createdAt: string;
};

export type ArticleEntity = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  contentMd: string;
  category: string;
  author: string;
  readingTimeMin: number;
  impactAnalysis?: string;
  whoIsAffected?: string;
  officialDocuments?: { title: string; url: string }[];
  institutionId?: string;
  publishedAt: string;
  updatedAt: string;
  status: "Draft" | "Review" | "Approved" | "Published" | "Archived";
};

export type LegislativeChangeEntity = {
  id: string;
  slug: string;
  title: string;
  actType: "OUG" | "HG" | "Lege" | "Ordin";
  actNumber: string;
  publicationDate: string;
  effectiveDate: string;
  summary: string;
  fullTextMd: string;
  affectedSectors: string[];
  officialSourceUrl: string;
  createdAt: string;
  updatedAt: string;
};

export type AncpiReportEntity = {
  id: string;
  reportMonth: string;
  countyCode: string;
  countyName: string;
  individualUnitsTransacted: number;
  landPlotsTransacted: number;
  totalTransactions: number;
  avgPriceSqmRon?: number;
  createdAt: string;
};

export type GlossaryTermEntity = {
  id: string;
  slug: string;
  term: string;
  definition: string;
  example?: string;
  category: string;
  relatedLegislation?: string[];
  createdAt: string;
};

export type DownloadableResourceEntity = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  fileFormat: string;
  fileSizeMb: number;
  downloadUrl: string;
  createdAt: string;
};

export type IngestionQueueItemEntity = {
  id: string;
  sourceAuthority: string;
  itemType: "Programme" | "Legislation" | "Document";
  rawTitle: string;
  sourceUrl: string;
  detectedChanges: Record<string, unknown>;
  status: "Pending Approval" | "Approved" | "Rejected";
  createdAt: string;
};
