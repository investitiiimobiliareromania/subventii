export type EcosystemCategory =
  | "INTELLIGENCE"
  | "BUSINESS_FINANCE"
  | "REAL_ESTATE_LUXURY"
  | "MEDIA"
  | "PERSONAL";

export interface EcosystemNode {
  id: string;
  name: string;
  category: EcosystemCategory;
  categoryLabel: string;
  description: string;
  url: string;
  isExternal: boolean;
  badge?: string;
  cta: string;
}

export const AIX_ECOSYSTEM: EcosystemNode[] = [
  // INTELLIGENCE
  {
    id: "subventii-ro",
    name: "Subvenții.ro",
    category: "INTELLIGENCE",
    categoryLabel: "Inteligență Financiară & Fonduri",
    description: "Platforma Națională de Căutare și Indexare a Fondurilor Europene, PNRR și Guvernamentale.",
    url: "/",
    isExternal: false,
    badge: "Oficial",
    cta: "Explorează Finanțări",
  },
  {
    id: "aix-os",
    name: "AiX OS",
    category: "INTELLIGENCE",
    categoryLabel: "Sistem Operativ Antreprenorial",
    description: "Sistem integrat de automatizare, date sintetice și decizii strategice pentru afaceri.",
    url: "/admin",
    isExternal: false,
    badge: "Enterprise",
    cta: "Acces Portal OS",
  },
  {
    id: "market-pulse",
    name: "Market Pulse",
    category: "INTELLIGENCE",
    categoryLabel: "Indexul Imobiliar & Macro-Data",
    description: "Analiza evoluției prețurilor, tranzacțiilor ANCPI și indicilor financiari din România.",
    url: "/piata-imobiliara",
    isExternal: false,
    badge: "Live Index",
    cta: "Vezi Market Pulse",
  },

  // BUSINESS & FINANCE
  {
    id: "aix-credit",
    name: "AiX Credit",
    category: "BUSINESS_FINANCE",
    categoryLabel: "Finanțare Bănci & IRCC",
    description: "Calculator dobânzi IRCC, soluții de creditare IMM, refinanțări și împrumuturi corporative.",
    url: "/credite",
    isExternal: false,
    badge: "BNR Sync",
    cta: "Calculează Credite",
  },
  {
    id: "aix-insurance",
    name: "AiX Insurance",
    category: "BUSINESS_FINANCE",
    categoryLabel: "Protecție Riscuri & Asigurări",
    description: "Managementul riscului, asigurări de proprietate, răspundere profesională și garanții IMM.",
    url: "/asigurari",
    isExternal: false,
    badge: "Protecție IMM",
    cta: "Evaluează Asigurarea",
  },
  {
    id: "aix-health",
    name: "AiX Health",
    category: "BUSINESS_FINANCE",
    categoryLabel: "Asigurări Medicale & Bien-être",
    description: "Protecție de sănătate privată, abonamente medicale corporate și acoperire internațională.",
    url: "https://cristianvaduva.com",
    isExternal: true,
    badge: "Sănătate",
    cta: "Soluții Medicale",
  },

  // REAL ESTATE & LUXURY
  {
    id: "homefind",
    name: "HomeFind",
    category: "REAL_ESTATE_LUXURY",
    categoryLabel: "Proprietăți & Căutare Inteligente",
    description: "Căutare proactivă și potrivire algoritmică pentru investiții imobiliare în România.",
    url: "https://homefind.cristianvaduva.com",
    isExternal: true,
    badge: "PropTech",
    cta: "Vizitează HomeFind",
  },
  {
    id: "aix-luxury",
    name: "AiXLuxury",
    category: "REAL_ESTATE_LUXURY",
    categoryLabel: "Portofoliu Premium & Iahting",
    description: "Proprietăți exclusiviste, ambarcațiuni de lux și active imobiliare de mare valoare.",
    url: "https://linktr.ee/cristianvaduvarealestate",
    isExternal: true,
    badge: "Luxury",
    cta: "Portofoliu Exclusive",
  },

  // MEDIA
  {
    id: "aix-media",
    name: "AiX Media",
    category: "MEDIA",
    categoryLabel: "Publicații Video & Educație",
    description: "Analize video, interviuri imobiliare, podcasturi financiare și rapoarte de piață.",
    url: "https://youtube.com/@CristianVaduvaCV",
    isExternal: true,
    badge: "Media",
    cta: "Urmărește Emisiunile",
  },

  // PERSONAL
  {
    id: "cristian-vaduva",
    name: "Cristian Văduva",
    category: "PERSONAL",
    categoryLabel: "Fondator & Private Advisory",
    description: "Consultant de investiții, structurarea tranzacțiilor și reprezentare exclusivă.",
    url: "https://cristianvaduva.com",
    isExternal: true,
    badge: "Private",
    cta: "Profil & Contact",
  },
];

export function getEcosystemByCategory() {
  const categories: Record<EcosystemCategory, { label: string; items: EcosystemNode[] }> = {
    INTELLIGENCE: { label: "Inteligență & Date", items: [] },
    BUSINESS_FINANCE: { label: "Finanțe & Protecție", items: [] },
    REAL_ESTATE_LUXURY: { label: "Imobiliare & Luxury", items: [] },
    MEDIA: { label: "Media & Conținut", items: [] },
    PERSONAL: { label: "Private Advisory", items: [] },
  };

  for (const item of AIX_ECOSYSTEM) {
    categories[item.category].items.push(item);
  }

  return categories;
}
