"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

interface ExpertiseHeroProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
}

export function ExpertiseHero({
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
}: ExpertiseHeroProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="-mt-16 lg:-mt-[calc(68px+1rem)] relative overflow-hidden bg-navy-deep">
      {/* Animated grid background */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(0,187,211,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(0,187,211,0.3)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,black,transparent)]"
      />

      {/* Ambient glow orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/4 right-1/4 size-[400px] rounded-full bg-secondary/10 blur-[100px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-1/4 left-1/4 size-[300px] rounded-full bg-primary/20 blur-[80px]"
      />

      {/* Floating tech nodes */}
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        {!shouldReduceMotion && (
          <>
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[20%] right-[15%] size-3 rounded-full bg-secondary/40"
            />
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-[60%] right-[25%] size-2 rounded-full bg-secondary/30"
            />
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute top-[40%] right-[10%] size-2.5 rounded-full bg-secondary/25"
            />
            <motion.div
              animate={{ y: [0, 14, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute bottom-[30%] left-[10%] size-2 rounded-full bg-secondary/20"
            />
          </>
        )}
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pt-32 pb-20 sm:px-6 sm:pt-40 sm:pb-28 lg:px-8 lg:pt-44 lg:pb-32">
        <motion.div
          variants={container}
          initial={shouldReduceMotion ? "show" : "hidden"}
          animate="show"
          className="flex max-w-3xl flex-col items-center gap-6 mx-auto text-center"
        >
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-secondary uppercase"
          >
            <Sparkles className="size-3.5" />
            {eyebrow}
          </motion.span>

          <motion.h1
            variants={item}
            className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            {title}
          </motion.h1>

          <motion.p
            variants={item}
            className="max-w-2xl text-lg text-white/70 sm:text-xl"
          >
            {subtitle}
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap justify-center gap-3 pt-4">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="h-12 px-7 text-base text-navy-deep"
            >
              <Link href="/solutions">
                {primaryCta}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 border-white/25 bg-transparent px-7 text-base text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/contact">{secondaryCta}</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-b from-transparent to-background"
      />
    </section>
  );
}
