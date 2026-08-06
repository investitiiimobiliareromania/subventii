import type { MetadataRoute } from "next";
import { getProgramsFromDb } from "@/lib/db/repository";
import { newsroomArticles } from "@/lib/newsroom-data";
import { governmentProgramsCatalog } from "@/lib/programe-guvernamentale-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://subventii.ro";
  const programs = await getProgramsFromDb();

  const staticHubs = [
    "",
    "/programes",
    "/programe-guvernamentale",
    "/stiri",
    "/legislatie",
    "/credite",
    "/piata-imobiliara",
    "/asigurari",
    "/rapoarte-ancpi",
    "/institutii",
    "/calendar",
    "/eligibilitate",
    "/compara",
    "/alerte",
    "/resurse",
    "/glosar",
    "/asistent-ai",
    "/intelligence",
    "/intelligence/funding",
    "/intelligence/legislation",
    "/intelligence/institutions",
    "/intelligence/regions",
    "/despre",
    "/contact",
    "/politica-de-confidentialitate",
  ];

  const priorityCaens = ["6201", "0111", "5610", "4120", "1011"].map((caen) => `/cod-caen/${caen}`);
  const prioritySectors = ["agricultura", "it", "productie", "constructii", "horeca"].map((sec) => `/sectoare/${sec}`);
  const priorityMatrix = [
    "/subventii/cluj/it",
    "/subventii/timis/agricultura",
    "/subventii/brasov/turism",
    "/subventii/bucuresti/it",
  ];

  const govProgramRoutes = Object.keys(governmentProgramsCatalog).map(
    (slug) => `/programe-guvernamentale/${slug}`
  );

  const articleRoutes = newsroomArticles.map((art) => `/stiri/${art.slug}`);

  const dynamicProgramRoutes = programs.map((p) => `/finantari/${p.slug}`);

  const allPaths = [
    ...staticHubs,
    ...priorityCaens,
    ...prioritySectors,
    ...priorityMatrix,
    ...govProgramRoutes,
    ...articleRoutes,
    ...dynamicProgramRoutes,
  ];

  return allPaths.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.8,
  }));
}
