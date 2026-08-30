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
  width,
  className = "",
}: {
  brand: Brand;
  /** chip ki unchai */
  size?: number;
  /** chip ki chaurai — na do to chokor. Sab chips ek naap ke rakhne
   *  ke liye yahan ek hi qeemat pass karo. */
  width?: number;
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

  /* Chip ka naap tay hai — har brand ka chip bilkul ek jaisa. Andar
     logo apni asal nisbat par, unchai se bandha hua.

     Yeh do masle ek saath hal karta hai: chokor chip mein Tonzu
     (2.3:1) aur Zenzo (2.6:1) jaise chaure wordmark aadhi unchai par
     sikur jate the; aur agar chip ki chaurai logo ke saath badalne
     do to chips bay-tarteeb ho jate hain. Ab chip sab ka barabar,
     aur mark har brand ka barabar unchai ka. */
  const pad = Math.round(size * 0.16);
  const boxW = width ?? size;

  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-black/5 ${className}`}
      style={{
        height: size,
        width: boxW,
        paddingInline: pad,
        paddingBlock: Math.round(pad * 0.75),
      }}
    >
      <Image
        src={brand.logo}
        alt={`${brand.name} logo`}
        width={size * 6}
        height={size * 2}
        className="object-contain"
        style={{
          maxHeight: size - pad * 1.5,
          maxWidth: boxW - pad * 2,
          height: "auto",
          width: "auto",
        }}
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
