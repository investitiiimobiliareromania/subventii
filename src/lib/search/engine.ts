import { type FundingProgram, programs } from "@/lib/funding-data";

export type SearchQueryParams = {
  q?: string;
  caen?: string;
  county?: string;
  businessType?: string;
  industry?: string;
  status?: string;
  companyAge?: string;
  companySize?: string;
  sourceCategory?: string;
};

const SYNONYM_DICTIONARY: Record<string, string[]> = {
  "6201": ["it", "software", "digitalizare", "codare", "programare"],
  "5610": ["restaurant", "horeca", "servicii alimentatie", "cantina"],
  "0111": ["ferma", "agricultura", "cultivare", "afir", "cereale"],
  "tractor": ["afir", "utilaj agricol", "agricultura", "ferma"],
  "panouri": ["afm", "fotovoltaic", "energie verde", "autoconsum"],
  "startup": ["start-up nation", "firma noua", "microintreprindere"],
};

export function resolveSynonyms(query: string): string[] {
  const normalized = query.toLowerCase().trim();
  const matches: string[] = [normalized];

  for (const [key, synonyms] of Object.entries(SYNONYM_DICTIONARY)) {
    if (key === normalized || synonyms.includes(normalized)) {
      matches.push(key, ...synonyms);
    }
  }

  return Array.from(new Set(matches));
}

export function executeSearch(
  allPrograms: FundingProgram[],
  params: SearchQueryParams
): FundingProgram[] {
  const synonyms = params.q ? resolveSynonyms(params.q) : [];

  return allPrograms.filter((program) => {
    // Search Term Matching
    if (synonyms.length > 0) {
      const haystack = [
        program.title,
        program.summary,
        program.source,
        program.sourceCategory,
        ...program.industries,
        ...program.businessTypes,
      ]
        .join(" ")
        .toLowerCase();

      const matchesQuery = synonyms.some((term) => haystack.includes(term));
      if (!matchesQuery) return false;
    }

    // Filters
    if (params.businessType && params.businessType !== "Toate formele") {
      if (!program.businessTypes.includes(params.businessType)) return false;
    }

    if (params.industry && params.industry !== "Toate domeniile") {
      if (!program.industries.includes(params.industry)) return false;
    }

    if (params.county && params.county !== "Toate județele") {
      const matchCounty =
        program.counties.includes(params.county) || program.counties.includes("Național");
      if (!matchCounty) return false;
    }

    if (params.status && params.status !== "Toate statusurile") {
      if (program.status !== params.status) return false;
    }

    if (params.companyAge && params.companyAge !== "Orice vechime") {
      if (program.companyAge !== params.companyAge) return false;
    }

    if (params.companySize && params.companySize !== "Toate mărimile") {
      if (
        program.companySize !== params.companySize &&
        program.companySize !== "Toate mărimile"
      ) {
        return false;
      }
    }

    if (params.sourceCategory && params.sourceCategory !== "Toate sursele") {
      if (program.sourceCategory !== params.sourceCategory) return false;
    }

    return true;
  });
}
