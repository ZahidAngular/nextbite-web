"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { BrandLogo } from "./BrandLogo";
import { BRANDS, brandProductCount } from "./data";

export function BrandOverview() {
  return (
    <section id="brands" className="relative scroll-mt-28 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* heading */}
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-4 inline-flex items-center gap-3 text-xs font-semibold tracking-[0.3em] text-secondary uppercase sm:text-sm">
            <span className="h-[2px] w-10 bg-gradient-to-r from-primary to-secondary" />
            The Portfolio
            <span className="h-[2px] w-10 bg-gradient-to-l from-primary to-secondary" />
          </p>
          <h2 className="font-heading text-4xl font-bold tracking-[-0.03em] sm:text-5xl">
            Four brands, <span className="text-gradient">one stand</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted">
            Each brand brings its own craft and category — together they cover
            chilled, frozen, organic and cultured across retail, trade and
            foodservice.
          </p>
        </Reveal>

        {/* brand cards */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BRANDS.map((brand, i) => (
            <motion.a
              key={brand.slug}
              href={`#${brand.slug}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.08,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              whileHover={{ y: -8 }}
              className="group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-line bg-card p-7 shadow-card transition-shadow hover:shadow-3d"
            >
              {/* brand wash */}
              <span
                aria-hidden
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(120% 90% at 50% 0%, ${brand.color}1f, transparent 65%)`,
                }}
              />

              {/* top bar */}
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-1 origin-left"
                style={{
                  background: `linear-gradient(90deg, ${brand.color}, ${brand.color2})`,
                }}
              />

              <div className="relative flex items-start justify-between">
                <BrandLogo brand={brand} size={76} />
                <ArrowUpRight
                  size={18}
                  className="text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  style={{ color: brand.color }}
                />
              </div>

              <h3 className="font-heading relative mt-6 text-2xl font-bold tracking-tight">
                {brand.name}
              </h3>
              <p
                className="relative mt-1.5 text-sm font-medium"
                style={{ color: brand.color }}
              >
                {brand.tagline}
              </p>

              <p className="relative mt-4 flex-1 text-[13px] leading-relaxed text-muted">
                {brand.kicker}
              </p>

              {/* meta row */}
              <div className="relative mt-6 flex items-center gap-4 border-t border-line pt-4 text-[11px] font-semibold tracking-[0.1em] text-muted uppercase">
                <span>{brandProductCount(brand)} products</span>
                <span className="h-1 w-1 rounded-full bg-line" />
                <span>{brand.categories.length} ranges</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
