export type MacroEconomicIndicator = {
  id: string;
  name: string;
  value: string;
  period: string;
  previousValue: string;
  yoyChange: string;
  category: "PIB & Creștere" | "Prețuri & Inflație" | "Indicatori Monetari BNR" | "Piața Muncii" | "Comerț Exterior" | "Investiții";
  sourceName: string;
  sourceUrl: string;
  description: string;
  methodologyNote: string;
  lastVerifiedAt: string;
};

export const MACRO_ECONOMIC_DATASET: MacroEconomicIndicator[] = [
  {
    id: "pib-national",
    name: "Produsul Intern Brut (PIB Nominal Anualizat)",
    value: "1.745,2 mld. RON (~351 mld. EUR)",
    period: "2025 / Estimare Oficială 2026",
    previousValue: "1.605,6 mld. RON",
    yoyChange: "+2,7% creștere reală",
    category: "PIB & Creștere",
    sourceName: "Institutul Național de Statistică (INSSE) / Comisia Națională de Strategie și Prognoză",
    sourceUrl: "https://insse.ro",
    description: "Valoarea monetară totală a tuturor bunurilor și serviciilor finale produse pe teritoriul României într-un an.",
    methodologyNote: "Date calculate conform Sistemului European de Conturi (SEC 2010), serii brute și ajustate sezonier.",
    lastVerifiedAt: "2026-10-01",
  },
  {
    id: "inflatia-ipc",
    name: "Rata Anuală a Inflației (IPC)",
    value: "5,1%",
    period: "August 2026",
    previousValue: "5,42% (Iulie 2026)",
    yoyChange: "−0,32 puncte procentuale",
    category: "Prețuri & Inflație",
    sourceName: "Institutul Național de Statistică (INSSE)",
    sourceUrl: "https://insse.ro",
    description: "Indicele Prețurilor de Consum (IPC) care măsoară evoluția medie a prețurilor la alimente, mărfuri nealimentare și servicii.",
    methodologyNote: "Calculat pe baza coșului de consum mediu național. Mărfuri alimentare: +4,8%, Nealimentare: +5,9%, Servicii: +7,1%.",
    lastVerifiedAt: "2026-10-01",
  },
  {
    id: "ircc-trimestrial",
    name: "Indicele de Referință pentru Creditele Consumatorilor (IRCC)",
    value: "5,56%",
    period: "Trimestrul 3 2026 (Iulie - Septembrie)",
    previousValue: "5,90% (T2 2026)",
    yoyChange: "−0,34 pp",
    category: "Indicatori Monetari BNR",
    sourceName: "Banca Națională a României (BNR)",
    sourceUrl: "https://www.bnr.ro/Indicele-de-referinta-pentru-creditele-consumatorilor-(IRCC)-22285.aspx",
    description: "Indicele legal stabilit prin OUG 19/2019 pentru creditele retail acordate persoanelor fizice cu dobândă variabilă.",
    methodologyNote: "Media aritmetică a ratelor de dobândă zilnice ale tranzacțiilor interbancare din T1 2026.",
    lastVerifiedAt: "2026-10-01",
  },
  {
    id: "dobanda-politica-monetara",
    name: "Rata Dobânzii de Politică Monetară BNR",
    value: "6,50% pe an",
    period: "Septembrie 2026",
    previousValue: "6,75%",
    yoyChange: "−0,25 pp",
    category: "Indicatori Monetari BNR",
    sourceName: "Banca Națională a României (BNR)",
    sourceUrl: "https://www.bnr.ro",
    description: "Rata directoare stabilită de Consiliul de Administrație al BNR pentru operațiunile principale de refinanțare.",
    methodologyNote: "Facilitatea de creditare (Lombard): 7,50%, Facilitatea de depozit: 5,50%.",
    lastVerifiedAt: "2026-10-01",
  },
  {
    id: "salariu-mediu-net",
    name: "Câștigul Salarial Mediu Net",
    value: "5.176 RON (~1.040 EUR)",
    period: "Iulie 2026",
    previousValue: "5.118 RON",
    yoyChange: "+13,2% nominal",
    category: "Piața Muncii",
    sourceName: "Institutul Național de Statistică (INSSE)",
    sourceUrl: "https://insse.ro",
    description: "Salariul mediu net la nivelul economiei naționale după reținerea contribuțiilor sociale (CAS, CASS) și a impozitului pe venit.",
    methodologyNote: "Cele mai mari valori: Tehnologia Informației (IT, peste 11.200 RON), Extracția petrolului/gazelor. Cele mai mici: Fabricarea articolelor de îmbrăcăminte (~2.900 RON).",
    lastVerifiedAt: "2026-10-01",
  },
  {
    id: "rata-somajului",
    name: "Rata Șomajului (BIM)",
    value: "5,4%",
    period: "Iulie 2026",
    previousValue: "5,3%",
    yoyChange: "+0,1 pp",
    category: "Piața Muncii",
    sourceName: "Institutul Național de Statistică (INSSE) / ANOFM",
    sourceUrl: "https://insse.ro",
    description: "Ponderea șomerilor conform definiției Biroului Internațional al Muncii (BIM) în populația activă.",
    methodologyNote: "Număr estimat de șomeri: ~440.000 persoane. Rata șomajului în rândul tinerilor (15-24 ani) rămâne la nivel ridicat (~21,5%).",
    lastVerifiedAt: "2026-10-01",
  },
  {
    id: "exporturi-fob",
    name: "Volumul Exporturilor de Bunuri (FOB)",
    value: "93,5 mld. EUR (Anualizat)",
    period: "Semestrul I 2026",
    previousValue: "92,1 mld. EUR",
    yoyChange: "+1,5%",
    category: "Comerț Exterior",
    sourceName: "Institutul Național de Statistică (INSSE)",
    sourceUrl: "https://insse.ro",
    description: "Totalul mărfurilor și serviciilor livrate către partenerii internaționali (UE 72%, Non-UE 28%).",
    methodologyNote: "Principalele grupe: Mașini și echipamente de transport (44,5%), Alte produse manufacturate (29,8%), Produse agroalimentare (8,2%).",
    lastVerifiedAt: "2026-10-01",
  },
  {
    id: "investitii-straine-isd",
    name: "Fluxul Net de Investiții Străine Directe (ISD)",
    value: "6,8 mld. EUR",
    period: "2025 / Semestrul I 2026",
    previousValue: "6,4 mld. EUR",
    yoyChange: "+6,2%",
    category: "Investiții",
    sourceName: "Banca Națională a României (BNR)",
    sourceUrl: "https://www.bnr.ro",
    description: "Capitalul străin atras în întreprinderile din România sub formă de participații la capital, profit reinvestit și credite intragrup.",
    methodologyNote: "Sectoare principale: Industrie prelucrătoare (31%), Comerț cu ridicata și amănuntul (18%), Intermedieri financiare și asigurări (14%), Tranzacții imobiliare (11%).",
    lastVerifiedAt: "2026-10-01",
  },
];

export const REGIONAL_GDP_DISTRIBUTION = [
  { region: "București-Ilfov", gdpSharePct: 28.5, gdpPerCapitaPps: 164, mainDrivers: "IT & Servicii financiare, Comerț, Imobiliare, Consultanță" },
  { region: "Nord-Vest (Cluj, Bihor, etc.)", gdpSharePct: 12.8, gdpPerCapitaPps: 76, mainDrivers: "Tehnologie, Industrie prelucrătoare, Agro-procesare, Turism" },
  { region: "Centru (Brașov, Sibiu, etc.)", gdpSharePct: 11.4, gdpPerCapitaPps: 74, mainDrivers: "Automotive, Industrie aeronautică, Turism, Silvicultură" },
  { region: "Vest (Timiș, Arad, etc.)", gdpSharePct: 10.2, gdpPerCapitaPps: 78, mainDrivers: "Componente auto, Electronică, Logistică transfrontalieră, Agricultură" },
  { region: "Sud-Muntenia (Prahova, Argeș, etc.)", gdpSharePct: 11.1, gdpPerCapitaPps: 64, mainDrivers: "Automotive (Dacia), Rafinării & Petrochimie, Agricultură vegetală" },
  { region: "Nord-Est (Iași, Suceava, etc.)", gdpSharePct: 10.5, gdpPerCapitaPps: 52, mainDrivers: "Poli IT universitare, Agricultură, Textile, Prelucrarea lemnului" },
  { region: "Sud-Est (Constanța, Galați, etc.)", gdpSharePct: 9.6, gdpPerCapitaPps: 62, mainDrivers: "Portul Constanța, Energie eoliană, Siderurgie, Turism litoral" },
  { region: "Sud-Vest Oltenia (Dolj, Gorj, etc.)", gdpSharePct: 5.9, gdpPerCapitaPps: 55, mainDrivers: "Automotive (Ford Otosan), Energie clasică/tranziție, Agricultură de câmpie" },
];
