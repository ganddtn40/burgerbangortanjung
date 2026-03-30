"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const navLinks = [
  { title: "Beranda", href: "#" },
  { title: "Menu", href: "#" },
  { title: "Cerita", href: "#" },
  {
    title: "Lokasi",
    href: "https://share.google/WTScaUm82xEal2Es7",
    external: true,
  },
  {
    title: "Kontak",
    href: "https://wa.me/6285249386856",
    external: true,
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Fixed header bar */}
      <header className="fixed top-0 left-0 w-full z-[100] flex items-center justify-between px-6 md:px-10 py-5 pointer-events-none">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="pointer-events-auto"
        >
          <a
            href="#"
            className="text-white font-black text-xl md:text-2xl tracking-tighter uppercase mix-blend-difference"
          >
            Bangor<span className="text-burger-primary">.</span>
          </a>
        </motion.div>

        {/* Menu button */}
        <motion.button
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onClick={() => setIsOpen(!isOpen)}
          className="pointer-events-auto relative z-[110] w-12 h-12 flex flex-col justify-center items-center gap-[6px] cursor-pointer mix-blend-difference"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-7 h-[2px] bg-white transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] origin-center ${
              isOpen ? "rotate-45 translate-y-[8px]" : ""
            }`}
          />
          <span
            className={`block w-7 h-[2px] bg-white transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] origin-center ${
              isOpen ? "opacity-0 scale-x-0" : ""
            }`}
          />
          <span
            className={`block w-7 h-[2px] bg-white transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] origin-center ${
              isOpen ? "-rotate-45 -translate-y-[8px]" : ""
            }`}
          />
        </motion.button>
      </header>

      {/* Fullscreen menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 42px) 42px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 42px) 42px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 42px) 42px)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[90] bg-burger-primary flex flex-col justify-center px-6 md:px-16 lg:px-24 overflow-hidden"
          >
            {/* Nav links */}
            <nav className="flex flex-col gap-2 md:gap-3">
              {navLinks.map((link, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{
                      duration: 0.6,
                      delay: 0.05 + i * 0.08,
                      ease: [0.76, 0, 0.24, 1],
                    }}
                  >
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      onClick={!link.external ? () => setIsOpen(false) : undefined}
                      className="group flex items-center gap-4"
                    >
                      <span className="text-xs text-black/30 font-mono tabular-nums">
                        0{i + 1}
                      </span>
                      <span className="text-[12vw] md:text-[8vw] lg:text-[6vw] font-black uppercase tracking-tighter text-black/90 leading-none group-hover:text-white group-hover:translate-x-6 group-hover:-skew-x-6 transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] inline-block origin-left">
                        {link.title}
                      </span>
                    </a>
                  </motion.div>
                </div>
              ))}
            </nav>

            {/* Bottom info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute bottom-8 left-6 right-6 md:left-16 md:right-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 text-xs uppercase tracking-[0.15em] font-medium text-black/50 border-t border-black/15 pt-6"
            >
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
              </div>
              <div className="text-right">
                <p>Tanjung, Indonesia</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
