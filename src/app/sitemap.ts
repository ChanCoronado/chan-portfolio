import type { MetadataRoute } from "next";
import { featuredProjects } from "@/data/projects";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, priority: 1 },
    { url: `${SITE_URL}/projects`, priority: 0.8 },
    ...featuredProjects.map((p) => ({
      url: `${SITE_URL}/projects/${p.slug}`,
      priority: 0.7,
    })),
  ];
}
