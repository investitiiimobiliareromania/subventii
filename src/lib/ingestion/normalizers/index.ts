import type { IngestionItem, IngestionSource } from "../types";
import { computeContentHash } from "../diff-engine";
import { validateSourceUrl, calculateConfidenceScore } from "../validators";

export function normalizeRawPayload(
  source: IngestionSource,
  rawTitle: string,
  sourceUrl: string,
  rawContent: string
): IngestionItem {
  const urlCheck = validateSourceUrl(sourceUrl);
  const contentHash = computeContentHash(rawContent);
  const confidenceScore = calculateConfidenceScore(rawTitle, rawContent, urlCheck.isValid);

  return {
    id: `ing-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    source,
    rawTitle: rawTitle.trim(),
    sourceUrl: sourceUrl.trim(),
    contentHash,
    detectedChanges: {
      changeType: "New Call",
      summary: `Detectat automat din fluxul oficial ${source}.`,
    },
    confidenceScore,
    timestamp: new Date().toISOString(),
    validationStatus: "Pending",
  };
}
