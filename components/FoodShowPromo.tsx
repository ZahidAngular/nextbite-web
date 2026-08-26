"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { Reveal } from "./Reveal";
import { MagneticButton } from "./MagneticButton";
import {
  BRANDS,
  SHOW,
  TOTAL_PRODUCTS,
} from "./food-show/data";

/* ──────────────────────────────────────────────
   Homepage promo — Fine Food Show ka rasta

   Har brand se ek pack shot, taake ek nazar mein
   poore portfolio ka andaza ho jaye.
   ────────────────────────────────────────────── */

const SHOWCASE = [
  { src: "/food-show/angel-food/cheddar-block.webp", alt: "Angel Food dairy-free Cheddar Block", rotate: -8 },
  { src: "/food-show/nutty-bay/classic-cheesy.webp", alt: "Nutty Bay Classic Cheesy cashew cheese", rotate: 5 },
  { src: "/food-show/tonzu/traditional-tofu.webp", alt: "Tonzu organic Traditional Tofu", rotate: -4 },
  { src: "/food-show/zenzo/natural-yoghurt.webp", alt: "Zenzo coconut Natural Yoghurt", rotate: 8 },
];

export function FoodShowPromo() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-line bg-card shadow-card">
            {/* brand wash */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(90% 120% at 100% 0%, var(--glow-primary), transparent 60%), radial-gradient(80% 110% at 0% 100%, var(--glow-secondary), transparent 58%)",
              }}
            />
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary to-secondary"
            />

            <div className="relative grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-[1.05fr_1fr] lg:gap-6">
              {/* ── copy ── */}
              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.16em] uppercase">
                    <CalendarDays size={13} className="text-primary" />
                    {SHOW.name} {SHOW.year}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-3.5 py-1.5 text-[11px] font-bold tracking-[0.16em] text-white uppercase">
                    <MapPin size={13} />
                    Stand {SHOW.stand}
                  </span>
                </div>

                <h2 className="font-heading mt-6 text-4xl font-bold tracking-[-0.03em] sm:text-5xl">
                  Meet the whole{" "}
                  <span className="text-gradient">portfolio</span> in person
                </h2>

                <p className="mt-5 max-w-lg text-base leading-relaxed text-muted">
                  {BRANDS.length} distinct plant-based brands and{" "}
                  {TOTAL_PRODUCTS} retail products — dairy-free cheese, organic
                  tofu and tempeh, cultured cashew cheeses and coconut yoghurt.
                  Come and taste the range at Stand {SHOW.stand}.
                </p>

                {/* brand names */}
                <div className="mt-6 flex flex-wrap items-center gap-2">
                  {BRANDS.map((brand) => (
                    <span
                      key={brand.slug}
                      className="rounded-full border px-3 py-1.5 text-xs font-semibold"
                      style={{
                        borderColor: `${brand.color}44`,
                        background: `${brand.color}12`,
                        color: brand.color,
                      }}
                    >
                      {brand.name}
                    </span>
                  ))}
                </div>

                <MagneticButton className="mt-8">
                  <Link
                    href="/fine-food-show"
                    className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-shadow hover:shadow-xl"
                  >
                    Explore the show portfolio
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </MagneticButton>
              </div>

              {/* ── pack shot cluster ── */}
              <div className="grid grid-cols-2 gap-4 sm:gap-5">
                {SHOWCASE.map((shot, i) => (
                  <motion.div
                    key={shot.src}
                    initial={{ opacity: 0, y: 30, rotate: 0 }}
                    whileInView={{ opacity: 1, y: 0, rotate: shot.rotate }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      duration: 0.7,
                      delay: 0.1 + i * 0.09,
                      ease: [0.21, 0.47, 0.32, 0.98],
                    }}
                    whileHover={{ rotate: 0, scale: 1.05 }}
                    className="relative aspect-square overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-black/5"
                  >
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      fill
                      sizes="(max-width: 640px) 40vw, (max-width: 1024px) 45vw, 220px"
                      className="object-contain p-4"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
