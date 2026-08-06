import crypto from "crypto";
import type { DiffResult } from "../types";

export function computeContentHash(content: string): string {
  return crypto.createHash("sha256").update(content.trim()).digest("hex");
}

export function detectDiff(oldContent: string, newContent: string): DiffResult {
  const oldHash = computeContentHash(oldContent);
  const newHash = computeContentHash(newContent);

  if (oldHash === newHash) {
    return {
      hasChanges: false,
      contentHash: newHash,
      detectedType: "Guide Update",
      details: "Nicio modificare detectată față de versiunea precedentă.",
    };
  }

  const isDeadlineUpdate = newContent.toLowerCase().includes("termen") || newContent.toLowerCase().includes("prelungit");
  const isBudgetUpdate = newContent.toLowerCase().includes("buget") || newContent.toLowerCase().includes("suplimentat");

  let detectedType: "New Call" | "Guide Update" | "Deadline Extended" | "Budget Increased" = "Guide Update";
  if (isDeadlineUpdate) detectedType = "Deadline Extended";
  else if (isBudgetUpdate) detectedType = "Budget Increased";

  return {
    hasChanges: true,
    contentHash: newHash,
    detectedType,
    details: `Detectate modificări de conținut. Hash precedent: ${oldHash.substring(0, 8)}... → Hash nou: ${newHash.substring(0, 8)}...`,
  };
}
