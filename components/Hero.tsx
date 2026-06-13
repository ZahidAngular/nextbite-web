"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowDown, ArrowUpRight, Sprout } from "lucide-react";
import { RevealWords } from "./Reveal";
import { OrbitalRings } from "./OrbitalRings";
import { MagneticButton } from "./MagneticButton";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const textY       = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const textScale   = useTransform(scrollYProgress, [0, 0.55], [1, 0.86]);

  const card1Y      = useTransform(scrollYProgress, [0, 1], [0, -240]);
  const card1RY     = useTransform(scrollYProgress, [0, 0.5, 1], [-12, -4, 8]);
  const card1RX     = useTransform(scrollYProgress, [0, 1], [0, 12]);

  const card2Y      = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const card2RY     = useTransform(scrollYProgress, [0, 0.5, 1], [10, 4, -6]);

  const orbY        = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const orbOpacity  = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const orbScale    = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.18, 0.65]);

  const blob1Y      = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const blob2Y      = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const badgeRotate = useTransform(scrollYProgress, [0, 1], [0, 210]);

  /* mouse tilt on card cluster */
  const spr = { stiffness: 55, damping: 18 };
  const clX = useSpring(0, spr);
  const clY = useSpring(0, spr);
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    clX.set(((e.clientX - left) / width - 0.5) * 18);
    clY.set(((e.clientY - top) / height - 0.5) * -14);
  };
  const onLeave = () => { clX.set(0); clY.set(0); };

  return (
    <section ref={ref} className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16">

      {/* ── depth blobs ── */}
      <motion.div style={{ y: blob1Y }} aria-hidden className="pointer-events-none absolute inset-0">
        <div className="animate-float absolute -top-32 -left-32 h-[40rem] w-[40rem] rounded-full bg-secondary/10 blur-3xl" />
      </motion.div>
      <motion.div style={{ y: blob2Y }} aria-hidden className="pointer-events-none absolute inset-0">
        <div className="animate-float-slow absolute top-1/3 -right-40 h-[30rem] w-[30rem] rounded-full bg-primary/10 blur-3xl" />
        <div className="animate-float absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-secondary/8 blur-3xl" />
      </motion.div>

      {/* ── BIG orbital rings in background ── */}
      <motion.div
        style={{ y: orbY, opacity: orbOpacity, scale: orbScale }}
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-[4%] hidden -translate-y-1/2 lg:block"
      >
        <OrbitalRings className="relative h-[540px] w-[540px]" />
      </motion.div>

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1fr_auto]">

        {/* ── LEFT: text ── */}
        <motion.div style={{ y: textY, opacity: textOpacity, scale: textScale }} className="relative z-10 max-w-3xl">

          {/* eyebrow */}
          <motion.p
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.3, duration: 0.8 }}
            className="mb-8 flex items-center gap-4 text-sm font-semibold tracking-[0.35em] text-secondary uppercase"
          >
            <span className="h-[2px] w-12 bg-gradient-to-r from-primary to-secondary" />
            NextBite Brands — AU &amp; NZ
          </motion.p>

          {/* GIANT headline — Bricolage Grotesque award-site style */}
          <h1 className="font-hero text-[clamp(2.8rem,8vw,7.5rem)] tracking-[-0.04em] leading-[0.92]">
            <span className="block overflow-hidden font-extrabold">
              <RevealWords text="Building the" delay={2.4} />
            </span>
            <span className="block overflow-hidden font-light text-foreground/55 tracking-[-0.02em]">
              <RevealWords text="home for" delay={2.55} />
            </span>
            <span className="block overflow-hidden font-extrabold">
              <RevealWords text="Plant-Based" delay={2.7} className="text-gradient" />
            </span>
            <span className="block overflow-hidden font-extrabold">
              <RevealWords text="Brands." delay={2.85} className="text-gradient" />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.1, duration: 0.8 }}
            className="mt-7 max-w-lg text-base leading-relaxed text-muted sm:text-lg"
          >
            A next-generation food platform focused on owning, licensing, launching, and
            scaling leading plant-based brands across Australia and New Zealand.
          </motion.p>

          {/* CTAs — magnetic */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.3 }}
            className="mt-10 flex flex-wrap items-center gap-5"
          >
            <MagneticButton>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                className="animate-pulse-glow flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-9 py-4 font-semibold text-white shadow-xl"
              >
                Contact Us <ArrowUpRight size={18} />
              </motion.a>
            </MagneticButton>

            <MagneticButton>
              <motion.a
                href="#about"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                className="glass flex items-center gap-2 rounded-full px-9 py-4 font-semibold"
              >
                Discover More <ArrowDown size={18} />
              </motion.a>
            </MagneticButton>
          </motion.div>

          {/* mobile hero image — only visible on small screens */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.1, duration: 0.9 }}
            className="relative mt-10 h-56 w-full overflow-hidden rounded-3xl lg:hidden"
          >
            <Image
              src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&q=80"
              alt="Fresh plant-based ingredients"
              fill
              sizes="100vw"
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary-dark/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4">
              <p className="text-[10px] font-semibold tracking-widest text-white/70 uppercase">Plant-Based</p>
              <p className="font-heading text-base font-bold text-white">Fresh &amp; Sustainable</p>
            </div>
          </motion.div>

          {/* micro stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.6 }}
            className="mt-10 flex flex-wrap gap-6 border-t border-line pt-8 sm:gap-10"
          >
            {[
              { val: "AU & NZ", label: "Markets Covered" },
              { val: "Next Gen", label: "Food Platform" },
              { val: "100%", label: "Plant Forward" },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-heading text-2xl font-bold text-gradient">{s.val}</p>
                <p className="mt-1 text-xs tracking-wide text-muted uppercase">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── RIGHT: 3D image cluster ── */}
        <div
          className="perspective-2000 relative hidden h-[600px] w-[440px] shrink-0 lg:block"
          onMouseMove={onMove}
          onMouseLeave={onLeave}
        >
          <motion.div className="preserve-3d absolute inset-0" style={{ rotateY: clX, rotateX: clY }}>

            {/* Card 1 — deep layer */}
            <motion.div
              data-cursor="view"
              style={{ y: card1Y, rotateY: card1RY, rotateX: card1RX }}
              initial={{ opacity: 0, rotateY: -30, x: 110 }}
              animate={{ opacity: 1, rotateY: -12, x: 0 }}
              transition={{ delay: 2.6, duration: 1.1, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="preserve-3d shadow-3d animate-float absolute top-0 right-2 h-[440px] w-[320px] overflow-hidden rounded-[2.5rem] border border-line"
            >
              <Image
                src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&q=80"
                alt="Fresh plant-based ingredients" fill sizes="320px" priority
                className="object-cover scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary-dark/65 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-[11px] font-semibold tracking-[0.22em] text-white/60 uppercase">Plant-Based</p>
                <p className="font-heading mt-1 text-xl font-bold text-white">Fresh & Sustainable</p>
              </div>
            </motion.div>

            {/* Card 2 — mid layer */}
            <motion.div
              data-cursor="view"
              style={{ y: card2Y, rotateY: card2RY }}
              initial={{ opacity: 0, rotateY: 28, x: -55 }}
              animate={{ opacity: 1, rotateY: 10, x: 0 }}
              transition={{ delay: 2.9, duration: 1.1, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="preserve-3d shadow-3d animate-float-slow absolute bottom-6 left-0 h-[310px] w-[255px] overflow-hidden rounded-[2.5rem] border border-line"
            >
              <Image
                src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80"
                alt="Healthy plant-based bowl" fill sizes="255px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/55 to-transparent" />
            </motion.div>

            {/* Small orbital rings */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 3.4, type: "spring" }}
              className="absolute -top-10 -left-10 z-10"
            >
              <OrbitalRings className="relative h-32 w-32" />
            </motion.div>

            {/* Spinning badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 3.3, type: "spring" }}
              className="glass shadow-3d animate-pulse-glow absolute top-[42%] left-[22%] z-20 flex h-[130px] w-[130px] items-center justify-center rounded-full"
            >
              <motion.svg style={{ rotate: badgeRotate }} viewBox="0 0 100 100" className="absolute h-full w-full p-2">
                <defs>
                  <path id="cp" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
                </defs>
                <text className="fill-foreground text-[9.5px] font-semibold tracking-[0.22em] uppercase">
                  <textPath href="#cp">Plant Based • Sustainable • Future •</textPath>
                </text>
              </motion.svg>
              <Sprout className="text-secondary" size={34} />
            </motion.div>

            {/* Stat pill */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.7 }}
              className="glass shadow-3d absolute top-8 left-1 z-30 rounded-2xl px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-2.5 w-2.5 rounded-full bg-secondary shadow-[0_0_8px_2px_rgba(91,168,41,0.6)]" />
                <p className="text-sm font-semibold">Australia & NZ</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.0 }}
        style={{ opacity: textOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="flex h-12 w-7 items-start justify-center rounded-full border-2 border-line p-1.5"
        >
          <div className="h-2.5 w-1 rounded-full bg-gradient-to-b from-primary to-secondary" />
        </motion.div>
      </motion.div>
    </section>
  );
}
