export type RealEstateSegment = "Residential" | "Commercial" | "Industrial" | "Luxury";

export type CityPriceReport = {
  city: string;
  county: string;
  ancpiJune2026Transactions: number; // Imobile vândute ANCPI Iunie 2026 (Tabelul 1)
  nationalRankNote: string;
  marketNote: string;
  sourceAttribution: string;
};

export const realEstateCityReports: CityPriceReport[] = [
  {
    city: "București",
    county: "București",
    ancpiJune2026Transactions: 10398,
    nationalRankNote: "Locul 1 Național la volumul de imobile vândute",
    marketNote: "Cea mai mare piață imobiliară din România ca volum de imobile vândute înregistrate în cartea funciară.",
    sourceAttribution: "Imobile vândute: ANCPI (Iunie 2026, Tabelul 1)",
  },
  {
    city: "Ilfov (Județ)",
    county: "Ilfov",
    ancpiJune2026Transactions: 3971,
    nationalRankNote: "Locul 2 Național la volumul de imobile vândute",
    marketNote: "Piață rezidențială periurbană cu volum ridicat de tranzacții rezidențiale și terenuri.",
    sourceAttribution: "Imobile vândute: ANCPI (Iunie 2026, Tabelul 1)",
  },
  {
    city: "Timișoara (Timiș)",
    county: "Timiș",
    ancpiJune2026Transactions: 3165,
    nationalRankNote: "Locul 3 Național la volumul de imobile vândute",
    marketNote: "Pol economic și tehnologic regional major în regiunea de Vest a României.",
    sourceAttribution: "Imobile vândute județ: ANCPI (Iunie 2026, Tabelul 1)",
  },
  {
    city: "Iași",
    county: "Iași",
    ancpiJune2026Transactions: 2540,
    nationalRankNote: "Pol regional major în regiunea Nord-Est",
    marketNote: "Centru universitar și economic regional cu cerere susținută pe segmentul rezidențial.",
    sourceAttribution: "Imobile vândute județ: ANCPI (Iunie 2026, Tabelul 1)",
  },
  {
    city: "Constanța",
    county: "Constanța",
    ancpiJune2026Transactions: 2234,
    nationalRankNote: "Pol maritim și economic regional",
    marketNote: "Piață rezidențială dinamică pe litoralul românesc și în zona metropolitană Constanța.",
    sourceAttribution: "Imobile vândute județ: ANCPI (Iunie 2026, Tabelul 1)",
  },
  {
    city: "Cluj-Napoca (Cluj)",
    county: "Cluj",
    ancpiJune2026Transactions: 2074,
    nationalRankNote: "Pol tehnologic și universitar regional",
    marketNote: "Piață rezidențială activă din Transilvania, susținută de sectoarele tehnologice și universitare.",
    sourceAttribution: "Imobile vândute județ: ANCPI (Iunie 2026, Tabelul 1)",
  },
  {
    city: "Suceava",
    county: "Suceava",
    ancpiJune2026Transactions: 1850,
    nationalRankNote: "Pol de dezvoltare regională Nord-Est",
    marketNote: "Piață județeană cu volum susținut de transferuri imobiliare și terenuri.",
    sourceAttribution: "Imobile vândute județ: ANCPI (Iunie 2026, Tabelul 1)",
  },
  {
    city: "Brașov",
    county: "Brașov",
    ancpiJune2026Transactions: 1735,
    nationalRankNote: "Pol turistic și economic Centru",
    marketNote: "Piață imobiliară influențată de atractivitatea turistică și dezvoltarea infrastructurii.",
    sourceAttribution: "Imobile vândute județ: ANCPI (Iunie 2026, Tabelul 1)",
  },
];

export const realEstateMarketMacro = {
  referencePeriod: "Septembrie 2026 (Date Oficiale ANCPI Iunie 2026 + Cadrul BNR/Fiscal Curent)",
  irccIndex: "IRCC — 5,56%, aplicabil în T3 2026",
  irccNote: "Indicele de referință pentru creditele consumatorilor (IRCC) reglementat de OUG 19/2019, calculat trimestrial de BNR pe baza mediei zilnice a tranzacțiilor interbancare din T1 2026 și aplicabil în contractele de credit cu dobândă variabilă pe durata Trimestrului 3 2026 (iulie–septembrie 2026). Sursă oficială: Banca Națională a României (https://www.bnr.ro/Indicele-de-referinta-pentru-creditele-consumatorilor-(IRCC)-22285.aspx).",
  vatThresholdNote: "Regim Fiscal TVA: Cota standard generală de TVA este de 21% (conform legislației fiscale actualizate ANAF / Ministerul Finanțelor). Regimul tranzitoriu de 9% aplicabil livrărilor de locuințe în baza antecontractelor din 2023 a expirat la 31.07.2026.",
  ancpiOperationalStatus: "Funcționalitatea 'Link de plată' din cadrul sistemului informatic e-Terra a fost reactivată pe 20 August 2026 (329.476 cereri recepționate, 279.242 soluționate în intervalul 11–19 august). Celelalte servicii online ANCPI sunt repuse în funcțiune etapizat.",
  methodologyNote: "IMOBILE VÂNDUTE: Volumele de contracte provin exclusiv din registrele oficiale ale Agenției Naționale de Cadastru și Publicitate Imobiliară (ANCPI Iunie 2026, Tabelul 1). Prețurile cerute speculative și randamentele brute estimate fără fundamentare statistică oficială au fost eliminate în conformitate cu standardul de audit zero-trust.",
};
