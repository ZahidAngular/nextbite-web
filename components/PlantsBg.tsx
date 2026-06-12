"use client";

import { useScroll, useTransform, motion } from "framer-motion";

/* ─── SVG Plant variants ─────────────────────────────────────────────────── */

/* Variant A — flower on top + small round fruits */
function PlantA({ stroke, fruit }: { stroke: string; fruit: string }) {
  return (
    <svg viewBox="0 0 60 90" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      {/* stem */}
      <path d="M30 88 C30 72 29 55 30 30" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" />
      {/* left leaf */}
      <path d="M30 62 C22 54 10 52 4 57 C11 58 22 60 30 62" stroke={stroke} strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* right leaf */}
      <path d="M30 48 C38 40 50 39 56 43 C49 44 38 46 30 48" stroke={stroke} strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* second left leaf upper */}
      <path d="M30 36 C22 29 13 28 8 32 C14 33 23 34 30 36" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" fill="none" />

      {/* fruits on left leaf branch */}
      <circle cx="8"  cy="53" r="3.5" fill={fruit} opacity="0.85" />
      <circle cx="14" cy="50" r="2.5" fill={fruit} opacity="0.7"  />

      {/* fruits on right leaf branch */}
      <circle cx="52" cy="40" r="3"   fill={fruit} opacity="0.85" />
      <circle cx="45" cy="38" r="2"   fill={fruit} opacity="0.65" />

      {/* flower petals at top */}
      <circle cx="30" cy="22" r="4"   fill={stroke}  opacity="0.9" />
      <circle cx="30" cy="13" r="3"   fill={stroke}  opacity="0.6" />
      <circle cx="23" cy="17" r="2.5" fill={stroke}  opacity="0.55" />
      <circle cx="37" cy="17" r="2.5" fill={stroke}  opacity="0.55" />
      <circle cx="25" cy="10" r="2"   fill={fruit}   opacity="0.7" />
      <circle cx="35" cy="10" r="2"   fill={fruit}   opacity="0.7" />
      {/* flower center */}
      <circle cx="30" cy="14" r="3.5" fill={fruit}   opacity="0.95" />
    </svg>
  );
}

/* Variant B — berries hanging + two-tone leaves */
function PlantB({ stroke, fruit }: { stroke: string; fruit: string }) {
  return (
    <svg viewBox="0 0 60 90" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      {/* stem */}
      <path d="M30 88 C30 70 31 52 30 25" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" />
      {/* big right leaf */}
      <path d="M30 58 C40 48 54 47 58 52 C50 54 39 56 30 58" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" fill="none" />
      {/* big left leaf */}
      <path d="M30 42 C20 33 8 32 3 37 C10 38 21 40 30 42" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" fill="none" />
      {/* small right leaf */}
      <path d="M30 30 C37 23 46 23 50 27 C44 28 36 29 30 30" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" fill="none" />

      {/* berry cluster left */}
      <circle cx="5"  cy="34" r="4"   fill={fruit} opacity="0.9"  />
      <circle cx="11" cy="31" r="3"   fill={fruit} opacity="0.75" />
      <circle cx="4"  cy="28" r="2.5" fill={fruit} opacity="0.65" />
      {/* berry stems */}
      <path d="M5 34 L8 38"  stroke={stroke} strokeWidth="1" strokeLinecap="round" />
      <path d="M11 31 L14 35" stroke={stroke} strokeWidth="1" strokeLinecap="round" />

      {/* berry cluster right */}
      <circle cx="55" cy="49" r="4"   fill={fruit} opacity="0.9"  />
      <circle cx="49" cy="46" r="3"   fill={fruit} opacity="0.75" />
      <path d="M55 49 L52 53" stroke={stroke} strokeWidth="1" strokeLinecap="round" />

      {/* flower top */}
      <circle cx="30" cy="18" r="5"   fill={stroke} opacity="0.8" />
      <circle cx="30" cy="9"  r="3"   fill={fruit}  opacity="0.9" />
      <circle cx="22" cy="13" r="2.5" fill={fruit}  opacity="0.8" />
      <circle cx="38" cy="13" r="2.5" fill={fruit}  opacity="0.8" />
      <circle cx="24" cy="5"  r="2"   fill={stroke} opacity="0.6" />
      <circle cx="36" cy="5"  r="2"   fill={stroke} opacity="0.6" />
    </svg>
  );
}

/* Variant C — tall vine with hanging fruits (for center, bigger) */
function PlantC({ stroke, fruit }: { stroke: string; fruit: string }) {
  return (
    <svg viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      {/* main stem — slight curve */}
      <path d="M40 118 C40 95 38 75 40 45 C42 20 40 10 40 4" stroke={stroke} strokeWidth="2.8" strokeLinecap="round" />
      {/* left leaves */}
      <path d="M40 90 C28 80 12 80 6  85 C14 86 28 88 40 90" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <path d="M40 68 C28 59 16 58 10 63 C18 64 29 66 40 68" stroke={stroke} strokeWidth="2"   strokeLinecap="round" fill="none" />
      <path d="M40 46 C29 38 18 38 14 42 C20 43 30 44 40 46" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" fill="none" />
      {/* right leaves */}
      <path d="M40 78 C52 68 66 67 72 72 C64 74 51 76 40 78" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <path d="M40 56 C51 47 64 47 68 52 C61 53 50 54 40 56" stroke={stroke} strokeWidth="2"   strokeLinecap="round" fill="none" />

      {/* hanging fruits left */}
      <path d="M8 83 L8 95"  stroke={stroke} strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="8"  cy="98" r="5.5" fill={fruit} opacity="0.9"  />
      <path d="M16 82 L15 93" stroke={stroke} strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="15" cy="96" r="4"   fill={fruit} opacity="0.8"  />
      <path d="M12 61 L11 71" stroke={stroke} strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="11" cy="74" r="4.5" fill={fruit} opacity="0.85" />

      {/* hanging fruits right */}
      <path d="M68 69 L68 80" stroke={stroke} strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="68" cy="83" r="5"   fill={fruit} opacity="0.9"  />
      <path d="M62 70 L63 79" stroke={stroke} strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="63" cy="82" r="3.5" fill={fruit} opacity="0.75" />

      {/* flower top */}
      <circle cx="40" cy="18" r="6"   fill={stroke} opacity="0.75" />
      <circle cx="40" cy="8"  r="4"   fill={fruit}  opacity="0.95" />
      <circle cx="31" cy="12" r="3"   fill={fruit}  opacity="0.8"  />
      <circle cx="49" cy="12" r="3"   fill={fruit}  opacity="0.8"  />
      <circle cx="33" cy="4"  r="2.5" fill={stroke} opacity="0.6"  />
      <circle cx="47" cy="4"  r="2.5" fill={stroke} opacity="0.6"  />
      {/* leaf vein detail */}
      <path d="M40 90 L14 84"  stroke={stroke} strokeWidth="0.8" strokeLinecap="round" opacity="0.4" />
      <path d="M40 78 L68 71"  stroke={stroke} strokeWidth="0.8" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}

/* ─── Plant config ───────────────────────────────────────────────────────── */
const PLANTS = [
  /* LEFT EDGE */
  { id: 1,  top: "6%",   left: "1%",          size: 42,  variant: "A", color: "secondary", start: 0.00, end: 0.13 },
  { id: 3,  top: "26%",  left: "0%",          size: 48,  variant: "B", color: "secondary", start: 0.10, end: 0.23 },
  { id: 5,  top: "46%",  left: "1%",          size: 40,  variant: "A", color: "primary",   start: 0.22, end: 0.35 },
  { id: 7,  top: "64%",  left: "0%",          size: 44,  variant: "B", color: "secondary", start: 0.34, end: 0.47 },
  { id: 9,  top: "82%",  left: "1%",          size: 40,  variant: "A", color: "secondary", start: 0.48, end: 0.61 },

  /* RIGHT EDGE */
  { id: 2,  top: "12%",  right: "1%",         size: 38,  variant: "B", color: "primary",   start: 0.04, end: 0.17 },
  { id: 4,  top: "34%",  right: "0%",         size: 46,  variant: "A", color: "secondary", start: 0.16, end: 0.29 },
  { id: 6,  top: "54%",  right: "1%",         size: 42,  variant: "B", color: "primary",   start: 0.28, end: 0.41 },
  { id: 8,  top: "72%",  right: "0%",         size: 44,  variant: "A", color: "secondary", start: 0.40, end: 0.53 },
  { id: 10, top: "88%",  right: "1%",         size: 38,  variant: "B", color: "primary",   start: 0.54, end: 0.67 },

  /* CENTER — 3 tall vine plants */
  { id: 11, top: "20%",  left: "20%",         size: 68,  variant: "C", color: "secondary", start: 0.08, end: 0.28 },
  { id: 12, top: "30%",  left: "50%",         size: 72,  variant: "C", color: "primary",   start: 0.20, end: 0.42 },
  { id: 13, top: "18%",  left: "76%",         size: 64,  variant: "C", color: "secondary", start: 0.14, end: 0.34 },
] as const;

type Plant = typeof PLANTS[number];

function PlantItem({ plant }: { plant: Plant }) {
  const { scrollYProgress } = useScroll();

  const scale   = useTransform(scrollYProgress, [plant.start, plant.end], [0, 1]);
  const opacity = useTransform(
    scrollYProgress,
    [plant.start, plant.start + 0.04, plant.end + 0.10, plant.end + 0.20],
    [0, 1, 1, 0.25]
  );
  /* gentle sway */
  const rotate  = useTransform(scrollYProgress, [plant.start, plant.end], [-4, 4]);

  const stroke = plant.color === "secondary" ? "var(--secondary)" : "var(--primary)";
  const fruit  = plant.color === "secondary" ? "var(--primary)"   : "var(--secondary)";

  const isCenter = plant.id >= 11;

  const pos: React.CSSProperties = {
    position: "fixed",
    top:    plant.top,
    width:  plant.size,
    height: plant.size * ("variant" in plant && plant.variant === "C" ? 1.8 : 1.6),
    opacity: isCenter ? 0.18 : 0.28,   /* center plants more transparent so content readable */
    ...("left"  in plant ? { left:  (plant as { left: string }).left   } : {}),
    ...("right" in plant ? { right: (plant as { right: string }).right } : {}),
  };

  return (
    <motion.div
      style={{ ...pos, scale, opacity, rotate }}
      aria-hidden
      className="pointer-events-none"
    >
      {plant.variant === "A" && <PlantA stroke={stroke} fruit={fruit} />}
      {plant.variant === "B" && <PlantB stroke={stroke} fruit={fruit} />}
      {plant.variant === "C" && <PlantC stroke={stroke} fruit={fruit} />}
    </motion.div>
  );
}

export function PlantsBg() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {PLANTS.map((p) => (
        <PlantItem key={p.id} plant={p} />
      ))}
    </div>
  );
}
