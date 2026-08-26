"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LayoutGrid, MonitorPlay, Snowflake, Thermometer } from "lucide-react";
import { BRANDS, type TempFilter } from "./data";

const FILTERS: { value: TempFilter; label: string; icon: typeof LayoutGrid }[] = [
  { value: "ALL", label: "All", icon: LayoutGrid },
  { value: "CHILLED", label: "Chilled", icon: Thermometer },
  { value: "FROZEN", label: "Frozen", icon: Snowflake },
];

/**
 * Sticky rail — brand jump links (scroll-spy) + chilled/frozen filter.
 * Sirf tab dikhta hai jab user brand sections ke andar ho.
 */
export function BrandRail({
  filter,
  onFilterChange,
  onPlay,
}: {
  filter: TempFilter;
  onFilterChange: (value: TempFilter) => void;
  onPlay: () => void;
}) {
  const [active, setActive] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  /* scroll-spy over the brand sections */
  useEffect(() => {
    const sections = BRANDS.map((b) => document.getElementById(b.slug)).filter(
      (el): el is HTMLElement => Boolean(el)
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const inView = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (inView) setActive(inView.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* show the rail only while the product sections are on screen */
  useEffect(() => {
    const start = document.getElementById(BRANDS[0].slug);
    const end = document.getElementById("show-storage");
    if (!start) return;

    const onScroll = () => {
      const top = start.getBoundingClientRect().top;
      const bottom = end
        ? end.getBoundingClientRect().top
        : Number.POSITIVE_INFINITY;
      setVisible(top < window.innerHeight * 0.4 && bottom > 160);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="fixed inset-x-0 bottom-5 z-40 flex justify-center px-4"
        >
          {/* mobile par 2 rows, sm+ par ek hi pill */}
          <div className="glass flex max-w-[calc(100vw-2rem)] flex-col items-center gap-1 rounded-3xl p-1.5 shadow-3d sm:flex-row sm:gap-1.5 sm:rounded-full">
            {/* brand jump links */}
            <div className="flex max-w-full items-center gap-0.5 overflow-x-auto sm:gap-1.5">
              {BRANDS.map((brand) => {
                const isActive = active === brand.slug;
                return (
                  <a
                    key={brand.slug}
                    href={`#${brand.slug}`}
                    className="relative shrink-0 rounded-full px-2.5 py-2 text-[11px] font-semibold whitespace-nowrap transition-colors sm:px-4 sm:text-[13px]"
                    style={{ color: isActive ? "#fff" : undefined }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="rail-active"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: `linear-gradient(120deg, ${brand.color}, ${brand.color2})`,
                        }}
                      />
                    )}
                    <span
                      className={
                        isActive
                          ? "relative"
                          : "relative text-muted transition-colors hover:text-foreground"
                      }
                    >
                      {brand.name}
                    </span>
                  </a>
                );
              })}
            </div>

            <span className="hidden h-6 w-px shrink-0 bg-line sm:block" />
            <span className="h-px w-full shrink-0 bg-line sm:hidden" />

            {/* temperature filter */}
            <div className="flex shrink-0 items-center gap-0.5 sm:gap-1.5">
              {FILTERS.map((f) => {
                const on = filter === f.value;
                return (
                  <button
                    key={f.value}
                    type="button"
                    onClick={() => onFilterChange(f.value)}
                    aria-pressed={on}
                    title={`Show ${f.label.toLowerCase()} products`}
                    className={`relative flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2 text-[11px] font-semibold transition-colors sm:text-[13px] ${
                      on
                        ? "bg-foreground text-background"
                        : "text-muted hover:text-foreground"
                    }`}
                  >
                    <f.icon size={13} />
                    {f.label}
                  </button>
                );
              })}

              <span className="mx-0.5 h-6 w-px shrink-0 bg-line" />

              <button
                type="button"
                onClick={onPlay}
                title="Play the slideshow"
                className="flex shrink-0 items-center gap-1.5 rounded-full bg-gradient-to-r from-primary to-secondary px-3 py-2 text-[11px] font-semibold text-white transition-opacity hover:opacity-90 sm:text-[13px]"
              >
                <MonitorPlay size={13} />
                Slideshow
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
