import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Mail, MapPin, Phone } from "lucide-react";
import { EnquiryForm } from "@/components/food-show/EnquiryForm";
import { DISTRIBUTION, SHOW } from "@/components/food-show/data";

/* QR scan karne wale seedha yahan aate hain — is liye yeh page
   mobile-first hai: koi navbar nahi, koi lambi scrolling nahi,
   bas form aur zaroori raabta. */

export const metadata: Metadata = {
  title: `Enquiry — Stand ${SHOW.stand} | NextBite`,
  description: `Send an enquiry to the NextBite team at ${SHOW.name} ${SHOW.year}, Stand ${SHOW.stand}. Retail, wholesale and foodservice welcome.`,
  robots: { index: false, follow: false },
};

export default function EnquiryPage() {
  const travis = DISTRIBUTION[0].contact;

  return (
    <main className="relative min-h-[100svh] overflow-hidden py-8 sm:py-14">
      {/* ambient wash */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/2 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-[var(--glow-primary)] blur-[120px]" />
      </div>

      <div className="mx-auto w-full max-w-lg px-5">
        <Link
          href="/fine-food-show"
          className="inline-flex items-center gap-2 text-[13px] font-medium text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft size={14} />
          Back to the portfolio
        </Link>

        {/* header */}
        <div className="mt-7">
          <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-4 py-2 text-[10px] font-bold tracking-[0.2em] text-white uppercase">
            <MapPin size={13} />
            {SHOW.name} {SHOW.year} · Stand {SHOW.stand}
          </span>

          <h1 className="mt-5 text-[clamp(2.1rem,8vw,3rem)] leading-[0.98]">
            Send an <span className="text-gradient">enquiry</span>
          </h1>

          <p className="mt-4 text-[15px] leading-relaxed text-muted">
            Two quick steps. Tell us how to reach you, then anything you&apos;d
            like us to know — retail listings, wholesale supply or foodservice
            bulk sizes.
          </p>
        </div>

        {/* form card */}
        <div className="mt-8 rounded-[1.75rem] border border-line bg-card p-6 shadow-card sm:p-8">
          <EnquiryForm source="qr-page" compact />
        </div>

        {/* fallback raabta — form kaam na kare to bhi lead na khoye */}
        <div className="mt-8 rounded-2xl border border-line bg-card-soft px-6 py-5">
          <p className="text-[11px] font-bold tracking-[0.18em] text-muted uppercase">
            Prefer to reach us directly?
          </p>
          <div className="mt-3 flex flex-col gap-2.5">
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

        <p className="mt-8 text-center text-[11px] text-muted">
          NextBite · angelfood.co.nz · nuttybay.com.au · tonzu.co.nz ·
          zenzo.co.nz
        </p>
      </div>
    </main>
  );
}
