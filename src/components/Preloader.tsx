"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const TOTAL_IMAGES = 192;

interface PreloaderProps {
  isLoading: boolean;
  setIsLoading: (v: boolean) => void;
}

export default function Preloader({ isLoading, setIsLoading }: PreloaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let loadedCount = 0;

    const imageUrls = Array.from({ length: TOTAL_IMAGES }, (_, i) => {
      const index = (i + 1).toString().padStart(3, "0");
      return `/sequence/ezgif-frame-${index}.jpg`;
    });

    const incrementProgress = () => {
      loadedCount++;
      const pct = Math.round((loadedCount / TOTAL_IMAGES) * 100);
      setProgress(pct);
      if (loadedCount === TOTAL_IMAGES) {
        setTimeout(() => setIsLoading(false), 600);
      }
    };

    imageUrls.forEach((url) => {
      const img = new window.Image();
      img.src = url;
      img.onload = incrementProgress;
      img.onerror = incrementProgress;
    });

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 20000);

    return () => clearTimeout(timeout);
  }, [setIsLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0a]"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-6"
          >
            {/* Brand name */}
            <div className="text-sm uppercase tracking-[0.4em] text-white/40 font-medium">
              Burger Bangor Tanjung
            </div>

            {/* Progress number */}
            <div className="text-[20vw] md:text-[12vw] font-black leading-none tracking-tighter text-white tabular-nums">
              {progress}
              <span className="text-white/30">%</span>
            </div>

            {/* Progress bar */}
            <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear", duration: 0.1 }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
