export type InfrastructureSector = 
  | "Transport Rutier & Autostrăzi"
  | "Transport Feroviar"
  | "Energie & Rețele Inteligente"
  | "Apă & Gospodărirea Apelor"
  | "Infrastructură Digitală"
  | "Sănătate & Spitale Regionale";

export type MajorInfrastructureProject = {
  id: string;
  name: string;
  sector: InfrastructureSector;
  region: string;
  countiesInvolved: string[];
  totalBudgetRon: string;
  totalBudgetEur: string;
  fundingSource: string;
  beneficiaryAuthority: string;
  status: "În Execuție" | "În Licitație" | "Proiectare" | "Finalizat Parțial";
  expectedCompletion: string;
  description: string;
  officialSourceUrl: string;
  lastVerifiedAt: string;
};

export const MAJOR_INFRASTRUCTURE_PROJECTS: MajorInfrastructureProject[] = [
  {
    id: "autostrada-moldovei-a7",
    name: "Autostrada Moldovei (A7) — Ploiești - Buzău - Focșani - Bacău - Pașcani",
    sector: "Transport Rutier & Autostrăzi",
    region: "Sud-Muntenia & Nord-Est",
    countiesInvolved: ["Prahova", "Buzău", "Vrancea", "Bacău", "Neamț", "Iași"],
    totalBudgetRon: "31,8 miliarde RON",
    totalBudgetEur: "6,4 miliarde EUR",
    fundingSource: "PNRR (Planul Național de Redresare și Reziliență) & Programul Transport",
    beneficiaryAuthority: "CNAIR (Compania Națională de Administrare a Infrastructurii Rutiere)",
    status: "În Execuție",
    expectedCompletion: "2026 - 2027",
    description: "Cea mai mare investiție rutieră derulată simultan în România, acoperind peste 320 km de autostradă pentru conectarea regiunii istorice Moldova cu rețeaua europeană TEN-T.",
    officialSourceUrl: "https://www.cnadnr.ro",
    lastVerifiedAt: "2026-10-01",
  },
  {
    id: "autostrada-unirii-a8",
    name: "Autostrada Unirii (A8) — Târgu Mureș - Miercurea Nirajului - Leghin - Târgu Neamț",
    sector: "Transport Rutier & Autostrăzi",
    region: "Centru & Nord-Est",
    countiesInvolved: ["Mureș", "Harghita", "Neamț", "Iași"],
    totalBudgetRon: "24,5 miliarde RON",
    totalBudgetEur: "4,9 miliarde EUR",
    fundingSource: "PNRR & Programul Transport 2021-2027",
    beneficiaryAuthority: "CNIR (Compania Națională de Investiții Rutiere)",
    status: "În Execuție",
    expectedCompletion: "2028 - 2030",
    description: "Traversarea montană a Carpaților Orientali pentru conectarea Moldovei cu Transilvania și coridorul pan-european.",
    officialSourceUrl: "https://cnir.ro",
    lastVerifiedAt: "2026-10-01",
  },
  {
    id: "modernizare-cf-caransebes-timisoara-arad",
    name: "Modernizare Linie Cale Ferată Caransebeș - Timișoara - Arad (162 km)",
    sector: "Transport Feroviar",
    region: "Vest",
    countiesInvolved: ["Caraș-Severin", "Timiș", "Arad"],
    totalBudgetRon: "8,7 miliarde RON",
    totalBudgetEur: "1,75 miliarde EUR",
    fundingSource: "PNRR & Programul Transport",
    beneficiaryAuthority: "CFR SA",
    status: "În Execuție",
    expectedCompletion: "2026 - 2027",
    description: "Dublare și electrificare completă a căii ferate pentru viteze de circulație de 160 km/h la trenurile de călători și 120 km/h la marfă pe coridorul Rin-Dunăre.",
    officialSourceUrl: "https://www.cfr.ro",
    lastVerifiedAt: "2026-10-01",
  },
  {
    id: "retele-apa-canal-pdd",
    name: "Extinderea și Modernizarea Infrastructurii de Apă și Apă Uzată în 24 de Județe",
    sector: "Apă & Gospodărirea Apelor",
    region: "Național",
    countiesInvolved: ["Cluj", "Timiș", "Iași", "Bacău", "Argeș", "Dolj", "Constanța", "Suceava"],
    totalBudgetRon: "18,2 miliarde RON",
    totalBudgetEur: "3,65 miliarde EUR",
    fundingSource: "Programul Dezvoltare Durabilă (PDD 2021-2027)",
    beneficiaryAuthority: "Operatorii Regionali de Apă-Canal (ROC) & UAT-uri",
    status: "În Execuție",
    expectedCompletion: "2027 - 2029",
    description: "Construcția a mii de kilometri de rețele de distribuție a apei potabile și stații moderne de epurare a apelor uzate conform Directivelor UE.",
    officialSourceUrl: "https://mfe.gov.ro/programe/programul-dezvoltare-durabila-pdd/",
    lastVerifiedAt: "2026-10-01",
  },
  {
    id: "retele-electrice-modernizare",
    name: "Modernizarea Rețelei Naționale de Transport Energie & Interconectare Regională",
    sector: "Energie & Rețele Inteligente",
    region: "Național",
    countiesInvolved: ["Constanța", "Tulcea", "Călărași", "Prahova", "Brașov", "Arad"],
    totalBudgetRon: "4,9 miliarde RON",
    totalBudgetEur: "980 milioane EUR",
    fundingSource: "Fondul pentru Modernizare (Modernisation Fund UE) & PNRR",
    beneficiaryAuthority: "CNTEE Transelectrica SA",
    status: "În Execuție",
    expectedCompletion: "2026 - 2028",
    description: "Trecerea la tensiunea de 400 kV a axului de transport Dobrogea - Transilvania și întărirea capacității de preluare a energiei din noile parcuri eoliene și fotovoltaice.",
    officialSourceUrl: "https://www.transelectrica.ro",
    lastVerifiedAt: "2026-10-01",
  },
  {
    id: "spitale-regionale-iasi-cluj-craiova",
    name: "Construcția Spitalelor Regionale de Urgență (Iași, Cluj-Napoca, Craiova)",
    sector: "Sănătate & Spitale Regionale",
    region: "Nord-Est, Nord-Vest, Sud-Vest",
    countiesInvolved: ["Iași", "Cluj", "Dolj"],
    totalBudgetRon: "9,6 miliarde RON",
    totalBudgetEur: "1,92 miliarde EUR",
    fundingSource: "Programul Sănătate (PS 2021-2027) & Împrumuturi BEI",
    beneficiaryAuthority: "Ministerul Sănătății / Agenția Națională pentru Dezvoltarea Infrastructurii în Sănătate (ANDIS)",
    status: "În Execuție",
    expectedCompletion: "2028",
    description: "Construirea a 3 spitale regionale de urgență ultramoderne cu o capacitate combinată de peste 2.500 de paturi și tehnologie medicală de nivel terțiar.",
    officialSourceUrl: "https://andis.gov.ro",
    lastVerifiedAt: "2026-10-01",
  },
];

export const SICAP_PROCUREMENT_GUIDELINES = {
  title: "Ghidul Oficial al Achizițiilor Publice pentru Firme & IMM-uri",
  platformName: "Sistemul Informatic Colaborativ pentru Achiziții Publice (SICAP / SEAP)",
  officialPortal: "https://www.e-licitatie.ro",
  regulatoryBody: "Agenția Națională pentru Achiziții Publice (ANAP)",
  directPurchaseThresholds: [
    { type: "Produse și Servicii", thresholdRon: "270.120 RON fără TVA (~54.000 EUR)", lawArticle: "Art. 7 alin. (5) din Legea 98/2016 actualizată" },
    { type: "Lucrări de Construcții", thresholdRon: "900.400 RON fără TVA (~180.000 EUR)", lawArticle: "Art. 7 alin. (5) din Legea 98/2016 actualizată" },
  ],
  keyStepsForSuppliers: [
    "Înregistrarea operatorului economic în platforma SEAP (certificat digital calificat).",
    "Completarea Documentului Unic de Achiziție European (DUAE) în format electronic.",
    "Catalogul electronic de produse/servicii: încărcarea ofertelor standardizate pentru achiziții directe.",
    "Garanția de participare: constituire prin scrisoare de garanție bancară sau poliță de asigurare de garanție.",
    "Depunerea ofertelor tehnico-financiare criptate înainte de data limită a procedurii.",
  ],
};
