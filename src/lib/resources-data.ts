export type DownloadResource = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: "Ghid Solicitant" | "Formular APIA" | "Model Plan de Afaceri" | "Declarație Tip" | "Contract Model" | "Ghid Tehnic";
  institution: "APIA" | "AFIR" | "MADR" | "AFM" | "MEAT" | "MIPE";
  fileFormat: "PDF" | "DOCX" | "XLSX";
  fileSizeMb: number;
  downloadUrl: string;
  officialSource: string;
};

export const downloadableResourcesCatalog: DownloadResource[] = [
  {
    id: "res-apia-1",
    slug: "ghid-solicitant-plati-directe-apia-2026",
    title: "Ghidul Solicitantului APIA — Plăți Directe și Eco-Scheme (PDF Oficial)",
    description: "Manualul complet editat de APIA cuprinzând condițiile de eligibilitate, descrierea fiecărei intervenții (BISS, CRISS, CIS-YF, Eco-scheme), normele BGAO și pașii de completare în IPA Online.",
    category: "Ghid Solicitant",
    institution: "APIA",
    fileFormat: "PDF",
    fileSizeMb: 4.8,
    downloadUrl: "https://apia.org.ro/ghid_plati_directe_2026.pdf",
    officialSource: "https://apia.org.ro",
  },
  {
    id: "res-apia-2",
    slug: "adeverinta-registru-agricol-model-apia",
    title: "Model Oficial Adeverință Primărie — Înscrisuri Registrul Agricol (DOCX)",
    description: "Formularul tipizat emis de primării conform Anexei la Ordinul MADR nr. 80/2023, obligatoriu la depunerea cererii de plată pentru atestarea suprafețelor agricole și a efectivelor de animale.",
    category: "Formular APIA",
    institution: "APIA",
    fileFormat: "DOCX",
    fileSizeMb: 0.4,
    downloadUrl: "https://apia.org.ro/model_adeverinta_registru_agricol.docx",
    officialSource: "https://apia.org.ro",
  },
  {
    id: "res-afir-1",
    slug: "ghid-solicitant-dr30-tineri-fermieri",
    title: "Ghidul Solicitantului AFIR DR-30 — Instalarea Tinerilor Fermieri (PDF Oficial)",
    description: "Ghidul oficial aprobat de MADR pentru accesarea grantului de 70.000 EUR, grila de punctaj de selecție și instrucțiunile de completare a cererii de finanțare online pe portalul AFIR.",
    category: "Ghid Solicitant",
    institution: "AFIR",
    fileFormat: "PDF",
    fileSizeMb: 3.2,
    downloadUrl: "https://www.afir.ro/ghid_dr30_tineri_fermieri.pdf",
    officialSource: "https://www.afir.ro",
  },
  {
    id: "res-afir-2",
    slug: "model-plan-afaceri-dr30-editabil",
    title: "Planul de Afaceri Tipizat AFIR DR-30 — Format Editabil (DOCX)",
    description: "Șablonul oficial de plan de afaceri pe 3 ani necesar tinerilor fermieri, incluzând structura de calcul a Standard Output-ului (SO) și etapele obligatorii de dezvoltare a fermei.",
    category: "Model Plan de Afaceri",
    institution: "AFIR",
    fileFormat: "DOCX",
    fileSizeMb: 1.1,
    downloadUrl: "https://www.afir.ro/model_plan_afaceri_dr30.docx",
    officialSource: "https://www.afir.ro",
  },
  {
    id: "res-afir-3",
    slug: "ghid-dr25-modernizare-irigatii-ouai",
    title: "Ghidul Solicitantului AFIR DR-25 — Modernizare Irigații OUAI (PDF Oficial)",
    description: "Manualul complet pentru accesarea sprijinului 100% nerambursabil de 1.500.000 EUR destinat Organizațiilor Utilizatorilor de Apă pentru Irigații.",
    category: "Ghid Solicitant",
    institution: "AFIR",
    fileFormat: "PDF",
    fileSizeMb: 2.9,
    downloadUrl: "https://www.afir.ro/ghid_dr25_irigatii.pdf",
    officialSource: "https://www.afir.ro",
  },
  {
    id: "res-madr-1",
    slug: "cerere-acord-prealabil-motorina-agricola",
    title: "Cerere de Acord Prealabil Subvenție Motorină în Agricultură (DOCX)",
    description: "Cererea tipizată pentru acordarea ajutorului de stat pentru reducerea accizei la motorină, depusă anual de către fermierii cu utilaje agricole active.",
    category: "Formular APIA",
    institution: "MADR",
    fileFormat: "DOCX",
    fileSizeMb: 0.3,
    downloadUrl: "https://apia.org.ro/cerere_acord_prealabil_motorina.docx",
    officialSource: "https://apia.org.ro",
  },
  {
    id: "res-madr-2",
    slug: "contract-arendare-teren-agricol-model-legal",
    title: "Model Cadru Contract de Arendare Teren Agricol conform Codului Civil (DOCX)",
    description: "Contract tipizat de arendă conform prevederilor Legii nr. 287/2009 privind Codul Civil, obligatoriu pentru înregistrarea la primărie și dovedirea utilizării terenului la APIA.",
    category: "Contract Model",
    institution: "MADR",
    fileFormat: "DOCX",
    fileSizeMb: 0.5,
    downloadUrl: "https://madr.ro/model_contract_arendare_agricol.docx",
    officialSource: "https://madr.ro",
  },
  {
    id: "res-afm-1",
    slug: "ghid-finantare-rabla-tractoare-afm",
    title: "Ghidul de Finanțare Programul Rabla pentru Tractoare AFM (PDF)",
    description: "Instrucțiunile oficiale ale Administrației Fondului pentru Mediu privind înscrierea fermierilor, casarea utilajelor vechi și plafonul de finanțare de până la 20.000 EUR.",
    category: "Ghid Solicitant",
    institution: "AFM",
    fileFormat: "PDF",
    fileSizeMb: 1.8,
    downloadUrl: "https://www.afm.ro/ghid_rabla_tractoare.pdf",
    officialSource: "https://www.afm.ro",
  },
  {
    id: "res-calcul-1",
    slug: "calculator-buget-investitie-agricola-xlsx",
    title: "Machetă Excel Calcul Buget & Cashflow Fermă Agricolă (XLSX)",
    description: "Fișier automatizat cu formule pentru calculul indicatorilor de rentabilitate (VAN, RIR, perioada de recuperare a investiției) necesar la depunerea proiectelor de finanțare AFIR.",
    category: "Model Plan de Afaceri",
    institution: "AFIR",
    fileFormat: "XLSX",
    fileSizeMb: 1.2,
    downloadUrl: "https://subventii.cristianvaduva.com/resources/macheta_buget_ferma.xlsx",
    officialSource: "https://www.afir.ro",
  },
];
