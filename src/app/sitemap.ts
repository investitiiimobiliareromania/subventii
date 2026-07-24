import type { MetadataRoute } from "next";
import { getProgramsFromDb } from "@/lib/db/repository";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://subventii.ro";
  const programs = await getProgramsFromDb();

  return [
    { url: base, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${base}/programes`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/despre`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    ...programs.map((program) => ({
      url: `${base}/finantari/${program.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
