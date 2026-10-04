import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FoodShow } from "@/components/food-show/FoodShow";
import { SHOW, TOTAL_PRODUCTS } from "@/components/food-show/data";
import { enquiryQrSvg } from "@/lib/qr";
import { pageMeta } from "@/lib/seo";

const title = `${SHOW.name} ${SHOW.year} — Stand ${SHOW.stand} | NextBite`;
const description = `${TOTAL_PRODUCTS} retail products from Angel Food, Nutty Bay and Foods From The Edge at ${SHOW.name} ${SHOW.year} — Stand ${SHOW.stand}.`;

export const metadata: Metadata = {
  ...pageMeta({ title, description, path: "/fine-food-show" }),
  keywords: [
    "Fine Food Show 2026",
    "Stand HB27",
    "plant-based",
    "dairy-free cheese",
    "cashew cheese",
    "Angel Food",
    "Nutty Bay",
    "Foods From The Edge",
    "dips",
    "dressings",
    "dukkah",
    "NextBite",
    "foodservice",
    "wholesale",
  ],
};

/* Nav links is page ke apne sections par jaate hain */
const navLinks = [
  { label: "Portfolio", href: "#brands" },
  { label: "Angel Food", href: "#angel-food" },
  { label: "Nutty Bay", href: "#nutty-bay" },
  { label: "Foods From The Edge", href: "#foods-from-the-edge" },
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
