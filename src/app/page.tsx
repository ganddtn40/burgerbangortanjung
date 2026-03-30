"use client";

import SequenceScroll from "@/components/SequenceScroll";
import HeroOverlays from "@/components/HeroOverlays";
import About from "@/components/About";
import BentoFeatures from "@/components/BentoFeatures";
import Testimonials from "@/components/Testimonials";
import CtaFooter from "@/components/CtaFooter";

export default function Home() {
  return (
    <main className="w-full relative">
      {/* Hero scrollytelling — 400vh canvas + overlays run in parallel */}
      <section className="relative">
        <SequenceScroll />
        <HeroOverlays />
      </section>

      {/* Other sections slide up over the hero using -mt-[100vh] + z-10 */}
      <div className="relative z-30 -mt-[100vh] bg-background">
        <About />
        <BentoFeatures />
        <Testimonials />
        <CtaFooter />
      </div>
    </main>
  );
}
