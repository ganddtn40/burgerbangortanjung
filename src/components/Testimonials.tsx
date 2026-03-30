"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const testimonials = [
  '"Burger terenak yang pernah gue makan di kota ini. Titik." — Ria S.',
  '"Berminyak tapi dengan cara yang sempurna. Crust-nya juara." — Dimas P.',
  '"Setiap kali makan di sini, selalu puas. Gila sih." — Kevin L.',
  '"Sausnya bukan dari dunia ini. Gue ketagihan parah." — Maya R.',
  '"Ini baru yang namanya smash burger beneran." — Andi T.',
];

const row1Items = [...testimonials, ...testimonials];
const row2Items = [
  ...[...testimonials].reverse(),
  ...[...testimonials].reverse(),
];

function MarqueeItem({ text }: { text: string }) {
  return (
    <span className="shrink-0 px-3 sm:px-5 md:px-8 cursor-default select-none inline-block transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] hover:text-burger-primary hover:-skew-x-6 hover:scale-105">
      {text}
    </span>
  );
}

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scrollX1 = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const scrollX2 = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <section
      ref={containerRef}
      className="relative z-20 w-full bg-background py-20 sm:py-28 md:py-36 overflow-hidden"
    >
      {/* Label */}
      <div className="px-4 sm:px-6 md:px-12 mb-10 sm:mb-14">
        <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-burger-muted font-medium text-center">
          Kata Mereka
        </p>
      </div>

      {/* Row 1 */}
      <motion.div style={{ x: scrollX1 }} className="mb-3 sm:mb-5 md:mb-6">
        <div className="flex whitespace-nowrap animate-marquee-left text-lg sm:text-2xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white/70 will-change-transform">
          {row1Items.map((text, i) => (
            <MarqueeItem key={`r1-${i}`} text={text} />
          ))}
        </div>
      </motion.div>

      {/* Row 2 */}
      <motion.div style={{ x: scrollX2 }}>
        <div className="flex whitespace-nowrap animate-marquee-right text-lg sm:text-2xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white/25 will-change-transform">
          {row2Items.map((text, i) => (
            <MarqueeItem key={`r2-${i}`} text={text} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
