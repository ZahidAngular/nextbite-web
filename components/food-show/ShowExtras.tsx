"use client";

import { motion } from "framer-motion";
import { Check, Snowflake, Thermometer } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { STORAGE, WHY_PARTNER } from "./data";

/* ──────────────────────────────────────────────
   Storage strip — KEEP FROZEN / KEEP CHILLED
   ────────────────────────────────────────────── */
export function StorageStrip() {
  return (
    <section
      id="show-storage"
      className="scroll-mt-24 border-t border-line py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="text-center text-xs font-semibold tracking-[0.3em] text-muted uppercase">
            Handling & Storage
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {STORAGE.map((s, i) => {
            const frozen = s.temp === "FROZEN";
            const Icon = frozen ? Snowflake : Thermometer;
            const tint = frozen ? "#38a2e0" : "#12897c";

            return (
              <motion.div
                key={s.temp}
                initial={{ opacity: 0, y: 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.1,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                className="relative flex items-start gap-5 overflow-hidden rounded-3xl border border-line p-7 sm:p-8"
                style={{ background: `linear-gradient(135deg, ${tint}14, transparent 70%)` }}
              >
                <span
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white shadow-md"
                  style={{ background: tint }}
                >
                  <Icon size={24} />
                </span>

                <div>
                  <h3
                    className="font-heading text-xl font-bold tracking-tight uppercase"
                    style={{ color: tint }}
                  >
                    {s.label}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {s.items}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   Why partner with our brands?
   ────────────────────────────────────────────── */
export function WhyPartnerShow() {
  return (
    <section className="border-t border-line py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="mb-4 inline-flex items-center gap-3 text-xs font-semibold tracking-[0.3em] text-secondary uppercase sm:text-sm">
              <span className="h-[2px] w-10 bg-gradient-to-r from-primary to-secondary" />
              Trade & Foodservice
            </p>
            <h2 className="font-heading text-4xl font-bold tracking-[-0.03em] sm:text-5xl">
              Why partner with{" "}
              <span className="text-gradient">our brands?</span>
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
              Organic wholefoods, naturally cultured ranges and trade-ready
              formats — built for retail shelves and busy commercial kitchens
              alike.
            </p>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {WHY_PARTNER.map((reason, i) => (
              <motion.div
                key={reason}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                className="group flex items-start gap-4 rounded-2xl border border-line bg-card p-6 shadow-card transition-shadow hover:shadow-3d"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-white">
                  <Check size={15} strokeWidth={3} />
                </span>
                <p className="text-sm leading-relaxed font-medium">{reason}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
