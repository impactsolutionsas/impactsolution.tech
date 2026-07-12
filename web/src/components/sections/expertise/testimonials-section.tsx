"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

interface Testimonial {
  name: string;
  company: string;
  quote: string;
}

interface TestimonialsSectionProps {
  eyebrow: string;
  title: string;
  testimonials: Testimonial[];
}

export function TestimonialsSection({
  eyebrow,
  title,
  testimonials,
}: TestimonialsSectionProps) {
  const [current, setCurrent] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
    <section className="border-t border-border bg-muted/40">
      <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="text-center">
          <span className="text-sm font-semibold tracking-wide text-primary uppercase">
            {eyebrow}
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h2>
        </div>

        <div className="relative mt-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center text-center"
            >
              <Quote className="size-10 text-secondary/30" />
              <blockquote className="mt-6 text-lg font-medium text-foreground leading-relaxed sm:text-xl lg:text-2xl">
                &ldquo;{testimonials[current].quote}&rdquo;
              </blockquote>
              <div className="mt-6">
                <p className="text-base font-semibold text-foreground">
                  {testimonials[current].name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {testimonials[current].company}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className="flex size-10 items-center justify-center rounded-full border border-border bg-background transition-colors hover:border-secondary/40 hover:bg-secondary/5 cursor-pointer"
              aria-label="Précédent"
            >
              <ChevronLeft className="size-4" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={cn(
                    "size-2 rounded-full transition-all cursor-pointer",
                    i === current
                      ? "bg-secondary w-6"
                      : "bg-border hover:bg-muted-foreground/30"
                  )}
                  aria-label={`Témoignage ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="flex size-10 items-center justify-center rounded-full border border-border bg-background transition-colors hover:border-secondary/40 hover:bg-secondary/5 cursor-pointer"
              aria-label="Suivant"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

