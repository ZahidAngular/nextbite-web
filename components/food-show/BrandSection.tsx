"use client";

import { motion } from "framer-motion";
import { Globe, Mail, Phone } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { BrandLockup } from "./BrandLogo";
import { ProductCard } from "./ProductCard";
import type { Brand, TempFilter } from "./data";
import { brandProductCount } from "./data";

export function BrandSection({
  brand,
  index,
  filter,
}: {
  brand: Brand;
  index: number;
  filter: TempFilter;
}) {
  /* filter ke hisaab se categories chhaanto — khaali ranges chhup jaati hain */
  const categories = brand.categories
    .map((c) => ({
      ...c,
      products:
        filter === "ALL" ? c.products : c.products.filter((p) => p.temp === filter),
    }))
    .filter((c) => c.products.length > 0);

  const shown = categories.reduce((n, c) => n + c.products.length, 0);
  const total = brandProductCount(brand);

  return (
    <section
      id={brand.slug}
      className="relative scroll-mt-24 border-t border-line py-20 sm:py-28"
    >
      {/* brand tint */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[36rem]"
        style={{
          background: `radial-gradient(70% 55% at 50% 0%, ${brand.color}14, transparent 70%)`,
        }}
      />

      <div className="mx-auto max-w-7xl px-6">
        {/* ── brand header ─────────────────────────────────── */}
        <Reveal>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className="font-display-black text-5xl leading-none opacity-20 select-none sm:text-6xl"
                  style={{ color: brand.color }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] font-bold tracking-[0.16em] text-white uppercase sm:text-[11px]"
                  style={{
                    background: `linear-gradient(120deg, ${brand.color}, ${brand.color2})`,
                  }}
                >
                  <brand.icon size={13} />
                  {brand.kicker}
                </span>
              </div>

              {brand.logo ? (
                <>
                  <BrandLockup brand={brand} className="mt-5" height={48} />
                  {/* naam screen readers aur SEO ke liye */}
                  <h2 className="sr-only">{brand.name}</h2>
                </>
              ) : (
                <h2 className="font-heading mt-5 text-5xl font-bold tracking-[-0.04em] sm:text-6xl lg:text-7xl">
                  {brand.name}
                </h2>
              )}

              <p
                className="mt-3 text-xl font-medium sm:text-2xl"
                style={{ color: brand.color }}
              >
                {brand.tagline}
              </p>

              <p className="mt-5 text-[15px] leading-relaxed text-muted">
                {brand.story}
              </p>
            </div>

            {/* quick facts */}
            <dl className="grid shrink-0 grid-cols-3 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:w-72">
              {[
                { k: "Products", v: filter === "ALL" ? total : `${shown}/${total}` },
                { k: "Ranges", v: String(categories.length) },
                /* jin brands ka founding year flyer par nahi, unka origin dikhao */
                brand.since === "—"
                  ? { k: "Made in", v: brand.origin }
                  : { k: "Since", v: brand.since },
              ].map((f) => (
                <div key={f.k} className="bg-card px-3 py-4 text-center">
                  <dt className="text-[10px] font-semibold tracking-[0.1em] text-muted uppercase">
                    {f.k}
                  </dt>
                  <dd
                    className="font-heading mt-1 text-sm leading-tight font-bold sm:text-xl"
                    style={{ color: brand.color }}
                  >
                    {f.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>

        {/* ── ranges ───────────────────────────────────────── */}
        {categories.length === 0 ? (
          <p className="mt-14 rounded-2xl border border-dashed border-line bg-card-soft px-6 py-10 text-center text-sm text-muted">
            No {filter.toLowerCase()} products in the {brand.name} range — switch
            the filter to see everything.
          </p>
        ) : (
          <div className="mt-16 flex flex-col gap-16">
            {categories.map((category) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                {/* range header */}
                <Reveal y={28}>
                  <div className="flex flex-col gap-3 border-b border-line pb-5 sm:flex-row sm:items-end sm:justify-between">
                    <div className="flex items-start gap-4">
                      <span
                        className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border"
                        style={{
                          borderColor: `${brand.color}33`,
                          background: `${brand.color}14`,
                          color: brand.color,
                        }}
                      >
                        <category.icon size={19} />
                      </span>
                      <div>
                        <h3 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
                          {category.title}
                          <span
                            className="ml-3 text-base font-medium"
                            style={{ color: brand.color }}
                          >
                            {category.tagline}
                          </span>
                        </h3>
                        {category.blurb && (
                          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                            {category.blurb}
                          </p>
                        )}
                      </div>
                    </div>

                    <span className="shrink-0 text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
                      {category.products.length}{" "}
                      {category.products.length === 1 ? "product" : "products"}
                    </span>
                  </div>
                </Reveal>

                {/* product grid */}
                <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {category.products.map((product, i) => (
                    <ProductCard
                      key={product.name}
                      product={product}
                      color={brand.color}
                      color2={brand.color2}
                      Icon={category.icon}
                      index={i}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* ── brand contact strip ──────────────────────────── */}
        <Reveal className="mt-16">
          <div
            className="relative overflow-hidden rounded-3xl border border-line p-7 sm:p-9"
            style={{
              background: `linear-gradient(135deg, ${brand.color}12, ${brand.color2}08)`,
            }}
          >
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p
                  className="text-[11px] font-bold tracking-[0.2em] uppercase"
                  style={{ color: brand.color }}
                >
                  {brand.name} — Orders & Enquiries
                </p>

                <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-8">
                  {brand.contacts.map((c) => (
                    <div key={c.email}>
                      <p className="font-heading text-lg font-bold">{c.name}</p>
                      {c.role && (
                        <p className="text-[11px] tracking-wide text-muted uppercase">
                          {c.role}
                        </p>
                      )}
                      <a
                        href={`mailto:${c.email}`}
                        className="mt-2 flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
                      >
                        <Mail size={14} style={{ color: brand.color }} />
                        {c.email}
                      </a>
                      {c.phones.map((p) => (
                        <a
                          key={p}
                          href={`tel:${p.replace(/\s/g, "")}`}
                          className="mt-1 flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
                        >
                          <Phone size={14} style={{ color: brand.color }} />
                          {p}
                        </a>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="shrink-0 lg:text-right">
                <div className="flex flex-wrap gap-2 lg:justify-end">
                  {brand.sites.map((site) => (
                    <a
                      key={site}
                      href={`https://${site}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-3.5 py-2 text-xs font-medium transition-colors hover:text-primary"
                    >
                      <Globe size={12} />
                      {site}
                    </a>
                  ))}
                </div>
                <p className="mt-4 max-w-xs text-xs leading-relaxed text-muted lg:ml-auto">
                  {brand.note}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
