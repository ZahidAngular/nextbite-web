"use client";

import { motion } from "framer-motion";
import { Logo } from "./Logo";

const socials = [
  {
    label: "Facebook",
    href: "#",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
        <rect x={2} y={2} width={20} height={20} rx={5} ry={5} />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1={17.5} y1={6.5} x2={17.51} y2={6.5} />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x={2} y={9} width={4} height={12} />
        <circle cx={4} cy={4} r={2} />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-card">
      {/* giant outline brand text */}
      <span
        aria-hidden
        className="text-stroke font-heading pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 text-[15vw] leading-none font-bold whitespace-nowrap opacity-50 select-none"
      >
        NEXTBITE
      </span>

      <div className="relative mx-auto max-w-7xl px-6 py-16 text-center">
        <a href="#" aria-label="Back to top">
          <Logo className="text-4xl" />
        </a>
        <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-muted">
          A next-generation food platform focused on owning, licensing, launching, and
          scaling leading plant-based brands across Australia and New Zealand.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          {socials.map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              aria-label={social.label}
              whileHover={{ y: -5, scale: 1.1 }}
              className="glass flex h-11 w-11 items-center justify-center rounded-full text-muted transition-colors hover:text-primary"
            >
              {social.svg}
            </motion.a>
          ))}
        </div>

        <div className="mt-12 border-t border-line pt-7 text-sm text-muted">
          Copyright © {new Date().getFullYear()} NextBite. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
