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
  { countyCode: "IF", countyName: "Ilfov", region: "București-Ilfov", individualUnitsTransacted: 1920, landPlotsTransacted: 2450, totalTransactions: 2234, totalTransactions2025: 2265, momChangePct: -1.4, momChangePctString: "−1,4%" },
  { countyCode: "TM", countyName: "Timiș", region: "Vest", individualUnitsTransacted: 1380, landPlotsTransacted: 1490, totalTransactions: 3165, totalTransactions2025: 2371, momChangePct: 33.5, momChangePctString: "+33,5%", badge: "CREȘTERE ACCELERATĂ" },
  { countyCode: "IS", countyName: "Iași", region: "Nord-Est", individualUnitsTransacted: 1210, landPlotsTransacted: 1350, totalTransactions: 2540, totalTransactions2025: 2313, momChangePct: 9.8, momChangePctString: "+9,8%" },
  { countyCode: "CJ", countyName: "Cluj", region: "Nord-Vest", individualUnitsTransacted: 1540, landPlotsTransacted: 1680, totalTransactions: 2074, totalTransactions2025: 2215, momChangePct: -6.4, momChangePctString: "−6,4%" },
  { countyCode: "CT", countyName: "Constanța", region: "Sud-Est", individualUnitsTransacted: 1190, landPlotsTransacted: 1290, totalTransactions: 3971, totalTransactions2025: 4011, momChangePct: -1.0, momChangePctString: "−1,0%" },
  { countyCode: "BV", countyName: "Brașov", region: "Centru", individualUnitsTransacted: 1420, landPlotsTransacted: 1510, totalTransactions: 1735, totalTransactions2025: 2372, momChangePct: -26.9, momChangePctString: "−26,9%", badge: "CEA MAI MARE SCĂDERE" },
  { countyCode: "SV", countyName: "Suceava", region: "Nord-Est", individualUnitsTransacted: 980, landPlotsTransacted: 1120, totalTransactions: 1850, totalTransactions2025: 1790, momChangePct: 3.4, momChangePctString: "+3,4%" },
];

export const ancpiReportSummary = {
  reportMonth: "Iunie 2026",
  totalNationalTransactions: 51808,
  totalNationalTransactions2025: 49193,
  topActiveCounty: "București (10.398 tranzacții)",
  nationalMomGrowth: "+5,3%",
  lastUpdated: "2026-06-30",
};

