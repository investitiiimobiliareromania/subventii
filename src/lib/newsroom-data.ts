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
  publishedAt: string;
  updatedAt: string;
  author: string;
  readingTimeMin: number;
  faqs: { question: string; answer: string }[];
};

export const newsroomArticles: NewsArticle[] = [
  {
    slug: "start-up-nation-2026-ghid-oficial",
    headline: "Ghidul Oficial Start-Up Nation 2026: Buget de 400 Milioane Euro și Noi Condiții de Punctaj",
    summary: "Ministerul Economiei a publicat ghidul oficial Start-Up Nation 2026. Se acordă un punctaj superior investițiilor în digitalizare și echipamente de energie verde.",
    content: `
# Ghidul Oficial Start-Up Nation 2026

Programul național **Start-Up Nation 2026** aduce fonduri nerambursabile de până la **250.000 RON** (cca. 50.000 EUR) pentru fiecare întreprindere nou înființată. Cu un buget total alocat de peste 400 milioane euro, ediția din acest an prioritizează afacerile inovatoare și ecologice.

## Condiții de Punctaj și Criterii de Eligibilitate
1. **Formare profesională obligatorie**: Solicitantul trebuie să fi absolvit cursurile de antreprenoriat organizate în cadrul Pilonului I.
2. **Creare locuri de muncă**: Minimum 2 locuri de muncă cu normă întreagă menținute pe o perioadă de cel puțin 2 ani.
3. **Cofinanțare proprie**: Minimum 10% din valoarea cheltuielilor eligibile.

## Cheltuieli Eligibile
- Echipamente tehnologice și utilaje industriale.
- Echipamente de producție de energie verde (fotovoltaice, pompe de căldură).
- Pachet digital (site web, software ERP/CRM, promovare online).
- Spații de lucru, mobilier și utilități.
    `,
    category: "SMEs",
    impactAnalysis: "Sprijină crearea a peste 15.000 de locuri de muncă noi și stimularea spiritului antreprenorial în rândul tinerilor și absolvenților de studii tehnice.",
    whoIsAffected: "Tineri antreprenori, persoane neangajate, absolvenți de facultate și persoane fizice care doresc să înființeze un SRL.",
    relatedProgrammes: ["start-up-nation-2026", "microgranturi-2026"],
    officialDocuments: [
      { title: "Ghidul Solicitantului Start-Up Nation 2026 (PDF)", url: "https://economie.gov.ro/startupnation2026.pdf" },
      { title: "Grila de Punctaj Oficială (PDF)", url: "https://economie.gov.ro/grila_punctaj.pdf" },
    ],
    institution: "Ministerul Economiei, Antreprenoriatului și Turismului",
    publishedAt: "2026-07-28",
    updatedAt: "2026-08-01",
    author: "Cristian Văduva",
    readingTimeMin: 6,
    faqs: [
      {
        question: "Pot aplica dacă am mai avut o firmă în trecut?",
        answer: "Da, cu condiția ca societatea actuală să fie înființată după absolvirea cursului de formare profesională prevăzut de ghid.",
      },
      {
        question: "Cât durează perioada de evaluare?",
        answer: "Evaluarea dosarelor durează aproximativ 60 de zile calendaristice de la închiderea sesiunii de depunere.",
      },
    ],
  },
  {
    slug: "casa-verde-fotovoltaice-2026-sesiune-noua",
    headline: "AFM Aprobă Ghidul Casa Verde Fotovoltaice 2026: Subvenții de 30.000 RON pentru Persoane Fizice",
    summary: "Administrația Fondului pentru Mediu majorează subvenția la 30.000 RON și introduce obligativitatea stocării energiei în acumulatori de minimum 5 kWh.",
    content: `
# Casa Verde Fotovoltaice 2026

Noul ghid aprobat de AFM crește valoarea finanțării nerambursabile la **30.000 RON** pentru fiecare persoană fizică ce dorește instalarea unui sistem fotovoltaic hibrid cu stocare.

## Noutățile Sesiunii 2026
- Finanțarea acoperă acum și baterii de stocare a energiei solare de minimum 5 kWh.
- Contribuția proprie a solicitantului este fixată la 3.000 RON.
- Bugetul total este de 2 miliarde RON, asigurând finanțare pentru peste 66.000 de gospodării.
    `,
    category: "Energy",
    impactAnalysis: "Accelerarea autonomiei energetice a gospodăriilor și reducerea presiunii pe rețeaua națională de distribuție electrică.",
    whoIsAffected: "Proprietari de case individuale, unități de cult și asociații de proprietari din toate județele României.",
    relatedProgrammes: ["casa-verde-2026", "reabilitare-termica-2026"],
    officialDocuments: [
      { title: "Ordin de Ministru Ghid Casa Verde 2026", url: "https://afm.ro/casa_verde_2026.pdf" },
    ],
    institution: "Administrația Fondului pentru Mediu (AFM)",
    publishedAt: "2026-07-20",
    updatedAt: "2026-08-02",
    author: "Elena Popescu",
    readingTimeMin: 5,
    faqs: [
      {
        question: "Care este capacitatea minimă a panourilor?",
        answer: "Sistemul fotovoltaic trebuie să aibă o putere instalată de minimum 4 kWp.",
      },
    ],
  },
];
