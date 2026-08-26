import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FoodShow } from "@/components/food-show/FoodShow";
import { SHOW, TOTAL_PRODUCTS } from "@/components/food-show/data";
import { enquiryQrSvg } from "@/lib/qr";

const title = `${SHOW.name} ${SHOW.year} — Stand ${SHOW.stand} | NextBite`;
const description = `${SHOW.headline} ${SHOW.intro} ${TOTAL_PRODUCTS} retail products across Angel Food, Nutty Bay, Tonzu and Zenzo — visit us at Stand ${SHOW.stand}.`;

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Fine Food Show 2026",
    "Stand HB27",
    "plant-based",
    "dairy-free cheese",
    "organic tofu",
    "coconut yoghurt",
    "cashew cheese",
    "Angel Food",
    "Nutty Bay",
    "Tonzu",
    "Zenzo",
    "NextBite",
    "foodservice",
    "wholesale",
  ],
  openGraph: {
    title,
    description,
    type: "website",
    locale: "en_AU",
  },
};

/* Nav links is page ke apne sections par jaate hain */
const navLinks = [
  { label: "Portfolio", href: "#brands" },
  { label: "Angel Food", href: "#angel-food" },
  { label: "Nutty Bay", href: "#nutty-bay" },
  { label: "Tonzu", href: "#tonzu" },
  { label: "Zenzo", href: "#zenzo" },
];

export default async function FineFoodShowPage() {
  /* QR build time par ek dafa ban jata hai — koi runtime cost nahi */
  const qrSvg = await enquiryQrSvg();

  return (
    <main>
      <Navbar
        links={navLinks}
        homeHref="/"
        cta={{ label: `Stand ${SHOW.stand}`, href: "#show-contact" }}
      />
      <FoodShow qrSvg={qrSvg} />
      <Footer />
    </main>
  );
}
