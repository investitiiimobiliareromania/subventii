export type OpenDatasetEntry = {
  id: string;
  title: string;
  institution: string;
  category: "Finanțări & Fonduri" | "Imobiliare & Cadastru" | "Economie & Macro" | "Agricultură" | "Fiscalitate & Buget" | "Achiziții Publice";
  frequency: "Lunar" | "Trimestrial" | "Anual" | "În Timp Real";
  formats: string[];
  officialUrl: string;
  description: string;
  license: string;
  lastVerifiedAt: string;
};

export const OPEN_DATASETS_REGISTRY: OpenDatasetEntry[] = [
  {
    id: "ancpi-tranzactii-lunare",
    title: "Statistici Lunare Tranzacții Imobiliare & Număr Imobile Vândute",
    institution: "Agenția Națională de Cadastru și Publicitate Imobiliară (ANCPI)",
    category: "Imobiliare & Cadastru",
    frequency: "Lunar",
    formats: ["PDF", "XLSX", "HTML"],
    officialUrl: "https://www.ancpi.ro/statistici-imobiliare/",
    description: "Numărul total de contracte de vânzare-cumpărare înregistrate în cartea funciară pe fiecare județ al României și în București, defalcat pe unități individuale, terenuri intravilane și extravilane.",
    license: "Date Publice Guvernamentale Deschise",
    lastVerifiedAt: "2026-10-01",
  },
  {
    id: "insse-tempo-online",
    title: "Baza de Date Statistică TEMPO-Online (PIB, Inflație, Salarii, Demografie)",
    institution: "Institutul Național de Statistică (INSSE)",
    category: "Economie & Macro",
    frequency: "Lunar",
    formats: ["CSV", "XLSX", "API", "JSON"],
    officialUrl: "http://statistici.insse.ro:8077/tempo-online/",
    description: "Cea mai cuprinzătoare matrice statistică a României conținând serii de timp pe conturi naționale, forță de muncă, balanță de plăți, turism, industrie și agricultură.",
    license: "Open Data INSSE conform Legii 226/2009",
    lastVerifiedAt: "2026-10-01",
  },
  {
    id: "mysmis-proiecte-fonduri-ue",
    title: "Registrul Proiectelor Finanțate din Fonduri Europene (MySMIS 2021-2027 / PNRR)",
    institution: "Ministerul Investițiilor și Proiectelor Europene (MIPE)",
    category: "Finanțări & Fonduri",
    frequency: "Lunar",
    formats: ["XLSX", "CSV", "Open Data"],
    officialUrl: "https://mfe.gov.ro/proiecte-contractate/",
    description: "Lista completă a contractelor de finanțare semnate, beneficiari (IMM, UAT, ONG), valoare totală aprobată, valoare nerambursabilă și stadiul plăților.",
    license: "Transparență Fonduri Europene Regulament UE 2021/1060",
    lastVerifiedAt: "2026-10-01",
  },
  {
    id: "bnr-serii-statistice",
    title: "Serii Statistice BNR: Rate Dobândă, IRCC, ROBOR, Cursuri Valutare și Balanță de Plăți",
    institution: "Banca Națională a României (BNR)",
    category: "Economie & Macro",
    frequency: "În Timp Real",
    formats: ["XML", "CSV", "HTML"],
    officialUrl: "https://www.bnr.ro/Statistici-interactive-5701.aspx",
    description: "Cursurile oficiale de schimb valutar zilnice, cotațiile ROBOR, indicele de referință IRCC, masa monetară M3 și statistica activelor bancare.",
    license: "Date Publice BNR",
    lastVerifiedAt: "2026-10-01",
  },
  {
    id: "data-gov-ro",
    title: "Portalul Național de Date Deschise ale României (data.gov.ro)",
    institution: "Secretariatul General al Guvernului (SGG) / ADR",
    category: "Economie & Macro",
    frequency: "În Timp Real",
    formats: ["CSV", "JSON", "GeoJSON", "API"],
    officialUrl: "https://data.gov.ro",
    description: "Punctul central de acces la seturile de date deschise publicate de ministerele, agențiile și instituțiile administrației publice centrale din România.",
    license: "Open Government Licence (OGL-RO)",
    lastVerifiedAt: "2026-10-01",
  },
  {
    id: "seap-licitatii-publice",
    title: "Registrul Procedurilor de Achiziție Publică și Contractelor Atribuite (SICAP)",
    institution: "Agenția Națională pentru Achiziții Publice (ANAP) / ADR",
    category: "Achiziții Publice",
    frequency: "În Timp Real",
    formats: ["API", "HTML", "XLSX"],
    officialUrl: "https://www.e-licitatie.ro",
    description: "Anunțurile de participare, caietele de sarcini, clarificările și contractele atribuite de toate autoritățile contractante din România.",
    license: "Directiva Europeană 2014/24/UE privind achizițiile publice",
    lastVerifiedAt: "2026-10-01",
  },
  {
    id: "apia-raportari-plati",
    title: "Date Statistice privind Cererile Unice de Plată și Suprafața Agricolă Declarată",
    institution: "Agenția de Plăți și Intervenție pentru Agricultură (APIA)",
    category: "Agricultură",
    frequency: "Anual",
    formats: ["PDF", "XLSX"],
    officialUrl: "https://www.apia.org.ro",
    description: "Numărul total de fermieri beneficiari de plăți directe FEGA/FEADR, repartiția pe județe, suprafețele agricole eligibile și cuantumul subvențiilor pe hectar.",
    license: "Transparență PAC FEGA",
    lastVerifiedAt: "2026-10-01",
  },
  {
    id: "anaf-buletine-contribuabili",
    title: "Registrul Public al Entităților / Societăților Înregistrate Fiscal (ANAF)",
    institution: "Agenția Națională de Administrare Fiscală (ANAF)",
    category: "Fiscalitate & Buget",
    frequency: "În Timp Real",
    formats: ["API Web Service", "JSON"],
    officialUrl: "https://www.anaf.ro/InformatieStatica/servicii_web.html",
    description: "Interogare date de identificare fiscală, stare de funcționare, înregistrare în scopuri de TVA, aplicare TVA la încasare și înregistrare în Registrul RO e-Factura.",
    license: "Serviciu Public ANAF",
    lastVerifiedAt: "2026-10-01",
  },
];
