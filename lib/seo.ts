import type { Metadata } from "next";
import { siteOrigin } from "./qr";

/* ═══════════════════════════════════════════════════════════════
   SEO helper — har page ka apna title, description, canonical
   aur share card (Open Graph + Twitter) ek hi jagah se.
   ═══════════════════════════════════════════════════════════════ */

export const OG_IMAGE = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "NextBite — building the home for plant-based brands",
};

export function pageMeta({
  title,
  description,
  path,
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${siteOrigin()}${path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      title,
      description,
      url,
      siteName: "NextBite",
      type: "website",
      locale: "en_AU",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
