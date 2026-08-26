"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue } from "framer-motion";
import { useLenis } from "lenis/react";
import {
  ChevronLeft,
  ChevronRight,
  Globe,
  Mail,
  LayoutGrid,
  Maximize2,
  Minimize2,
  Pause,
  Phone,
  Play,
  Snowflake,
  Square,
  Thermometer,
  X,
} from "lucide-react";
import {
  ALL_SITES,
  BRANDS,
  DISTRIBUTION,
  SHOW,
  STORAGE,
  TOTAL_PRODUCTS,
  brandProductCount,
} from "./data";
import { BrandLockup, BrandLogo } from "./BrandLogo";
import { PackShot, TempChip } from "./ProductCard";
import {
  buildDeck,
  mapIndexAcrossModes,
  slideAccent,
  type DeckMode,
  type Slide,
} from "./slides";

/** har slide kitni der auto-play mein rukti hai */
const SLIDE_MS = 9000;

/* ═══════════════════════════════════════════════════════════════
   SLIDE BODIES
   ═══════════════════════════════════════════════════════════════ */

function IntroSlide() {
  return (
    <div className="flex h-full flex-col items-center justify-center px-8 text-center">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-[11px] font-semibold tracking-[0.4em] text-muted uppercase sm:text-sm"
      >
        {SHOW.name} {SHOW.year}
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="font-display-black mt-5 text-[clamp(2.4rem,8vw,6.5rem)] leading-[0.95]"
      >
        Four brands.
        <br />
        <span className="text-gradient">One portfolio.</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="mt-7 max-w-2xl text-sm leading-relaxed text-muted sm:text-lg"
      >
        {SHOW.intro}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-10 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4"
      >
        {BRANDS.map((b) => (
          <span
            key={b.slug}
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold sm:text-sm"
            style={{
              borderColor: `${b.color}55`,
              background: `${b.color}14`,
              color: b.color,
            }}
          >
            <BrandLogo brand={b} size={24} className="!rounded-lg" />
            {b.name}
          </span>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-10 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-3 text-sm font-bold tracking-[0.2em] text-white uppercase"
      >
        Stand {SHOW.stand} · {TOTAL_PRODUCTS} products
      </motion.p>
    </div>
  );
}

function BrandSlide({ slide }: { slide: Extract<Slide, { kind: "brand" }> }) {
  const { brand } = slide;
  const index = BRANDS.findIndex((b) => b.slug === brand.slug);

  return (
    <div className="mx-auto flex h-full max-w-6xl flex-col justify-center px-8">
      <motion.span
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 0.16, x: 0 }}
        transition={{ duration: 0.6 }}
        className="font-display-black text-[clamp(4rem,14vw,11rem)] leading-none select-none"
        style={{ color: brand.color }}
      >
        {String(index + 1).padStart(2, "0")}
      </motion.span>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.6 }}
        className="-mt-[0.35em]"
      >
        <span
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[10px] font-bold tracking-[0.16em] text-white uppercase sm:text-xs"
          style={{
            background: `linear-gradient(120deg, ${brand.color}, ${brand.color2})`,
          }}
        >
          <brand.icon size={14} />
          {brand.kicker}
        </span>

        {brand.logo ? (
          <>
            <BrandLockup brand={brand} className="mt-6" height={64} />
            <h2 className="sr-only">{brand.name}</h2>
          </>
        ) : (
          <h2 className="font-heading mt-6 text-[clamp(2.6rem,9vw,7rem)] leading-[0.9] font-bold tracking-[-0.04em]">
            {brand.name}
          </h2>
        )}

        <p
          className="mt-4 text-xl font-medium sm:text-3xl"
          style={{ color: brand.color }}
        >
          {brand.tagline}
        </p>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-6 max-w-3xl text-sm leading-relaxed text-muted sm:text-base"
      >
        {brand.story}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.6 }}
        className="mt-9 flex flex-wrap items-center gap-2.5"
      >
        {brand.categories.map((c) => (
          <span
            key={c.id}
            className="inline-flex items-center gap-2 rounded-xl border border-line bg-card/60 px-3.5 py-2 text-xs font-medium backdrop-blur-sm sm:text-sm"
          >
            <c.icon size={14} style={{ color: brand.color }} />
            {c.title}
          </span>
        ))}
        <span
          className="rounded-xl px-3.5 py-2 text-xs font-bold text-white sm:text-sm"
          style={{
            background: `linear-gradient(120deg, ${brand.color}, ${brand.color2})`,
          }}
        >
          {brandProductCount(brand)} products
        </span>
      </motion.div>
    </div>
  );
}

function ProductsSlide({
  slide,
}: {
  slide: Extract<Slide, { kind: "products" }>;
}) {
  const { brand, category, products, part } = slide;

  const cols =
    products.length <= 2
      ? "grid-cols-1 sm:grid-cols-2"
      : products.length <= 4
        ? "grid-cols-2 lg:grid-cols-4"
        : products.length <= 6
          ? "grid-cols-2 lg:grid-cols-3"
          : "grid-cols-2 lg:grid-cols-4";

  return (
    <div className="mx-auto flex h-full max-w-7xl flex-col justify-center px-6 py-4 sm:px-10">
      {/* header */}
      <motion.div
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex shrink-0 flex-col gap-3 border-b border-line pb-4 sm:flex-row sm:items-end sm:justify-between"
      >
        <div className="flex items-center gap-4">
          <span
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border"
            style={{
              borderColor: `${brand.color}40`,
              background: `${brand.color}18`,
              color: brand.color,
            }}
          >
            <category.icon size={22} />
          </span>
          <div>
            <p
              className="text-[10px] font-bold tracking-[0.2em] uppercase"
              style={{ color: brand.color }}
            >
              {brand.name}
            </p>
            <h2 className="font-heading text-2xl leading-tight font-bold tracking-tight sm:text-4xl">
              {category.title}
            </h2>
          </div>
        </div>

        <p className="text-sm font-medium text-muted sm:max-w-sm sm:text-right">
          {category.tagline}
          {part && (
            <span className="ml-2 text-xs opacity-70">
              ({part.current}/{part.total})
            </span>
          )}
        </p>
      </motion.div>

      {/* product tiles */}
      <div className={`mt-6 grid min-h-0 gap-3 sm:gap-4 ${cols}`}>
        {products.map((product, i) => (
          <motion.div
            key={product.name}
            initial={{ opacity: 0, y: 26, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: 0.12 + i * 0.06,
              duration: 0.5,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className="flex flex-col overflow-hidden rounded-2xl border border-line bg-card shadow-card"
          >
            <div className="relative aspect-square w-full overflow-hidden bg-card-soft">
              <PackShot
                product={product}
                color={brand.color}
                color2={brand.color2}
                Icon={category.icon}
                sizes="(max-width: 640px) 50vw, 25vw"
              />
              {product.size && (
                <span
                  className="absolute right-2 bottom-2 rounded-full px-2 py-0.5 text-[10px] font-bold text-white shadow"
                  style={{
                    background: `linear-gradient(120deg, ${brand.color}, ${brand.color2})`,
                  }}
                >
                  {product.size}
                </span>
              )}
              <div className="absolute top-2 left-2 origin-top-left scale-90">
                <TempChip temp={product.temp} onLight={Boolean(product.image)} />
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-1 p-3.5">
              <h3 className="font-heading text-sm leading-tight font-bold tracking-tight sm:text-base">
                {product.name}
              </h3>
              <p className="line-clamp-3 text-[11px] leading-relaxed text-muted sm:text-xs">
                {product.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ProductSlide({
  slide,
}: {
  slide: Extract<Slide, { kind: "product" }>;
}) {
  const { brand, category, product, position } = slide;

  return (
    <div className="mx-auto flex h-full max-w-6xl flex-col items-center justify-center gap-8 px-6 py-4 sm:px-10 lg:flex-row lg:gap-14">
      {/* ── pack shot ─────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="relative w-full max-w-[min(78vw,26rem)] shrink-0 lg:max-w-[26rem]"
      >
        {/* brand glow behind the pack */}
        <span
          aria-hidden
          className="absolute -inset-8 rounded-full blur-3xl"
          style={{ background: brand.color, opacity: 0.16 }}
        />

        <div
          className="relative aspect-square w-full overflow-hidden rounded-[2rem] border bg-card-soft shadow-3d"
          style={{ borderColor: `${brand.color}33` }}
        >
          <PackShot
            product={product}
            color={brand.color}
            color2={brand.color2}
            Icon={category.icon}
            sizes="(max-width: 1024px) 78vw, 26rem"
          />
        </div>

        {/* size badge over the corner */}
        {product.size && (
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="absolute -right-2 -bottom-3 rounded-2xl px-4 py-2.5 text-sm font-bold text-white shadow-lg sm:text-base"
            style={{
              background: `linear-gradient(120deg, ${brand.color}, ${brand.color2})`,
            }}
          >
            {product.size}
          </motion.span>
        )}
      </motion.div>

      {/* ── details ───────────────────────────────────────── */}
      <div className="min-w-0 flex-1 text-center lg:text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="flex flex-wrap items-center justify-center gap-2.5 lg:justify-start"
        >
          <span
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] font-bold tracking-[0.16em] text-white uppercase"
            style={{
              background: `linear-gradient(120deg, ${brand.color}, ${brand.color2})`,
            }}
          >
            <brand.icon size={13} />
            {brand.name}
          </span>

          <span
            className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-semibold"
            style={{
              borderColor: `${brand.color}40`,
              background: `${brand.color}12`,
              color: brand.color,
            }}
          >
            <category.icon size={13} />
            {category.title}
          </span>

          <TempChip temp={product.temp} />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-heading mt-6 text-[clamp(2rem,6vw,4.5rem)] leading-[0.95] font-bold tracking-[-0.04em]"
        >
          {product.name}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.6 }}
          className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-xl lg:mx-0"
        >
          {product.desc}
        </motion.p>

        {/* counter + brand tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-9 flex flex-col items-center gap-4 lg:items-start"
        >
          <div className="flex items-center gap-3">
            <span
              className="font-heading text-sm font-bold tabular-nums"
              style={{ color: brand.color }}
            >
              {String(position.current).padStart(2, "0")}
            </span>
            <span className="relative h-1 w-32 overflow-hidden rounded-full bg-line sm:w-48">
              <span
                className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-500"
                style={{
                  width: `${(position.current / position.total) * 100}%`,
                  background: `linear-gradient(90deg, ${brand.color}, ${brand.color2})`,
                }}
              />
            </span>
            <span className="text-sm font-medium text-muted tabular-nums">
              {position.total}
            </span>
          </div>

          <p className="text-xs tracking-wide text-muted italic">
            {brand.tagline}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function StorageSlide() {
  return (
    <div className="mx-auto flex h-full max-w-5xl flex-col justify-center px-8">
      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-[11px] font-semibold tracking-[0.35em] text-muted uppercase"
      >
        Handling &amp; Storage
      </motion.p>

      <h2 className="font-heading mt-4 text-center text-3xl font-bold tracking-tight sm:text-5xl">
        Keep it <span className="text-gradient">right</span>
      </h2>

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        {STORAGE.map((s, i) => {
          const frozen = s.temp === "FROZEN";
          const Icon = frozen ? Snowflake : Thermometer;
          const tint = frozen ? "#38a2e0" : "#12897c";

          return (
            <motion.div
              key={s.temp}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.12, duration: 0.6 }}
              className="rounded-3xl border border-line p-7 sm:p-9"
              style={{
                background: `linear-gradient(140deg, ${tint}1f, transparent 70%)`,
              }}
            >
              <span
                className="flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg"
                style={{ background: tint }}
              >
                <Icon size={26} />
              </span>
              <h3
                className="font-heading mt-5 text-2xl font-bold tracking-tight uppercase"
                style={{ color: tint }}
              >
                {s.label}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {s.items}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function ContactSlide() {
  return (
    <div className="mx-auto flex h-full max-w-5xl flex-col justify-center px-8 text-center">
      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-[11px] font-semibold tracking-[0.35em] text-muted uppercase"
      >
        {SHOW.name} {SHOW.year}
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, duration: 0.6 }}
        className="font-display-black text-gradient mt-4 text-[clamp(3rem,11vw,8rem)] leading-none"
      >
        Stand {SHOW.stand}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="mx-auto mt-5 max-w-xl text-sm text-muted sm:text-base"
      >
        Foodservice also available — talk to us about bulk sizes, custom packs
        and catering requirements.
      </motion.p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {DISTRIBUTION.map((d, i) => (
          <motion.div
            key={d.contact.email}
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 + i * 0.12, duration: 0.55 }}
            className="rounded-2xl border border-line bg-card/70 p-6 text-left backdrop-blur-sm"
          >
            <p className="text-[10px] font-bold tracking-[0.18em] text-secondary uppercase">
              {d.title}
            </p>
            <p className="font-heading mt-3 text-xl font-bold">
              {d.contact.name}
            </p>
            <p className="mt-2 flex items-center gap-2 text-sm text-muted">
              <Mail size={14} className="text-primary" />
              {d.contact.email}
            </p>
            {d.contact.phones.map((p) => (
              <p
                key={p}
                className="mt-1 flex items-center gap-2 text-sm text-muted"
              >
                <Phone size={14} className="text-secondary" />
                {p}
              </p>
            ))}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-9 flex flex-wrap items-center justify-center gap-2"
      >
        {ALL_SITES.map((site) => (
          <span
            key={site}
            className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-[11px] text-muted"
          >
            <Globe size={11} />
            {site}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function SlideBody({ slide }: { slide: Slide }) {
  switch (slide.kind) {
    case "intro":
      return <IntroSlide />;
    case "brand":
      return <BrandSlide slide={slide} />;
    case "products":
      return <ProductsSlide slide={slide} />;
    case "product":
      return <ProductSlide slide={slide} />;
    case "storage":
      return <StorageSlide />;
    case "contact":
      return <ContactSlide />;
  }
}

/* ═══════════════════════════════════════════════════════════════
   SLIDESHOW SHELL
   Keyboard: ← → navigate · Space play/pause · F fullscreen · Esc exit
   ═══════════════════════════════════════════════════════════════ */

export function Slideshow({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [mode, setMode] = useState<DeckMode>("overview");
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [playing, setPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  /* progress bar ko React ke bahar chalao — 60fps re-render se bachne ke liye */
  const progress = useMotionValue(0);

  const deck = useMemo(() => buildDeck(mode), [mode]);

  const lenis = useLenis();
  const shellRef = useRef<HTMLDivElement>(null);

  /* deck badla to index bhi hadd mein rahe */
  const safeIndex = Math.min(index, deck.length - 1);
  const slide = deck[safeIndex];
  const [accent, accent2] = slideAccent(slide);

  const go = useCallback(
    (delta: number) => {
      setDirection(delta);
      progress.set(0);
      setIndex((i) => (i + delta + deck.length) % deck.length);
    },
    [deck.length, progress]
  );

  const jump = useCallback(
    (target: number) => {
      setDirection(target > safeIndex ? 1 : -1);
      progress.set(0);
      setIndex(target);
    },
    [safeIndex, progress]
  );

  /* mode toggle — user ko usi product/brand par chhoro */
  const switchMode = useCallback(
    (next: DeckMode) => {
      if (next === mode) return;
      const nextDeck = buildDeck(next);
      setIndex(mapIndexAcrossModes(deck, nextDeck, safeIndex));
      progress.set(0);
      setDirection(1);
      setMode(next);
    },
    [deck, mode, safeIndex, progress]
  );

  /* ── auto-advance + progress bar ─────────────────────────── */
  useEffect(() => {
    if (!open || !playing) return;

    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const p = Math.min((now - start) / SLIDE_MS, 1);
      progress.set(p);
      if (p >= 1) go(1);
      else raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [open, playing, safeIndex, go, progress]);

  /* ── fullscreen ──────────────────────────────────────────── */
  const toggleFullscreen = useCallback(async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await shellRef.current?.requestFullscreen();
    } catch {
      /* browser ne mana kar diya — koi baat nahi */
    }
  }, []);

  useEffect(() => {
    const onChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  /* deck band hone par fullscreen bhi chhoro */
  useEffect(() => {
    if (!open && document.fullscreenElement) void document.exitFullscreen();
  }, [open]);

  /* ── keyboard ────────────────────────────────────────────── */
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
        case "PageDown":
          e.preventDefault();
          go(1);
          break;
        case "ArrowLeft":
        case "PageUp":
          e.preventDefault();
          go(-1);
          break;
        case " ":
          e.preventDefault();
          setPlaying((p) => !p);
          break;
        case "Escape":
          onClose();
          break;
        case "f":
        case "F":
          void toggleFullscreen();
          break;
        case "v":
        case "V":
          switchMode(mode === "overview" ? "spotlight" : "overview");
          break;
        case "Home":
          jump(0);
          break;
        case "End":
          jump(deck.length - 1);
          break;
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go, jump, onClose, toggleFullscreen, switchMode, mode, deck.length]);

  /* ── background page ko rok do ───────────────────────────── */
  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
    return () => lenis?.start();
  }, [open, lenis]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={shellRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          role="dialog"
          aria-modal="true"
          aria-label={`${SHOW.name} ${SHOW.year} slideshow`}
          className="fixed inset-0 z-[100] flex flex-col bg-background"
        >
          {/* ── brand wash ────────────────────────────────── */}
          <motion.div
            aria-hidden
            key={`wash-${slide.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(85% 60% at 50% 0%, ${accent}1f, transparent 62%), radial-gradient(70% 55% at 100% 100%, ${accent2}17, transparent 60%)`,
            }}
          />

          {/* ── progress bar ──────────────────────────────── */}
          <div className="absolute inset-x-0 top-0 z-20 h-1 bg-line">
            <motion.div
              className="h-full w-full origin-left"
              style={{
                scaleX: progress,
                background: `linear-gradient(90deg, ${accent}, ${accent2})`,
              }}
            />
          </div>

          {/* ── top bar ───────────────────────────────────── */}
          <header className="relative z-20 flex shrink-0 items-center justify-between gap-3 px-4 py-3 sm:px-7 sm:py-4">
            <div className="flex min-w-0 items-center gap-3">
              <span
                className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white sm:flex"
                style={{
                  background: `linear-gradient(130deg, ${accent}, ${accent2})`,
                }}
              >
                {slide.kind === "brand" ||
                slide.kind === "products" ||
                slide.kind === "product" ? (
                  <slide.brand.icon size={15} />
                ) : (
                  <Play size={13} />
                )}
              </span>
              <p className="truncate text-[11px] font-semibold tracking-[0.16em] text-muted uppercase sm:text-xs">
                {SHOW.name} {SHOW.year} · Stand {SHOW.stand}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-1.5">
              {/* overview ↔ spotlight */}
              <div className="glass mr-1 flex items-center gap-0.5 rounded-full p-1">
                {(
                  [
                    { value: "overview", icon: LayoutGrid, label: "Range view" },
                    { value: "spotlight", icon: Square, label: "One product per slide" },
                  ] as const
                ).map((m) => (
                  <button
                    key={m.value}
                    type="button"
                    onClick={() => switchMode(m.value)}
                    aria-pressed={mode === m.value}
                    title={m.label}
                    className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
                      mode === m.value
                        ? "bg-foreground text-background"
                        : "text-muted hover:text-foreground"
                    }`}
                  >
                    <m.icon size={13} />
                  </button>
                ))}
              </div>

              <span className="mr-1 font-heading text-xs font-bold tabular-nums sm:text-sm">
                {safeIndex + 1}
                <span className="text-muted">/{deck.length}</span>
              </span>

              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? "Pause slideshow" : "Play slideshow"}
                className="glass flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:text-primary"
              >
                {playing ? <Pause size={15} /> : <Play size={15} />}
              </button>

              <button
                type="button"
                onClick={() => void toggleFullscreen()}
                aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                className="glass hidden h-9 w-9 items-center justify-center rounded-full transition-colors hover:text-primary sm:flex"
              >
                {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
              </button>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close slideshow"
                className="glass flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:text-primary"
              >
                <X size={16} />
              </button>
            </div>
          </header>

          {/* ── stage ─────────────────────────────────────── */}
          <div className="relative z-10 min-h-0 flex-1 overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={slide.id}
                custom={direction}
                initial={{ opacity: 0, x: direction * 70 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -70 }}
                transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.16}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -70 || info.velocity.x < -450) go(1);
                  else if (info.offset.x > 70 || info.velocity.x > 450) go(-1);
                }}
                className="h-full overflow-y-auto"
              >
                <SlideBody slide={slide} />
              </motion.div>
            </AnimatePresence>

            {/* prev / next */}
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous slide"
              className="glass absolute top-1/2 left-3 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full transition-colors hover:text-primary lg:flex"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next slide"
              className="glass absolute top-1/2 right-3 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full transition-colors hover:text-primary lg:flex"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* ── bottom scrubber ───────────────────────────── */}
          <footer className="relative z-20 shrink-0 px-4 pt-2 pb-4 sm:px-7">
            <div className="mx-auto flex max-w-4xl items-center gap-1 overflow-x-auto">
              {deck.map((s, i) => {
                const [c] = slideAccent(s);
                const active = i === safeIndex;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => jump(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    aria-current={active}
                    className={`group relative h-6 shrink-0 ${
                      deck.length > 24 ? "px-[1px]" : "px-[3px]"
                    }`}
                    style={{
                      flex: active ? "0 0 34px" : "1 1 0",
                      minWidth: active ? undefined : 3,
                    }}
                  >
                    <span
                      className="block h-1.5 w-full rounded-full transition-all duration-300"
                      style={{
                        background: active ? c : "var(--line)",
                        opacity: active ? 1 : 0.9,
                      }}
                    />
                  </button>
                );
              })}
            </div>

            <p className="mt-1.5 hidden text-center text-[10px] tracking-wide text-muted lg:block">
              ← → navigate · Space play/pause · V view · F fullscreen · Esc exit
            </p>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
