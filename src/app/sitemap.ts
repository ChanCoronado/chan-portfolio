import type { MetadataRoute } from "next";
import { featuredProjects } from "@/data/projects";

const SITE_URL = "https://ichaan-github-io.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, priority: 1 },
    { url: `${SITE_URL}/projects`, priority: 0.8 },
    ...featuredProjects.map((p) => ({ url: `${SITE_URL}/projects/${p.slug}`, priority: 0.7 })),
  ];
}
