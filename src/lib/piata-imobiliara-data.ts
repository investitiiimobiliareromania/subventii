export type RealEstateSegment = "Residential" | "Commercial" | "Industrial" | "Luxury";

export type CityPriceReport = {
  city: string;
  county: string;
  avgAskingPriceSqm: number; // Preț mediu cerut (asking price) €/mp util
  yoyAskingPriceGrowthPct: number; // Creștere anuală a prețului cerut
  newBuildingsAskingPriceSqm: number; // Blocuri noi €/mp util
  oldBuildingsAskingPriceSqm: number; // Blocuri vechi €/mp util
  estimatedGrossRentalYieldPct: number; // Randament mediu brut din chirie (%/an)
  ancpiJune2026Transactions: number; // Imobile tranzacționate ANCPI Iunie 2026 (Tabelul 1)
  marketNote: string;
  sourceAttribution: string;
};

export const realEstateCityReports: CityPriceReport[] = [
  {
    city: "Cluj-Napoca",
    county: "Cluj",
    avgAskingPriceSqm: 2750,
    yoyAskingPriceGrowthPct: 8.5,
    newBuildingsAskingPriceSqm: 2950,
    oldBuildingsAskingPriceSqm: 2600,
    estimatedGrossRentalYieldPct: 5.8,
    ancpiJune2026Transactions: 2074,
    marketNote: "Cea mai scumpă piață rezidențială din țară, susținută de sectorul IT și cererea universitară.",
    sourceAttribution: "Preț cerut: Indicele Imobiliare.ro (Sem. I 2026); Imobile tranzacționate județ: ANCPI (Iunie 2026, Tabelul 1)",
  },
  {
    city: "București",
    county: "București",
    avgAskingPriceSqm: 1890,
    yoyAskingPriceGrowthPct: 7.2,
    newBuildingsAskingPriceSqm: 2150,
    oldBuildingsAskingPriceSqm: 1720,
    estimatedGrossRentalYieldPct: 6.4,
    ancpiJune2026Transactions: 10398,
    marketNote: "Cea mai mare piață imobiliară din România ca volum de tranzacții și fond de locuințe.",
    sourceAttribution: "Preț cerut: Indicele Imobiliare.ro (Sem. I 2026); Imobile tranzacționate: ANCPI (Iunie 2026, Tabelul 1)",
  },
  {
    city: "Brașov",
    county: "Brașov",
    avgAskingPriceSqm: 1920,
    yoyAskingPriceGrowthPct: 9.1,
    newBuildingsAskingPriceSqm: 2080,
    oldBuildingsAskingPriceSqm: 1780,
    estimatedGrossRentalYieldPct: 6.1,
    ancpiJune2026Transactions: 1735,
    marketNote: "Creștere constantă susținută de turism, dezvoltarea infrastructurii de transport și atractivitatea montană.",
    sourceAttribution: "Preț cerut: Indicele Imobiliare.ro (Sem. I 2026); Imobile tranzacționate județ: ANCPI (Iunie 2026, Tabelul 1)",
  },
  {
    city: "Timișoara",
    county: "Timiș",
    avgAskingPriceSqm: 1640,
    yoyAskingPriceGrowthPct: 6.3,
    newBuildingsAskingPriceSqm: 1780,
    oldBuildingsAskingPriceSqm: 1520,
    estimatedGrossRentalYieldPct: 6.6,
    ancpiJune2026Transactions: 3165,
    marketNote: "Pol industrial și tehnologic regional; randamente atractive pe segmentul închirierilor pentru angajați.",
    sourceAttribution: "Preț cerut: Indicele Imobiliare.ro (Sem. I 2026); Imobile tranzacționate județ: ANCPI (Iunie 2026, Tabelul 1)",
  },
  {
    city: "Iași",
    county: "Iași",
    avgAskingPriceSqm: 1550,
    yoyAskingPriceGrowthPct: 6.8,
    newBuildingsAskingPriceSqm: 1690,
    oldBuildingsAskingPriceSqm: 1440,
    estimatedGrossRentalYieldPct: 6.7,
    ancpiJune2026Transactions: 2540,
    marketNote: "Pol universitar și IT major din regiunea Moldovei; cerere stabilă pe segmentul apartamentelor de 1-2 camere.",
    sourceAttribution: "Preț cerut: Indicele Imobiliare.ro (Sem. I 2026); Imobile tranzacționate județ: ANCPI (Iunie 2026, Tabelul 1)",
  },
  {
    city: "Constanța",
    county: "Constanța",
    avgAskingPriceSqm: 1710,
    yoyAskingPriceGrowthPct: 7.9,
    newBuildingsAskingPriceSqm: 1880,
    oldBuildingsAskingPriceSqm: 1590,
    estimatedGrossRentalYieldPct: 6.2,
    ancpiJune2026Transactions: 2234,
    marketNote: "Piață rezidențială dinamică pe litoral, cu pondere ridicată a investițiilor în proprietăți de vacanță.",
    sourceAttribution: "Preț cerut: Indicele Imobiliare.ro (Sem. I 2026); Imobile vândute județ: ANCPI (Iunie 2026, Tabelul 1)",
  },
];

export const realEstateMarketMacro = {
  referencePeriod: "Septembrie 2026 (Date Sem. I 2026 + Context Curent)",
  irccIndex: "IRCC — 5,56%, aplicabil în T3 2026",
  irccNote: "Indicele de referință pentru creditele consumatorilor (IRCC) reglementat de OUG 19/2019, calculat trimestrial de BNR pe baza mediei zilnice a tranzacțiilor interbancare din T1 2026 și aplicabil în contractele de credit cu dobândă variabilă pe durata Trimestrului 3 2026 (iulie–septembrie 2026). Sursă oficială: Banca Națională a României (https://www.bnr.ro/Indicele-de-referinta-pentru-creditele-consumatorilor-(IRCC)-22285.aspx).",
  vatThresholdNote: "Regim Fiscal TVA: Cota standard generală de TVA este de 21% (conform legislației fiscale actualizate ANAF / Ministerul Finanțelor). Regimul tranzitoriu de 9% aplicabil livrărilor de locuințe în baza antecontractelor din 2023 a expirat la 31.07.2026.",
  ancpiOperationalStatus: "Funcționalitatea 'Link de plată' din cadrul sistemului informatic e-Terra a fost reactivată pe 20 August 2026 (329.476 cereri recepționate, 279.242 soluționate în intervalul 11–19 august). Celelalte servicii online ANCPI sunt repuse în funcțiune etapizat.",
  methodologyNote: "PREȚ CERUT: Valorile pe metru pătrat util reprezintă medii ponderate ale prețurilor solicitate de vânzători (Indice Imobiliare.ro). IMOBILE VÂNDUTE: Cifrele reprezintă imobile vândute înregistrate în cartea funciară (ANCPI). RANDAMENT BRUT ESTIMAT: Calcul orientativ Subvenții ((Chirie anuală estimată / Preț cerut) × 100); nu reprezintă un randament oficial al pieței și nu constituie o garanție a rentabilității.",
};
