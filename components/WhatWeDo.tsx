"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  cubicBezier,
  type MotionValue,
} from "framer-motion";
import { Handshake, Factory, Rocket, Leaf } from "lucide-react";

const items = [
  {
    icon: Handshake,
    title: "Strategic Acquisitions",
    text: "Investing in and acquiring leading plant-based brands and manufacturers to build scale and category strength.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1000&q=80",
    alt: "Strategic food brand acquisitions",
    num: "01",
    accent: "from-primary to-secondary",
  },
  {
    icon: Factory,
    title: "Operational Synergy",
    text: "Unlocking efficiencies through shared manufacturing, supply chains, and a centralised operating platform.",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1000&q=80",
    alt: "Grocery retail operations",
    num: "02",
    accent: "from-secondary to-secondary-dark",
  },
  {
    icon: Rocket,
    title: "Innovation & Growth",
    text: "Accelerating growth by backing innovation, expanding channels, and scaling brands across grocery and foodservice.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1000&q=80",
    alt: "Plant-based food innovation",
    num: "03",
    accent: "from-primary-dark to-primary",
  },
  {
    icon: Leaf,
    title: "Sustainability & Impact",
    text: "Driving positive environmental impact by supporting plant-forward solutions that deliver long-term value.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1000&q=80",
    alt: "Sustainability and environmental impact",
    num: "04",
    accent: "from-secondary-dark to-primary",
  },
];

/* cinematic landing curve — fast rise, soft settle */
const easeLand = cubicBezier(0.22, 0.61, 0.36, 1);

/* ── Stacked deck card ─────────────────────────────────────────────
   Each card rises from below with a 3D tilt and lands at centre.
   Once a newer card arrives, this one recedes into depth: scales
   down, drifts up, tilts slightly and dims — like a deck stacking. */
function StackCard({
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
  const start = index / total;
  const end = (index + 1) / total;
  const depth = total - 1 - index; // how many cards will pile on top
  /* keep ranges strictly increasing even for the last card (end === 1) */
  const rest = Math.min(end, 0.9999);

  const isFirst = index === 0;

  /* entry: rise from offscreen with tilt → land flat → recede upward */
  const y = useTransform(
    progress,
    [start, rest, 1],
    [isFirst ? "0%" : "115%", "0%", `-${depth * 3.5}%`],
    { ease: easeLand }
  );
  const rotateX = useTransform(
    progress,
    [start, rest, 1],
    [isFirst ? 0 : 18, 0, depth * 2],
    { ease: easeLand }
  );
  const scale = useTransform(
    progress,
    [start, rest, 1],
    [isFirst ? 1 : 1.04, 1, 1 - depth * 0.055],
    { ease: easeLand }
  );
  /* buried cards lean alternately for a hand-stacked deck feel */
  const rotateZ = useTransform(
    progress,
    [rest, 1],
    [0, depth === 0 ? 0 : index % 2 === 0 ? -1.6 : 1.6]
  );
  /* dim veil as the card sinks into the stack */
  const veil = useTransform(progress, [rest, 1], [0, Math.min(0.55, depth * 0.22)]);
  /* parallax inside the image while the card travels */
  const imgY = useTransform(progress, [start, rest], ["12%", "0%"], { ease: easeLand });

  return (
    <motion.div
      style={{
        y,
        rotateX,
        rotateZ,
        scale,
        zIndex: index + 1,
        transformStyle: "preserve-3d",
        transformOrigin: "center 20%",
      }}
      className="absolute inset-0 flex items-center justify-center px-4 lg:px-12"
    >
      <div className="shadow-3d relative grid w-full max-w-5xl overflow-hidden rounded-[2.5rem] border border-line bg-card lg:grid-cols-2">
        {/* image with internal parallax */}
        <div className={`relative h-64 overflow-hidden lg:h-[26rem] ${index % 2 === 1 ? "lg:order-2" : ""}`}>
          <motion.div style={{ y: imgY }} className="absolute -inset-y-8 inset-x-0">
            <Image
              src={item.image}
              alt={item.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
          <div className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-40`} />
        </div>
        {/* text */}
        <div className="relative flex flex-col justify-center p-8 lg:p-14">
          <span
            aria-hidden
            className="text-stroke font-heading absolute top-5 right-7 text-8xl font-bold opacity-50 select-none"
          >
            {item.num}
          </span>
          <div
            className={`mb-7 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${item.accent} text-white shadow-lg`}
          >
            <item.icon size={28} />
          </div>
          <h3 className="font-heading text-3xl font-bold tracking-tight">{item.title}</h3>
          <p className="mt-5 leading-relaxed text-muted">{item.text}</p>
          <span
            className={`mt-8 block h-[3px] w-14 rounded-full bg-gradient-to-r ${item.accent}`}
          />
        </div>

        {/* dim veil — darkens as the card recedes into the stack */}
        <motion.div
          aria-hidden
          style={{ opacity: veil }}
          className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] bg-black"
        />
      </div>
    </motion.div>
  );
}

/* ── Progress dot — own component so hooks are valid ── */
function Dot({
  index,
  total,
  progress,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const s = index / total;
  const e = (index + 1) / total;
  const mid = s + (e - s) * 0.5;

  const width = useTransform(progress, [s, mid, e], [8, 32, 8]);
  const opacity = useTransform(progress, [s, mid, e], [0.35, 1, 0.35]);

  return (
    <motion.span
      style={{ width, opacity }}
      className="block h-2 rounded-full bg-gradient-to-r from-primary to-secondary"
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
      /* each card gets ~110vh of scroll travel */
      style={{ height: `${items.length * 110 + 30}vh` }}
      className="relative"
    >
      {/* sticky viewport */}
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        {/* heading — pushed clear of the fixed navbar */}
        <div className="relative z-10 shrink-0 pt-28 pb-6 text-center sm:pt-32">
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

        {/* 3-D scene — perspective makes the stack depth feel real */}
        <div className="relative min-h-0 flex-1" style={{ perspective: "1600px" }}>
          {items.map((item, i) => (
            <StackCard
              key={item.num}
              item={item}
              index={i}
              total={items.length}
              progress={scrollYProgress}
            />
          ))}
        </div>

        {/* scroll progress pills */}
        <div className="relative z-10 flex shrink-0 items-center justify-center gap-3 pb-7">
          {items.map((_, i) => (
            <Dot key={i} index={i} total={items.length} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}
