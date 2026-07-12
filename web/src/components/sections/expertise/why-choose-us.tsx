"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Globe,
  Users,
  Puzzle,
  BrainCircuit,
  Repeat,
  Headphones,
  ShieldCheck,
  Award,
} from "lucide-react";

const ICONS = [Globe, Users, Puzzle, BrainCircuit, Repeat, Headphones, ShieldCheck, Award];

interface WhyChooseUsProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  items: { title: string; description: string }[];
}

export function WhyChooseUs({
  eyebrow,
  title,
  subtitle,
  items,
}: WhyChooseUsProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="border-t border-border">
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

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <motion.div
                key={item.title}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="group flex flex-col gap-3 rounded-xl border border-border bg-background p-5 transition-all duration-200 hover:border-secondary/30 hover:shadow-sm"
              >
                <div className="flex size-10 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                  <Icon className="size-5" strokeWidth={1.5} />
                </div>
                <h3 className="text-sm font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
