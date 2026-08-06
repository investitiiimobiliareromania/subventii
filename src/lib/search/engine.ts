import { type FundingProgram } from "@/lib/funding-data";

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
  "6201": ["it", "software", "digitalizare", "codare", "programare", "aplicatii", "cloud"],
  "5610": ["restaurant", "horeca", "servicii alimentatie", "cantina", "catering", "pizzerie"],
  "0111": ["ferma", "agricultura", "cultivare", "afir", "cereale", "grau", "porumb"],
  "tractor": ["afir", "utilaj agricol", "agricultura", "ferma", "kombina"],
  "panouri": ["afm", "fotovoltaic", "energie verde", "autoconsum", "prosumator", "inverter", "casa verde"],
  "startup": ["start-up nation", "firma noua", "microintreprindere", "antreprenoriat"],
  "casa verde": ["afm", "fotovoltaice", "baterii", "stocare", "energie curata"],
  "noua casa": ["credit ipotecar", "banca", "fngcimm", "avans 5", "prima casa"],
  "ancpi": ["cadastru", "tranzactii imobiliare", "carte funciara", "pret pe metru patrat"],
  "legislatie": ["oug", "ordonanta", "cod fiscal", "lege", "monitorul oficial"],
  "asigurare": ["pad", "locuinta", "car", "raspundere civila", "incendiu"],
  "credite": ["ircc", "robor", "dobanda fixa", "banca", "refinantare"],
};

export function removeDiacritics(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/ă|â/g, "a")
    .replace(/î/g, "i")
    .replace(/ș|ş/g, "s")
    .replace(/ț|ţ/g, "t");
}

export function resolveSynonyms(query: string): string[] {
  const normalized = removeDiacritics(query.trim());
  const matches: string[] = [normalized];

  for (const [key, synonyms] of Object.entries(SYNONYM_DICTIONARY)) {
    const keyNorm = removeDiacritics(key);
    const synNorms = synonyms.map(removeDiacritics);

    if (keyNorm === normalized || synNorms.includes(normalized)) {
      matches.push(keyNorm, ...synNorms);
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
    // Search Term Matching with Unaccent & Stemming
    if (synonyms.length > 0) {
      const rawHaystack = [
        program.title,
        program.summary,
        program.source,
        program.sourceCategory,
        ...program.industries,
        ...program.businessTypes,
      ].join(" ");
      
      const haystack = removeDiacritics(rawHaystack);
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
