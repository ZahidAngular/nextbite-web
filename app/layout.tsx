import type { Metadata } from "next";
import { Bricolage_Grotesque, Plus_Jakarta_Sans, DM_Sans } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CustomCursor } from "@/components/CustomCursor";

/* ═══════════════════════════════════════════════════════════════
   FONT SYSTEM — award-winning combination

   Bricolage Grotesque  →  --font-hero    →  font-hero
     Hero h1, giant display text.
     Variable font (200–800). Unique open counters, slightly
     quirky geometry — EXACTLY what premium food/sustainability
     award sites use. Distinctive without being aggressive.

   Plus Jakarta Sans    →  --font-display →  font-heading
     Section h2/h3, UI labels, cards, navbar.
     Google Fonts' closest match to Neue Haas Grotesk.
     Clean, geometric, multinational-grade professional.

   DM Sans              →  --font-text    →  (body default)
     Paragraphs, descriptions, small UI.
     Ultra-clean 300 weight looks incredibly premium.
   ═══════════════════════════════════════════════════════════════ */

const fontHero = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-hero",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const fontDisplay = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const fontText = DM_Sans({
  subsets: ["latin"],
  variable: "--font-text",
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NextBite — Building the Home for Plant-Based Brands",
  description:
    "A next-generation food platform focused on owning, licensing, launching, and scaling leading plant-based brands across Australia and New Zealand.",
  keywords: ["plant-based", "food brands", "Australia", "New Zealand", "FMCG", "sustainable food"],
  authors: [{ name: "NextBite" }],
  openGraph: {
    title: "NextBite — Building the Home for Plant-Based Brands",
    description:
      "A next-generation food platform focused on plant-based brands across Australia and New Zealand.",
    type: "website",
    locale: "en_AU",
  },
};

const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.classList.add("dark")}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${fontHero.variable} ${fontDisplay.variable} ${fontText.variable} grain antialiased`}
      >
        <CustomCursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
