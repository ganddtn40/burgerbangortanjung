"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function HeroOverlays() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Title: visible immediately, fades out by 20%
  const titleOpacity = useTransform(scrollYProgress, [0, 0.12, 0.2], [1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.2], [0, -80]);

  // Slogan 1: 25% → 45% (Left aligned)
  const slogan1Opacity = useTransform(scrollYProgress, [0.22, 0.28, 0.4, 0.46], [0, 1, 1, 0]);
  const slogan1X = useTransform(scrollYProgress, [0.22, 0.28], [-80, 0]);

  // Slogan 2: 55% → 70% (Right aligned)
  const slogan2Opacity = useTransform(scrollYProgress, [0.5, 0.56, 0.66, 0.72], [0, 1, 1, 0]);
  const slogan2X = useTransform(scrollYProgress, [0.5, 0.56], [80, 0]);

  // CTA: 82% → 100% (Centered)
  const ctaOpacity = useTransform(scrollYProgress, [0.8, 0.88, 1], [0, 1, 1]);
  const ctaScale = useTransform(scrollYProgress, [0.8, 0.88], [0.85, 1]);

  return (
    <div ref={containerRef} className="fixed top-0 left-0 w-full h-[400vh] pointer-events-none z-20">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center">
        {/* 0% Title — Centered */}
        <motion.div
          style={{ opacity: titleOpacity, y: titleY }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
        >
          <h1 className="text-[13vw] md:text-[10vw] lg:text-[8vw] font-black tracking-tighter leading-[0.85] text-white uppercase">
            Bangor
            <br />
            Tanjung
          </h1>
          <p className="mt-4 text-base md:text-xl font-light tracking-[0.15em] uppercase text-white/70">
            Taste the Rebellion
          </p>
        </motion.div>

        {/* 30% Slogan — Left aligned */}
        <motion.div
          style={{ opacity: slogan1Opacity, x: slogan1X }}
          className="absolute left-6 md:left-16 lg:left-24 max-w-sm md:max-w-md"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[0.9] tracking-tighter text-white uppercase">
            Di-Smash
            <br />
            Sampai
            <br />
            <span className="text-burger-primary">Sempurna</span>
          </h2>
          <p className="mt-4 text-sm md:text-base text-white/60 font-medium leading-relaxed max-w-xs">
            Setiap gigitan adalah mahakarya rasa yang brutal dan juicy, dibuat
            dari bahan premium dengan passion yang tak tertandingi.
          </p>
        </motion.div>

        {/* 60% Slogan — Right aligned */}
        <motion.div
          style={{ opacity: slogan2Opacity, x: slogan2X }}
          className="absolute right-6 md:right-16 lg:right-24 text-right max-w-sm md:max-w-md"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[0.9] tracking-tighter text-white uppercase">
            <span className="text-burger-secondary">Dicari</span>
            <br />
            Banyak
            <br />
            Orang
          </h2>
          <p className="mt-4 text-sm md:text-base text-white/60 font-medium leading-relaxed max-w-xs ml-auto">
            Kami bukan cuma bikin burger. Kami menciptakan pengalaman yang bikin
            kamu ketagihan dan terus balik lagi.
          </p>
        </motion.div>

        {/* 90% CTA — Centered */}
        <motion.div
          style={{ opacity: ctaOpacity, scale: ctaScale }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-auto"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-white/40 font-medium mb-4">
            Sudah siap?
          </p>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white uppercase leading-[0.85]">
            Siap
            <br />
            Melahap?
          </h2>
          <a
            href="https://wa.me/6285249386856"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 group relative px-10 py-5 bg-burger-primary text-black font-bold text-lg rounded-full overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 inline-block"
          >
            <span className="relative z-10">PESAN SEKARANG</span>
            <div className="absolute inset-0 bg-white origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
            <span className="absolute inset-0 flex items-center justify-center text-burger-primary font-bold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
              PESAN SEKARANG
            </span>
          </a>
        </motion.div>
      </div>
    </div>
  );
}
