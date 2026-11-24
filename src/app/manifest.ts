import type { MetadataRoute } from "next";

/* Lets the portfolio be added to a phone's home screen and open like an app */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Christian Coronado | Portfolio",
    short_name: "Chan",
    description:
      "Portfolio of Christian Coronado, Junior Software Engineer and Full-Stack Web Developer.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#0B0E0C",
    theme_color: "#0B0E0C",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
