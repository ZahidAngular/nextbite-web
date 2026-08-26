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

  return (
    <span
      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-black/5 ${className}`}
      style={{ width: size, height: size, padding: Math.round(size * 0.13) }}
    >
      <Image
        src={brand.logo}
        alt={`${brand.name} logo`}
        width={size * 2}
        height={size * 2}
        className="h-full w-full object-contain"
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
