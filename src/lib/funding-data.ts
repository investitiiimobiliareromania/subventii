export type FundingStatus = "Deschis" | "În curând" | "Închis" | "Suspendat";

export type CompanyAge = "Nou înființată" | "Peste 1 an" | "Peste 2 ani" | "Peste 3 ani" | "Orice vechime";
export type CompanySize = "Microîntreprindere" | "Întreprindere mică" | "Întreprindere mijlocie" | "IMM" | "Întreprindere mare" | "Toate mărimile";
export type BusinessType = "SRL" | "PFA" | "II" | "SA" | "Fermă" | "ONG" | "Toate formele";

export type TimelineStep = {
  label: string;
  date: string;
};

export type FAQ = {
  question: string;
  answer: string;
};

export type FundingProgram = {
  slug: string;
  title: string;
  summary: string;
  status: FundingStatus;
  deadline: string;
  maxFundingRon: number;
  maxFundingEur?: number;
  minFundingRon?: number;
  source: string;
  sourceCategory: "MIPE" | "Minister" | "ADR" | "AFIR" | "AFM" | "PNRR" | "EU";
  businessTypes: string[];
  industries: string[];
  counties: string[];
  companyAge: CompanyAge;
  companySize: CompanySize;
  eligibility: string[];
  documents: string[];
  cofinancing: string;
  officialUrl: string;
  timeline: TimelineStep[];
  faqs: FAQ[];
};

export const filterOptions = {
  business: ["Toate formele", "SRL", "PFA", "II", "SA", "Fermă", "ONG"],
  industry: [
    "Toate domeniile",
    "IT & digital",
    "Agricultură",
    "Producție",
    "Servicii",
    "Turism",
    "Construcții",
    "Sănătate & Mediu",
  ],
  county: [
    "Toate județele",
    "Național",
    "Alba", "Arad", "Argeș", "Bacău", "Bihor", "Bistrița-Năsăud", "Botoșani", "Brașov", "Brăila", "București",
    "Buzău", "Caraș-Severin", "Călărași", "Cluj", "Constanța", "Covasna", "Dâmbovița", "Dolj", "Galați", "Giurgiu",
    "Gorj", "Harghita", "Hunedoara", "Ialomița", "Iași", "Ilfov", "Maramureș", "Mehedinți", "Mureș", "Neamț",
    "Olt", "Prahova", "Satu Mare", "Sălaj", "Sibiu", "Suceava", "Teleorman", "Timiș", "Tulcea", "Vaslui", "Vâlcea", "Vrancea"
  ],
  companyAge: ["Orice vechime", "Nou înființată", "Peste 1 an", "Peste 2 ani", "Peste 3 ani"],
  companySize: ["Toate mărimile", "Microîntreprindere", "Întreprindere mică", "Întreprindere mijlocie", "IMM", "Întreprindere mare"],
  sourceCategory: ["Toate sursele", "MIPE", "Minister", "ADR", "AFIR", "AFM", "PNRR"],
  status: ["Toate statusurile", "Deschis", "În curând", "Închis", "Suspendat"],
};

export const programs: FundingProgram[] = [
  {
    slug: "start-up-nation-2025",
    title: "Start-Up Nation România — Ediția 2025/2026",
    summary: "Sprijin financiar nerambursabil pentru înființarea și dezvoltarea de întreprinderi noi prin investiții în echipamente, digitalizare și crearea de noi locuri de muncă.",
    status: "Deschis",
    deadline: "2026-08-14",
    maxFundingRon: 250000,
    maxFundingEur: 50000,
    minFundingRon: 50000,
    source: "Ministerul Economiei, Antreprenoriatului și Turismului",
    sourceCategory: "Minister",
    businessTypes: ["SRL"],
    industries: ["Servicii", "Producție", "IT & digital"],
    counties: ["Național"],
    companyAge: "Nou înființată",
    companySize: "Microîntreprindere",
    eligibility: [
      "Persoana fizică solicitantă trebuie să fi absolvit cursurile de antreprenoriat organizate prin program.",
      "Societatea trebuie înființată după absolvirea cursului de către persoana eligibilă.",
      "Sediul social și locul de implementare trebuie să fie pe teritoriul României.",
      "Crearea și menținerea a minimum 2 locuri de muncă cu normă întreagă pe o perioadă de cel puțin 24 luni.",
      "Domeniul de activitate ales trebuie să fie eligibil conform Ghidului Solicitantului."
    ],
    documents: [
      "Cerere de finanțare completată pe platforma oficială",
      "Plan de afaceri detaliat",
      "Certificat de absolvire curs antreprenoriat",
      "Act constitutiv și Certificat de Înregistrare ONRC",
      "Oferte de preț și specificații tehnice pentru echipamente"
    ],
    cofinancing: "Minimum 10% cofinanțare proprie din valoarea cheltuielilor eligibile.",
    officialUrl: "https://minimis.imm.gov.ro/",
    timeline: [
      { label: "Consultare publică ghid", date: "Mai 2025" },
      { label: "Perioadă înscriere module instruire", date: "Iunie 2025 – Mai 2026" },
      { label: "Depunere proiecte pe platformă", date: "15 iulie – 14 august 2026" },
      { label: "Evaluare tehnică și financiară", date: "August – Septembrie 2026" },
      { label: "Semnare contracte de finanțare", date: "Octombrie 2026" }
    ],
    faqs: [
      {
        question: "Cine se poate înscrie în program?",
        answer: "Persoanele fizice din grupul țintă care parcurg cursurile de formare antreprenorială și înființează o firmă nouă de tip SRL."
      },
      {
        question: "Care sunt spațiile și echipamentele eligibile?",
        answer: "Echipamente tehnologice, calculatoare, software, vehicule de transport mărfuri, mobilier de birou și spații de lucru dedicate."
      }
    ]
  },
  {
    slug: "pnrr-c9-digitalizare-imm",
    title: "PNRR C9: Digitalizarea IMM-urilor din România",
    summary: "Granturi nerambursabile destinate adoptării tehnologiilor avansate (cloud, securitate cibernetică, automatizări, IoT) de către IMM-uri non-IT.",
    status: "Deschis",
    deadline: "2026-08-28",
    maxFundingRon: 500000,
    maxFundingEur: 100000,
    minFundingRon: 100000,
    source: "Ministerul Investițiilor și Proiectelor Europene (MIPE)",
    sourceCategory: "PNRR",
    businessTypes: ["SRL", "SA"],
    industries: ["IT & digital", "Producție", "Servicii", "Construcții", "Turism"],
    counties: ["Național"],
    companyAge: "Peste 1 an",
    companySize: "IMM",
    eligibility: [
      "Persoană juridică înregistrată în România de cel puțin 1 an fiscal încheiat.",
      "Să nu fi înregistrat profit operațional negativ în ultimul exercițiu financiar.",
      "Domeniu de activitate principal sau secundar eligibil conform codurilor CAEN excluse de ghid.",
      "Obligația de a atinge minimum 6 din cele 12 criterii de intensitate digitală DESI la finalul proiectului."
    ],
    documents: [
      "Raport de audit de maturitate digitală inițial și final",
      "Situații financiare anuale auditate (Bilanț și Cont de Profit și Pierdere)",
      "Propunere tehnică de implementare hardware/software",
      "Declarație privind neîncadrarea în firmă în dificultate"
    ],
    cofinancing: "10% cofinanțare privată pentru microîntreprinderi și companii mici.",
    officialUrl: "https://mfe.gov.ro/pnrr/",
    timeline: [
      { label: "Publicare ghid final", date: "Martie 2026" },
      { label: "Apel deschis pentru depunere", date: "1 Iulie – 28 August 2026" },
      { label: "Evaluare și contractare", date: "Septembrie – Noiembrie 2026" }
    ],
    faqs: [
      {
        question: "Ce cheltuieli sunt eligibile?",
        answer: "Achiziția de hardware IT, licențe software, servicii cloud, training digital pentru angajați și audit de securitate cibernetică."
      }
    ]
  },
  {
    slug: "adr-nord-vest-digitalizare-si-inovare",
    title: "ADR Nord-Vest: Inovare și Digitalizare în Microîntreprinderi",
    summary: "Sprijin financiar nerambursabil pentru întreprinderile mici din regiunea Nord-Vest în vederea automatizării proceselor interne și scalării comerțului online.",
    status: "Deschis",
    deadline: "2026-09-15",
    maxFundingRon: 350000,
    maxFundingEur: 70000,
    minFundingRon: 40000,
    source: "Agenția de Dezvoltare Regională Nord-Vest (ADR NV)",
    sourceCategory: "ADR",
    businessTypes: ["SRL", "PFA"],
    industries: ["IT & digital", "Servicii", "Producție"],
    counties: ["Cluj", "Bihor", "Bistrița-Năsăud", "Maramureș", "Satu Mare", "Sălaj"],
    companyAge: "Peste 1 an",
    companySize: "Microîntreprindere",
    eligibility: [
      "Microîntreprindere cu sediul social sau punct de lucru înregistrat în Regiunea Nord-Vest.",
      "Număr mediu de salariați de cel puțin 1 în anul anterior depunerii.",
      "Domeniu de activitate vizat să fie menționat în Strategia de Specializare Inteligentă (RIS3 NV)."
    ],
    documents: [
      "Certificat constatator ONRC generat recent",
      "Plan de achiziție echipamente IT și soluții software",
      "Declarație de încadrare în categoria IMM"
    ],
    cofinancing: "15% din valoarea totală a cheltuielilor eligibile.",
    officialUrl: "https://www.nord-vest.ro/",
    timeline: [
      { label: "Deschidere apel", date: "15 Mai 2026" },
      { label: "Termen limită depunere", date: "15 Septembrie 2026" }
    ],
    faqs: [
      {
        question: "Care sunt județele eligibile?",
        answer: "Cluj, Bihor, Bistrița-Năsăud, Maramureș, Satu Mare și Sălaj."
      }
    ]
  },
  {
    slug: "afir-investitii-ferme-agricole",
    title: "AFIR: Modernizarea și Tehnologizarea Exploatațiilor Agricole",
    summary: "Sprijin nerambursabil alocat fermierilor pentru achiziția de utilaje agricole moderne, sisteme de irigații și spații de depozitare climatizate.",
    status: "În curând",
    deadline: "2026-10-30",
    maxFundingRon: 1500000,
    maxFundingEur: 300000,
    minFundingRon: 150000,
    source: "Agenția pentru Finanțarea Investițiilor Rurale (AFIR)",
    sourceCategory: "AFIR",
    businessTypes: ["SRL", "PFA", "II", "Fermă"],
    industries: ["Agricultură"],
    counties: ["Național"],
    companyAge: "Orice vechime",
    companySize: "Toate mărimile",
    eligibility: [
      "Fermieri înregistrați la APIA / ANSVSA cu exploatație agricolă viabilă.",
      "Dimensiune economică minimă a fermei măsurată în SO (Standard Output) conform ghidului.",
      "Investiție amplasată exclusiv în mediul rural sau zone periurbane eligibile."
    ],
    documents: [
      "Studiu de Fezabilitate / Memoriu Tehnic",
      "Dovada proprietății sau terenului agricol în ареndă pe min. 10 ani",
      "Adeverință APIA privind istoricul exploatației"
    ],
    cofinancing: "35% - 50% în funcție de vârsta fermierului și zona de munte.",
    officialUrl: "https://www.afir.ro/",
    timeline: [
      { label: "Publicare consultare Ghid", date: "August 2026" },
      { label: "Deschidere sesiune depunere", date: "1 Octombrie 2026" }
    ],
    faqs: [
      {
        question: "Se pot cumpăra tractoare?",
        answer: "Da, dacă achiziția este justificată de dimensiunea terenului și inclusă în planul de afaceri."
      }
    ]
  },
  {
    slug: "afm-parcuri-fotovoltaice-imm",
    title: "AFM: Eficiență Energetică și Producție Energie Verde pentru Companii",
    summary: "Finanțare nerambursabilă pentru instalarea sistemelor de panouri fotovoltaice și stocare de energie în vederea autoconsumului industrial.",
    status: "În curând",
    deadline: "2026-11-15",
    maxFundingRon: 1000000,
    maxFundingEur: 200000,
    minFundingRon: 200000,
    source: "Administrația Fondului pentru Mediu (AFM)",
    sourceCategory: "AFM",
    businessTypes: ["SRL", "SA"],
    industries: ["Producție", "Servicii", "Turism", "Construcții"],
    counties: ["Național"],
    companyAge: "Peste 1 an",
    companySize: "IMM",
    eligibility: [
      "Companii active cu consum dovedit de energie electrică pe ultimele 12 luni.",
      "Amplasament propriu (clădire/teren) intabulat fără sarcini inhibitoare.",
      "Capacitatea fotovoltaică instalată să fie dimensionată pentru autoconsum."
    ],
    documents: [
      "Audit energetic recent efectuat de auditor autorizat",
      "Certificat de racordare sau aviz tehnic de racordare (ATR)",
      "Extras de carte funciară la zi"
    ],
    cofinancing: "20% cofinanțare privată.",
    officialUrl: "https://www.afm.ro/",
    timeline: [
      { label: "Ghid în consultare", date: "Septembrie 2026" },
      { label: "Depunere proiecte", date: "Noiembrie 2026" }
    ],
    faqs: [
      {
        question: "Este obligatorie bateria de stocare?",
        answer: "Da, ghidul actualizat impune o capacitate minimă de stocare de 20% din puterea instalată a panourilor."
      }
    ]
  },
  {
    slug: "adr-centru-microintreprinderi-turism-servicii",
    title: "ADR Centru: Scalarea Microîntreprinderilor din Turism și Servicii",
    summary: "Sprijin nerambursabil pentru achiziția de dotări, echipamente și modernizarea spațiilor de cazare și alimentație publică din Regiunea Centru.",
    status: "Deschis",
    deadline: "2026-09-30",
    maxFundingRon: 450000,
    maxFundingEur: 90000,
    minFundingRon: 50000,
    source: "Agenția de Dezvoltare Regională Centru (ADR Centru)",
    sourceCategory: "ADR",
    businessTypes: ["SRL", "PFA"],
    industries: ["Turism", "Servicii"],
    counties: ["Alba", "Brașov", "Covasna", "Harghita", "Mureș", "Sibiu"],
    companyAge: "Peste 2 ani",
    companySize: "Microîntreprindere",
    eligibility: [
      "Sediul social sau punct de lucru funcțional în județele Alba, Brașov, Covasna, Harghita, Mureș sau Sibiu.",
      "Minimum 1 angajat cu normă întreagă în ultimul an fiscal.",
      "Proiectul contribuie la crearea a cel puțin un loc de muncă sustenabil."
    ],
    documents: [
      "Certificat de clasificare structură turistică (unde este cazul)",
      "Situații financiare 2024 și 2025",
      "Plan de investiții și oferte ferme"
    ],
    cofinancing: "10% din cheltuielile eligibile.",
    officialUrl: "https://www.regio-adrcentru.ro/",
    timeline: [
      { label: "Lansare apel", date: "1 Iunie 2026" },
      { label: "Termen limită", date: "30 Septembrie 2026" }
    ],
    faqs: [
      {
        question: "Se pot finanța lucrări de renovare?",
        answer: "Da, în limita a 40% din bugetul eligibil al proiectului."
      }
    ]
  }
];

export function formatCurrencyRon(value: number): string {
  return new Intl.NumberFormat("ro-RO", {
    style: "currency",
    currency: "RON",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatCurrencyEur(value: number): string {
  return new Intl.NumberFormat("ro-RO", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function calculateDaysRemaining(deadlineStr: string): number {
  const deadlineDate = new Date(`${deadlineStr}T23:59:59`);
  const diffTime = deadlineDate.getTime() - Date.now();
  return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
}
