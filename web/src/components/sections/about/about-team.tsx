"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Users, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

interface AboutTeamProps {
  title: string;
  subtitle: string;
  body: string;
  cta: string;
}

export function AboutTeam({ title, subtitle, body, cta }: AboutTeamProps) {
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
    show: { transition: { staggerChildren: 0.12 } },
  };

  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? "show" : "hidden"}
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2"
        >
          <motion.div variants={fadeUp} className="flex flex-col gap-5">
            <span className="text-sm font-semibold tracking-wide text-accent-text uppercase">
              {subtitle}
            </span>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {title}
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              {body}
            </p>
            <div className="pt-2">
              <Button asChild variant="outline" className="cursor-pointer">
                <Link href="/contact">
                  {cta}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="relative flex items-center justify-center"
          >
            <div className="relative flex h-72 w-full items-center justify-center overflow-hidden rounded-2xl border border-dashed border-border bg-muted/50 lg:h-80">
              {/* Decorative pattern */}
              <div
                aria-hidden
                className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle,var(--border)_1px,transparent_1px)] [background-size:20px_20px]"
              />
              <div className="relative flex flex-col items-center gap-4 text-center">
                <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/5 text-primary">
                  <Users className="size-8" strokeWidth={1.5} />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-foreground">
                    25+ experts
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Engineering, Data, IA, UX
                  </span>
                </div>
                {/* Floating avatars placeholder */}
                <div className="flex -space-x-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex size-9 items-center justify-center rounded-full border-2 border-background bg-primary/10 text-xs font-medium text-primary"
                      style={{ zIndex: 5 - i }}
                    >
                      {["DS", "AM", "FK", "OD", "MB"][i]}
                    </div>
                  ))}
                  <div className="flex size-9 items-center justify-center rounded-full border-2 border-background bg-secondary/20 text-xs font-medium text-secondary">
                    +20
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
