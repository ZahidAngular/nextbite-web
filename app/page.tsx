import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { Preloader } from "@/components/Preloader";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { FoodShowPromo } from "@/components/FoodShowPromo";
import { About } from "@/components/About";
import { WhatWeDo } from "@/components/WhatWeDo";
import { HowWeWork } from "@/components/HowWeWork";
import { WhyPartner } from "@/components/WhyPartner";
import { Expertise } from "@/components/Expertise";
import { JoinUs } from "@/components/JoinUs";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = pageMeta({
  title: "NextBite — Building the Home for Plant-Based Brands",
  description:
    "A next-generation food platform focused on owning, licensing, launching, and scaling leading plant-based brands across Australia and New Zealand.",
  path: "/",
});

export default function Home() {
  return (
    <main>
      <Preloader />
      <Navbar />
      <Hero />
      <Marquee />
      <FoodShowPromo />
      <About />
      <WhatWeDo />
      <HowWeWork />
      <WhyPartner />
      <Expertise />
      <JoinUs />
      <Contact />
      <Footer />
    </main>
  );
}
