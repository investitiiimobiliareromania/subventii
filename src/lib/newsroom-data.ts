export type ArticleCategory =
  | "Funding"
  | "Government"
  | "European Funds"
  | "SMEs"
  | "Agriculture"
  | "Innovation"
  | "Energy"
  | "Construction"
  | "Digitalisation"
  | "Real Estate"
  | "Banking"
  | "Insurance"
  | "Legislation";

export type NewsArticle = {
  slug: string;
  headline: string;
  summary: string;
  content: string;
  category: ArticleCategory;
  impactAnalysis: string;
  whoIsAffected: string;
  relatedProgrammes: string[];
  officialDocuments: { title: string; url: string }[];
  institution: string;
  sourceUrl: string;
  publishedAt: string;
  updatedAt: string;
  author: string;
  readingTimeMin: number;
  verified: boolean;
  faqs: { question: string; answer: string }[];
};

export const newsroomArticles: NewsArticle[] = [
  {
    slug: "start-up-nation-2025-2026-pilonul-1-2",
    headline: "Start-Up Nation România: Cadrul General de Formare Antreprenorială și Pregătirea Planurilor de Afaceri",
    summary: "Ministerul Economiei, Antreprenoriatului și Turismului (MEAT) gestionează etapele programului Start-Up Nation, structurat pe piloni de instruire și acordare de granturi nerambursabile de până la 250.000 RON.",
    content: `
# Start-Up Nation România — Calendar și Condiții de Finanțare

Programul național **Start-Up Nation** alocă sprijin financiar nerambursabil prin fonduri europene și cofinanțare de la bugetul de stat. Structura programului cuprinde două etape distincte:

## 1. Pilonul I — Formare Antreprenorială
- Cursuri de formare profesională în competențe antreprenoriale și digitale pentru persoanele din grupul țintă (tineri sub 30 de ani, persoane aflate în căutarea unui loc de muncă, șomeri de lungă durată).
- Absolvirea cursului este o condiție de eligibilitate pentru depunerea ulterioară a dosarului de finanțare.

## 2. Pilonul II — Depunerea Planurilor de Afaceri
- Finanțare nerambursabilă de maximum **250.000 RON** per proiect aprobat.
- Cofinanțare proprie minimă obligatorie de 10% din cheltuielile eligibile.
- Obligația creării și menținerii a minimum 2 locuri de muncă cu normă întreagă pe o durată de cel puțin 24 de luni.
    `,
    category: "SMEs",
    impactAnalysis: "Sprijină înființarea de întreprinderi noi și integrarea tinerilor și a grupurilor vulnerabile pe piața muncii active.",
    whoIsAffected: "Persoane fizice eligibile pentru formare antreprenorială și viitori fondatori de societăți cu răspundere limitată (SRL).",
    relatedProgrammes: ["start-up-nation-2025", "pnrr-c9-digitalizare-imm"],
    officialDocuments: [
      { title: "Ordonanța de Urgență a Guvernului privind Start-Up Nation", url: "https://economie.gov.ro/" },
      { title: "Ghidul Solicitantului — Modulul de Formare și Criterii", url: "https://economie.gov.ro/" },
    ],
    institution: "Ministerul Economiei, Antreprenoriatului și Turismului (MEAT)",
    sourceUrl: "https://economie.gov.ro/",
    publishedAt: "2026-08-15",
    updatedAt: "2026-09-12",
    author: "AiX Editorial Desk",
    readingTimeMin: 5,
    verified: true,
    faqs: [
      {
        question: "Cine poate participa la cursurile de formare din Pilonul I?",
        answer: "Persoanele fizice care îndeplinesc criteriile de vârstă și statut ocupațional stabilite prin ghidul specific.",
      },
      {
        question: "Când se poate înființa firma beneficiară?",
        answer: "Firma trebuie înființată de către absolventul cursului după finalizarea modulului de instruire antreprenorială.",
      },
    ],
  },
  {
    slug: "pnrr-c9-digitalizare-imm-evaluare",
    headline: "PNRR Componenta 9: Criterii de Evaluare și Cadrul de Implementare pentru Digitalizarea IMM-urilor",
    summary: "Ministerul Investițiilor și Proiectelor Europene (MIPE) derulează procedurile de evaluare tehnică și contractare a proiectelor de granturi nerambursabile pentru digitalizarea IMM-urilor non-IT.",
    content: `
# PNRR C9: Digitalizarea IMM-urilor Non-IT

Apelul PNRR C9 acordă granturi nerambursabile cuprinse între **20.000 EUR și 100.000 EUR** pentru companiile care implementează soluții de transformare digitală, automatizare industrială, sisteme ERP/CRM și securitate cibernetică.

## Criterii de Intensitate Digitală (DESI)
La finalizarea proiectului, companiile beneficiare trebuie să demonstreze îndeplinirea a cel puțin **6 din cele 12 criterii de intensitate digitală** (conform metodologiei europene Eurostat/DESI), printre care:
- Utilizarea a cel puțin două rețele sociale pentru promovare.
- Utilizarea de software ERP pentru partajarea informațiilor între departamente.
- Tranzacții de comerț electronic reprezentând minimum 1% din cifra de afaceri.
- Utilizarea serviciilor cloud de nivel mediu sau avansat.
    `,
    category: "Digitalisation",
    impactAnalysis: "Crește competitivitatea IMM-urilor din sectoare tradiționale (producție, servicii, construcții, turism) prin tehnologizare.",
    whoIsAffected: "Microîntreprinderi, companii mici și mijlocii cu vechime de peste 1 an și profit operațional pozitiv.",
    relatedProgrammes: ["pnrr-c9-digitalizare-imm", "adr-nord-vest-digitalizare-si-inovare"],
    officialDocuments: [
      { title: "Ghidul Specific PNRR C9 Digitalizare IMM", url: "https://mfe.gov.ro/pnrr/" },
      { title: "Lista Criteriilor DESI de Maturitate Digitală", url: "https://mfe.gov.ro/pnrr/" },
    ],
    institution: "Ministerul Investițiilor și Proiectelor Europene (MIPE)",
    sourceUrl: "https://mfe.gov.ro/pnrr/",
    publishedAt: "2026-08-20",
    updatedAt: "2026-09-12",
    author: "AiX Editorial Desk",
    readingTimeMin: 6,
    verified: true,
    faqs: [
      {
        question: "Este obligatoriu auditul de maturitate digitală?",
        answer: "Da, este obligatoriu un raport de audit înainte de depunere și un raport final după implementare care să ateste progresul DESI.",
      },
    ],
  },
  {
    slug: "casa-verde-fotovoltaice-2026-calendar",
    headline: "Casa Verde Fotovoltaice: Criteriile Tehnice AFM și Cadrul de Integrare a Sistemelor de Stocare",
    summary: "Administrația Fondului pentru Mediu (AFM) a integrat în cerințele programului obligativitatea capacității de stocare de energie. Lansarea fiecărei sesiuni de înscriere se realizează exclusiv conform calendarului oficial AFM.",
    content: `
# Casa Verde Fotovoltaice — Cadrul General AFM

Programul național de instalare a sistemelor fotovoltaice gestionat de AFM aduce cerințe tehnice actualizate privind eficiența și independența energetică:

## Principalele Prevederi Tehnice:
- **Stocare integrată**: Sistemul fotovoltaic finanțat trebuie să includă acumulatori de energie electrică dimensionați conform ghidului.
- **Autoconsum casnic**: Dimensionarea instalației vizează acoperirea necesarului de consum al locuinței solicitantului.
- **Calendar sesiuni**: Etapele de înscriere pentru solicitanți și validarea instalatorilor autorizați sunt comunicate pe portalul oficial AFM.
    `,
    category: "Energy",
    impactAnalysis: "Optimizarea autoconsumului casnic și prevenirea supraîncărcării rețelelor electrice de joasă tensiune prin integrarea acumulatorilor.",
    whoIsAffected: "Proprietari de locuințe individuale pe teritoriul României.",
    relatedProgrammes: ["afm-parcuri-fotovoltaice-imm"],
    officialDocuments: [
      { title: "Ghidul de Finanțare Casa Verde Fotovoltaice", url: "https://www.afm.ro" },
    ],
    institution: "Administrația Fondului pentru Mediu (AFM)",
    sourceUrl: "https://www.afm.ro",
    publishedAt: "2026-07-30",
    updatedAt: "2026-09-12",
    author: "AiX Editorial Desk",
    readingTimeMin: 4,
    verified: true,
    faqs: [
      {
        question: "Cine se poate înscrie prin aplicația AFM?",
        answer: "Persoanele fizice care dețin drept de proprietate asupra imobilului și nu au datorii la bugetul de stat sau local.",
      },
    ],
  },
  {
    slug: "ancpi-eterra-reluare-activitate-august-2026",
    headline: "ANCPI: Sistemul e-Terra Reactivat pe 20 August; Peste 279.000 de Dosare Soluționate",
    summary: "Agenția Națională de Cadastru și Publicitate Imobiliară a comunicat restabilirea funcționalității sistemului informatic e-Terra și procesarea dosarelor cadastrale acumulate.",
    content: `
# ANCPI — Situația Operațională a Cadastrului și Publicității Imobiliare

În urma unei întreruperi tehnice temporare înregistrate în prima jumătate a lunii august 2026, Agenția Națională de Cadastru și Publicitate Imobiliară (ANCPI) a anunțat reluarea completă a funcționalității platformei **e-Terra** începând cu data de **20 August 2026**.

## Bilanțul Prelucrării Dosarelor:
- În intervalul 11–19 august 2026 au fost recepționate **329.476 de cereri** la nivelul oficiilor de cadastru și birourilor de carte funciară.
- Până la data reactivării platformei, personalul ANCPI a soluționat **279.242 de dosare**, fluxul operațional intrând în regim de normalizare etapizată.
- Datele statistice oficiale privind tranzacțiile din luna august sunt în curs de centralizare și publicare de către ANCPI.
    `,
    category: "Real Estate",
    impactAnalysis: "Deblocarea tranzacțiilor imobiliare rezidențiale și comerciale, a contractelor de ipotecă bancară și a operațiunilor notariale.",
    whoIsAffected: "Cumpărători, vânzători, dezvoltatori imobiliari, notari publici și bănci creditoare.",
    relatedProgrammes: [],
    officialDocuments: [
      { title: "Comunicat Oficial ANCPI privind Reactivarea e-Terra", url: "https://www.ancpi.ro" },
    ],
    institution: "Agenția Națională de Cadastru și Publicitate Imobiliară (ANCPI)",
    sourceUrl: "https://www.ancpi.ro",
    publishedAt: "2026-08-20",
    updatedAt: "2026-09-12",
    author: "AiX Editorial Desk",
    readingTimeMin: 4,
    verified: true,
    faqs: [
      {
        question: "Când vor fi disponibile cifrele statistice lunare pentru august 2026?",
        answer: "ANCPI va publica buletinul statistic lunar imediat după finalizarea centralizării tuturor cărților funciare soluționate.",
      },
    ],
  },
  {
    slug: "afir-modernizare-ferme-septembrie-2026",
    headline: "AFIR: Cadrul de Finanțare pentru Investiții în Exploatații Agricole prin Planul Strategic PAC (DR-15 & DR-20)",
    summary: "Agenția pentru Finanțarea Investițiilor Rurale prezintă criteriile de eligibilitate și condițiile generale de sprijin pentru fermierii care investesc în modernizarea exploatațiilor agricole.",
    content: `
# Investiții în Exploatațiile Agricole prin AFIR

Fermierii activi pot accesa sprijin financiar nerambursabil prin intervențiile Planului Strategic PAC 2023–2027 gestionate de AFIR:

## Investiții Eligibile:
- Achiziție de utilaje agricole moderne și tehnologii de precizie.
- Sisteme de irigații la nivel de fermă și soluții de eficiență energetică.
- Spații climatizate de depozitare a produselor agricole.
- Deschiderile sesiunilor de depunere se realizează conform calendarelor oficiale publicate de AFIR și MADR.
    `,
    category: "Agriculture",
    impactAnalysis: "Creșterea productivității agricole și adaptarea culturilor la fenomenele climatice extreme.",
    whoIsAffected: "Fermieri individuali, cooperative agricole, PFA, ÎI, IF și societăți comerciale din mediul rural.",
    relatedProgrammes: ["afir-investitii-ferme-agricole"],
    officialDocuments: [
      { title: "Ghidul Solicitantului Investiții în Exploatații Agricole (DR-15/DR-20)", url: "https://www.afir.ro" },
    ],
    institution: "Agenția pentru Finanțarea Investițiilor Rurale (AFIR)",
    sourceUrl: "https://www.afir.ro",
    publishedAt: "2026-08-25",
    updatedAt: "2026-09-12",
    author: "AiX Editorial Desk",
    readingTimeMin: 5,
    verified: true,
    faqs: [
      {
        question: "Care este condiția de vechime a exploatației?",
        answer: "Ferma trebuie să fie înregistrată la APIA / ANSVSA și să aibă o dimensiune economică minimă conform ghidului specific.",
      },
    ],
  },
  {
    slug: "regim-fiscal-microintreprinderi-imm-2026",
    headline: "Regimul Fiscal al Microîntreprinderilor în 2026: Cote de Impozitare, Plafon Cifră de Afaceri și Condiții Salariați",
    summary: "Sinteză a prevederilor Codului Fiscal aplicabile societăților comerciale: pragul de 500.000 EUR, cotele de 1% și 3% și regulile privind asociații cu dețineri multiple.",
    content: `
# Cadrul Fiscal pentru Microîntreprinderi și IMM-uri

Pentru menținerea statutului de microîntreprindere plătitoare de impozit pe veniturile microîntreprinderilor, societățile trebuie să verifice următoarele criterii cumulative conform Codului Fiscal:

## Principalele Criterii:
- **Plafon cifră de afaceri**: Maximum echivalentul în lei a **500.000 EUR** la data de 31 decembrie a anului fiscal anterior.
- **Salariat cu normă întreagă**: Cel puțin 1 angajat cu normă întreagă (8 ore/zi) sau contracte parțiale care cumulează 8 ore/zi.
- **Cote de impozitare**:
  - **1%** pentru microîntreprinderile cu venituri sub 60.000 EUR și care nu desfășoară activități pe coduri CAEN specifice (ex: IT, consultanță, HoReCa).
  - **3%** pentru microîntreprinderile cu venituri între 60.000 EUR și 500.000 EUR sau care activează în domenii reglementate.
- **Regula asociaților**: Un asociat poate deține peste 25% din părțile sociale la o singură microîntreprindere.
    `,
    category: "Legislation",
    impactAnalysis: "Claritate predictibilă în planificarea financiară și bugetarea fiscală pentru micii antreprenori.",
    whoIsAffected: "Asociați și administratori de SRL-uri din România.",
    relatedProgrammes: ["start-up-nation-2025", "adr-centru-microintreprinderi-turism-servicii"],
    officialDocuments: [
      { title: "Codul Fiscal Actualizat — Titlul III Impozitul pe Veniturile Microîntreprinderilor", url: "https://mfinante.gov.ro" },
    ],
    institution: "Ministerul Finanțelor Publice",
    sourceUrl: "https://mfinante.gov.ro",
    publishedAt: "2026-08-10",
    updatedAt: "2026-09-12",
    author: "AiX Editorial Desk",
    readingTimeMin: 5,
    verified: true,
    faqs: [
      {
        question: "Ce se întâmplă dacă se depășește plafonul de 500.000 EUR în cursul anului?",
        answer: "Societatea trece la impozit pe profit de 16% începând cu trimestrul în care a fost depășit plafonul.",
      },
    ],
  },
];
