"use client";

import { motion } from "framer-motion";

/**
 * Pure CSS-3D spinning orbital rings — like a 3D atom.
 * Used in Hero for premium depth visual.
 */
export function OrbitalRings({ className }: { className?: string }) {
  return (
    <div
      className={className}
      style={{ perspective: "700px", transformStyle: "preserve-3d" }}
    >
      {/* outer ring — tilted 65° on X, spins on Z */}
      <motion.div
        animate={{ rotateZ: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        style={{ rotateX: 65, transformStyle: "preserve-3d" }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 rounded-full border border-secondary/45" />
        {/* orbit dot */}
        <motion.div className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/80 shadow-[0_0_12px_4px_rgba(91,168,41,0.5)]" />
      </motion.div>

      {/* mid ring — different tilt + opposite spin */}
      <motion.div
        animate={{ rotateZ: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ rotateX: 40, rotateY: 55, transformStyle: "preserve-3d" }}
        className="absolute inset-[14%]"
      >
        <div className="absolute inset-0 rounded-full border border-primary/40" />
        <motion.div className="absolute right-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 translate-x-1/2 rounded-full bg-primary/80 shadow-[0_0_10px_3px_rgba(247,148,29,0.5)]" />
      </motion.div>

      {/* inner ring — near-flat, slow */}
      <motion.div
        animate={{ rotateZ: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        style={{ rotateX: 15, transformStyle: "preserve-3d" }}
        className="absolute inset-[30%]"
      >
        <div className="absolute inset-0 rounded-full border border-secondary/30" />
        <motion.div className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 translate-y-1/2 rounded-full bg-secondary/60" />
      </motion.div>

      {/* center glow core */}
      <div className="absolute inset-[40%] rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 blur-md" />
      <div className="absolute inset-[44%] rounded-full bg-gradient-to-br from-primary/60 to-secondary/60" />
    </div>
  );
}
