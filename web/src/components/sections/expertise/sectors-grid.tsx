"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  HeartPulse,
  Bus,
  Landmark,
  Shield,
  Truck,
  Factory,
  Sprout,
  HandHeart,
  GraduationCap,
  Building2,
  Radio,
  Zap,
} from "lucide-react";

const SECTOR_ICONS = [
  HeartPulse,
  Bus,
  Landmark,
  Shield,
  Truck,
  Factory,
  Sprout,
  HandHeart,
  GraduationCap,
  Building2,
  Radio,
  Zap,
];

interface SectorsGridProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  sectors: string[];
}

export function SectorsGrid({
  eyebrow,
  title,
  subtitle,
  sectors,
}: SectorsGridProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="border-t border-border bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold tracking-wide text-primary uppercase">
            {eyebrow}
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            {subtitle}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {sectors.map((sector, i) => {
            const Icon = SECTOR_ICONS[i % SECTOR_ICONS.length];
            return (
              <motion.div
                key={sector}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-background p-5 text-center transition-all duration-200 hover:border-secondary/40 hover:shadow-md cursor-pointer"
              >
                <div className="flex size-11 items-center justify-center rounded-lg bg-primary/5 text-primary transition-colors group-hover:bg-secondary/10 group-hover:text-secondary">
                  <Icon className="size-5" strokeWidth={1.5} />
                </div>
                <span className="text-sm font-medium text-foreground">
                  {sector}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
