"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Compass,
  BarChart3,
  Boxes,
  Palette,
  Code2,
  TestTube,
  Rocket,
  Headphones,
} from "lucide-react";

const METHOD_STEPS = [
  { icon: Compass, key: "discovery" },
  { icon: BarChart3, key: "analysis" },
  { icon: Boxes, key: "architecture" },
  { icon: Palette, key: "uxui" },
  { icon: Code2, key: "development" },
  { icon: TestTube, key: "qa" },
  { icon: Rocket, key: "deployment" },
  { icon: Headphones, key: "support" },
] as const;

interface MethodologyTimelineProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  steps: { title: string; description: string }[];
}

export function MethodologyTimeline({
  eyebrow,
  title,
  subtitle,
  steps,
}: MethodologyTimelineProps) {
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

        <div className="relative mt-16">
          {/* Vertical connector for mobile */}
          <div
            aria-hidden
            className="absolute top-0 bottom-0 left-6 w-px bg-border sm:hidden"
          />
          {/* Horizontal connector for desktop */}
          <div
            aria-hidden
            className="absolute top-7 right-0 left-0 hidden h-px bg-border sm:block"
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8">
            {METHOD_STEPS.map((step, i) => {
              const Icon = step.icon;
              const data = steps[i];
              if (!data) return null;

              return (
                <motion.div
                  key={step.key}
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="group relative flex flex-col items-center text-center sm:items-center"
                >
                  <div className="relative z-10 flex size-14 items-center justify-center rounded-2xl border border-border bg-background shadow-sm transition-all duration-200 group-hover:border-secondary group-hover:shadow-md group-hover:shadow-secondary/10">
                    <Icon
                      className="size-6 text-muted-foreground transition-colors group-hover:text-secondary"
                      strokeWidth={1.5}
                    />
                  </div>
                  <span className="mt-2 inline-flex size-5 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                    {i + 1}
                  </span>
                  <h3 className="mt-2 text-sm font-semibold text-foreground">
                    {data.title}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    {data.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
