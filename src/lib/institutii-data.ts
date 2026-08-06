export type PublicInstitution = {
  slug: string;
  name: string;
  acronym: string;
  officialDomain: string;
  supportEmail: string;
  address: string;
  summary: string;
  responsibilities: string[];
  activeProgramsCount: number;
  faqs: { question: string; answer: string }[];
};

export const institutionsCatalog: PublicInstitution[] = [
  {
    slug: "mipe",
    name: "Ministerul Investițiilor și Proiectelor Europene",
    acronym: "MIPE",
    officialDomain: "mfe.gov.ro",
    supportEmail: "contact.minister@mfe.gov.ro",
    address: "Șoseaua București-Ploiești 1-1B, București",
    summary: "Autoritatea centrală de coordonare a fondurilor de coeziune ale Uniunii Europene și a Planului Național de Redresare și Reziliență (PNRR) în România.",
    responsibilities: [
      "Gestionarea Programului Sănătate, Programului Educație și Ocupare și Programului Inclusion.",
      "Coordonarea reformelor și investițiilor din PNRR.",
      "Aprobarea Ghidurilor Solicitantului pentru Programele Naționale PoIDS și PoCID.",
    ],
    activeProgramsCount: 14,
    faqs: [
      { question: "Cum se depun proiectele MIPE?", answer: "Proiectele se depun exclusiv online în portalul MySMIS2021/PNRR." },
    ],
  },
  {
    slug: "afir",
    name: "Agenția pentru Finanțarea Investițiilor Rurale",
    acronym: "AFIR",
    officialDomain: "afir.ro",
    supportEmail: "relatii.publice@afir.info",
    address: "Str. Știrbei Vodă nr. 43, București",
    summary: "Agenția națională responsabilă cu derularea Fondului European Agricol pentru Dezvoltare Rurală (FEADR) și a Planului Strategic PAC 2023-2027.",
    responsibilities: [
      "Finanțarea fermierilor, tinerilor fermieri și procesatorilor din mediul rural.",
      "Subvenționarea achiziției de tractoare și utilaje agricole.",
      "Sprijinirea infrastructurii rurale și a fermelor de familie.",
    ],
    activeProgramsCount: 8,
    faqs: [
      { question: "Unde se află depunerea AFIR?", answer: "Depunerea se efectuează online pe portalul www.afir.ro." },
    ],
  },
  {
    slug: "afm",
    name: "Administrația Fondului pentru Mediu",
    acronym: "AFM",
    officialDomain: "afm.ro",
    supportEmail: "comunicare@afm.ro",
    address: "Calea Splaiul Independenței nr. 294, București",
    summary: "Instituția publică ce derulează programele naționale de protecție a mediului, inclusiv Casa Verde, Rabla și Autoconsum Fotovoltaic.",
    responsibilities: [
      "Derularea programului Casa Verde Fotovoltaice.",
      "Finanțarea infrastructurii de reîncărcare vehicule electrice.",
      "Derularea programului Rabla Clasic și Rabla Plus.",
    ],
    activeProgramsCount: 6,
    faqs: [
      { question: "Cum aflu lista instalatorilor validați?", answer: "Lista este publicată direct în aplicația informatică AFM." },
    ],
  },
  {
    slug: "ministerul-economiei",
    name: "Ministerul Economiei, Antreprenoriatului și Turismului",
    acronym: "MEAT",
    officialDomain: "economie.gov.ro",
    supportEmail: "presa@economie.gov.ro",
    address: "Calea Victoriei nr. 152, București",
    summary: "Ministerul de resort ce administrează ajutoarele de stat naționale destinate IMM-urilor, Start-Up Nation și dezvoltării turismului.",
    responsibilities: [
      "Gestionarea programului Start-Up Nation.",
      "Programul de Microindustrializare și Comerț/Servicii.",
      "Promovarea turismului și atragerea de investiții străine.",
    ],
    activeProgramsCount: 5,
    faqs: [
      { question: "Cum pot contacta agenția teritorială MEAT?", answer: "Prin intermediul birourilor regionale de antreprenoriat (TIMM)." },
    ],
  },
  {
    slug: "ancpi",
    name: "Agenția Națională de Cadastru și Publicitate Imobiliară",
    acronym: "ANCPI",
    officialDomain: "ancpi.ro",
    supportEmail: "ancpi@ancpi.ro",
    address: "Splaiul Independenței 202A, București",
    summary: "Instituția publică însărcinată cu înregistrarea sistematică a imobilelor în sistemul integrat de cadastru și carte funciară din România.",
    responsibilities: [
      "Derularea Programului Național de Cadastru și Carte Funciară (PNCF).",
      "Publicarea datelor statistice lunare privind tranzacțiile imobiliare.",
      "Administrarea geoportalului național ANCPI.",
    ],
    activeProgramsCount: 2,
    faqs: [
      { question: "Cum obțin un extras de carte funciară online?", answer: "Prin contul creat pe platforma epay.ancpi.ro." },
    ],
  },
];
