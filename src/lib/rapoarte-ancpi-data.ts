export type AncpiCountyStat = {
  countyCode: string;
  countyName: string;
  region: string;
  individualUnitsTransacted: number;
  landPlotsTransacted: number;
  totalTransactions: number;
  momChangePct: number;
};

export const ancpiMonthlyDataset: AncpiCountyStat[] = [
  { countyCode: "B", countyName: "București", region: "București-Ilfov", individualUnitsTransacted: 4850, landPlotsTransacted: 1250, totalTransactions: 6100, momChangePct: 4.2 },
  { countyCode: "IF", countyName: "Ilfov", region: "București-Ilfov", individualUnitsTransacted: 1920, landPlotsTransacted: 2450, totalTransactions: 4370, momChangePct: 5.1 },
  { countyCode: "CJ", countyName: "Cluj", region: "Nord-Vest", individualUnitsTransacted: 1540, landPlotsTransacted: 1680, totalTransactions: 3220, momChangePct: 3.8 },
  { countyCode: "BV", countyName: "Brașov", region: "Centru", individualUnitsTransacted: 1420, landPlotsTransacted: 1510, totalTransactions: 2930, momChangePct: 6.2 },
  { countyCode: "TM", countyName: "Timiș", region: "Vest", individualUnitsTransacted: 1380, landPlotsTransacted: 1490, totalTransactions: 2870, momChangePct: 2.9 },
  { countyCode: "IS", countyName: "Iași", region: "Nord-Est", individualUnitsTransacted: 1210, landPlotsTransacted: 1350, totalTransactions: 2560, momChangePct: 3.1 },
  { countyCode: "CT", countyName: "Constanța", region: "Sud-Est", individualUnitsTransacted: 1190, landPlotsTransacted: 1290, totalTransactions: 2480, momChangePct: 4.5 },
  { countyCode: "PH", countyName: "Prahova", region: "Sud-Muntenia", individualUnitsTransacted: 980, landPlotsTransacted: 1120, totalTransactions: 2100, momChangePct: 1.8 },
  { countyCode: "SB", countyName: "Sibiu", region: "Centru", individualUnitsTransacted: 840, landPlotsTransacted: 910, totalTransactions: 1750, momChangePct: 3.4 },
  { countyCode: "BH", countyName: "Bihor", region: "Nord-Vest", individualUnitsTransacted: 890, landPlotsTransacted: 1040, totalTransactions: 1930, momChangePct: 2.7 },
];

export const ancpiReportSummary = {
  reportMonth: "Iulie 2026",
  totalNationalTransactions: 54890,
  topActiveCounty: "București (6.100 tranzacții)",
  nationalMomGrowth: "+3.9%",
  lastUpdated: "2026-08-05",
};
