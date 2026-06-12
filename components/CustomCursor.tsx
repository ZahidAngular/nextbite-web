"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type Variant = "default" | "hover" | "view" | "drag";

export function CustomCursor() {
  const [ready, setReady] = useState(false);
  const [variant, setVariant] = useState<Variant>("default");

  const rawX = useMotionValue(-300);
  const rawY = useMotionValue(-300);

  /* dot — near-instant */
  const dotX = useSpring(rawX, { stiffness: 2500, damping: 120 });
  const dotY = useSpring(rawY, { stiffness: 2500, damping: 120 });

  /* ring — lags behind (premium feel) */
  const ringX = useSpring(rawX, { stiffness: 160, damping: 22 });
  const ringY = useSpring(rawY, { stiffness: 160, damping: 22 });

  useEffect(() => {
    /* only on real mouse devices */
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setReady(true);

    const move = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };

    const over = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest("[data-cursor='view']"))  { setVariant("view");  return; }
      if (el.closest("[data-cursor='drag']"))  { setVariant("drag");  return; }
      if (el.closest("a, button"))             { setVariant("hover"); return; }
      setVariant("default");
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [rawX, rawY]);

  if (!ready) return null;

  const ringSize  = variant === "view" ? 80 : variant === "drag" ? 70 : variant === "hover" ? 54 : 36;
  const ringFill  = variant === "hover" ? "rgba(247,148,29,0.14)" : "transparent";
  const dotScale  = variant === "hover" || variant === "view" ? 0 : 1;
  const label     = variant === "view" ? "VIEW" : variant === "drag" ? "DRAG" : "";

  return (
    <>
      {/* tiny filled dot */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          scale: dotScale,
        }}
        transition={{ duration: 0.15 }}
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-[7px] w-[7px] rounded-full bg-primary"
      />

      {/* lagging ring */}
      <motion.div
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{ width: ringSize, height: ringSize, backgroundColor: ringFill }}
        transition={{ type: "spring", stiffness: 280, damping: 24 }}
        className="pointer-events-none fixed top-0 left-0 z-[9998] flex items-center justify-center rounded-full border border-primary/55"
      >
        {label && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            className="font-heading text-[9px] font-bold tracking-[0.2em] text-primary uppercase"
          >
            {label}
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
