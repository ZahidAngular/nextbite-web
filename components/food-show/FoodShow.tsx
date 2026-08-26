"use client";

import { useState } from "react";
import { Leaf, Snowflake } from "lucide-react";
import { BrandOverview } from "./BrandOverview";
import { BrandRail } from "./BrandRail";
import { BrandSection } from "./BrandSection";
import { ShowContact } from "./ShowContact";
import { StorageStrip, WhyPartnerShow } from "./ShowExtras";
import { EnquiryModal } from "./EnquiryModal";
import { ShowHero } from "./ShowHero";
import { Slideshow } from "./Slideshow";
import { BRANDS, SHOW, type TempFilter } from "./data";

/* ──────────────────────────────────────────────
   Show ticker — scrolling stand strip
   ────────────────────────────────────────────── */
const ticker = [
  `Stand ${SHOW.stand}`,
  "Certified Organic",
  "Naturally Cultured",
  "Dairy-Free",
  "Trade & Foodservice Ready",
  "Retail Portfolio 2026",
];

function ShowTicker() {
  return (
    <div className="relative overflow-hidden border-y border-line bg-card py-5">
      <div className="animate-marquee flex w-max items-center gap-10">
        {[...ticker, ...ticker, ...ticker, ...ticker].map((item, i) => (
          <span
            key={i}
            className="font-heading flex items-center gap-10 text-base font-semibold tracking-wide whitespace-nowrap uppercase sm:text-lg"
          >
            <span
              className={
                i % 3 === 0
                  ? "text-foreground"
                  : i % 3 === 1
                    ? "text-primary"
                    : "text-secondary"
              }
            >
              {item}
            </span>
            {i % 2 === 0 ? (
              <Leaf size={17} className="text-secondary" />
            ) : (
              <Snowflake size={17} className="text-primary" />
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Page shell — filter aur slideshow state yahan
   ────────────────────────────────────────────── */
export function FoodShow({ qrSvg }: { qrSvg?: string }) {
  const [filter, setFilter] = useState<TempFilter>("ALL");
  const [showing, setShowing] = useState(false);
  const [enquiring, setEnquiring] = useState(false);

  const openSlideshow = () => setShowing(true);
  const openEnquiry = () => setEnquiring(true);

  return (
    <>
      <ShowHero onPlay={openSlideshow} onEnquire={openEnquiry} />
      <ShowTicker />
      <BrandOverview />

      {BRANDS.map((brand, i) => (
        <BrandSection key={brand.slug} brand={brand} index={i} filter={filter} />
      ))}

      <StorageStrip />
      <WhyPartnerShow />
      <ShowContact
        onPlay={openSlideshow}
        onEnquire={openEnquiry}
        qrSvg={qrSvg}
      />

      <BrandRail
        filter={filter}
        onFilterChange={setFilter}
        onPlay={openSlideshow}
      />

      <Slideshow open={showing} onClose={() => setShowing(false)} />
      <EnquiryModal open={enquiring} onClose={() => setEnquiring(false)} />
    </>
  );
}
