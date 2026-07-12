"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  Lightbulb,
  Award,
  Target,
  ShieldCheck,
  Globe2,
  Users,
  Scale,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const VALUE_ICONS: Record<string, LucideIcon> = {
  innovation: Lightbulb,
  excellence: Award,
  impact: Target,
  reliability: ShieldCheck,
  openness: Globe2,
  collaboration: Users,
  ethics: Scale,
};

interface Value {
  key: string;
  title: string;
  description: string;
}

interface AboutValuesProps {
  title: string;
  subtitle: string;
  values: Value[];
}

export function AboutValues({ title, subtitle, values }: AboutValuesProps) {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const stagger: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07 } },
  };

  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? "show" : "hidden"}
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="flex flex-col items-center text-center"
        >
          <motion.h2
            variants={fadeUp}
            className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            {title}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-2xl text-lg text-muted-foreground"
          >
            {subtitle}
          </motion.p>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? "show" : "hidden"}
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {values.map((value) => {
            const Icon = VALUE_ICONS[value.key] ?? Target;
            return (
              <motion.div
                key={value.title}
                variants={fadeUp}
                className="group relative flex cursor-pointer flex-col gap-4 rounded-2xl border border-border bg-background p-6 transition-all duration-300 hover:border-primary/30 hover:bg-muted/50 hover:shadow-md"
              >
                <div className="flex size-11 items-center justify-center rounded-xl bg-primary/5 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-5" strokeWidth={1.75} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-base font-semibold text-foreground">
                    {value.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
