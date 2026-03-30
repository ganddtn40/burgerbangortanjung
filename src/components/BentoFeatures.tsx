"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import CountUp from "react-countup";

const stats = [
  { end: 45, suffix: "JT+", label: "Burger Terjual" },
  { end: 98, suffix: "%", label: "Pelanggan Puas" },
  { end: 69, suffix: "+", label: "Pilihan Menu" },
  { end: 800, suffix: "", label: "Gerai" },
];

const features = [
  {
    num: "01",
    title: "Dibuat Segar Setiap Hari",
    desc: "Patty kami tidak pernah dibekukan. Di-smash langsung saat dipesan untuk mengunci rasa maksimal.",
  },
  {
    num: "02",
    title: "Saus Rahasia",
    desc: "Perpaduan rasa yang kacau antara asam, pedas, dan creamy yang jadi identitas kami.",
  },
  {
    num: "03",
    title: "Bahan Lokal Terbaik",
    desc: "Mendukung petani lokal dengan menyajikan bahan segar dalam setiap gigitan.",
  },
  {
    num: "04",
    title: "Pinggiran Garing",
    desc: "Ciri khas smash burger sejati. Crust keemasan sempurna yang bikin ketagihan.",
  },
];

function StatItem({ stat, index }: { stat: (typeof stats)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.76, 0, 0.24, 1],
      }}
      className="relative group text-center p-6 md:p-8 rounded-2xl border border-white/5 bg-burger-dark hover:border-burger-primary/30 transition-all duration-500"
    >
      {/* Background glow on hover */}
      <div className="absolute inset-0 rounded-2xl bg-burger-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        <motion.div
          initial={{ scale: 1 }}
          whileInView={isInView ? { scale: [1, 1.08, 1] } : {}}
          transition={{ duration: 0.6, delay: index * 0.15 + 0.5 }}
          className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter tabular-nums text-burger-primary animate-glow"
        >
          {isInView ? (
            <CountUp end={stat.end} suffix={stat.suffix} duration={2.5} />
          ) : (
            <>0{stat.suffix}</>
          )}
        </motion.div>

        <p className="text-xs uppercase tracking-[0.2em] text-burger-muted font-medium mt-4 group-hover:text-white/60 transition-colors duration-300">
          {stat.label}
        </p>
      </div>

      {/* Animated corner accent */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-burger-primary/0 group-hover:border-burger-primary/40 rounded-tl-2xl transition-all duration-500" />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-burger-primary/0 group-hover:border-burger-primary/40 rounded-br-2xl transition-all duration-500" />
    </motion.div>
  );
}

export default function BentoFeatures() {
  return (
    <section className="relative z-20 w-full bg-background py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <p className="text-sm uppercase tracking-[0.3em] text-burger-muted font-medium mb-16 md:mb-20">
          Apa Yang Membedakan Kami
        </p>

        {/* Stats grid with animated cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-24 md:mb-32">
          {stats.map((stat, i) => (
            <StatItem key={i} stat={stat} index={i} />
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 mb-16 md:mb-20" />

        {/* Features list */}
        <div className="flex flex-col">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: [0.76, 0, 0.24, 1],
              }}
              className="group flex flex-col md:flex-row md:items-baseline gap-3 md:gap-12 py-8 border-b border-white/8 last:border-0 cursor-default"
            >
              <span className="text-xs text-burger-primary/60 font-mono tabular-nums shrink-0">
                {feature.num}
              </span>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white group-hover:text-burger-primary transition-colors duration-300 shrink-0 md:w-72">
                {feature.title}
              </h3>
              <p className="text-sm md:text-base text-white/40 font-medium leading-relaxed max-w-md">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
