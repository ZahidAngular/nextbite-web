"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

/* ── SVG path lengths (measured) ─────────────────────────── */
const STEM_LEN   = 320;
const LEAF_L_LEN = 180;
const LEAF_R_LEN = 180;
const BUD_LEN    = 120;

export function PlantReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  /* ── stem draws first ── */
  const stemDraw = useTransform(scrollYProgress, [0.02, 0.35], [1, 0]);

  /* ── left leaf ── */
  const leafLDraw = useTransform(scrollYProgress, [0.28, 0.52], [1, 0]);

  /* ── right leaf ── */
  const leafRDraw = useTransform(scrollYProgress, [0.38, 0.60], [1, 0]);

  /* ── top bud ── */
  const budDraw = useTransform(scrollYProgress, [0.54, 0.72], [1, 0]);

  /* ── whole plant scale: tiny seed → full size ── */
  const rawPlantScale = useTransform(scrollYProgress, [0, 0.08], [0.12, 1]);
  const plantScale    = useSpring(rawPlantScale, { stiffness: 70, damping: 24 });

  /* ── plant gentle float after fully drawn ── */
  const plantY = useTransform(scrollYProgress, [0.7, 1], [0, -30]);

  /* ── heading: visible early, fades out mid-way ── */
  const headOpacity = useTransform(scrollYProgress, [0, 0.12, 0.42], [1, 1, 0]);
  const headY       = useTransform(scrollYProgress, [0, 0.42], [0, -60]);

  /* ── description: fades in after plant is drawn ── */
  const descOpacity = useTransform(scrollYProgress, [0.65, 0.82], [0, 1]);
  const descY       = useTransform(scrollYProgress, [0.65, 0.82], [40, 0]);

  /* ── glow blob that pulses as plant grows ── */
  const glowOpacity = useTransform(scrollYProgress, [0.1, 0.5, 0.85], [0, 0.35, 0.12]);
  const glowScale   = useTransform(scrollYProgress, [0, 0.6], [0.3, 1.4]);

  return (
    <div ref={ref} className="relative h-[320vh]">
      {/* ═══ STICKY VIEWPORT ═══ */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center">

        {/* ── background stays clean / site default ── */}

        {/* ── glow behind plant ── */}
        <motion.div
          aria-hidden
          style={{ opacity: glowOpacity, scale: glowScale }}
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <div className="h-[480px] w-[480px] rounded-full blur-3xl" style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--secondary) 20%, transparent), color-mix(in srgb, var(--primary) 10%, transparent), transparent)" }} />
        </motion.div>

        {/* ── HEADING (top, fades out as plant grows) ── */}
        <motion.div
          style={{ opacity: headOpacity, y: headY }}
          className="absolute top-[12%] left-0 right-0 flex flex-col items-center text-center px-6 pointer-events-none z-20"
        >
          <p className="mb-5 flex items-center gap-3 text-sm font-semibold tracking-[0.35em] text-secondary uppercase">
            <span className="h-[2px] w-10 bg-gradient-to-r from-primary to-secondary" />
            NextBite Brands — AU &amp; NZ
            <span className="h-[2px] w-10 bg-gradient-to-l from-primary to-secondary" />
          </p>

          <h2
            className="font-hero leading-[0.9] tracking-[-0.04em]"
            style={{ fontSize: "clamp(2.8rem, 7.5vw, 7rem)" }}
          >
            <span className="block font-extrabold text-gradient">Building the</span>
            <span className="block font-light text-foreground/40 tracking-[-0.02em]">home for</span>
            <span className="block font-extrabold text-gradient">Plant-Based</span>
            <span className="block font-extrabold text-gradient">Brands.</span>
          </h2>
        </motion.div>

        {/* ── SVG PLANT (draws on scroll) ── */}
        <motion.div
          style={{ scale: plantScale, y: plantY }}
          className="relative z-10 flex items-center justify-center"
        >
          <svg
            viewBox="0 0 400 480"
            width="340"
            height="408"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <defs>
              <linearGradient id="stemGrad" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="var(--primary)" />
                <stop offset="100%" stopColor="var(--secondary)" />
              </linearGradient>
              <linearGradient id="leafLGrad" x1="1" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--secondary)" />
                <stop offset="100%" stopColor="var(--secondary-dark)" />
              </linearGradient>
              <linearGradient id="leafRGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="var(--primary)" />
                <stop offset="100%" stopColor="var(--secondary)" />
              </linearGradient>
              <linearGradient id="budGrad" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="var(--secondary)" />
                <stop offset="100%" stopColor="var(--primary)" />
              </linearGradient>
            </defs>

            {/* ── STEM ── */}
            <motion.path
              d="M 200 460 C 200 400 190 350 200 280 C 210 210 195 160 200 80"
              stroke="url(#stemGrad)"
              strokeWidth="5"
              strokeLinecap="round"
              pathLength={1}
              style={{ pathLength: stemDraw }}
            />

            {/* ── LEFT LEAF ── */}
            <motion.path
              d="M 200 300 C 170 270 120 255 80 270 C 110 275 160 285 200 300"
              stroke="url(#leafLGrad)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              pathLength={1}
              style={{ pathLength: leafLDraw }}
            />
            <motion.path
              d="M 200 300 C 170 270 120 255 80 270"
              stroke="url(#leafLGrad)"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity={0.4}
              pathLength={1}
              style={{ pathLength: leafLDraw }}
            />

            {/* ── RIGHT LEAF ── */}
            <motion.path
              d="M 200 220 C 230 190 285 178 325 192 C 292 200 240 210 200 220"
              stroke="url(#leafRGrad)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              pathLength={1}
              style={{ pathLength: leafRDraw }}
            />
            <motion.path
              d="M 200 220 C 230 190 285 178 325 192"
              stroke="url(#leafRGrad)"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity={0.4}
              pathLength={1}
              style={{ pathLength: leafRDraw }}
            />

            {/* ── SECOND LEFT LEAF (upper) ── */}
            <motion.path
              d="M 200 160 C 168 132 115 124 78 136 C 112 142 162 150 200 160"
              stroke="url(#leafLGrad)"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
              pathLength={1}
              style={{ pathLength: budDraw }}
            />

            {/* ── TOP BUD / SPROUT ── */}
            <motion.path
              d="M 200 80 C 200 60 185 35 180 20 M 200 80 C 200 60 215 35 220 20 M 200 80 L 200 20"
              stroke="url(#budGrad)"
              strokeWidth="3.5"
              strokeLinecap="round"
              pathLength={1}
              style={{ pathLength: budDraw }}
            />

            {/* ── SEED dot at base ── */}
            <circle cx="200" cy="464" r="5" fill="var(--primary)" opacity={0.6} />
          </svg>
        </motion.div>

        {/* ── DESCRIPTION (appears after plant fully drawn) ── */}
        <motion.div
          style={{ opacity: descOpacity, y: descY }}
          className="absolute bottom-[12%] left-0 right-0 flex flex-col items-center text-center px-6 pointer-events-none z-20"
        >
          <p
            className="max-w-2xl leading-relaxed text-muted"
            style={{ fontSize: "clamp(1rem, 1.8vw, 1.2rem)" }}
          >
            A next-generation food platform focused on{" "}
            <span className="text-gradient font-semibold">owning, licensing, launching,</span>{" "}
            and{" "}
            <span className="text-gradient font-semibold">scaling</span>{" "}
            leading plant-based brands across{" "}
            <span className="font-semibold text-foreground">Australia</span> and{" "}
            <span className="font-semibold text-foreground">New Zealand.</span>
          </p>

          {/* stat row */}
          <div className="mt-8 flex items-center gap-10 border-t border-line pt-7">
            {[
              { val: "AU & NZ", label: "Markets" },
              { val: "Next Gen", label: "Platform" },
              { val: "100%", label: "Plant Forward" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-heading text-2xl font-bold text-gradient leading-none">{s.val}</p>
                <p className="mt-1 text-xs tracking-wide text-muted uppercase">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
