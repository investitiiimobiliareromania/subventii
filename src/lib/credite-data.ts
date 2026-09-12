export type CreditCategory = "Ipotecar" | "Noua Casă" | "Investiții IMM" | "Credite IMM" | "Refinanțare" | "IRCC" | "ROBOR";

export type CreditProduct = {
  id: string;
  category: CreditCategory;
  title: string;
  summary: string;
  interestRateType: "Fixă" | "Variabilă" | "Mixtă";
  approximateRate: string;
  minDownPayment: string;
  maxTermYears: number;
  eligibilitySummary: string;
  officialSource: string;
};

export const creditProducts: CreditProduct[] = [
  {
    id: "cred-ipote-fix",
    category: "Ipotecar",
    title: "Credit Ipotecar cu Dobândă Fixă 3-5 Ani",
    summary: "Siguranța ratelor lunare constante pentru primii 3 sau 5 ani, urmată de marjă fixă peste indicele IRCC.",
    interestRateType: "Mixtă",
    approximateRate: "5,45% fix primii 3 ani",
    minDownPayment: "15%",
    maxTermYears: 30,
    eligibilitySummary: "Venituri sigure dovedite prin raportare ANAF, fără înregistrări în Biroul de Credit.",
    officialSource: "Banca Națională a României (BNR)",
  },
  {
    id: "cred-noua-casa",
    category: "Noua Casă",
    title: "Credit Ipotecar Noua Casă 2026",
    summary: "Credit garantat de stat până la 60% cu avans minim de 5% și marjă de dobândă de doar IRCC + 2,00%.",
    interestRateType: "Variabilă",
    approximateRate: "IRCC + 2,00%",
    minDownPayment: "5%",
    maxTermYears: 30,
    eligibilitySummary: "Persoane fizice fără altă locuință peste 50 mp, avans 5% sau 15% în funcție de preț.",
    officialSource: "FNGCIMM",
  },
  {
    id: "cred-invest-imm",
    category: "Investiții IMM",
    title: "Credit de Investiții IMM cu Garanție EIF / FNGCIMM",
    summary: "Finanțări de până la 10.000.000 RON pentru achiziția de linii de producție, hale și parc auto ecologic.",
    interestRateType: "Variabilă",
    approximateRate: "ROBOR / IRCC + 1,75%",
    minDownPayment: "10%",
    maxTermYears: 10,
    eligibilitySummary: "IMM-uri cu minimum 2 ani de activitate și profit operațional pozitiv (EBITDA).",
    officialSource: "Ministerul Finanțelor",
  },
];

export const referenceIndicesHistory = {
  currentIrcc: 5.56,
  irccFormatted: "IRCC — 5,56%, aplicabil în T3 2026",
  calculationPeriod: "Media zilnică a tranzacțiilor interbancare din T1 2026",
  applicablePeriod: "T3 2026 (iulie – septembrie 2026)",
  officialBnrSource: "Banca Națională a României (BNR) — Indicele de referință pentru creditele consumatorilor (IRCC) conform OUG 19/2019",
  officialUrl: "https://www.bnr.ro/Indicele-de-referinta-pentru-creditele-consumatorilor-(IRCC)-22285.aspx",
  lastVerifiedDate: "2026-09-12",
  currentRobor3m: 5.84,
  currentRobor6m: 5.92,
  robor3mFormatted: "ROBOR 3M — 5,84% — ultima cotație disponibilă: 11.09.2026",
  robor6mFormatted: "ROBOR 6M — 5,92% — ultima cotație disponibilă: 11.09.2026",
  roborQuotationDate: "11.09.2026 (zi bancară lucrătoare BNR)",
  lastUpdated: "2026-09-12",
};
