"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/* ── timing ──────────────────────────────────────────────────────────────────
   0.00s  : panels appear, dark screen
   0.10s  : letters begin 3D flip-in (one by one)
   0.90s  : counter starts 0 → 100
   ~2.40s : counter hits 100, brief pause
   2.75s  : split reveal — top panel slides UP, bottom slides DOWN
   3.80s  : panels gone, body scroll unlocked
   ──────────────────────────────────────────────────────────────────────────── */

const BRAND  = "NextBite";
const EASE   = [0.76, 0, 0.24, 1] as const;
const BG     = "#050805";

export function Preloader() {
  const [count, setCount]     = useState(0);
  const [exiting, setExiting] = useState(false);
  const [gone, setGone]       = useState(false);
  const intervalRef           = useRef<ReturnType<typeof setInterval> | null>(null);

  /* lock scroll */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  /* start counter after letters have animated in */
  useEffect(() => {
    const t = setTimeout(() => {
      let c = 0;
      intervalRef.current = setInterval(() => {
        c += Math.floor(Math.random() * 4) + 2;
        if (c >= 100) {
          c = 100;
          setCount(100);
          if (intervalRef.current) clearInterval(intervalRef.current);
          setTimeout(() => setExiting(true), 380);
        } else {
          setCount(c);
        }
      }, 26);
    }, 900);

    return () => {
      clearTimeout(t);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  /* unlock body after exit animation finishes */
  const handleExitDone = () => {
    if (exiting) {
      setGone(true);
      document.body.style.overflow = "";
    }
  };

  if (gone) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[200]">

      {/* ── TOP PANEL ──────────────────────────────────────────────────── */}
      <motion.div
        initial={{ y: "0%" }}
        animate={{ y: exiting ? "-100%" : "0%" }}
        transition={{ duration: 1.05, ease: EASE, delay: exiting ? 0.06 : 0 }}
        onAnimationComplete={handleExitDone}
        className="absolute inset-x-0 top-0 flex h-[50%] flex-col items-center justify-end overflow-hidden"
        style={{ background: BG }}
      >
        {/* ── brand name — 3D letter flip ── */}
        <div
          className="mb-1 flex items-baseline"
          style={{ perspective: "700px" }}
        >
          {BRAND.split("").map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, rotateX: -90, y: 48 }}
              animate={{ opacity: 1, rotateX: 0, y: 0 }}
              transition={{
                delay: 0.1 + i * 0.072,
                duration: 0.72,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              style={{ display: "inline-block", transformStyle: "preserve-3d" }}
              className={`font-hero font-extrabold leading-none tracking-[-0.04em] select-none
                text-[clamp(3.8rem,11vw,9.5rem)]
                ${i < 4 ? "text-[#f7941d]" : "text-[#5ba829]"}`}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* centre divider glow — shared between panels */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: exiting ? 0 : 0.9 }}
          transition={{ delay: 0.6, duration: 1.0 }}
          className="absolute bottom-0 left-0 right-0 h-[1.5px] origin-left"
          style={{
            background:
              "linear-gradient(90deg,transparent 0%,#f7941d 30%,#5ba829 70%,transparent 100%)",
          }}
        />
      </motion.div>

      {/* ── BOTTOM PANEL ───────────────────────────────────────────────── */}
      <motion.div
        initial={{ y: "0%" }}
        animate={{ y: exiting ? "100%" : "0%" }}
        transition={{ duration: 1.05, ease: EASE, delay: exiting ? 0 : 0 }}
        className="absolute inset-x-0 bottom-0 flex h-[50%] flex-col items-center justify-start overflow-hidden pt-7"
        style={{ background: BG }}
      >
        {/* tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.65 }}
          className="text-[0.65rem] font-medium tracking-[0.55em] text-white/40 uppercase"
        >
          Building the home for plant&#8209;based brands
        </motion.p>

        {/* progress bar */}
        <div className="relative mt-7 h-[1.5px] w-52 overflow-hidden rounded-full bg-white/8">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              width: `${count}%`,
              background: "linear-gradient(90deg,#f7941d,#5ba829)",
              transition: "width 0.12s ease-out",
            }}
          />
        </div>

        {/* counter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
          className="mt-4 flex items-baseline gap-0.5 font-mono text-sm tabular-nums"
        >
          <span className="text-white/50">
            {String(Math.min(count, 100)).padStart(3, "0")}
          </span>
          <span className="text-xs text-white/25">%</span>
        </motion.div>

        {/* decorative corner dots */}
        {[
          "bottom-6 left-8",
          "bottom-6 right-8",
        ].map((pos) => (
          <motion.span
            key={pos}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className={`absolute h-1.5 w-1.5 rounded-full bg-white/20 ${pos}`}
          />
        ))}
      </motion.div>

      {/* ── background particles (subtle) ─────────────────────────────── */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0], scale: [0, 1, 0] }}
          transition={{
            delay: 0.3 + i * 0.22,
            duration: 2.2,
            repeat: Infinity,
            repeatDelay: 1.5,
          }}
          className="pointer-events-none absolute rounded-full"
          style={{
            width:  6 + (i % 3) * 4,
            height: 6 + (i % 3) * 4,
            top:    `${15 + (i * 13) % 70}%`,
            left:   `${8 + (i * 17) % 84}%`,
            background: i % 2 === 0 ? "#f7941d" : "#5ba829",
            filter: "blur(1px)",
          }}
        />
      ))}
    </div>
  );
}
