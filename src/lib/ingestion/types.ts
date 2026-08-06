export type IngestionSource = "MIPE" | "AFIR" | "AFM" | "MEAT" | "Monitorul Oficial" | "ANCPI";

export type IngestionItem = {
  id: string;
  source: IngestionSource;
  rawTitle: string;
  sourceUrl: string;
  contentHash: string;
  detectedChanges: {
    changeType: "New Call" | "Guide Update" | "Deadline Extended" | "Budget Increased";
    summary: string;
    fieldsChanged?: string[];
  };
  confidenceScore: number; // 0 to 1
  timestamp: string;
  validationStatus: "Pending" | "Approved" | "Rejected";
};

export type DiffResult = {
  hasChanges: boolean;
  contentHash: string;
  detectedType: "New Call" | "Guide Update" | "Deadline Extended" | "Budget Increased";
  details: string;
};
