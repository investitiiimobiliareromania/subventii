export type DownloadResource = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: "Ghid PDF" | "Model Plan de Afaceri" | "Declarație Notarială" | "Cerere Tip" | "Contract Model";
  fileFormat: "PDF" | "DOCX" | "XLSX";
  fileSizeMb: number;
  downloadUrl: string;
};

export const downloadableResourcesCatalog: DownloadResource[] = [
  {
    id: "res-1",
    slug: "ghid-solicitant-startup-nation-2026",
    title: "Ghidul Solicitantului Start-Up Nation 2026 (PDF Oficial)",
    description: "Manualul complet al programului cuprinzând grila de punctaj, codurile CAEN eligibile și instrucțiunile de înscriere.",
    category: "Ghid PDF",
    fileFormat: "PDF",
    fileSizeMb: 2.4,
    downloadUrl: "https://economie.gov.ro/startupnation2026.pdf",
  },
  {
    id: "res-2",
    slug: "model-plan-de-afaceri-2026",
    title: "Model Oficial Plan de Afaceri - Format Editabil (DOCX)",
    description: "Șablonul standard de plan de afaceri cerut în aplicațiile de finanțare nerambursabilă, cu secțiuni prevăzute pentru prognoza financiară.",
    category: "Model Plan de Afaceri",
    fileFormat: "DOCX",
    fileSizeMb: 0.8,
    downloadUrl: "https://economie.gov.ro/model_plan_afaceri.docx",
  },
  {
    id: "res-3",
    slug: "declaratie-de-minimis-model",
    title: "Declarație pe Propria Răspundere Ajutor de Minimis (DOCX)",
    description: "Formular tipizat pentru declararea ajutoarelor de minimis primite în ultimii 3 ani fiscali consecutivi.",
    category: "Declarație Notarială",
    fileFormat: "DOCX",
    fileSizeMb: 0.3,
    downloadUrl: "https://mfe.gov.ro/declaratie_minimis.docx",
  },
  {
    id: "res-4",
    slug: "calcul-buget-proiect-xlsx",
    title: "Machetă de Calcul Buget & Cashflow Proiect (XLSX)",
    description: "Fișier Excel automatizat pentru calculul indicatorilor de rentabilitate (VAN, RIR) și graficul de rambursare.",
    category: "Cerere Tip",
    fileFormat: "XLSX",
    fileSizeMb: 1.1,
    downloadUrl: "https://subventii.cristianvaduva.com/resources/macheta_buget.xlsx",
  },
];
