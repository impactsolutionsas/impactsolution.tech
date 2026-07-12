"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

interface Stat {
  value: string;
  label: string;
}

interface AboutStatsProps {
  stats: Stat[];
}

export function AboutStats({ stats }: AboutStatsProps) {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const stagger: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };

  return (
    <section className="relative overflow-hidden border-t border-border bg-navy-deep">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 size-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/10 blur-[120px]"
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle,rgba(255,255,255,0.2)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]"
      />

      <motion.div
        initial={shouldReduceMotion ? "show" : "hidden"}
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={stagger}
        className="relative mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-16 sm:px-6 md:grid-cols-4 lg:px-8"
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={fadeUp}
            className="flex flex-col items-center gap-2 text-center"
          >
            <span className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {stat.value}
            </span>
            <span className="text-sm text-white/60">{stat.label}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
