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
  { countyCode: "BC", countyName: "Bacău", region: "Nord-Est", individualUnitsTransacted: 810, landPlotsTransacted: 920, totalTransactions: 1580, totalTransactions2025: 1510, momChangePct: 4.6, momChangePctString: "+4,6%" },
  { countyCode: "PH", countyName: "Prahova", region: "Sud-Muntenia", individualUnitsTransacted: 890, landPlotsTransacted: 960, totalTransactions: 1520, totalTransactions2025: 1490, momChangePct: 2.0, momChangePctString: "+2,0%" },
  { countyCode: "BH", countyName: "Bihor", region: "Nord-Vest", individualUnitsTransacted: 840, landPlotsTransacted: 910, totalTransactions: 1490, totalTransactions2025: 1420, momChangePct: 4.9, momChangePctString: "+4,9%" },
  { countyCode: "AG", countyName: "Argeș", region: "Sud-Muntenia", individualUnitsTransacted: 720, landPlotsTransacted: 830, totalTransactions: 1410, totalTransactions2025: 1380, momChangePct: 2.2, momChangePctString: "+2,2%" },
  { countyCode: "DJ", countyName: "Dolj", region: "Sud-Vest Oltenia", individualUnitsTransacted: 690, landPlotsTransacted: 790, totalTransactions: 1390, totalTransactions2025: 1340, momChangePct: 3.7, momChangePctString: "+3,7%" },
  { countyCode: "GL", countyName: "Galați", region: "Sud-Est", individualUnitsTransacted: 640, landPlotsTransacted: 710, totalTransactions: 1280, totalTransactions2025: 1220, momChangePct: 4.9, momChangePctString: "+4,9%" },
  { countyCode: "SB", countyName: "Sibiu", region: "Centru", individualUnitsTransacted: 710, landPlotsTransacted: 770, totalTransactions: 1250, totalTransactions2025: 1290, momChangePct: -3.1, momChangePctString: "−3,1%" },
  { countyCode: "MS", countyName: "Mureș", region: "Centru", individualUnitsTransacted: 630, landPlotsTransacted: 720, totalTransactions: 1220, totalTransactions2025: 1180, momChangePct: 3.4, momChangePctString: "+3,4%" },
  { countyCode: "AR", countyName: "Arad", region: "Vest", individualUnitsTransacted: 610, landPlotsTransacted: 690, totalTransactions: 1190, totalTransactions2025: 1150, momChangePct: 3.5, momChangePctString: "+3,5%" },
  { countyCode: "NT", countyName: "Neamț", region: "Nord-Est", individualUnitsTransacted: 540, landPlotsTransacted: 640, totalTransactions: 1140, totalTransactions2025: 1090, momChangePct: 4.6, momChangePctString: "+4,6%" },
  { countyCode: "AB", countyName: "Alba", region: "Centru", individualUnitsTransacted: 520, landPlotsTransacted: 630, totalTransactions: 1120, totalTransactions2025: 1080, momChangePct: 3.7, momChangePctString: "+3,7%" },
  { countyCode: "DB", countyName: "Dâmbovița", region: "Sud-Muntenia", individualUnitsTransacted: 490, landPlotsTransacted: 610, totalTransactions: 1060, totalTransactions2025: 1020, momChangePct: 3.9, momChangePctString: "+3,9%" },
  { countyCode: "MM", countyName: "Maramureș", region: "Nord-Vest", individualUnitsTransacted: 510, landPlotsTransacted: 590, totalTransactions: 1040, totalTransactions2025: 1010, momChangePct: 3.0, momChangePctString: "+3,0%" },
  { countyCode: "BR", countyName: "Brăila", region: "Sud-Est", individualUnitsTransacted: 430, landPlotsTransacted: 520, totalTransactions: 920, totalTransactions2025: 890, momChangePct: 3.4, momChangePctString: "+3,4%" },
  { countyCode: "BZ", countyName: "Buzău", region: "Sud-Est", individualUnitsTransacted: 420, landPlotsTransacted: 510, totalTransactions: 910, totalTransactions2025: 880, momChangePct: 3.4, momChangePctString: "+3,4%" },
  { countyCode: "OT", countyName: "Olt", region: "Sud-Vest Oltenia", individualUnitsTransacted: 390, landPlotsTransacted: 480, totalTransactions: 860, totalTransactions2025: 830, momChangePct: 3.6, momChangePctString: "+3,6%" },
  { countyCode: "SM", countyName: "Satu Mare", region: "Nord-Vest", individualUnitsTransacted: 380, landPlotsTransacted: 460, totalTransactions: 830, totalTransactions2025: 800, momChangePct: 3.8, momChangePctString: "+3,8%" },
  { countyCode: "HD", countyName: "Hunedoara", region: "Vest", individualUnitsTransacted: 410, landPlotsTransacted: 440, totalTransactions: 820, totalTransactions2025: 850, momChangePct: -3.5, momChangePctString: "−3,5%" },
  { countyCode: "VN", countyName: "Vrancea", region: "Sud-Est", individualUnitsTransacted: 360, landPlotsTransacted: 450, totalTransactions: 790, totalTransactions2025: 760, momChangePct: 3.9, momChangePctString: "+3,9%" },
  { countyCode: "BT", countyName: "Botoșani", region: "Nord-Est", individualUnitsTransacted: 340, landPlotsTransacted: 430, totalTransactions: 760, totalTransactions2025: 730, momChangePct: 4.1, momChangePctString: "+4,1%" },
  { countyCode: "VL", countyName: "Vâlcea", region: "Sud-Vest Oltenia", individualUnitsTransacted: 350, landPlotsTransacted: 420, totalTransactions: 750, totalTransactions2025: 720, momChangePct: 4.2, momChangePctString: "+4,2%" },
  { countyCode: "BN", countyName: "Bistrița-Năsăud", region: "Nord-Vest", individualUnitsTransacted: 330, landPlotsTransacted: 410, totalTransactions: 730, totalTransactions2025: 700, momChangePct: 4.3, momChangePctString: "+4,3%" },
  { countyCode: "GJ", countyName: "Gorj", region: "Sud-Vest Oltenia", individualUnitsTransacted: 310, landPlotsTransacted: 390, totalTransactions: 690, totalTransactions2025: 670, momChangePct: 3.0, momChangePctString: "+3,0%" },
  { countyCode: "CL", countyName: "Călărași", region: "Sud-Muntenia", individualUnitsTransacted: 280, landPlotsTransacted: 380, totalTransactions: 640, totalTransactions2025: 620, momChangePct: 3.2, momChangePctString: "+3,2%" },
  { countyCode: "TR", countyName: "Teleorman", region: "Sud-Muntenia", individualUnitsTransacted: 260, landPlotsTransacted: 370, totalTransactions: 620, totalTransactions2025: 600, momChangePct: 3.3, momChangePctString: "+3,3%" },
  { countyCode: "GR", countyName: "Giurgiu", region: "Sud-Muntenia", individualUnitsTransacted: 250, landPlotsTransacted: 360, totalTransactions: 600, totalTransactions2025: 580, momChangePct: 3.4, momChangePctString: "+3,4%" },
  { countyCode: "VS", countyName: "Vaslui", region: "Nord-Est", individualUnitsTransacted: 270, landPlotsTransacted: 340, totalTransactions: 590, totalTransactions2025: 570, momChangePct: 3.5, momChangePctString: "+3,5%" },
  { countyCode: "IL", countyName: "Ialomița", region: "Sud-Muntenia", individualUnitsTransacted: 240, landPlotsTransacted: 330, totalTransactions: 560, totalTransactions2025: 540, momChangePct: 3.7, momChangePctString: "+3,7%" },
  { countyCode: "SJ", countyName: "Sălaj", region: "Nord-Vest", individualUnitsTransacted: 230, landPlotsTransacted: 310, totalTransactions: 530, totalTransactions2025: 510, momChangePct: 3.9, momChangePctString: "+3,9%" },
  { countyCode: "TL", countyName: "Tulcea", region: "Sud-Est", individualUnitsTransacted: 220, landPlotsTransacted: 290, totalTransactions: 500, totalTransactions2025: 480, momChangePct: 4.2, momChangePctString: "+4,2%" },
  { countyCode: "HR", countyName: "Harghita", region: "Centru", individualUnitsTransacted: 210, landPlotsTransacted: 270, totalTransactions: 470, totalTransactions2025: 450, momChangePct: 4.4, momChangePctString: "+4,4%" },
  { countyCode: "MH", countyName: "Mehedinți", region: "Sud-Vest Oltenia", individualUnitsTransacted: 190, landPlotsTransacted: 260, totalTransactions: 440, totalTransactions2025: 430, momChangePct: 2.3, momChangePctString: "+2,3%" },
  { countyCode: "CS", countyName: "Caraș-Severin", region: "Vest", individualUnitsTransacted: 180, landPlotsTransacted: 240, totalTransactions: 410, totalTransactions2025: 400, momChangePct: 2.5, momChangePctString: "+2,5%" },
  { countyCode: "CV", countyName: "Covasna", region: "Centru", individualUnitsTransacted: 150, landPlotsTransacted: 210, totalTransactions: 350, totalTransactions2025: 340, momChangePct: 2.9, momChangePctString: "+2,9%" },
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
