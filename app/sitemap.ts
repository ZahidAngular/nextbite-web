import type { MetadataRoute } from "next";
import { siteOrigin } from "@/lib/qr";

/* static export ke liye build time par ek dafa ban jata hai → /sitemap.xml */
export const dynamic = "force-static";

/* ═══════════════════════════════════════════════════════════════
   SITEMAP

   Sirf woh pages jo Google par aane chahiye. Enquiry aur admin
   pages khud noindex hain, is liye yahan nahi.

   ⚠️ `lastmod` jaan boojh kar haath se likhi hui hai — build ka
   waqt nahi. Build ka waqt lagane se har deploy par Google ko
   lagta hai ke sab pages badal gaye, aur phir woh in tareekhon
   par bharosa chhod deta hai.

   Kisi page ka content badlo to neeche us ki tareekh update karo.
   ═══════════════════════════════════════════════════════════════ */
const PAGES: { path: string; lastModified: string }[] = [
  { path: "/", lastModified: "2026-08-28" },
  { path: "/fine-food-show", lastModified: "2026-09-16" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = siteOrigin();

  return PAGES.map(({ path, lastModified }) => ({
    url: `${origin}${path}`,
    lastModified,
  }));
}
