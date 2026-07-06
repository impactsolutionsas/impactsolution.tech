"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
  },
};

interface HeroSectionProps {
  title: ReactNode;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
}

export function HeroSection({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Desktop: full-bleed photo blending into the white background */}
      <div className="absolute inset-0 hidden lg:block">
        <Image
          src="/brand/hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[68%_center]"
        />
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/55 via-35% to-transparent to-70%" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-muted" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pt-20 pb-12 sm:px-6 lg:px-8 lg:py-32">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex max-w-xl flex-col gap-7"
        >
          <motion.span
            variants={item}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-muted px-3.5 py-1.5 text-xs font-semibold tracking-wide text-primary uppercase"
          >
            Engineering Digital Impact
          </motion.span>
          <motion.h1
            variants={item}
            className="text-4xl leading-[1.08] font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            {title}
          </motion.h1>
          <motion.p
            variants={item}
            className="max-w-md text-lg text-muted-foreground"
          >
            {subtitle}
          </motion.p>
          <motion.div variants={item} className="flex flex-wrap gap-3 pt-2">
            <Button asChild size="lg" className="h-11 px-6 text-base">
              <Link href="/solutions">
                {primaryCta}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-11 px-6 text-base"
            >
              <Link href="/contact">{secondaryCta}</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Mobile / tablet: photo as a banner below the text, no overlay needed */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="relative mt-2 h-64 sm:h-80 lg:hidden"
      >
        <Image
          src="/brand/hero.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[65%_25%]"
        />
        <div className="absolute inset-x-0 top-0 h-10 bg-linear-to-b from-background to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-b from-transparent to-muted" />
      </motion.div>
    </section>
  );
}
