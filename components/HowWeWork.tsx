"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal, RevealWords } from "./Reveal";
import { TiltCard } from "./TiltCard";

const steps = [
  {
    num: "01",
    title: "Product Development & Branding",
    text: "We work closely with our brands to refine products, strengthen branding, and ensure they meet market, quality, and consumer expectations.",
    style: "bg-gradient-to-br from-primary/15 to-primary/5 border-primary/20",
    accent: "text-primary",
    bar: "from-primary to-secondary",
    z: 0,
  },
  {
    num: "02",
    title: "Market Entry & Distribution",
    text: "We unlock access to grocery and foodservice channels, securing distribution, retail placements, and executing clear go-to-market strategies.",
    style: "bg-gradient-to-br from-secondary/15 to-secondary/5 border-secondary/20",
    accent: "text-secondary",
    bar: "from-secondary to-secondary-dark",
    z: -60,
  },
  {
    num: "03",
    title: "Growth & Brand Expansion",
    text: "We accelerate scale through strategic partnerships, increased visibility, and expansion across categories and channels to drive sustained growth.",
    style: "bg-gradient-to-br from-secondary-dark/20 to-secondary-dark/5 border-secondary-dark/25",
    accent: "text-secondary dark:text-secondary",
    bar: "from-secondary-dark to-primary",
    z: -120,
  },
];

export function HowWeWork() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  /* section-level 3D camera tilt as you scroll through */
  const sectionRotateX = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [14, 0, 0, -14]);
  const sectionY = useTransform(scrollYProgress, [0, 0.4], [60, 0]);

  return (
    <section ref={ref} id="how-we-work" className="relative overflow-hidden py-28">
      {/* ambient blobs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="animate-float-slow absolute top-20 -left-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="animate-float absolute -right-32 bottom-20 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* header */}
        <div className="mb-20 grid items-end gap-10 lg:grid-cols-2">
          <div>
            <Reveal>
              <p className="mb-4 flex items-center gap-3 text-sm font-semibold tracking-[0.3em] text-secondary uppercase">
                <span className="h-[2px] w-10 bg-gradient-to-r from-primary to-secondary" />
                How We Work
              </p>
            </Reveal>
            <h2 className="font-heading text-4xl font-bold tracking-[-0.03em] sm:text-5xl">
              <RevealWords text="A partnership built" />{" "}
              <RevealWords text="for scale" className="text-gradient" />
            </h2>
          </div>
          <Reveal delay={0.2}>
            <p className="leading-relaxed text-muted lg:max-w-md lg:justify-self-end">
              We partner with plant-forward brands and manufacturers to transform great
              products into scalable, successful FMCG brands — through strategy, market
              entry, and long-term growth.
            </p>
          </Reveal>
        </div>

        {/* 3-D cards — wrapped in perspective container */}
        <motion.div
          style={{
            perspective: "1400px",
            rotateX: sectionRotateX,
            y: sectionY,
          }}
          className="grid gap-8 md:grid-cols-3"
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 80, rotateX: 30, z: step.z - 200 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, z: step.z }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 1,
                delay: i * 0.18,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              style={{ transformStyle: "preserve-3d", z: step.z }}
            >
              <TiltCard
                intensity={10}
                className={`group h-full rounded-[2rem] border p-9 backdrop-blur-sm ${step.style}`}
              >
                <div className="flex h-full flex-col">
                  <div className="flex items-start justify-between">
                    <span className={`font-heading text-6xl font-bold ${step.accent}`}>
                      {step.num}
                    </span>
                    <motion.span
                      className="glass flex h-11 w-11 items-center justify-center rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      whileHover={{ rotate: 45 }}
                    >
                      <ArrowUpRight size={18} />
                    </motion.span>
                  </div>
                  <h3 className="font-heading mt-8 text-2xl font-bold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-4 leading-relaxed text-muted">{step.text}</p>
                  <div className="mt-auto pt-8">
                    <span
                      className={`block h-[3px] w-12 rounded-full bg-gradient-to-r ${step.bar} transition-all duration-500 group-hover:w-full`}
                    />
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
