"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowDown,
  CalendarDays,
  MapPin,
  MonitorPlay,
  Sparkles,
} from "lucide-react";
import { MagneticButton } from "@/components/MagneticButton";
import { RevealWords } from "@/components/Reveal";
import {
  BRANDS,
  SHOW,
  TOTAL_CATEGORIES,
  TOTAL_PRODUCTS,
} from "./data";

const stats = [
  { value: String(BRANDS.length), label: "Distinct brands" },
  { value: `${TOTAL_PRODUCTS}`, label: "Retail SKUs" },
  { value: `${TOTAL_CATEGORIES}`, label: "Product ranges" },
  { value: "45+", label: "Years of craft" },
];

export function ShowHero({
  onPlay,
  onEnquire,
}: {
  onPlay: () => void;
  onEnquire: () => void;
}) {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20"
    >
      {/* ── ambient background ─────────────────────────────── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-float absolute -top-24 -left-24 h-[34rem] w-[34rem] rounded-full bg-[var(--glow-primary)] blur-[120px]" />
        <div className="animate-float-slow absolute -right-32 bottom-0 h-[30rem] w-[30rem] rounded-full bg-[var(--glow-secondary)] blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 40%, #000 30%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 60% at 50% 40%, #000 30%, transparent 75%)",
          }}
        />
      </div>

      {/* giant outline year — background watermark */}
      <motion.span
        aria-hidden
        style={{ y }}
        className="text-stroke font-display-black pointer-events-none absolute top-1/2 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 text-[26vw] leading-none select-none"
      >
        {SHOW.year}
      </motion.span>

      <motion.div
        style={{ opacity: fade }}
        className="mx-auto w-full max-w-7xl px-6"
      >
        {/* ── event badge row ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="flex flex-wrap items-center gap-3"
        >
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold tracking-[0.18em] uppercase">
            <CalendarDays size={14} className="text-primary" />
            {SHOW.name} {SHOW.year}
          </span>

          <span className="animate-pulse-glow inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-4 py-2 text-xs font-bold tracking-[0.18em] text-white uppercase">
            <MapPin size={14} />
            Stand {SHOW.stand}
          </span>
        </motion.div>

        {/* ── headline ─────────────────────────────────────── */}
        <h1 className="mt-8 text-[clamp(2.8rem,9vw,7.5rem)]">
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.15,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              className="block"
            >
              Four brands.
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.28,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              className="text-gradient block pb-[0.08em]"
            >
              One portfolio.
            </motion.span>
          </span>
          <span className="font-hero-thin mt-1 block text-[clamp(1.4rem,3.6vw,2.9rem)] text-muted">
            <RevealWords text="Exceptionally plant-based." delay={0.5} />
          </span>
        </h1>

        {/* ── intro ────────────────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
        >
          {SHOW.intro}
        </motion.p>

        {/* ── CTAs ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.72 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton>
            <a
              href="#brands"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-shadow hover:shadow-xl"
            >
              <Sparkles size={16} />
              Explore the portfolio
            </a>
          </MagneticButton>

          <MagneticButton strength={0.3}>
            <button
              type="button"
              onClick={onPlay}
              className="glass inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-colors hover:text-primary"
            >
              <MonitorPlay size={16} />
              Play slideshow
            </button>
          </MagneticButton>

          <MagneticButton strength={0.25}>
            <button
              type="button"
              onClick={onEnquire}
              className="inline-flex items-center gap-2 rounded-full px-4 py-3.5 text-sm font-semibold text-muted underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              Talk to the team
            </button>
          </MagneticButton>
        </motion.div>

        {/* ── stat strip ───────────────────────────────────── */}
        <motion.dl
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85 }}
          className="mt-16 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-4"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col bg-card px-5 py-6 transition-colors hover:bg-card-soft"
            >
              {/* dt = label, dd = value — <dl> ka sahi semantic order */}
              <dd className="font-display-black text-gradient order-1 text-3xl sm:text-4xl">
                {s.value}
              </dd>
              <dt className="order-2 mt-1 text-[11px] font-medium tracking-[0.12em] text-muted uppercase">
                {s.label}
              </dt>
            </div>
          ))}
        </motion.dl>
      </motion.div>

      {/* ── scroll cue ─────────────────────────────────────── */}
      <motion.a
        href="#brands"
        aria-label="Scroll to brands"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:block"
      >
        <motion.span
          animate={{ y: [0, 9, 0] }}
          transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
          className="glass flex h-11 w-11 items-center justify-center rounded-full text-muted"
        >
          <ArrowDown size={16} />
        </motion.span>
      </motion.a>
    </section>
  );
}
