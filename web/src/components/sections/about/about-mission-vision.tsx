"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Compass, Eye } from "lucide-react";

interface AboutMissionVisionProps {
  missionTitle: string;
  missionBody: string;
  visionTitle: string;
  visionBody: string;
}

export function AboutMissionVision({
  missionTitle,
  missionBody,
  visionTitle,
  visionBody,
}: AboutMissionVisionProps) {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const stagger: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
  };

  return (
    <section className="relative overflow-hidden border-t border-border bg-muted/40">
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 right-0 size-[400px] -translate-y-1/2 translate-x-1/3 rounded-full bg-secondary/5 blur-[100px]"
      />

      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? "show" : "hidden"}
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          <motion.div
            variants={fadeUp}
            className="group relative flex flex-col gap-5 rounded-2xl border border-border bg-background p-8 transition-all duration-300 hover:border-secondary/40 hover:shadow-lg hover:shadow-secondary/5 sm:p-10"
          >
            <div className="absolute top-0 left-0 h-full w-1 rounded-l-2xl bg-secondary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="flex size-14 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
              <Compass className="size-7" strokeWidth={1.5} />
            </div>
            <h2 className="font-heading text-2xl font-bold text-foreground">
              {missionTitle}
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              {missionBody}
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="group relative flex flex-col gap-5 rounded-2xl border border-border bg-background p-8 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 sm:p-10"
          >
            <div className="absolute top-0 left-0 h-full w-1 rounded-l-2xl bg-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="flex size-14 items-center justify-center rounded-xl bg-primary/5 text-primary">
              <Eye className="size-7" strokeWidth={1.5} />
            </div>
            <h2 className="font-heading text-2xl font-bold text-foreground">
              {visionTitle}
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              {visionBody}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
