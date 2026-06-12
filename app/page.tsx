import { Preloader } from "@/components/Preloader";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { PlantsBg } from "@/components/PlantsBg";
import { About } from "@/components/About";
import { WhatWeDo } from "@/components/WhatWeDo";
import { HowWeWork } from "@/components/HowWeWork";
import { WhyPartner } from "@/components/WhyPartner";
import { Expertise } from "@/components/Expertise";
import { JoinUs } from "@/components/JoinUs";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <PlantsBg />
      <Preloader />
      <Navbar />
      <Hero />
      <Marquee />
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
