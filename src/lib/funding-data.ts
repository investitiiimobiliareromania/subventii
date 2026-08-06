export type FundingStatus = "Deschis" | "În curând" | "Închis" | "Suspendat";

export type CompanyAge = "Nou înființată" | "Peste 1 an" | "Peste 2 ani" | "Peste 3 ani" | "Orice vechime";
export type CompanySize = "Microîntreprindere" | "Întreprindere mică" | "Întreprindere mijlocie" | "IMM" | "Întreprindere mare" | "Toate mărimile";
export type BusinessType = "SRL" | "PFA" | "II" | "SA" | "Fermă" | "ONG" | "Toate formele";

export type TimelineStep = {
  label: string;
  date: string;
};

export type FAQ = {
  question: string;
  answer: string;
};

export type FundingProgram = {
  slug: string;
  title: string;
  summary: string;
  status: FundingStatus;
  deadline: string;
  maxFundingRon: number;
  maxFundingEur?: number;
  minFundingRon?: number;
  source: string;
  sourceCategory: "MIPE" | "Minister" | "ADR" | "AFIR" | "AFM" | "PNRR" | "EU";
  businessTypes: string[];
  industries: string[];
  counties: string[];
  companyAge: CompanyAge;
  companySize: CompanySize;
  eligibility: string[];
  documents: string[];
  cofinancing: string;
  officialUrl: string;
  timeline: TimelineStep[];
  faqs: FAQ[];
};

export const filterOptions = {
  business: ["Toate formele", "SRL", "PFA", "II", "SA", "Fermă", "ONG"],
  industry: [
    "Toate domeniile",
    "IT & digital",
    "Agricultură",
    "Producție",
    "Servicii",
    "Turism",
    "Construcții",
    "Sănătate & Mediu",
  ],
  county: [
    "Toate județele",
    "Național",
    "Alba", "Arad", "Argeș", "Bacău", "Bihor", "Bistrița-Năsăud", "Botoșani", "Brașov", "Brăila", "București",
    "Buzău", "Caraș-Severin", "Călărași", "Cluj", "Constanța", "Covasna", "Dâmbovița", "Dolj", "Galați", "Giurgiu",
    "Gorj", "Harghita", "Hunedoara", "Ialomița", "Iași", "Ilfov", "Maramureș", "Mehedinți", "Mureș", "Neamț",
    "Olt", "Prahova", "Satu Mare", "Sălaj", "Sibiu", "Suceava", "Teleorman", "Timiș", "Tulcea", "Vaslui", "Vâlcea", "Vrancea"
  ],
  companyAge: ["Orice vechime", "Nou înființată", "Peste 1 an", "Peste 2 ani", "Peste 3 ani"],
  companySize: ["Toate mărimile", "Microîntreprindere", "Întreprindere mică", "Întreprindere mijlocie", "IMM", "Întreprindere mare"],
  sourceCategory: ["Toate sursele", "MIPE", "Minister", "ADR", "AFIR", "AFM", "PNRR"],
  status: ["Toate statusurile", "Deschis", "În curând", "Închis", "Suspendat"],
};



export function formatCurrencyRon(value: number): string {
  return new Intl.NumberFormat("ro-RO", {
    style: "currency",
    currency: "RON",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatCurrencyEur(value: number): string {
  return new Intl.NumberFormat("ro-RO", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function calculateDaysRemaining(deadlineStr: string): number {
  const deadlineDate = new Date(`${deadlineStr}T23:59:59`);
  const diffTime = deadlineDate.getTime() - Date.now();
  return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
}
