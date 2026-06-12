"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { RevealWords, Reveal } from "./Reveal";

export function WhyPartner() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  /* background parallax */
  const bgY     = useTransform(scrollYProgress, [0, 1], ["-14%", "14%"]);
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.18, 1, 1.18]);

  /* 3D camera tilt — section rolls towards viewer as it enters */
  const sectionRotateX = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [18, 0, 0, -12]);
  const sectionZ       = useTransform(scrollYProgress, [0, 0.35], [-120, 0]);

  /* stats come from different depths */
  const stat0Z = useTransform(scrollYProgress, [0.3, 0.6], [-200, 0]);
  const stat1Z = useTransform(scrollYProgress, [0.35, 0.65], [-200, 0]);
  const stat2Z = useTransform(scrollYProgress, [0.4, 0.7], [-200, 0]);
  const statZs = [stat0Z, stat1Z, stat2Z];

  const stats = ["Strategic Expertise", "Industry Relationships", "Operational Support"];

  return (
    <section ref={ref} className="relative flex min-h-[92vh] items-center overflow-hidden">
      {/* parallax background */}
      <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0" aria-hidden>
        <Image
          src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1800&q=80"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/72" />
        <div className="absolute inset-0 bg-gradient-to-br from-secondary-dark/40 via-transparent to-primary-dark/30" />
      </motion.div>

      {/* 3D perspective container — whole section tilts on scroll */}
      <motion.div
        style={{
          perspective: "1400px",
          rotateX: sectionRotateX,
          z: sectionZ,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full"
      >
        <div className="mx-auto max-w-5xl px-6 py-28 text-center text-white">
          <Reveal>
            <p className="mb-6 inline-flex items-center gap-3 text-sm font-semibold tracking-[0.3em] text-primary uppercase">
              <span className="h-[2px] w-10 bg-gradient-to-r from-primary to-secondary" />
              Why Partner With Us?
              <span className="h-[2px] w-10 bg-gradient-to-l from-primary to-secondary" />
            </p>
          </Reveal>

          <h2 className="font-hero text-4xl font-extrabold tracking-[-0.03em] sm:text-5xl lg:text-6xl" style={{ lineHeight: 0.95 }}>
            <RevealWords text="More than an investor —" />{" "}
            <RevealWords text="a hands-on" />{" "}
            <RevealWords text="partner." className="text-gradient" />
          </h2>

          <Reveal delay={0.3}>
            <p className="mx-auto mt-9 max-w-3xl text-lg leading-relaxed text-white/80">
              NextBite Brands is more than an investor — we are a hands-on partner in
              building the next generation of plant-forward food brands. From emerging
              startups to established businesses ready to scale, we bring strategic
              expertise, deep industry relationships, and operational support to unlock
              sustainable growth.
            </p>
          </Reveal>

          {/* Stats — fly in from deep Z */}
          <div className="mt-14 flex flex-wrap justify-center gap-6" style={{ perspective: "900px" }}>
            {stats.map((label, i) => (
              <motion.div
                key={label}
                style={{ z: statZs[i] }}
                initial={{ opacity: 0, y: 40, rotateX: 30 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, delay: 0.35 + i * 0.14, ease: [0.21, 0.47, 0.32, 0.98] }}
                whileHover={{ y: -10, scale: 1.06 }}
                className="rounded-2xl border border-white/15 bg-white/10 px-8 py-5 backdrop-blur-md"
              >
                <p className="font-heading font-semibold">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
