"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Handshake, Factory, Rocket, Leaf } from "lucide-react";

const items = [
  {
    icon: Handshake,
    title: "Strategic Acquisitions",
    text: "Investing in and acquiring leading plant-based brands and manufacturers to build scale and category strength.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&q=80",
    alt: "Strategic food brand acquisitions",
    num: "01",
    accent: "from-primary to-secondary",
    tag: "Acquisitions",
    color: "#4a7c59",
  },
  {
    icon: Factory,
    title: "Operational Synergy",
    text: "Unlocking efficiencies through shared manufacturing, supply chains, and a centralised operating platform.",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&q=80",
    alt: "Grocery retail operations",
    num: "02",
    accent: "from-secondary to-secondary-dark",
    tag: "Operations",
    color: "#b45309",
  },
  {
    icon: Rocket,
    title: "Innovation & Growth",
    text: "Accelerating growth by backing innovation, expanding channels, and scaling brands across grocery and foodservice.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900&q=80",
    alt: "Plant-based food innovation",
    num: "03",
    accent: "from-primary-dark to-primary",
    tag: "Innovation",
    color: "#2d6a4f",
  },
  {
    icon: Leaf,
    title: "Sustainability & Impact",
    text: "Driving positive environmental impact by supporting plant-forward solutions that deliver long-term value.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=900&q=80",
    alt: "Sustainability and environmental impact",
    num: "04",
    accent: "from-secondary-dark to-primary",
    tag: "Sustainability",
    color: "#6b7c3e",
  },
];

/*
  Each card's "position" in the stack = i - scrollProgress*(total-1)
  position 0  → active / front
  position 1  → first card behind
  position 2  → second card behind
  position -1 → exited to the left
  position 3+ → waiting (not yet visible)
*/

const POS_RANGE  = [-1.2, -1,    0,    1,    2,    3,   3.2];
const X_RANGE    = [-900, -900,   0,   150,  270,  360,  360];
const RY_RANGE   = [  35,   35,   0,  -14,  -24,  -30,  -30];
const S_RANGE    = [0.88, 0.88,   1, 0.87, 0.75, 0.64, 0.64];
const O_RANGE    = [   0,    0,   1, 0.88,  0.6,    0,    0];

function Card({
  item,
  index,
  total,
  progress,
}: {
  item: (typeof items)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  /* position value: starts at `index`, ends at `index - (total-1)` */
  const pos = useTransform(progress, [0, 1], [index, index - (total - 1)]);

  const x       = useTransform(pos, POS_RANGE, X_RANGE);
  const rotateY = useTransform(pos, POS_RANGE, RY_RANGE);
  const scale   = useTransform(pos, POS_RANGE, S_RANGE);
  const opacity = useTransform(pos, POS_RANGE, O_RANGE);

  /* front card gets highest z; static ordering is fine since cards only
     move forward (back→front→exit) and never swap relative order */
  const zIndex = total - index;

  return (
    <motion.div
      style={{ x, rotateY, scale, opacity, zIndex, transformStyle: "preserve-3d" }}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] sm:w-[420px]"
    >
      {/* vertical portrait card */}
      <div className="overflow-hidden rounded-[2rem] border border-line bg-card shadow-2xl"
           style={{ boxShadow: `0 25px 60px -10px ${item.color}33` }}>

        {/* image — top 52% */}
        <div className="relative h-64 sm:h-72 overflow-hidden">
          <Image
            src={item.image}
            alt={item.alt}
            fill
            sizes="(max-width: 640px) 380px, 420px"
            className="object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40`} />

          {/* tag pill */}
          <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-[3px] text-[10px] font-semibold tracking-widest uppercase backdrop-blur-sm"
                style={{ color: item.color }}>
            {item.tag}
          </span>

          {/* ghost number */}
          <span aria-hidden
                className="font-heading absolute bottom-2 right-4 text-[5rem] font-bold leading-none text-white/20 select-none">
            {item.num}
          </span>
        </div>

        {/* text content */}
        <div className="flex flex-col gap-3 p-6">
          <div
            className={`inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${item.accent} text-white shadow-md`}
          >
            <item.icon size={20} />
          </div>

          <h3 className="font-heading text-xl font-bold leading-snug tracking-tight">
            {item.title}
          </h3>
          <p className="text-sm leading-relaxed text-muted">{item.text}</p>
          <span className={`block h-[2px] w-10 rounded-full bg-gradient-to-r ${item.accent}`} />
        </div>
      </div>
    </motion.div>
  );
}

/* Step counter that updates with scroll */
function Counter({ progress, total }: { progress: MotionValue<number>; total: number }) {
  const step = useTransform(progress, [0, 1], [1, total]);
  return (
    <div className="flex items-center gap-2 text-sm font-semibold text-muted">
      <motion.span className="font-heading text-3xl font-bold text-foreground tabular-nums">
        {/* We'll render dots instead */}
      </motion.span>
    </div>
  );
}

/* Dot indicator */
function Dot({
  index,
  total,
  progress,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const pos = useTransform(progress, [0, 1], [index, index - (total - 1)]);
  /* active when pos is near 0 */
  const opacity = useTransform(pos, [-0.6, 0, 0.6], [0.28, 1, 0.28]);
  const scaleV  = useTransform(pos, [-0.6, 0, 0.6], [0.8, 1.5, 0.8]);

  return (
    <motion.span
      style={{ opacity, scale: scaleV }}
      className="block h-2 w-2 rounded-full bg-gradient-to-r from-primary to-secondary"
    />
  );
}

export function WhatWeDo() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={containerRef}
      id="what-we-do"
      style={{ height: `${items.length * 120}vh` }}
      className="relative"
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        {/* heading */}
        <div className="relative z-10 shrink-0 pt-28 pb-4 text-center sm:pt-32">
          <p className="mb-3 inline-flex items-center gap-3 text-sm font-semibold tracking-[0.3em] text-secondary uppercase">
            <span className="h-[2px] w-10 bg-gradient-to-r from-primary to-secondary" />
            What We Do
            <span className="h-[2px] w-10 bg-gradient-to-l from-primary to-secondary" />
          </p>
          <h2 className="font-heading text-4xl font-bold tracking-[-0.03em] sm:text-5xl">
            Four pillars of{" "}
            <span className="text-gradient">plant-forward growth</span>
          </h2>
        </div>

        {/* 3-D scene */}
        <div
          className="relative min-h-0 flex-1"
          style={{ perspective: "1200px", perspectiveOrigin: "50% 45%" }}
        >
          {items.map((item, i) => (
            <Card
              key={item.num}
              item={item}
              index={i}
              total={items.length}
              progress={scrollYProgress}
            />
          ))}
        </div>

        {/* dots */}
        <div className="relative z-10 flex shrink-0 items-center justify-center gap-3 pb-8">
          {items.map((_, i) => (
            <Dot key={i} index={i} total={items.length} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}
