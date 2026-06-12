"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Lightbulb, Truck, Megaphone, TrendingUp, Award } from "lucide-react";
import { RevealWords } from "./Reveal";

const areas = [
  { icon: Lightbulb, label: "Innovation",    desc: "Pioneering plant-based product development",        color: "from-primary to-amber-500",       num: "01" },
  { icon: Truck,     label: "Distribution",  desc: "National grocery & foodservice channel access",     color: "from-secondary to-emerald-600",   num: "02" },
  { icon: Megaphone, label: "Marketing",     desc: "Brand storytelling that drives consumer demand",    color: "from-primary to-secondary",       num: "03" },
  { icon: TrendingUp,label: "Sales",         desc: "Revenue growth through strategic retail placement", color: "from-secondary-dark to-secondary", num: "04" },
  { icon: Award,     label: "Branding",      desc: "Visual identity systems for category leadership",   color: "from-primary-dark to-primary",    num: "05" },
];

export function Expertise() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /* heading fades in quickly, no big slide — never hides under the navbar */
  const headingOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1]);
  const headingY       = useTransform(scrollYProgress, [0, 0.08], [24, 0]);

  /* cards scroll horizontally — start after heading lands */
  const cardsX = useTransform(scrollYProgress, [0.12, 1], ["6%", "-58%"]);

  /* progress bar width */
  const barWidth = useTransform(scrollYProgress, [0.12, 1], ["0%", "100%"]);

  return (
    /* tall section so horizontal travel feels natural */
    <section
      ref={containerRef}
      id="expertise"
      style={{ height: "320vh" }}
      className="relative"
    >
      {/* whole composition is centered as one block — fixed gaps,
          no dead space, heading always clears the fixed navbar */}
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-24 pb-6">

        {/* ── heading ── */}
        <motion.div
          style={{ opacity: headingOpacity, y: headingY }}
          className="relative z-10 shrink-0 text-center"
        >
          <p className="mb-3 inline-flex items-center gap-3 text-sm font-semibold tracking-[0.3em] text-secondary uppercase">
            <span className="h-[2px] w-10 bg-gradient-to-r from-primary to-secondary" />
            Our Expertise
            <span className="h-[2px] w-10 bg-gradient-to-l from-primary to-secondary" />
          </p>
          <h2 className="font-heading text-4xl font-bold tracking-[-0.03em] sm:text-5xl">
            <RevealWords text="Our area of work" />{" "}
            <RevealWords text="and expertise" className="text-gradient" />
          </h2>
          <p className="mt-3 text-sm text-muted">← Scroll to explore →</p>
        </motion.div>

        {/* ── horizontal scroll track — fixed height, fixed gap below heading ── */}
        <div className="relative mt-10 flex h-[380px] shrink-0 items-center md:mt-12">
          <motion.div
            style={{ x: cardsX }}
            className="flex items-stretch gap-7 px-[8vw]"
          >
            {areas.map((area, i) => (
              <motion.div
                key={area.num}
                data-cursor="view"
                initial={{ opacity: 0, rotateY: 35, scale: 0.88 }}
                whileInView={{ opacity: 1, rotateY: 0, scale: 1 }}
                viewport={{ once: true, margin: "0px -200px 0px 0px" }}
                transition={{ duration: 0.85, delay: i * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
                whileHover={{ y: -14 }}
                style={{ perspective: "900px", minWidth: "340px" }}
              >
                <div className="group relative flex h-[360px] w-[340px] flex-col justify-between overflow-hidden rounded-[2rem] border border-line bg-card p-9 shadow-xl transition-shadow duration-300 hover:shadow-2xl">

                  {/* background gradient on hover */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: "linear-gradient(135deg,rgba(247,148,29,0.07) 0%,rgba(91,168,41,0.07) 100%)" }}
                  />

                  {/* top: number */}
                  <span className="text-stroke font-heading text-7xl font-bold leading-none opacity-60 select-none">
                    {area.num}
                  </span>

                  {/* middle: icon */}
                  <motion.div
                    whileHover={{ scale: 1.12, rotate: 6 }}
                    transition={{ type: "spring", stiffness: 300, damping: 18 }}
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${area.color} text-white shadow-lg`}
                  >
                    <area.icon size={28} />
                  </motion.div>

                  {/* bottom: text */}
                  <div>
                    <h3 className="font-heading text-2xl font-bold transition-colors duration-300 group-hover:text-secondary">
                      {area.label}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{area.desc}</p>
                    {/* slide-in underline */}
                    <span className={`mt-5 block h-[2px] w-0 rounded-full bg-gradient-to-r ${area.color} transition-all duration-500 group-hover:w-full`} />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── progress bar ── */}
        <div className="relative mx-auto mt-10 h-[2px] w-48 shrink-0 overflow-hidden rounded-full bg-line">
          <motion.span
            style={{ width: barWidth }}
            className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-primary to-secondary"
          />
        </div>
      </div>
    </section>
  );
}
