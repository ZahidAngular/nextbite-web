"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { RevealWords, Reveal } from "./Reveal";

const info = [
  { icon: Mail,    label: "info@nextbite.com.au",   href: "mailto:info@nextbite.com.au" },
  { icon: Phone,   label: "+61 472 539 195 (Sina)",  href: "tel:+61472539195" },
  { icon: Phone,   label: "+61 481 317 161 (Arif)",  href: "tel:+61481317161" },
  { icon: MapPin,  label: "Australia and New Zealand", href: undefined },
];

const inputClass =
  "w-full rounded-2xl border border-line bg-card px-5 py-4 text-foreground placeholder:text-muted/60 outline-none transition-all duration-300 focus:border-secondary focus:shadow-[0_0_0_4px_var(--glow-secondary)]";

export function Contact() {
  const [sent, setSent] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  /* info card comes from left Z-depth */
  const infoRotateY = useTransform(scrollYProgress, [0, 0.45], [-28, 0]);
  const infoX       = useTransform(scrollYProgress, [0, 0.45], [-80, 0]);
  const infoOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  /* form comes from right Z-depth */
  const formRotateY = useTransform(scrollYProgress, [0, 0.45], [28, 0]);
  const formX       = useTransform(scrollYProgress, [0, 0.45], [80, 0]);
  const formOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data    = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Website enquiry from ${data.get("name")}`);
    const body    = encodeURIComponent(
      `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nPhone: ${data.get("phone")}\n\n${data.get("message")}`
    );
    window.location.href = `mailto:info@nextbite.com.au?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section ref={ref} id="contact" className="relative overflow-hidden py-24 bg-card-soft">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="animate-float absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
        <div className="animate-float-slow absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* heading */}
        <div className="mb-16 text-center">
          <Reveal>
            <p className="mb-4 text-sm font-semibold tracking-[0.3em] text-secondary uppercase">
              Need more information?
            </p>
          </Reveal>
          <h2 className="font-heading text-4xl font-bold tracking-[-0.03em] sm:text-5xl">
            <RevealWords text="Still Have" />{" "}
            <RevealWords text="Other Questions?" className="text-gradient" />
          </h2>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-5 max-w-xl text-muted">
              Contact us today and we&apos;ll be glad to answer any additional questions you may have.
            </p>
          </Reveal>
        </div>

        {/* two columns — each comes from opposite Z-depth on scroll */}
        <div className="grid gap-10 lg:grid-cols-5" style={{ perspective: "1200px" }}>

          {/* info card */}
          <motion.div
            style={{ rotateY: infoRotateY, x: infoX, opacity: infoOpacity }}
            className="lg:col-span-2"
          >
            <div className="shadow-3d relative h-full overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-secondary-dark via-secondary to-secondary-dark p-10 text-white">
              <div aria-hidden className="animate-float absolute -top-16 -right-16 h-48 w-48 rounded-full bg-primary/30 blur-2xl" />
              <h3 className="font-heading relative text-2xl font-bold">Contact Us Today</h3>
              <ul className="relative mt-9 space-y-6">
                {info.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                  >
                    <motion.a
                      href={item.href}
                      whileHover={item.href ? { x: 8 } : undefined}
                      className="flex items-center gap-4"
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
                        <item.icon size={20} />
                      </span>
                      <span className="font-medium">{item.label}</span>
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* form */}
          <motion.div
            style={{ rotateY: formRotateY, x: formX, opacity: formOpacity }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="glass shadow-3d h-full rounded-[2.5rem] p-8 sm:p-10"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <input name="name"  required placeholder="Name *"  className={inputClass} />
                <input name="email" type="email" required placeholder="Email *" className={inputClass} />
              </div>
              <input  name="phone" type="tel"  required placeholder="Phone *" className={`${inputClass} mt-5`} />
              <textarea name="message" rows={5} placeholder="Message" className={`${inputClass} mt-5 resize-none`} />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-secondary py-4 font-semibold text-white shadow-lg"
              >
                {sent ? (
                  <><CheckCircle2 size={18} /> Opening your email app…</>
                ) : (
                  <><Send size={18} /> Send Message</>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
