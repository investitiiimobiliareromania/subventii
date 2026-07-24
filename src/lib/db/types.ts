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
