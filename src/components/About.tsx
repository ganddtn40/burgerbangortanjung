"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const paragraph =
  "Setiap burger yang luar biasa berawal dari sebuah perlawanan. Kami menolak rasa yang membosankan dan berani menghadirkan ledakan rasa yang brutal. Dibuat dari bahan lokal terbaik, dagingnya di-smash sempurna demi menciptakan crust yang garing, lalu diguyur lelehan saus rahasia andalan kami. Ini bukan sekadar makanan cepat saji. Ini adalah Bangor Tanjung.";

function Word({
  word,
  range,
  progress,
}: {
  word: string;
  range: [number, number];
  progress: import("motion/react").MotionValue<number>;
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const y = useTransform(progress, range, [4, 0]);

  return (
    <span className="relative inline-block mr-[0.3em] mt-[0.15em]">
      <motion.span
        style={{ opacity, y }}
        className="inline-block text-foreground"
      >
        {word}
      </motion.span>
    </span>
  );
}

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.35"],
  });

  const words = paragraph.split(" ");

  return (
    <section
      ref={containerRef}
      className="relative z-20 flex items-center justify-center min-h-screen py-32 px-6 md:px-12 bg-background"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section label */}
        <div className="mb-12">
          <p className="text-sm uppercase tracking-[0.3em] text-burger-muted font-medium">
            Cerita Kami
          </p>
        </div>

        <p className="flex flex-wrap text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] tracking-tight">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word
                key={i}
                word={word}
                range={[start, end]}
                progress={scrollYProgress}
              />
            );
          })}
        </p>
      </div>
    </section>
  );
}
