"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

interface AboutStoryProps {
  eyebrow: string;
  title: string;
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
}

export function AboutStory({
  eyebrow,
  title,
  paragraph1,
  paragraph2,
  paragraph3,
}: AboutStoryProps) {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const stagger: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
  };

  return (
    <section className="relative overflow-hidden border-t border-border">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-50 [background-image:radial-gradient(circle,var(--border)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]"
      />

      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? "show" : "hidden"}
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16"
        >
          <motion.div variants={fadeUp} className="lg:col-span-5">
            <span className="text-sm font-semibold tracking-wide text-accent-text uppercase">
              {eyebrow}
            </span>
            <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {title}
            </h2>
            <div className="mt-6 h-1 w-16 rounded-full bg-secondary" />
          </motion.div>

          <motion.div
            variants={stagger}
            className="flex flex-col gap-6 lg:col-span-7"
          >
            <motion.p
              variants={fadeUp}
              className="text-lg leading-relaxed text-foreground/90"
            >
              {paragraph1}
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="text-base leading-relaxed text-muted-foreground"
            >
              {paragraph2}
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="text-base leading-relaxed text-muted-foreground"
            >
              {paragraph3}
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
