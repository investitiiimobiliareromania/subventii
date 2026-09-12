export type AncpiCountyStat = {
  countyCode: string;
  countyName: string;
  region: string;
  individualUnitsTransacted: number;
  landPlotsTransacted: number;
  totalTransactions: number;
  momChangePct: number;
  totalTransactions2025?: number;
  momChangePctString?: string;
  badge?: string;
};

export const ancpiMonthlyDataset: AncpiCountyStat[] = [
  { countyCode: "B", countyName: "București", region: "București-Ilfov", individualUnitsTransacted: 4850, landPlotsTransacted: 1250, totalTransactions: 10398, totalTransactions2025: 7662, momChangePct: 35.7, momChangePctString: "+35,7%", badge: "LIDER NAȚIONAL" },
  { countyCode: "IF", countyName: "Ilfov", region: "București-Ilfov", individualUnitsTransacted: 1920, landPlotsTransacted: 2450, totalTransactions: 3971, totalTransactions2025: 4011, momChangePct: -1.0, momChangePctString: "−1,0%", badge: "LOCUL 2 NAȚIONAL" },
  { countyCode: "TM", countyName: "Timiș", region: "Vest", individualUnitsTransacted: 1380, landPlotsTransacted: 1490, totalTransactions: 3165, totalTransactions2025: 2371, momChangePct: 33.5, momChangePctString: "+33,5%", badge: "LOCUL 3 NAȚIONAL" },
  { countyCode: "IS", countyName: "Iași", region: "Nord-Est", individualUnitsTransacted: 1210, landPlotsTransacted: 1350, totalTransactions: 2540, totalTransactions2025: 2313, momChangePct: 9.8, momChangePctString: "+9,8%" },
  { countyCode: "CT", countyName: "Constanța", region: "Sud-Est", individualUnitsTransacted: 1190, landPlotsTransacted: 1290, totalTransactions: 2234, totalTransactions2025: 2265, momChangePct: -1.4, momChangePctString: "−1,4%" },
  { countyCode: "CJ", countyName: "Cluj", region: "Nord-Vest", individualUnitsTransacted: 1540, landPlotsTransacted: 1680, totalTransactions: 2074, totalTransactions2025: 2215, momChangePct: -6.4, momChangePctString: "−6,4%" },
  { countyCode: "SV", countyName: "Suceava", region: "Nord-Est", individualUnitsTransacted: 980, landPlotsTransacted: 1120, totalTransactions: 1850, totalTransactions2025: 1790, momChangePct: 3.4, momChangePctString: "+3,4%" },
  { countyCode: "BV", countyName: "Brașov", region: "Centru", individualUnitsTransacted: 1420, landPlotsTransacted: 1510, totalTransactions: 1735, totalTransactions2025: 2372, momChangePct: -26.9, momChangePctString: "−26,9%", badge: "CEA MAI MARE SCĂDERE" },
];

export const ancpiReportSummary = {
  reportMonth: "Iunie 2026",
  referencePeriod: "Iunie 2026 (Ultimul buletin statistic oficial publicat)",
  officialMetric: "Imobile vândute înregistrate în cartea funciară",
  totalNationalTransactions: 51808,
  totalNationalTransactions2025: 49193,
  topActiveCounty: "București (10.398 imobile vândute), urmat de Ilfov (3.971) și Timiș (3.165)",
  nationalMomGrowth: "+5,3%",
  lastUpdated: "2026-09-12",
  sourceName: "Agenția Națională de Cadastru și Publicitate Imobiliară (ANCPI)",
  sourceDocument: "BUCUREȘTI, 03.07.2026 – STATISTICĂ TRANZACȚII IMOBILIARE LUNA IUNIE 2026",
  sourceTable: "Tabelul 1: Numărul de imobile vândute la nivel național și pe județe — Iunie 2026",
  sourceUrl: "https://www.ancpi.ro/statistici-imobiliare/",
  operationalStatus2026: {
    systemName: "e-Terra / ANCPI",
    event: "Reactivare funcționalitate 'Link de plată' și situație operațională",
    reactivationDate: "20 August 2026",
    periodImpacted: "11–19 August 2026",
    requestsRegistered: 329476,
    requestsSolved: 279242,
    currentStatus: "Funcționalitatea 'Link de plată' din cadrul sistemului informatic e-Terra a fost reactivată pe 20 August 2026. În perioada 11–19 august 2026 au fost recepționate 329.476 de cereri și soluționate 279.242 de dosare. Celelalte platforme și servicii online ANCPI urmează a fi repuse în funcțiune etapizat.",
    augustStatisticsStatus: "La data auditului, 12 septembrie 2026, statisticile oficiale ANCPI pentru luna august 2026 nu sunt afișate/publicate pe portalul oficial verificat.",
    officialSourceDoc: "Comunicat Oficial ANCPI — 20 August 2026"
  }
};
