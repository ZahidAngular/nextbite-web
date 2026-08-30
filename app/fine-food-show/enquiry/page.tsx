import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/Logo";
import { EnquiryForm } from "@/components/food-show/EnquiryForm";
import { ENQUIRY_CONTACTS, SHOW } from "@/components/food-show/data";

/* ═══════════════════════════════════════════════════════════════
   QR scan karne wale seedha yahan aate hain.

   Chhoti screen par: form pehle, tafseel uske BAAD — taake khola
   jate hi form saamne ho. Raabte ki list ab lambi hai, is liye
   mobile par safha barh sakta hai (pehle jaisa overflow-hidden
   rakhte to yeh saari tafseel kat kar ghayab ho jati).

   Bare screen (lg) par: do column, aur poora safha ek hi screen
   mein — wahan jagah kaafi hai.
   ═══════════════════════════════════════════════════════════════ */

export const metadata: Metadata = {
  title: `Enquiry — Stand ${SHOW.stand} | NextBite`,
  description: `Send an enquiry to the NextBite team at ${SHOW.name} ${SHOW.year}, Stand ${SHOW.stand}. Retail, wholesale and foodservice welcome.`,
  robots: { index: false, follow: false },
};

export default function EnquiryPage() {
  return (
    <main className="relative flex min-h-[100dvh] flex-col lg:h-[100dvh] lg:overflow-hidden">
      {/* Ambient wash. `overflow-hidden` yahin par zaroori hai — mobile
         par main ab overflow-hidden nahi hai, to yeh blur bahar nikal
         kar safhe ko dayen aur neeche khinch deta tha. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-40 left-1/2 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-[var(--glow-primary)] blur-[120px]" />
        <div className="absolute -right-32 -bottom-40 h-[22rem] w-[22rem] rounded-full bg-[var(--glow-secondary)] blur-[120px]" />
      </div>

      {/* ── top bar ─────────────────────────────────────────── */}
      <header className="flex shrink-0 items-center justify-between gap-3 px-5 py-3 sm:px-8 sm:py-4">
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
      <div className="flex min-h-0 flex-1 flex-col gap-6 px-5 pb-6 sm:px-8 lg:flex-row lg:items-center lg:justify-center lg:gap-10 lg:px-10 xl:gap-14 lg:pb-3">
        {/* Tafseel: mobile par form ke NEECHE (order-2), desktop par
           bayen taraf (lg:order-1) */}
        <div className="order-2 shrink-0 lg:order-1 lg:max-w-xl">
          <h1 className="text-[clamp(1.5rem,6vw,2.6rem)] leading-[1.05]">
            Fine Food Show <span className="text-gradient">Enquiry</span>
          </h1>

          <p className="mt-3 hidden text-[15px] leading-relaxed text-muted sm:block lg:text-sm">
            Two quick steps. Tell us how to reach you, then anything you&apos;d
            like us to know.
          </p>

          {/* ── shobe ke hisaab se raabta ──────────────────────
             Har shoba apna card, apne accent ke saath — orange se
             green tak. Pehle yeh ek flat list thi jahan sab kuch ek
             hi wazan ka tha aur naam kat rahe the. */}
          <div className="mt-5 lg:mt-7">
            <p className="mb-3 flex items-center gap-3 text-[10px] font-bold tracking-[0.16em] text-muted uppercase">
              Prefer to reach us directly?
              <span className="h-px flex-1 bg-line" />
            </p>

            <div className="grid gap-2.5 sm:grid-cols-2">
              {ENQUIRY_CONTACTS.map((group) => {
                /* featured card apni qatar akela leta hai aur har
                   cheez us mein thori bari hoti hai */
                const big = group.featured;

                /* Do-column grid mein agar aam cards taaq (odd) hon to
                   aakhri akela reh jata hai aur baghal mein khali khana
                   bacha rehta hai — is liye woh poori chaurai le leta hai. */
                const normals = ENQUIRY_CONTACTS.filter((g) => !g.featured);
                const orphan =
                  !big &&
                  normals.length % 2 === 1 &&
                  group === normals[normals.length - 1];

                return (
                  <div
                    key={group.area}
                    className={`relative overflow-hidden rounded-xl border backdrop-blur-sm ${
                      big
                        ? "border-transparent px-5 py-4 sm:col-span-2"
                        : `border-line bg-card/70 py-2.5 pr-3 pl-4 ${
                            orphan ? "sm:col-span-2" : ""
                          }`
                    }`}
                    style={
                      big
                        ? {
                            background: `linear-gradient(110deg, ${group.accent}1f, ${group.accent}08)`,
                            boxShadow: `inset 0 0 0 1px ${group.accent}40`,
                          }
                        : undefined
                    }
                  >
                    {/* accent — bayen kinare par lakeer */}
                    <span
                      aria-hidden
                      className={`absolute inset-y-0 left-0 ${big ? "w-1" : "w-[3px]"}`}
                      style={{ background: group.accent }}
                    />

                    <p
                      className={`leading-tight font-bold uppercase ${
                        big
                          ? "text-[12px] tracking-[0.14em]"
                          : "text-[10px] tracking-[0.1em]"
                      }`}
                      style={{ color: group.accent }}
                    >
                      {group.area}
                    </p>

                    <div className="mt-1.5">
                      {group.people.map((person) => (
                        <div key={`${group.area}-${person.email}`}>
                          <p
                            className={`leading-snug font-bold ${
                              big ? "text-[17px]" : "text-[13px] font-semibold"
                            }`}
                          >
                            {person.name}
                          </p>

                          <div
                            className={`mt-1 flex leading-none ${
                              big
                                ? "flex-wrap items-center gap-x-5 gap-y-1.5 text-[13px]"
                                : "flex-col gap-1 text-[11.5px]"
                            }`}
                          >
                            <a
                              href={`mailto:${person.email}`}
                              className="inline-flex min-w-0 items-center gap-1.5 text-muted transition-colors hover:text-foreground"
                            >
                              <Mail
                                size={big ? 13 : 11}
                                className="shrink-0 opacity-60"
                              />
                              <span className="truncate">{person.email}</span>
                            </a>

                            {person.phones.map((phone) => (
                              <a
                                key={phone}
                                href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                                className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-foreground"
                              >
                                <Phone
                                  size={big ? 13 : 11}
                                  className="shrink-0 opacity-60"
                                />
                                {phone}
                              </a>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* form — mobile par sab se pehle */}
        <div className="order-1 w-full max-w-lg self-center rounded-[1.5rem] border border-line bg-card p-5 shadow-card sm:rounded-[1.75rem] sm:p-7 lg:order-2">
          <EnquiryForm source="qr-page" compact />
        </div>
      </div>
    </main>
  );
}
