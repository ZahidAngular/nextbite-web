"use client";

import { Leaf } from "lucide-react";

const items = [
  "Plant-Based",
  "Sustainable",
  "Innovation",
  "Australia & NZ",
  "Food Revolution",
  "Brand Growth",
];

/** Infinite scrolling brand strip */
export function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-line bg-card py-5">
      <div className="animate-marquee flex w-max items-center gap-10">
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span
            key={i}
            className="font-heading flex items-center gap-10 text-lg font-semibold tracking-wide uppercase"
          >
            <span className={i % 2 === 0 ? "text-foreground" : "text-stroke"}>{item}</span>
            <Leaf size={18} className={i % 2 === 0 ? "text-secondary" : "text-primary"} />
          </span>
        ))}
      </div>
    </div>
  );
}
