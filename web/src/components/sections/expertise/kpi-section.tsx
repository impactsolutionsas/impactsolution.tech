"use client";

import { motion, useReducedMotion } from "framer-motion";

interface KpiItem {
  value: string;
  label: string;
}

interface KpiSectionProps {
  eyebrow: string;
  title: string;
  kpis: KpiItem[];
}

export function KpiSection({ eyebrow, title, kpis }: KpiSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-navy-deep">
      {/* Grid pattern */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-15 [background-image:linear-gradient(rgba(0,187,211,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(0,187,211,0.4)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]"
      />
      {/* Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 size-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/10 blur-[100px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="text-center">
          <span className="text-sm font-semibold tracking-wide text-secondary uppercase">
            {eyebrow}
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {title}
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
          {kpis.map((kpi, i) => (
            <motion.div
              key={kpi.label}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col items-center text-center"
            >
              <span className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl">
                {kpi.value}
              </span>
              <span className="mt-2 text-sm text-white/60">{kpi.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
