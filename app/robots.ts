import type { MetadataRoute } from "next";
import { siteOrigin } from "@/lib/qr";

/* static export ke liye build time par ek dafa ban jata hai → /robots.txt */
export const dynamic = "force-static";

/* Poori site crawl ho sakti hai; sirf leads ka admin panel aur
   API band hain. `host` nahi diya — woh sirf Yandex parhta hai. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api/"],
    },
    sitemap: `${siteOrigin()}/sitemap.xml`,
  };
}
