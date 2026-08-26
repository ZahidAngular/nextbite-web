"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Globe,
  Mail,
  MonitorPlay,
  Phone,
  QrCode,
} from "lucide-react";
import { MagneticButton } from "@/components/MagneticButton";
import { Reveal } from "@/components/Reveal";
import { ALL_SITES, DISTRIBUTION, SHOW } from "./data";

export function ShowContact({
  onPlay,
  onEnquire,
  qrSvg,
}: {
  onPlay: () => void;
  onEnquire: () => void;
  /** server par bana QR SVG — page se aata hai */
  qrSvg?: string;
}) {
  return (
    <section
      id="show-contact"
      className="relative scroll-mt-24 overflow-hidden border-t border-line py-24 sm:py-32"
    >
      {/* ambient glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-float-slow absolute -top-40 left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-[var(--glow-primary)] blur-[130px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-4 inline-flex items-center gap-3 text-xs font-semibold tracking-[0.3em] text-secondary uppercase sm:text-sm">
            <span className="h-[2px] w-10 bg-gradient-to-r from-primary to-secondary" />
            Distribution
            <span className="h-[2px] w-10 bg-gradient-to-l from-primary to-secondary" />
          </p>
          <h2 className="font-heading text-4xl font-bold tracking-[-0.03em] sm:text-5xl">
            National &amp; international{" "}
            <span className="text-gradient">distribution</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted">
            Come and taste the range at Stand {SHOW.stand}, or get in touch to
            talk retail listings, wholesale supply and foodservice bulk sizes.
          </p>
        </Reveal>

        {/* contact cards */}
        <div className="mx-auto mt-14 grid max-w-4xl gap-5 md:grid-cols-2">
          {DISTRIBUTION.map((d, i) => (
            <motion.div
              key={d.contact.email}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-card p-8 shadow-card transition-shadow hover:shadow-3d"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary to-secondary"
              />

              <p className="text-[11px] font-bold tracking-[0.2em] text-secondary uppercase">
                {d.title}
              </p>
              <p className="mt-2 text-sm text-muted">{d.subtitle}</p>

              <p className="font-heading mt-6 text-2xl font-bold tracking-tight">
                {d.contact.name}
              </p>

              <div className="mt-4 flex flex-col gap-2.5">
                <a
                  href={`mailto:${d.contact.email}`}
                  className="flex items-center gap-3 text-sm text-muted transition-colors hover:text-primary"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-card-soft text-primary">
                    <Mail size={14} />
                  </span>
                  {d.contact.email}
                </a>

                {d.contact.phones.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-3 text-sm text-muted transition-colors hover:text-secondary"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-card-soft text-secondary">
                      <Phone size={14} />
                    </span>
                    {phone}
                  </a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── stand CTA ────────────────────────────────────── */}
        <Reveal className="mt-16">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary to-secondary p-8 text-white sm:p-12">
            <span
              aria-hidden
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 20%, #fff 0%, transparent 45%), radial-gradient(circle at 80% 70%, #fff 0%, transparent 40%)",
              }}
            />

            <div className="relative grid items-center gap-10 lg:grid-cols-[1.15fr_auto] lg:gap-14">
              {/* ── left: the invitation ── */}
              <div className="text-center lg:text-left">
                <p className="text-xs font-semibold tracking-[0.28em] uppercase opacity-90">
                  {SHOW.name} {SHOW.year}
                </p>

                <p className="font-display-black mt-3 text-[clamp(2.6rem,8vw,5rem)] leading-none">
                  Stand {SHOW.stand}
                </p>

                <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed opacity-90 sm:text-base lg:mx-0">
                  Foodservice also available — contact us to discuss bulk sizes,
                  custom packs and catering requirements.
                </p>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5 lg:justify-start">
                  <MagneticButton>
                    {/* safed button par theme-token text nahi —
                        dark mode mein woh safed par safed ho jata tha */}
                    <button
                      type="button"
                      onClick={onEnquire}
                      className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#12200f] shadow-lg transition-shadow hover:shadow-xl"
                    >
                      <Mail size={16} />
                      Send an enquiry
                    </button>
                  </MagneticButton>

                  <MagneticButton strength={0.25}>
                    <button
                      type="button"
                      onClick={onPlay}
                      className="inline-flex items-center gap-2 rounded-full border border-white/45 px-7 py-3.5 text-sm font-semibold backdrop-blur-sm transition-colors hover:bg-white/15"
                    >
                      <MonitorPlay size={16} />
                      Play the slideshow
                    </button>
                  </MagneticButton>
                </div>

                <p className="mt-5 text-[13px] opacity-80">
                  Two quick steps — or{" "}
                  <a
                    href={`mailto:${DISTRIBUTION[0].contact.email}?subject=${encodeURIComponent(
                      `${SHOW.name} ${SHOW.year} — Stand ${SHOW.stand} enquiry`
                    )}`}
                    className="font-semibold underline underline-offset-4 transition-opacity hover:opacity-100"
                  >
                    email us directly
                  </a>
                  .
                </p>
              </div>

              {/* ── right: scan-at-the-stand QR ── */}
              {qrSvg && (
                <div className="flex flex-col items-center gap-3">
                  <div className="rounded-3xl bg-white p-4 shadow-2xl">
                    <div
                      className="h-40 w-40 [&>svg]:h-full [&>svg]:w-full sm:h-44 sm:w-44"
                      /* QR hamare apne URL se server par bana hai —
                         koi user input ismein nahi jata */
                      dangerouslySetInnerHTML={{ __html: qrSvg }}
                    />
                  </div>

                  <p className="flex items-center gap-2 text-[11px] font-bold tracking-[0.16em] uppercase opacity-90">
                    <QrCode size={13} />
                    Scan to enquire
                  </p>
                  <p className="max-w-[11rem] text-center text-[12px] leading-relaxed opacity-75">
                    Opens the form on your phone — fill it in while you browse.
                  </p>
                </div>
              )}
            </div>
          </div>
        </Reveal>

        {/* ── all brand sites ──────────────────────────────── */}
        <Reveal className="mt-14">
          <p className="text-center text-[11px] font-semibold tracking-[0.2em] text-muted uppercase">
            Our brands online
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
            {ALL_SITES.map((site) => (
              <a
                key={site}
                href={`https://${site}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-4 py-2 text-xs font-medium transition-colors hover:border-primary hover:text-primary"
              >
                <Globe size={12} />
                {site}
                <ArrowUpRight
                  size={11}
                  className="opacity-0 transition-opacity group-hover:opacity-100"
                />
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
