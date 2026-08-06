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
    sourceAuthority: "MIPE",
    itemType: "Programme",
    rawTitle: "Corrigendum 2 la Ghidul Solicitantului - PNRR C9 Digitalizare IMM",
    sourceUrl: "https://mfe.gov.ro/pnrr-c9-corrigendum2.pdf",
    detectedChanges: {
      changeType: "Deadline Extended",
      details: "Termenul limită de depunere a fost prelungit de la 15 august 2026 la 15 septembrie 2026.",
    },
    detectedAt: "2026-08-06T10:15:00Z",
    status: "Pending Approval",
  },
  {
    id: "ing-102",
    sourceAuthority: "AFM",
    itemType: "Document",
    rawTitle: "Lista Actualizată a Instalatorilor Autorizați Casa Verde 2026",
    sourceUrl: "https://afm.ro/instalatori_august_2026.pdf",
    detectedChanges: {
      changeType: "Guide Revised",
      details: "S-au adăugat 45 de noi firme de montaj fotovoltaic acreditate.",
    },
    detectedAt: "2026-08-06T09:30:00Z",
    status: "Pending Approval",
  },
  {
    id: "ing-103",
    sourceAuthority: "Monitorul Oficial",
    itemType: "Legislation",
    rawTitle: "OUG 115/2026 privind scutirile fiscale pentru echipamente industriale ecologice",
    sourceUrl: "https://monitoruloficial.ro",
    detectedChanges: {
      changeType: "New Call",
      details: "Intrare în vigoare noi facilități fiscale la impozitul pe profit.",
    },
    detectedAt: "2026-08-05T16:00:00Z",
    status: "Approved",
  },
];
