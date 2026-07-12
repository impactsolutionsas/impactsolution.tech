"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Layers, Rocket } from "lucide-react";

interface MissionSectionProps {
  eyebrow: string;
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
}

export function MissionSection({
  eyebrow,
  paragraph1,
  paragraph2,
  paragraph3,
}: MissionSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const stagger: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };

  return (
    <section className="relative overflow-hidden bg-muted pt-28 pb-24 sm:pt-32 sm:pb-28">
      {/* seam connector — bridges the hero/mission boundary with the brand's node motif */}
      <div
        aria-hidden
        className="absolute top-0 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
      >
        <span className="h-14 w-px bg-linear-to-b from-transparent to-secondary/60" />
        <span className="size-2.5 rounded-full bg-secondary shadow-[0_0_0_6px_rgba(0,187,211,0.15)]" />
      </div>

      {/* subtle dot-grid texture */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-60 [background-image:radial-gradient(circle,var(--border)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,black,transparent)]"
      />

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? "show" : "hidden"}
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="lg:col-span-7"
        >
          <span className="text-sm font-semibold tracking-wide text-primary uppercase">
            {eyebrow}
          </span>
          <div className="relative mt-5">
            <svg
              aria-hidden
              width="36"
              height="28"
              viewBox="0 0 40 32"
              fill="none"
              className="absolute -top-3 -left-1 text-secondary/25"
            >
              <path
                d="M0 32V19.2C0 8.6 6.4 1.6 17.6 0L19.2 4.8C11.2 6.4 8 10.4 8 16H16V32H0ZM24 32V19.2C24 8.6 30.4 1.6 41.6 0V0L40 4.8C32 6.4 28.8 10.4 28.8 16H36.8V32H24Z"
                fill="currentColor"
              />
            </svg>
            <p className="relative pl-1 text-2xl leading-snug font-semibold tracking-tight text-foreground sm:text-3xl lg:text-[2rem]">
              {paragraph1}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? "show" : "hidden"}
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="flex flex-col gap-6 border-t border-border pt-8 lg:col-span-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10"
        >
          <motion.div variants={fadeUp} className="flex gap-4">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/5 text-primary">
              <Layers className="size-4" strokeWidth={1.75} />
            </div>
            <p className="text-sm text-muted-foreground sm:text-base">
              {paragraph2}
            </p>
          </motion.div>
          <motion.div variants={fadeUp} className="flex gap-4">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/5 text-primary">
              <Rocket className="size-4" strokeWidth={1.75} />
            </div>
            <p className="text-sm text-muted-foreground sm:text-base">
              {paragraph3}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
