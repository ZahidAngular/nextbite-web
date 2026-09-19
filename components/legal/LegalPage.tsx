import { Fragment, type ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import type { LegalBlock, LegalDoc } from "@/lib/legal/types";

/* ═══════════════════════════════════════════════════════════════
   LEGAL PAGE — Privacy Policy, Terms of Use waghera

   Har document `lib/legal/` mein data ki shakal mein hai; yeh
   component usay site ke design mein dikhata hai. Naya legal
   page = naya data file + ek chhota page.tsx.
   ═══════════════════════════════════════════════════════════════ */

/* Home ke sections doosre page se khulein, is liye "/#..." */
const navLinks = [
  { label: "About", href: "/#about" },
  { label: "What We Do", href: "/#what-we-do" },
  { label: "How We Work", href: "/#how-we-work" },
  { label: "Expertise", href: "/#expertise" },
  { label: "Fine Food Show", href: "/fine-food-show" },
  { label: "Contact", href: "/#contact" },
];

/* Text ke andar URL, email aur doosre legal pages ke naam khud link
   ban jate hain — document mein jo likha hai wohi dikhta hai, bas
   clickable. URL ke baad ka full stop link ka hissa nahi banta. */
const LEGAL_PAGES: Record<string, string> = {
  "Privacy Policy": "/privacy-policy",
  "Terms of Use": "/terms-of-use",
  "Cookie Policy": "/cookie-policy",
  Disclaimer: "/disclaimer",
};

const LINK_RE =
  /(https?:\/\/[^\s,]*[^\s,.]|[\w.+-]+@[\w-]+(?:\.[\w-]+)+|Privacy Policy|Terms of Use|Cookie Policy|Disclaimer)/g;

/** `self` — is page ka apna path, taake page khud ko link na kare */
function linkify(text: string, self: string): ReactNode {
  const parts = text.split(LINK_RE);
  return parts.map((part, i) => {
    if (i % 2 === 0) return <Fragment key={i}>{part}</Fragment>;
    const page = LEGAL_PAGES[part];
    if (page === self) return <Fragment key={i}>{part}</Fragment>;
    const href = page ?? (part.includes("@") && !part.startsWith("http") ? `mailto:${part}` : part);
    return (
      <a
        key={i}
        href={href}
        className="font-medium text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
      >
        {part}
      </a>
    );
  });
}

function Block({ block, self }: { block: LegalBlock; self: string }) {
  switch (block.type) {
    case "p":
      return <p>{linkify(block.text, self)}</p>;
    case "h3":
      return (
        <h3 className="font-heading pt-2 text-lg font-semibold tracking-tight text-foreground">
          {block.text}
        </h3>
      );
    case "list":
      return (
        <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3">
              <span
                aria-hidden
                className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-primary to-secondary"
              />
              <span>{linkify(item, self)}</span>
            </li>
          ))}
        </ul>
      );
  }
}

export function LegalPage({ doc, path }: { doc: LegalDoc; path: string }) {
  return (
    <main>
      <Navbar links={navLinks} homeHref="/" cta={{ label: "Contact Us", href: "/#contact" }} />

      <section className="relative overflow-hidden pt-36 pb-12 sm:pt-44">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 -left-24 h-[28rem] w-[28rem] rounded-full bg-[var(--glow-primary)] blur-[120px]" />
          <div className="absolute -top-20 -right-32 h-[24rem] w-[24rem] rounded-full bg-[var(--glow-secondary)] blur-[120px]" />
        </div>

        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-4 inline-flex items-center gap-3 text-xs font-semibold tracking-[0.3em] text-secondary uppercase sm:text-sm">
            <span className="h-[2px] w-10 bg-gradient-to-r from-primary to-secondary" />
            Legal
          </p>
          <h1 className="font-heading text-4xl font-bold tracking-[-0.03em] sm:text-6xl">
            {doc.title}
          </h1>
          <p className="mt-4 text-sm text-muted">Last updated: {doc.updated}</p>
        </div>
      </section>

      <section className="pb-24 sm:pb-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[16rem_1fr] lg:gap-16">
          {/* contents — bari screen par saath chalta hai */}
          <nav aria-label="On this page" className="hidden lg:block">
            <div className="sticky top-28">
              <p className="text-[11px] font-semibold tracking-[0.16em] text-muted uppercase">
                On this page
              </p>
              <ol className="mt-4 space-y-2 border-l border-line text-sm">
                {doc.sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="-ml-px block border-l-2 border-transparent py-0.5 pl-4 text-muted transition-colors hover:border-primary hover:text-foreground"
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <article className="max-w-3xl space-y-5 text-[15px] leading-relaxed text-muted sm:text-base">
            {doc.intro.map((block, i) => (
              <Block key={i} block={block} self={path} />
            ))}

            {doc.sections.map((s) => (
              <div key={s.id} id={s.id} className="scroll-mt-28 space-y-5 pt-8">
                <h2 className="font-heading border-t border-line pt-8 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  {s.title}
                </h2>
                {s.blocks.map((block, i) => (
                  <Block key={i} block={block} self={path} />
                ))}
              </div>
            ))}
          </article>
        </div>
      </section>

      <Footer />
    </main>
  );
}
