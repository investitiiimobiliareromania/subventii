const ALLOWED_AUTHORITY_DOMAINS = [
  "mfe.gov.ro",
  "economie.gov.ro",
  "afir.ro",
  "afm.ro",
  "gov.ro",
  "ancpi.ro",
  "insse.ro",
  "bnro.ro",
  "monitoruloficial.ro",
];

export function validateSourceUrl(url: string): { isValid: boolean; reason?: string } {
  try {
    const parsed = new URL(url);
    const domain = parsed.hostname.toLowerCase();

    const isWhitelisted = ALLOWED_AUTHORITY_DOMAINS.some(
      (approved) => domain === approved || domain.endsWith("." + approved)
    );

    if (!isWhitelisted) {
      return {
        isValid: false,
        reason: `Domeniul ${domain} nu se află în lista autorităților publice aprobate.`,
      };
    }

    return { isValid: true };
  } catch {
    return { isValid: false, reason: "URL nevalid." };
  }
}

export function calculateConfidenceScore(title: string, content: string, urlValid: boolean): number {
  let score = 0.5;
  if (urlValid) score += 0.3;
  if (title.length > 10) score += 0.1;
  if (content.length > 50) score += 0.1;
  return Math.min(1.0, score);
}
