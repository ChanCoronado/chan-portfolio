import type { Metadata, Viewport } from "next";
import { Anton, Geist, Geist_Mono } from "next/font/google";
import ChatWidget from "@/components/ChatWidget";
import ScrollProgress from "@/components/ScrollProgress";
import "./globals.css";

const display = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--f-display",
  display: "swap",
});

const sans = Geist({
  subsets: ["latin"],
  variable: "--f-sans",
  display: "swap",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--f-mono",
  display: "swap",
});

const SITE_URL = "https://ichaan-github-io.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title:
    "Christian Coronado | Junior Software Engineer & Full-Stack Web Developer",
  description:
    "Christian Coronado, BSIT Magna Cum Laude graduate and Junior Software Engineer / Full-Stack Web Developer from Laguna, Philippines. Available for opportunities.",
  openGraph: {
    type: "website",
    siteName: "Christian Coronado",
    title:
      "Christian Coronado | Junior Software Engineer & Full-Stack Web Developer",
    description:
      "BSIT Magna Cum Laude graduate who builds full-stack web applications. Available for opportunities.",
    url: SITE_URL,
  },
  twitter: { card: "summary_large_image" },
  appleWebApp: {
    capable: true,
    title: "Chan",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0E0C",
  colorScheme: "dark",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body>
        <a className="skip-link" href="#main">
          Skip to main content
        </a>
        <ScrollProgress />
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
