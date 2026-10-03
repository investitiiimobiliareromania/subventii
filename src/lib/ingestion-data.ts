export type IngestionSourceAuthority =
  | "MIPE"
  | "AFIR"
  | "AFM"
  | "ADR"
  | "ANAF"
  | "BNR"
  | "ANCPI"
  | "Ministerul Economiei"
  | "Ministerul Energiei"
  | "Ministerul Agriculturii"
  | "Ministerul Cercetării"
  | "Monitorul Oficial"
  | "Comisia Europeană";

export type IngestionQueueItem = {
  id: string;
  sourceAuthority: IngestionSourceAuthority;
  itemType: "Programme" | "Legislation" | "Document" | "DeadlineUpdate";
  rawTitle: string;
  sourceUrl: string;
  detectedChanges: {
    changeType: "New Call" | "Budget Increased" | "Deadline Extended" | "Guide Revised";
    details: string;
  };
  detectedAt: string;
  status: "Pending Approval" | "Approved" | "Rejected";
};

export const sampleIngestionQueue: IngestionQueueItem[] = [
  {
    id: "ing-101",
    sourceAuthority: "Ministerul Economiei",
    itemType: "Programme",
    rawTitle: "Procedura de implementare Start-Up Nation 2024–2025 PEO",
    sourceUrl: "https://economie.gov.ro/programe-pentru-intreprinderi-mici-si-mijlocii/start-up-nation/",
    detectedChanges: {
      changeType: "New Call",
      details: "S-a publicat procedura oficială și modulul electronic de depunere a planurilor de afaceri pe granturi.imm.gov.ro.",
    },
    detectedAt: "2026-10-02T11:00:00Z",
    status: "Approved",
  },
  {
    id: "ing-102",
    sourceAuthority: "Ministerul Energiei",
    itemType: "Programme",
    rawTitle: "Ghidul Solicitantului — Autoconsum Întreprinderi (Fondul pentru Modernizare)",
    sourceUrl: "https://energie.gov.ro/fondul-pentru-modernizare/",
    detectedChanges: {
      changeType: "Budget Increased",
      details: "Alocarea financiară totală pentru apelul de proiecte solare și eoliene a fost majorată la 500 milioane EUR.",
    },
    detectedAt: "2026-10-01T15:30:00Z",
    status: "Approved",
  },
  {
    id: "ing-103",
    sourceAuthority: "MIPE",
    itemType: "Programme",
    rawTitle: "Ghidul Tehnic PoCIDIF — Tehnologii Avansate & Inteligență Artificială pentru IMM",
    sourceUrl: "https://mfe.gov.ro/pocidif-21-27/",
    detectedChanges: {
      changeType: "Guide Revised",
      details: "Au fost incluse cerințe specifice privind parteneriatele cu European Digital Innovation Hubs (EDIH).",
    },
    detectedAt: "2026-09-28T09:15:00Z",
    status: "Approved",
  },
  {
    id: "ing-104",
    sourceAuthority: "AFM",
    itemType: "Document",
    rawTitle: "Lista Actualizată a Instalatorilor Autorizați Casa Verde 2024–2026",
    sourceUrl: "https://www.afm.ro/casa_verde_fotovoltaice.php",
    detectedChanges: {
      changeType: "Guide Revised",
      details: "S-au adăugat 85 de noi companii de montaj fotovoltaic acreditate pentru instalarea bateriilor de stocare.",
    },
    detectedAt: "2026-09-25T14:20:00Z",
    status: "Approved",
  },
  {
    id: "ing-105",
    sourceAuthority: "ADR",
    itemType: "DeadlineUpdate",
    rawTitle: "Corrigendum 1 la Ghidul Microîntreprinderi PR Vest 1.3.A",
    sourceUrl: "https://vest.ro/programul-regional-vest/",
    detectedChanges: {
      changeType: "Deadline Extended",
      details: "Termenul limită de depunere în MySMIS a fost prelungit până la 15 noiembrie 2026.",
    },
    detectedAt: "2026-09-20T10:00:00Z",
    status: "Approved",
  },
  {
    id: "ing-106",
    sourceAuthority: "AFIR",
    itemType: "Programme",
    rawTitle: "Sesiune Depunere Proiecte DR-30 Instalare Tineri Fermieri (70.000 EUR)",
    sourceUrl: "https://www.afir.ro/finantare/programe-in-derulare/dr-30/",
    detectedChanges: {
      changeType: "New Call",
      details: "Deschiderea sesiunii de primire a cererilor de finanțare cu plafon maxim de depunere de 150% din alocare.",
    },
    detectedAt: "2026-09-15T08:30:00Z",
    status: "Approved",
  },
];
