"use client";

import { motion } from "framer-motion";
import type { ReactNode, CSSProperties } from "react";
import { cn } from "@/lib/utils";

/* ──────────────────────────────────────────────
   Simple reveal — fade + rise (no extra wrapper)
   Use for text, paragraphs, small elements
   ────────────────────────────────────────────── */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 50,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   3-D reveal — element comes from deep space
   rotateX(30°) + translateZ(-200px) → flat
   Needs a perspective parent; wraps one itself.
   Use for cards, images, section headings
   ────────────────────────────────────────────── */
export function Reveal3D({
  children,
  className,
  delay = 0,
  direction = "up",   // "up" | "left" | "right"
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
  once?: boolean;
}) {
  const initial: Record<string, number> = { opacity: 0 };
  if (direction === "up")    { initial.y = 70; initial.rotateX = 32; }
  if (direction === "left")  { initial.x = 80; initial.rotateY = -28; }
  if (direction === "right") { initial.x = -80; initial.rotateY = 28; }

  return (
    <div style={{ perspective: "1200px" } as CSSProperties}>
      <motion.div
        initial={initial}
        whileInView={{ opacity: 1, y: 0, x: 0, rotateX: 0, rotateY: 0 }}
        viewport={{ once, margin: "-80px" }}
        transition={{ duration: 0.9, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
        style={{ transformStyle: "preserve-3d" }}
        className={cn(className)}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Word-by-word staggered reveal (awwwards style)
   Each word slides up out of an overflow clip
   ────────────────────────────────────────────── */
export function RevealWords({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  return (
    <span className={cn("inline-block", className)}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", rotate: 5 }}
            whileInView={{ y: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.75,
              delay: delay + i * 0.07,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
          >
            {word}
            {i < text.split(" ").length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
