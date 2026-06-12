"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Leaf } from "lucide-react";
import { RevealWords, Reveal } from "./Reveal";

export function JoinUs() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  /* Banner itself — comes from Z depth + tilts */
  const bannerRotateX = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], [22, 0, 0, -10]);
  const bannerScale   = useTransform(scrollYProgress, [0, 0.4], [0.82, 1]);
  const bannerOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

  return (
    <section className="relative py-28">
      <div ref={ref} className="mx-auto max-w-7xl px-6" style={{ perspective: "1300px" }}>
        <motion.div
          style={{
            rotateX: bannerRotateX,
            scale: bannerScale,
            opacity: bannerOpacity,
            transformStyle: "preserve-3d",
          }}
          className="shadow-3d relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-secondary-dark via-secondary to-primary p-12 text-center text-white sm:p-20"
        >
          {/* floating leaves */}
          {[...Array(7)].map((_, i) => (
            <motion.span
              key={i}
              aria-hidden
              animate={{ y: [0, -22, 0], rotate: [0, 22, 0] }}
              transition={{ repeat: Infinity, duration: 5 + i * 0.8, delay: i * 0.6 }}
              className="absolute opacity-20"
              style={{
                top: `${10 + (i % 3) * 32}%`,
                left: `${5 + i * 13}%`,
              }}
            >
              <Leaf size={32 + (i % 3) * 18} />
            </motion.span>
          ))}

          {/* 3D shine sweep on hover */}
          <motion.div
            initial={{ x: "-100%", skewX: -20 }}
            whileInView={{ x: "220%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.4, ease: "easeInOut" }}
            className="pointer-events-none absolute inset-y-0 w-1/3 bg-white/10 blur-xl"
            aria-hidden
          />

          <h2 className="font-hero relative text-4xl font-extrabold tracking-[-0.03em] sm:text-5xl lg:text-6xl" style={{ lineHeight: 0.95 }}>
            <RevealWords text="Join Us in" />{" "}
            <RevealWords text="Shaping" />{" "}
            <RevealWords text="the Future." />
          </h2>

          <Reveal delay={0.2}>
            <p className="relative mx-auto mt-7 max-w-3xl text-lg leading-relaxed text-white/85">
              If you are a plant-based brand or manufacturer looking for a strategic partner
              to take your business to the next level, we want to hear from you.
            </p>
          </Reveal>

          <Reveal delay={0.35}>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.07, y: -5 }}
              whileTap={{ scale: 0.96 }}
              className="relative mt-10 inline-flex items-center gap-2 rounded-full bg-white px-9 py-4 font-semibold text-secondary-dark shadow-xl"
            >
              Let&apos;s Talk <ArrowUpRight size={18} />
            </motion.a>
          </Reveal>
        </motion.div>
      </div>
    </section>
  );
}
