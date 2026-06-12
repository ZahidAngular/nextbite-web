"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sprout } from "lucide-react";
import { Reveal, Reveal3D, RevealWords } from "./Reveal";
import { TiltCard } from "./TiltCard";

export function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  /* 3D parallax on the background outline text */
  const bgTextY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const bgTextRotate = useTransform(scrollYProgress, [0, 1], [-4, 4]);

  /* image card depth */
  const imgZ = useTransform(scrollYProgress, [0, 0.5, 1], [-80, 0, -40]);
  const imgRotateY = useTransform(scrollYProgress, [0, 0.4, 1], [-8, 0, 4]);

  return (
    <section ref={ref} id="about" className="relative overflow-hidden py-28">
      {/* scrolling outline watermark — moves at different speed for parallax depth */}
      <motion.span
        aria-hidden
        style={{ y: bgTextY, rotate: bgTextRotate }}
        className="text-stroke font-heading pointer-events-none absolute top-8 left-1/2 -translate-x-1/2 text-[16vw] font-bold whitespace-nowrap opacity-50 select-none"
      >
        NEXTBITE
      </motion.span>

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
        {/* ── image with scroll-linked 3D rotation ── */}
        <Reveal3D direction="left">
          <motion.div style={{ rotateY: imgRotateY, z: imgZ, perspective: "1200px" }}>
            <TiltCard className="shadow-3d overflow-hidden rounded-[2.5rem]">
              <div className="relative aspect-[4/3]">
                <Image
                  src="https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=1000&q=80"
                  alt="Plant-based food platform"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-secondary-dark/40 via-transparent to-primary/20" />
              </div>
              {/* floating stat chip */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="glass absolute bottom-6 left-6 flex items-center gap-3 rounded-2xl px-5 py-3"
              >
                <Sprout className="text-secondary" />
                <div>
                  <p className="font-heading text-sm font-bold">Plant-Forward</p>
                  <p className="text-xs text-muted">Australia & New Zealand</p>
                </div>
              </motion.div>
            </TiltCard>
          </motion.div>
        </Reveal3D>

        {/* ── text ── */}
        <div>
          <Reveal>
            <p className="mb-4 flex items-center gap-3 text-sm font-semibold tracking-[0.3em] text-secondary uppercase">
              <span className="h-[2px] w-10 bg-gradient-to-r from-primary to-secondary" />
              About Us
            </p>
          </Reveal>

          <h2 className="font-hero text-4xl font-extrabold tracking-[-0.03em] sm:text-5xl lg:text-6xl" style={{ lineHeight: 0.95 }}>
            <RevealWords text="Keeping the" />{" "}
            <RevealWords text="plant-forward" className="text-gradient" />{" "}
            <br className="hidden sm:block" />
            <RevealWords text="food revolution" />{" "}
            <RevealWords text="moving." className="text-gradient" />
          </h2>

          <Reveal delay={0.15}>
            <p className="mt-7 leading-relaxed text-muted">
              NextBite exists to keep the plant-forward food revolution relevant, scalable,
              and commercially strong. We do this by making strategic investments in leading
              plant-forward brands and manufacturers.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-5 leading-relaxed text-muted">
              Our strength lies in connecting innovative plant-forward businesses with deep
              grocery and foodservice relationships, shared manufacturing capabilities, and a
              disciplined operating platform.
            </p>
          </Reveal>
          <Reveal delay={0.35}>
            <p className="mt-5 leading-relaxed text-muted">
              As a specialist plant-forward investment company, NextBite focuses on
              consolidation and long-term value creation — helping exceptional brands grow
              faster, smarter, and more sustainably.
            </p>
          </Reveal>

          <Reveal delay={0.45}>
            <motion.div
              whileHover={{ scale: 1.03, y: -3 }}
              className="mt-9 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-primary to-secondary p-[2px]"
            >
              <span className="rounded-full bg-background px-7 py-3.5 text-sm font-semibold">
                Advancing the next generation of{" "}
                <span className="text-gradient">plant-forward excellence</span>
              </span>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
