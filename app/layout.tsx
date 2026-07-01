import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Manrope, Newsreader } from "next/font/google";
import type { ReactNode } from "react";

import "./globals.css";

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

const isProduction = process.env.VERCEL_ENV === "production";

export const metadata: Metadata = {
  metadataBase: new URL("https://culinarch.ai"),
  title: {
    default: "CulinArchAI — Culinary Intelligence Architecture",
    template: "%s — CulinArchAI",
  },
  description:
    "CulinArchAI is a research-led culinary intelligence platform for structuring ingredients, techniques, culture, sensory relationships, and professional culinary knowledge.",
  applicationName: "CulinArchAI",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://culinarch.ai",
    siteName: "CulinArchAI",
    title: "CulinArchAI — A system. A structure. A new language of taste.",
    description:
      "A research-led culinary intelligence architecture for connecting taste, technique, ingredients, culture, and professional knowledge.",
  },
  twitter: {
    card: "summary_large_image",
    title: "CulinArchAI — Culinary Intelligence Architecture",
    description:
      "A system. A structure. A new language of taste.",
  },
  robots: isProduction
    ? { index: true, follow: true }
    : { index: false, follow: false, noarchive: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: "#f3f0e8",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
