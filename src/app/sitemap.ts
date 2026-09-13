import type { MetadataRoute } from "next";
import { getProgramsFromDb } from "@/lib/db/repository";
import { newsroomArticles } from "@/lib/newsroom-data";
import { countyProfilesCatalog } from "@/lib/county-data";
import { SECTORS_CATALOG } from "@/lib/sectoare-data";
import { governmentProgramsCatalog } from "@/lib/programe-guvernamentale-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://subventii.cristianvaduva.com";
  const programs = await getProgramsFromDb();

  const staticHubs = [
    "",
    "/finantari",
    "/programes",
    "/programe-guvernamentale",
    "/stiri",
    "/legislatie",
    "/calendar",
    "/resurse",
    "/glosar",
    "/institutii",
    "/asistent-ai",
    "/despre",
    "/contact",
    "/termeni-si-conditii",
    "/politica-de-confidentialitate",
    "/politica-cookies",
    "/disclaimer",
  ];

  // All 42 counties for /subventii/[county] and /judete/[county]
  const countySubventiiRoutes = Object.keys(countyProfilesCatalog).map(
    (c) => `/subventii/${c}`
  );
  const countyJudeteRoutes = Object.keys(countyProfilesCatalog).map(
    (c) => `/judete/${c}`
  );

  // All 14 sectors
  const sectorRoutes = Object.keys(SECTORS_CATALOG).map(
    (sec) => `/sectoare/${sec}`
  );

  // Priority county-sector matrix combinations
  const countySectorMatrix: string[] = [];
  const topCounties = ["timis", "constanta", "cluj", "dolj", "iasi", "brasov", "calarasi", "olt", "tulcea", "teleorman"];
  const topSectors = ["vegetal", "zootehnie-bovine", "ovine-caprine", "pomicultura-livezi", "legumicultura-solarii", "irigatii", "utilaje-tractoare"];

  for (const c of topCounties) {
    for (const s of topSectors) {
      countySectorMatrix.push(`/subventii/${c}/${s}`);
    }
  }

  // Government programs
  const govProgramRoutes = Object.keys(governmentProgramsCatalog).map(
    (slug) => `/programe-guvernamentale/${slug}`
  );

  // Verified News articles
  const articleRoutes = newsroomArticles.map((art) => `/stiri/${art.slug}`);

  // Verified Funding programs
  const dynamicProgramRoutes = programs.map((p) => `/finantari/${p.slug}`);

  const allPaths = Array.from(
    new Set([
      ...staticHubs,
      ...countySubventiiRoutes,
      ...countyJudeteRoutes,
      ...sectorRoutes,
      ...countySectorMatrix,
      ...govProgramRoutes,
      ...articleRoutes,
      ...dynamicProgramRoutes,
    ])
  );

  return allPaths.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1.0 : path.startsWith("/finantari/") || path.startsWith("/subventii/") ? 0.8 : 0.6,
  }));
}
