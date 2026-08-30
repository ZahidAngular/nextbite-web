"use client";

import Image from "next/image";
import type { Brand } from "./data";

/* ──────────────────────────────────────────────
   Brand logo chip

   Logos alag alag banay hain — Angel Food ka
   background safed hai, Tonzu ka wordmark gehra
   charcoal, Nutty Bay ka bhi gehra. Is liye sab
   ko ek halke "chip" par rakha jata hai taake
   dono themes mein saaf nazar aayen.

   Jis brand ka logo na ho (Zenzo), uska icon
   brand-gradient ke sath dikh jata hai.
   ────────────────────────────────────────────── */
export function BrandLogo({
  brand,
  size = 48,
  className = "",
}: {
  brand: Brand;
  size?: number;
  className?: string;
}) {
  if (!brand.logo) {
    return (
      <span
        aria-hidden
        className={`flex shrink-0 items-center justify-center rounded-2xl text-white shadow-md ${className}`}
        style={{
          width: size,
          height: size,
          background: `linear-gradient(140deg, ${brand.color}, ${brand.color2})`,
        }}
      >
        <brand.icon size={Math.round(size * 0.44)} />
      </span>
    );
  }

  /* Chip ki UNCHAI tay hai, chaurai logo ke hisaab se barhti hai.
     Pehle chip chokor tha aur har logo usi chokor mein "contain"
     hota tha — chunanche Tonzu (2.3:1) aur Zenzo (2.6:1) jaise
     chaure wordmark sirf ~30px unche rehte the aur nanhe lagte the,
     jabke Angel Food poora khana bhar leta tha. Ab har mark ki
     unchai barabar hai; jo chaura hai uska chip chaura ho jata hai. */
  const pad = Math.round(size * 0.16);

  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-black/5 ${className}`}
      style={{
        height: size,
        minWidth: size,
        paddingInline: pad,
        paddingBlock: Math.round(pad * 0.75),
      }}
    >
      <Image
        src={brand.logo}
        alt={`${brand.name} logo`}
        width={size * 4}
        height={size * 2}
        className="w-auto object-contain"
        style={{ height: size - pad * 1.5 }}
      />
    </span>
  );
}

/**
 * Wide lockup — jahan logo ko poori chaurai mein
 * dikhana ho (brand section header, slideshow).
 */
export function BrandLockup({
  brand,
  className = "",
  height = 44,
}: {
  brand: Brand;
  className?: string;
  height?: number;
}) {
  if (!brand.logo) return null;

  return (
    <span
      className={`inline-flex items-center rounded-xl bg-white px-4 shadow-sm ring-1 ring-black/5 ${className}`}
      style={{ height: height + 16 }}
    >
      <Image
        src={brand.logo}
        alt={`${brand.name} logo`}
        width={height * 6}
        height={height * 2}
        className="w-auto object-contain"
        style={{ height }}
      />
    </span>
  );
}
