"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CaseStudy {
  client: string;
  sector: string;
  problem: string;
  solution: string;
  result: string;
}

interface CaseStudiesSectionProps {
  eyebrow: string;
  title: string;
  studies: CaseStudy[];
  seeMoreLabel: string;
  problemLabel: string;
  solutionLabel: string;
  resultLabel: string;
}

export function CaseStudiesSection({
  eyebrow,
  title,
  studies,
  seeMoreLabel,
  problemLabel,
  solutionLabel,
  resultLabel,
}: CaseStudiesSectionProps) {
  const [current, setCurrent] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const prev = () => setCurrent((c) => (c === 0 ? studies.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === studies.length - 1 ? 0 : c + 1));

  const study = studies[current];

  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="text-sm font-semibold tracking-wide text-primary uppercase">
              {eyebrow}
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {title}
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={prev}
              className="flex size-10 items-center justify-center rounded-full border border-border bg-background transition-colors hover:border-secondary/40 hover:bg-secondary/5 cursor-pointer"
              aria-label="Précédent"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              onClick={next}
              className="flex size-10 items-center justify-center rounded-full border border-border bg-background transition-colors hover:border-secondary/40 hover:bg-secondary/5 cursor-pointer"
              aria-label="Suivant"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
            className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2"
          >
            {/* Visual placeholder */}
            <div className="flex items-center justify-center rounded-2xl border border-border bg-muted/60 p-10 lg:min-h-[320px]">
              <div className="flex flex-col items-center gap-3 text-center">
                <span className="rounded-full bg-secondary/10 px-4 py-1.5 text-xs font-semibold text-secondary uppercase">
                  {study.sector}
                </span>
                <span className="text-2xl font-bold text-foreground">
                  {study.client}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center gap-6">
              <div>
                <h4 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  {problemLabel}
                </h4>
                <p className="mt-2 text-base text-foreground">{study.problem}</p>
              </div>
              <div>
                <h4 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  {solutionLabel}
                </h4>
                <p className="mt-2 text-base text-foreground">{study.solution}</p>
              </div>
              <div>
                <h4 className="text-xs font-semibold tracking-wider text-secondary uppercase">
                  {resultLabel}
                </h4>
                <p className="mt-2 text-lg font-semibold text-foreground">
                  {study.result}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="mt-8 flex justify-center gap-2">
          {studies.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={cn(
                "h-2 rounded-full transition-all cursor-pointer",
                i === current
                  ? "bg-secondary w-8"
                  : "bg-border w-2 hover:bg-muted-foreground/30"
              )}
              aria-label={`Étude ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
