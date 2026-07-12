"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Search,
  MessageSquare,
  PenTool,
  Code2,
  Rocket,
  GraduationCap,
  Wrench,
} from "lucide-react";

const STEPS = [
  { icon: Search, key: "understand" },
  { icon: MessageSquare, key: "advise" },
  { icon: PenTool, key: "design" },
  { icon: Code2, key: "develop" },
  { icon: Rocket, key: "deploy" },
  { icon: GraduationCap, key: "train" },
  { icon: Wrench, key: "maintain" },
] as const;

interface ApproachTimelineProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  steps: { title: string; description: string }[];
}

export function ApproachTimeline({
  eyebrow,
  title,
  subtitle,
  steps,
}: ApproachTimelineProps) {
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
          {/* Connector line */}
          <div
            aria-hidden
            className="absolute top-6 right-0 left-0 hidden h-px bg-border lg:block"
          />

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-7">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              const data = steps[i];
              if (!data) return null;

              return (
                <motion.div
                  key={step.key}
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group relative flex flex-col items-center text-center"
                >
                  <div className="relative z-10 flex size-12 items-center justify-center rounded-xl border border-border bg-background shadow-sm transition-all duration-200 group-hover:border-secondary group-hover:shadow-md">
                    <Icon
                      className="size-5 text-muted-foreground transition-colors group-hover:text-secondary"
                      strokeWidth={1.75}
                    />
                  </div>
                  <span className="mt-2 text-xs font-medium text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 text-sm font-semibold text-foreground">
                    {data.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
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
