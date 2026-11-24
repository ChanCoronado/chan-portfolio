import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  images: { qualities: [75, 90] },
  /* The first portfolio's mini-projects live in public/projects/00x as plain
     pages. Their old addresses keep working: /projects/001 goes to the page. */
  async redirects() {
    return ["001", "002", "003"].map((id) => ({
      source: `/projects/${id}`,
      destination: `/projects/${id}/index.html`,
      permanent: false,
    }));
  },
};

export default nextConfig;
