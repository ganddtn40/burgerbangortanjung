"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { MoveRight } from "lucide-react";

function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPos({ x: middleX * 0.25, y: middleY * 0.25 });
  };

  const reset = () => setPos({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="cursor-pointer"
    >
      {children}
    </motion.div>
  );
}

export default function CtaFooter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);

  return (
    <footer
      ref={containerRef}
      className="relative z-20 w-full bg-burger-primary overflow-hidden"
    >
      <motion.div
        style={{ y }}
        className="relative min-h-screen flex flex-col items-center justify-between pt-32 md:pt-40 px-6 md:px-12 pb-8"
      >
        {/* Animated bg shapes */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
            className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] border-[30px] border-dashed border-black/10 rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
            className="absolute -top-1/3 -right-1/3 w-[180%] h-[180%] border-[20px] border-dashed border-black/5 rounded-full"
          />
        </div>

        {/* CTA content */}
        <div className="relative z-10 w-full max-w-6xl flex flex-col items-center text-center mx-auto">
          <p className="uppercase tracking-[0.3em] font-medium mb-8 text-black/40 text-sm">
            Jangan puas dengan yang biasa
          </p>
          <h2 className="text-[14vw] md:text-[10vw] lg:text-[8vw] leading-[0.85] font-black tracking-tighter text-black/90">
            JOIN THE
            <br />
            REBELLION
          </h2>

          <div className="mt-16 md:mt-20">
            <MagneticButton>
              <a
                href="https://wa.me/6285249386856"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 bg-background text-foreground px-8 md:px-12 py-5 md:py-6 rounded-full font-bold text-lg md:text-xl uppercase tracking-wider hover:scale-105 transition-transform duration-300"
              >
                Pesan Sekarang
                <span className="w-10 h-10 rounded-full bg-burger-primary flex items-center justify-center text-black group-hover:rotate-45 transition-transform duration-500">
                  <MoveRight size={18} />
                </span>
              </a>
            </MagneticButton>
          </div>
        </div>

        {/* Footer bar — no copyright, just social links */}
        <div className="relative z-10 w-full max-w-7xl flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium uppercase tracking-[0.15em] border-t border-black/15 pt-6 mt-auto text-black/60">
          <div className="flex gap-6">
            <a
              href="https://www.instagram.com/burgerbangortanjung/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://www.tiktok.com/@burgerbangortjg"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition-colors"
            >
              TikTok
            </a>
            <a
              href="https://wa.me/6285249386856"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition-colors"
            >
              WhatsApp
            </a>
          </div>
          <div>
            Tanjung, Indonesia
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
