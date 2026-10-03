import { type FundingProgram, FUNDING_PROGRAMS } from "@/lib/funding-data";
import { newsroomArticles } from "@/lib/newsroom-data";
import { legislationCatalog } from "@/lib/legislatie-data";
import { downloadableResourcesCatalog } from "@/lib/resources-data";
import { countyProfilesCatalog } from "@/lib/county-data";
import { SECTORS_CATALOG } from "@/lib/sectoare-data";

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
  objective?: string;
  fundingType?: string;
};

export type UnifiedSearchResult = {
  id: string;
  type: "FINANȚARE IMM" | "GRANT & FONDURI EU" | "ENERGIE & MEDIU" | "SUBVENȚIE" | "INTERVENȚIE AFIR" | "ȘTIRE" | "LEGISLAȚIE" | "JUDEȚ" | "SECTOR" | "DOCUMENT";
  title: string;
  summary: string;
  url: string;
  badge: string;
  highlightMeta?: string;
};

const SYNONYM_DICTIONARY: Record<string, string[]> = {
  "subventie": ["apia", "fega", "plata directa", "biss", "criss", "scz", "sprijin cuplat", "eco-schema", "fonduri agricole"],
  "apia": ["subventie", "biss", "criss", "teren arabil", "pasune", "scz", "ipa online", "adeverinta primarie"],
  "afir": ["feadr", "fonduri europene", "investitii", "dr-14", "dr-15", "dr-20", "dr-22", "dr-25", "dr-26", "dr-27", "dr-28", "dr-30", "tineri fermieri", "utilaje"],
  "vaci": ["bovine", "scz", "lapte", "carne", "taurine", "baltata", "pd-21", "pd-22", "zootehnie"],
  "oi": ["ovine", "caprine", "scz", "turcana", "karakul", "pd-24", "pasune", "uvm", "berbeci"],
  "tractor": ["utilaje", "mecanizare", "afm", "rabla tractoare", "dr-14", "dr-15", "combine", "semanatoare"],
  "irigatii": ["ouai", "anif", "dr-25", "dr-26", "hidroamelioratii", "apa", "pompare", "seceta"],
  "tineri fermieri": ["dr-30", "cis-yf", "instalare", "70000 euro", "grant tineri", "sub 40 ani"],
  "motorina": ["acciza", "ajutor de stat", "madr", "restituire acciza", "litru motorina"],
  "soia": ["pd-09", "leguminoase", "proteina vegetala", "sprijin cuplat soia"],
  "lucerna": ["pd-10", "furaje", "fan", "sprijin cuplat lucerna"],
  "livezi": ["pomicultura", "dr-27", "mere", "prune", "cirese", "fructe"],
  "vii": ["viticultura", "vinuri", "reconversie", "doc", "crama", "onvpv"],
  "sere": ["legumicultura", "solarii", "tomata", "dr-28", "matca", "izbiceni"],
  "startup": ["start-up nation", "meat", "firma noua", "microintreprindere", "antreprenoriat", "fonduri start up", "granturi afaceri noi"],
  "imm": ["dezvoltare", "competitivitate", "microintreprindere", "adr", "fonduri imm", "granturi mici", "echipamente", "linii productie"],
  "digitalizare": ["software", "cloud", "it", "cybersecurity", "pocidif", "pnrr c9", "automatizare", "erp", "crm", "ai", "robotica", "transformare digitala"],
  "energie": ["fotovoltaice", "panouri solare", "eolian", "baterii", "stocare", "autoconsum", "fondul modernizare", "afm", "casa verde", "eficienta energetica"],
  "casa verde": ["afm", "fotovoltaice", "baterii", "stocare", "energie curata", "prosumator"],
  "tranzitie justa": ["ptj", "gorj", "hunedoara", "dolj", "galati", "prahova", "mures", "minerit", "decarbonizare"],
  "femeia antreprenor": ["meat", "femei", "antreprenoriat feminin", "grant 200000"],
  "inovare": ["cercetare", "cdi", "eic", "horizon europe", "eurostars", "deep tech", "transfer tehnologic"],
  "sanatate": ["programul sanatate", "medical", "cabinete", "clinici", "aparatura medicala", "ecografe", "stomatologie"],
  "cadastru": ["ancpi", "e-terra", "carte funciara", "intabulare", "pncf"],
  "legislatie": ["ordin madr", "oug", "hg", "lege", "regulament ue", "monitorul oficial"],
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
  if (!normalized) return [];
  const matches: string[] = [normalized];

  for (const [key, synonyms] of Object.entries(SYNONYM_DICTIONARY)) {
    const keyNorm = removeDiacritics(key);
    const synNorms = synonyms.map(removeDiacritics);

    if (keyNorm === normalized || synNorms.includes(normalized) || normalized.includes(keyNorm)) {
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
        program.authorityCode || "",
        program.objective || "",
        program.fundingType || "",
        program.region || "",
        ...program.industries,
        ...program.businessTypes,
        ...program.counties,
        ...(program.eligibility || []),
      ].join(" ");
      
      const haystack = removeDiacritics(rawHaystack);
      const matchesQuery = synonyms.some((term) => haystack.includes(term));
      if (!matchesQuery) return false;
    }

    // Filters
    if (params.businessType && params.businessType !== "Toate formele") {
      if (!program.businessTypes.includes(params.businessType) && !program.businessTypes.includes("Toate formele")) return false;
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
      if (program.companyAge !== params.companyAge && program.companyAge !== "Orice vechime") return false;
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

    if (params.objective && params.objective !== "Toate obiectivele") {
      if (program.objective !== params.objective) return false;
    }

    return true;
  });
}

export function executeUnifiedSearch(query: string): UnifiedSearchResult[] {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const synonyms = resolveSynonyms(trimmed);
  const results: UnifiedSearchResult[] = [];

  const checkMatch = (texts: string[]) => {
    const haystack = removeDiacritics(texts.filter(Boolean).join(" "));
    return synonyms.some((term) => haystack.includes(term));
  };

  // 1. Search Programs & Subsidies
  for (const prog of FUNDING_PROGRAMS) {
    if (checkMatch([prog.title, prog.summary, prog.source, prog.sourceCategory, prog.objective || "", ...prog.industries])) {
      let badgeType: UnifiedSearchResult["type"] = "FINANȚARE IMM";
      if (prog.sourceCategory === "AFIR") badgeType = "INTERVENȚIE AFIR";
      else if (prog.sourceCategory === "APIA" || prog.sourceCategory === "MADR") badgeType = "SUBVENȚIE";
      else if (prog.sourceCategory === "AFM" || prog.sourceCategory === "Fondul pentru Modernizare") badgeType = "ENERGIE & MEDIU";
      else if (prog.sourceCategory === "UE Direct" || prog.sourceCategory === "PNRR") badgeType = "GRANT & FONDURI EU";

      results.push({
        id: `prog-${prog.slug}`,
        type: badgeType,
        title: prog.title,
        summary: prog.summary,
        url: `/finantari/${prog.slug}`,
        badge: prog.sourceCategory,
        highlightMeta: `Status: ${prog.status} • Termen: ${prog.deadline}`,
      });
    }
  }

  // 2. Search News
  for (const news of newsroomArticles) {
    if (checkMatch([news.headline, news.summary, news.content, news.institution])) {
      results.push({
        id: `news-${news.slug}`,
        type: "ȘTIRE",
        title: news.headline,
        summary: news.summary,
        url: `/stiri/${news.slug}`,
        badge: news.category,
        highlightMeta: `Publicat: ${news.publishedAt} • ${news.institution}`,
      });
    }
  }

  // 3. Search Legislation
  for (const leg of legislationCatalog) {
    if (checkMatch([leg.title, leg.summary, leg.actNumber, ...leg.affectedSectors])) {
      results.push({
        id: `leg-${leg.slug}`,
        type: "LEGISLAȚIE",
        title: leg.title,
        summary: leg.summary,
        url: `/legislatie`,
        badge: leg.actType,
        highlightMeta: `Publicat: ${leg.publicationDate} • Efectiv: ${leg.effectiveDate}`,
      });
    }
  }

  // 4. Search Sectors
  for (const sec of Object.values(SECTORS_CATALOG)) {
    if (checkMatch([sec.name, sec.shortDesc, sec.fullDesc, ...sec.keyInterventions])) {
      results.push({
        id: `sec-${sec.slug}`,
        type: "SECTOR",
        title: `Sector: ${sec.name}`,
        summary: sec.shortDesc,
        url: `/sectoare/${sec.slug}`,
        badge: sec.category,
        highlightMeta: `Sprijin estimat: ${sec.estimatedSupport}`,
      });
    }
  }

  // 5. Search Counties
  for (const [key, county] of Object.entries(countyProfilesCatalog)) {
    if (checkMatch([county.name, county.region, county.capital, ...county.topCrops, ...county.topLivestock])) {
      results.push({
        id: `county-${key}`,
        type: "JUDEȚ",
        title: `Județul ${county.name} (${county.code})`,
        summary: `Profil agricol și subvenții pentru Județul ${county.name} (${county.region}) — ${county.agriculturalSurfaceHa}`,
        url: `/subventii/${key}`,
        badge: `Județ ${county.code}`,
        highlightMeta: `Centru APIA: ${county.capital}`,
      });
    }
  }

  // 6. Search Documents & Resources
  for (const doc of downloadableResourcesCatalog) {
    if (checkMatch([doc.title, doc.description, doc.category, doc.institution])) {
      results.push({
        id: `doc-${doc.slug}`,
        type: "DOCUMENT",
        title: doc.title,
        summary: doc.description,
        url: `/resurse`,
        badge: `${doc.institution} • ${doc.fileFormat}`,
        highlightMeta: `Format: ${doc.fileFormat} (${doc.fileSizeMb} MB)`,
      });
    }
  }

  return results.slice(0, 30);
}
