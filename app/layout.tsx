import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";

export const metadata: Metadata = {
  title: "CulinArch.AI — Culinary Intelligence Architecture",
  description:
    "A system. A structure. A new language of taste. CulinArch.AI is an evolving architecture for culinary knowledge and intelligent operations.",
  metadataBase: new URL("https://www.culinarch.ai"),
  openGraph: {
    title: "CulinArch.AI",
    description: "A system. A structure. A new language of taste.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
