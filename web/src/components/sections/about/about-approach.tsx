"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  MessageSquareText,
  PenTool,
  Code2,
  Rocket,
  BarChart3,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Step {
  number: string;
  title: string;
  body: string;
}

interface AboutApproachProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  steps: Step[];
}

const STEP_ICONS: LucideIcon[] = [
  MessageSquareText,
  PenTool,
  Code2,
  Rocket,
  BarChart3,
];

export function AboutApproach({
  eyebrow,
  title,
  subtitle,
  steps,
}: AboutApproachProps) {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const stagger: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };

  return (
    <section className="relative overflow-hidden border-t border-border bg-muted/40">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-50 [background-image:radial-gradient(circle,var(--border)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_50%_60%_at_50%_60%,black,transparent)]"
      />

      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? "show" : "hidden"}
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="flex flex-col items-center text-center"
        >
          <motion.span
            variants={fadeUp}
            className="text-sm font-semibold tracking-wide text-accent-text uppercase"
          >
            {eyebrow}
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-4 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
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
          className="relative mt-16"
        >
          {/* Vertical line connecting steps (desktop only) */}
          <div
            aria-hidden
            className="absolute top-0 bottom-0 left-6 hidden w-px bg-border lg:left-1/2 lg:block"
          />

          <div className="flex flex-col gap-10 lg:gap-0">
            {steps.map((step, i) => {
              const Icon = STEP_ICONS[i] ?? Code2;
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={step.number}
                  variants={fadeUp}
                  className={`relative flex flex-col gap-4 lg:flex-row lg:items-start ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Content card */}
                  <div
                    className={`flex-1 rounded-2xl border border-border bg-background p-6 transition-colors duration-300 hover:border-primary/20 ${
                      isEven ? "lg:mr-12 lg:text-right" : "lg:ml-12 lg:text-left"
                    }`}
                  >
                    <span className="inline-block font-heading text-xs font-bold tracking-widest text-secondary uppercase">
                      {step.number}
                    </span>
                    <h3 className="mt-2 font-heading text-lg font-bold text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {step.body}
                    </p>
                  </div>

                  {/* Node on timeline (desktop) */}
                  <div
                    aria-hidden
                    className="absolute top-6 left-1/2 z-10 hidden -translate-x-1/2 lg:flex"
                  >
                    <div className="flex size-10 items-center justify-center rounded-full border-2 border-secondary bg-background text-secondary shadow-sm">
                      <Icon className="size-4" strokeWidth={2} />
                    </div>
                  </div>

                  {/* Spacer for the other side */}
                  <div className="hidden flex-1 lg:block" />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
