export type EcosystemCategory =
  | "INTELLIGENCE"
  | "FINANCE"
  | "REAL_ESTATE"
  | "MEDIA"
  | "PERSONAL";

export interface EcosystemNode {
  id: string;
  name: string;
  category: EcosystemCategory;
  categoryLabel: string;
  description: string;
  href: string;
  external: true;
  badge?: string;
  cta: string;
}

export const AIX_ECOSYSTEM: EcosystemNode[] = [
  // AI / INTELLIGENCE
  {
    id: "os",
    name: "AiX OS",
    category: "INTELLIGENCE",
    categoryLabel: "AI / Intelligence",
    description: "Sistem operativ integrat de automatizare, date sintetice și decizii strategice.",
    href: "https://os.cristianvaduva.com",
    external: true,
    badge: "Enterprise",
    cta: "Explore OS →",
  },
  {
    id: "health",
    name: "AiX Health",
    category: "INTELLIGENCE",
    categoryLabel: "AI / Intelligence",
    description: "Digital health intelligence, protocoale personalizate și medicina viitorului.",
    href: "https://health.cristianvaduva.com",
    external: true,
    badge: "Health",
    cta: "Explore Health →",
  },
  {
    id: "subventii",
    name: "Subvenții.ro",
    category: "INTELLIGENCE",
    categoryLabel: "AI / Intelligence",
    description: "Platforma națională de căutare și indexare a fondurilor nerambursabile.",
    href: "https://subventii.cristianvaduva.com",
    external: true,
    badge: "Oficial",
    cta: "Explore Subvenții →",
  },
  {
    id: "market-pulse",
    name: "Market Pulse",
    category: "INTELLIGENCE",
    categoryLabel: "Market Intelligence",
    description: "Analiza evoluției prețurilor, tranzacțiilor ANCPI și indicilor macroeconomici.",
    href: "https://cristianvaduva.com/market-pulse",
    external: true,
    badge: "Live Data",
    cta: "Explore Market Pulse →",
  },

  // FINANCE
  {
    id: "credite",
    name: "Credite",
    category: "FINANCE",
    categoryLabel: "Finance",
    description: "Calculator dobânzi IRCC, soluții de creditare IMM, refinanțări și structurare.",
    href: "https://credite.cristianvaduva.com",
    external: true,
    badge: "BNR Sync",
    cta: "Explore Credits →",
  },
  {
    id: "insurance",
    name: "Insurance",
    category: "FINANCE",
    categoryLabel: "Insurance",
    description: "Managementul riscului, asigurări de proprietate, răspundere și garanții IMM.",
    href: "https://insurance.cristianvaduva.com",
    external: true,
    badge: "Protecție",
    cta: "Explore Insurance →",
  },

  // REAL ESTATE
  {
    id: "homefind",
    name: "HomeFind",
    category: "REAL_ESTATE",
    categoryLabel: "Real Estate",
    description: "Căutare proactivă și potrivire algoritmică pentru investiții imobiliare.",
    href: "https://homefind.cristianvaduva.com",
    external: true,
    badge: "PropTech",
    cta: "Explore HomeFind →",
  },
  {
    id: "aixluxury",
    name: "AiXLuxury",
    category: "REAL_ESTATE",
    categoryLabel: "Real Estate",
    description: "Proprietăți exclusiviste, active imobiliare de mare valoare și ambarcațiuni.",
    href: "https://aixluxury.com",
    external: true,
    badge: "Luxury",
    cta: "Explore AiX Luxury →",
  },

  // MEDIA
  {
    id: "aixmedia",
    name: "AiX Media",
    category: "MEDIA",
    categoryLabel: "Media & Intelligence",
    description: "Platformă de jurnalism de afaceri, emisiuni video, analiză financiară și radio.",
    href: "https://aixmedia.cristianvaduva.com",
    external: true,
    badge: "Media Hub",
    cta: "Explore AiX Media →",
  },

  // PERSONAL
  {
    id: "cristianvaduva",
    name: "Cristian Văduva",
    category: "PERSONAL",
    categoryLabel: "Personal Brand",
    description: "Consultant de investiții, structurarea tranzacțiilor și reprezentare exclusivă.",
    href: "https://cristianvaduva.com",
    external: true,
    badge: "Advisory",
    cta: "Visit Cristian Văduva →",
  },
];

export function getEcosystemByCategory(): Record<
  EcosystemCategory,
  { label: string; items: EcosystemNode[] }
> {
  return {
    INTELLIGENCE: {
      label: "AI / Intelligence",
      items: AIX_ECOSYSTEM.filter((n) => n.category === "INTELLIGENCE"),
    },
    FINANCE: {
      label: "Finance",
      items: AIX_ECOSYSTEM.filter((n) => n.category === "FINANCE"),
    },
    REAL_ESTATE: {
      label: "Real Estate",
      items: AIX_ECOSYSTEM.filter((n) => n.category === "REAL_ESTATE"),
    },
    MEDIA: {
      label: "Media",
      items: AIX_ECOSYSTEM.filter((n) => n.category === "MEDIA"),
    },
    PERSONAL: {
      label: "Personal",
      items: AIX_ECOSYSTEM.filter((n) => n.category === "PERSONAL"),
    },
  };
}

export const getEcosystemCategorized = getEcosystemByCategory;
