"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ImageIcon, Snowflake, Thermometer, type LucideIcon } from "lucide-react";
import type { Product } from "./data";

/* ──────────────────────────────────────────────
   Temperature chip — CHILLED (blue) / FROZEN (cyan)
   ────────────────────────────────────────────── */
export function TempChip({
  temp,
  /** true jab chip safed pack-shot tile par ho — tab theme se farq nahi parta */
  onLight = false,
  className = "",
}: {
  temp: Product["temp"];
  onLight?: boolean;
  className?: string;
}) {
  const frozen = temp === "FROZEN";
  const Icon = frozen ? Snowflake : Thermometer;

  const tone = onLight
    ? frozen
      ? "border-sky-500/40 bg-sky-500/15 text-sky-700"
      : "border-teal-500/40 bg-teal-500/15 text-teal-800"
    : frozen
      ? "border-sky-400/40 bg-sky-400/15 text-sky-600 dark:text-sky-300"
      : "border-teal-400/40 bg-teal-400/15 text-teal-700 dark:text-teal-300";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-[0.14em] uppercase backdrop-blur-md ${tone} ${className}`}
    >
      <Icon size={11} strokeWidth={2.4} />
      {temp}
    </span>
  );
}

/* ──────────────────────────────────────────────
   Placeholder pack-shot — jab tak asli photo na aaye
   Brand-tinted gradient + category icon + initials
   ────────────────────────────────────────────── */
function Placeholder({
  name,
  color,
  color2,
  Icon,
}: {
  name: string;
  color: string;
  color2: string;
  Icon: LucideIcon;
}) {
  const initials = name
    .replace(/[^a-zA-Z ]/g, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

  return (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
      style={{
        background: `radial-gradient(120% 100% at 50% 0%, ${color}22 0%, transparent 60%), linear-gradient(160deg, ${color2}18, ${color}0d)`,
      }}
    >
      {/* dot grid texture */}
      <span
        aria-hidden
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `radial-gradient(${color}33 1px, transparent 1px)`,
          backgroundSize: "14px 14px",
        }}
      />

      {/* soft brand glow */}
      <span
        aria-hidden
        className="absolute -bottom-12 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: color, opacity: 0.22 }}
      />

      {/* pack silhouette */}
      <div
        className="relative flex h-[62%] w-[58%] flex-col items-center justify-center gap-1.5 rounded-2xl border backdrop-blur-sm"
        style={{
          borderColor: `${color}40`,
          background: `linear-gradient(155deg, ${color}1f, ${color2}0a)`,
          boxShadow: `0 14px 30px -18px ${color}99`,
        }}
      >
        <Icon size={26} strokeWidth={1.5} style={{ color }} />
        <span
          className="font-display-black text-[13px] leading-none"
          style={{ color, opacity: 0.85 }}
        >
          {initials}
        </span>
      </div>

      {/* honest little label */}
      <span className="absolute bottom-2 right-2.5 inline-flex items-center gap-1 text-[9px] font-medium tracking-wide text-muted/70 uppercase">
        <ImageIcon size={9} />
        photo soon
      </span>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Pack shot — asli photo ya placeholder
   Card aur slideshow dono isi ko use karte hain
   ────────────────────────────────────────────── */
export function PackShot({
  product,
  color,
  color2,
  Icon,
  sizes = "(max-width: 640px) 100vw, 25vw",
  imageClassName = "",
}: {
  product: Product;
  color: string;
  color2: string;
  Icon: LucideIcon;
  sizes?: string;
  imageClassName?: string;
}) {
  if (!product.image) {
    return (
      <Placeholder
        name={product.name}
        color={color}
        color2={color2}
        Icon={Icon}
      />
    );
  }

  /* Pack shots ke aspect ratios alag alag hain (0.83 se 1.34 tak) aur
     zyada tar transparent cut-outs hain. Is liye `contain` — taake poora
     pack nazar aaye, kata hua nahi. Safed tile is liye ke retail pack
     shots isi par shoot hoti hain, aur jo chand tasveerein apna halka
     background rakhti hain woh bhi ismein ghul jati hain. */
  return (
    <>
      <span aria-hidden className="absolute inset-0 bg-white" />
      <Image
        src={product.image}
        alt={product.name}
        fill
        sizes={sizes}
        className={`object-contain p-[7%] ${imageClassName}`}
      />
    </>
  );
}

/* ──────────────────────────────────────────────
   Product card
   ────────────────────────────────────────────── */
export function ProductCard({
  product,
  color,
  color2,
  Icon,
  index = 0,
}: {
  product: Product;
  color: string;
  color2: string;
  Icon: LucideIcon;
  index?: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.55,
        delay: Math.min(index * 0.05, 0.3),
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-card shadow-card transition-shadow duration-300 hover:shadow-3d"
    >
      {/* hover accent line */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 z-10 h-[3px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
        style={{ background: `linear-gradient(90deg, ${color}, ${color2})` }}
      />

      {/* pack shot */}
      <div className="relative aspect-square w-full overflow-hidden bg-card-soft">
        <PackShot
          product={product}
          color={color}
          color2={color2}
          Icon={Icon}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          imageClassName="transition-transform duration-700 group-hover:scale-[1.04]"
        />

        <div className="absolute top-3 left-3">
          <TempChip temp={product.temp} onLight={Boolean(product.image)} />
        </div>

        {product.size && (
          <span
            className="absolute right-3 bottom-3 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide text-white shadow-md"
            style={{ background: `linear-gradient(120deg, ${color}, ${color2})` }}
          >
            {product.size}
          </span>
        )}
      </div>

      {/* copy */}
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h4 className="font-heading text-base leading-tight font-bold tracking-tight">
          {product.name}
        </h4>
        <p className="text-[13px] leading-relaxed text-muted">{product.desc}</p>
      </div>
    </motion.article>
  );
}
