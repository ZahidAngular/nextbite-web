import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/Logo";
import { EnquiryForm } from "@/components/food-show/EnquiryForm";
import { DISTRIBUTION, SHOW } from "@/components/food-show/data";

/* ═══════════════════════════════════════════════════════════════
   QR scan karne wale seedha yahan aate hain.

   Yeh page JAAN BOOJH KAR ek hi screen mein samata hai — koi
   scrolling nahi. Is liye:
     • bahar wala main `h-[100dvh] overflow-hidden` hai
     • desktop par do column (baayen taraf baat, daayen form)
     • mobile par sirf zaroori cheezein — lambi tafseel chhup jati hai
   Kuch bhi add karne se pehle 360x640 par check kar lena, warna
   overflow-hidden usay kaat dega.
   ═══════════════════════════════════════════════════════════════ */

export const metadata: Metadata = {
  title: `Enquiry — Stand ${SHOW.stand} | NextBite`,
  description: `Send an enquiry to the NextBite team at ${SHOW.name} ${SHOW.year}, Stand ${SHOW.stand}. Retail, wholesale and foodservice welcome.`,
  robots: { index: false, follow: false },
};

export default function EnquiryPage() {
  const travis = DISTRIBUTION[0].contact;

  /* `relative` zaroori hai — warna neeche wala blur `main` ke
     overflow-hidden se bahar nikal kar page ko lamba kar deta hai */
  return (
    <main className="relative flex h-[100dvh] flex-col overflow-hidden">
      {/* ambient wash */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-[var(--glow-primary)] blur-[120px]" />
        <div className="absolute -right-32 -bottom-40 h-[22rem] w-[22rem] rounded-full bg-[var(--glow-secondary)] blur-[120px]" />
      </div>

      {/* ── top bar ─────────────────────────────────────────── */}
      <header className="flex shrink-0 items-center justify-between gap-3 px-5 py-3 sm:px-8 sm:py-4">
        {/* Logo khud hi wapas jane ka rasta hai — ek hi qatar mein
            rehta hai taake page ki unchai na barhe */}
        <Link
          href="/fine-food-show"
          aria-label="Back to the Fine Food Show portfolio"
          className="group inline-flex items-center gap-2.5"
        >
          <ArrowLeft
            size={15}
            className="shrink-0 text-muted transition-colors group-hover:text-foreground"
          />
          <Logo imageClassName="h-11 w-auto sm:h-14" />
        </Link>

        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-gradient-to-r from-primary to-secondary px-3 py-1.5 text-[9px] font-bold tracking-[0.16em] text-white uppercase sm:px-4 sm:text-[10px]">
          <MapPin size={12} />
          Stand {SHOW.stand}
        </span>
      </header>

      {/* ── body ────────────────────────────────────────────── */}
      <div className="flex min-h-0 flex-1 flex-col justify-center gap-4 px-5 pb-3 sm:px-8 lg:flex-row lg:items-center lg:gap-14 lg:px-12">
        {/* left — desktop par tafseel, mobile par sirf chhota title */}
        <div className="shrink-0 lg:max-w-sm">
          <h1 className="text-[clamp(1.5rem,6vw,3rem)] leading-[1.05]">
            Fine Food Show <span className="text-gradient">Enquiry</span>
          </h1>

          <p className="mt-3 hidden text-[15px] leading-relaxed text-muted sm:block">
            Two quick steps. Tell us how to reach you, then anything you&apos;d
            like us to know — retail listings, wholesale supply or foodservice
            bulk sizes.
          </p>

          {/* raabta — sirf desktop par yahan, mobile par footer mein */}
          <div className="mt-7 hidden flex-col gap-2.5 lg:flex">
            <p className="text-[11px] font-bold tracking-[0.18em] text-muted uppercase">
              Prefer to reach us directly?
            </p>
            <a
              href={`mailto:${travis.email}`}
              className="flex items-center gap-3 text-sm text-muted transition-colors hover:text-primary"
            >
              <Mail size={15} className="text-primary" />
              {travis.email}
            </a>
            {travis.phones.map((p) => (
              <a
                key={p}
                href={`tel:${p.replace(/\s/g, "")}`}
                className="flex items-center gap-3 text-sm text-muted transition-colors hover:text-secondary"
              >
                <Phone size={15} className="text-secondary" />
                {p}
              </a>
            ))}
          </div>
        </div>

        {/* form */}
        <div className="w-full max-w-lg rounded-[1.5rem] border border-line bg-card p-5 shadow-card sm:rounded-[1.75rem] sm:p-7">
          <EnquiryForm source="qr-page" compact />
        </div>
      </div>

      {/* ── footer — mobile par raabta yahin ────────────────── */}
      <footer className="shrink-0 px-5 pb-3 text-center sm:pb-4">
        <div className="flex items-center justify-center gap-4 lg:hidden">
          <a
            href={`mailto:${travis.email}`}
            className="inline-flex items-center gap-1.5 text-[11px] font-medium text-muted transition-colors hover:text-primary"
          >
            <Mail size={12} className="text-primary" />
            {travis.email}
          </a>
          <a
            href={`tel:${travis.phones[0].replace(/\s/g, "")}`}
            className="inline-flex items-center gap-1.5 text-[11px] font-medium text-muted transition-colors hover:text-secondary"
          >
            <Phone size={12} className="text-secondary" />
            {travis.phones[0]}
          </a>
        </div>

        <p className="mt-2 hidden text-[10px] text-muted lg:block">
          NextBite · angelfood.co.nz · nuttybay.com.au · tonzu.co.nz ·
          zenzo.co.nz
        </p>
      </footer>
    </main>
  );
}
