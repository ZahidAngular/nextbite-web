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

/* ─────────────────────────── ANALYTICS ───────────────────────────
   Google Tag Manager (GTM-NC6MPFCF) aur GA4 (G-PWJQKSJNWX) — Google ke
   diye hue snippets jyun ke tyun. GTM head mein sabse upar, noscript
   iframe body ke shuru mein.
   ──────────────────────────────────────────────────────────────── */
const GTM_ID = "GTM-NC6MPFCF";
const GA4_ID = "G-PWJQKSJNWX";

const gtmScript = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`;

const ga4Script = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA4_ID}');`;

const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.classList.add("dark")}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <script dangerouslySetInnerHTML={{ __html: gtmScript }} />
        {/* Google tag (gtag.js) — GA4 */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`} />
        <script dangerouslySetInnerHTML={{ __html: ga4Script }} />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${fontHero.variable} ${fontDisplay.variable} ${fontText.variable} grain antialiased`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <CustomCursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
