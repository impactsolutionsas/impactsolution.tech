"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BrainCircuit,
  Code2,
  Smartphone,
  Cloud,
  ShieldCheck,
  BarChart3,
  HeartPulse,
  Truck,
  Coins,
  Sprout,
  Landmark,
  RefreshCw,
} from "lucide-react";
import { Link } from "@/i18n/navigation";

const DOMAIN_ICONS: Record<string, typeof BrainCircuit> = {
  ai: BrainCircuit,
  web: Code2,
  mobile: Smartphone,
  cloud: Cloud,
  cybersecurity: ShieldCheck,
  data: BarChart3,
  ehealth: HeartPulse,
  logistics: Truck,
  fintech: Coins,
  agritech: Sprout,
  govtech: Landmark,
  transformation: RefreshCw,
};

export interface DomainData {
  key: string;
  title: string;
  description: string;
  technologies: string[];
  sectors: string[];
}

interface DomainGridProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  domains: DomainData[];
  discoverLabel: string;
}

export function DomainGrid({
  eyebrow,
  title,
  subtitle,
  domains,
  discoverLabel,
}: DomainGridProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="border-t border-border">
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

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {domains.map((domain, i) => {
            const Icon = DOMAIN_ICONS[domain.key] || BrainCircuit;
            return (
              <motion.div
                key={domain.key}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group relative flex flex-col rounded-2xl border border-border bg-background p-6 transition-all duration-300 hover:border-secondary/40 hover:shadow-lg hover:shadow-secondary/5 cursor-pointer"
              >
                {/* Icon */}
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/5 text-primary transition-all duration-300 group-hover:bg-secondary/10 group-hover:text-secondary">
                  <Icon className="size-6" strokeWidth={1.5} />
                </div>

                {/* Title & Description */}
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  {domain.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">
                  {domain.description}
                </p>

                {/* Technologies */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {domain.technologies.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                  {domain.technologies.length > 5 && (
                    <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                      +{domain.technologies.length - 5}
                    </span>
                  )}
                </div>

                {/* Sectors */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {domain.sectors.slice(0, 3).map((sector) => (
                    <span
                      key={sector}
                      className="rounded-md border border-border px-2 py-0.5 text-xs text-muted-foreground"
                    >
                      {sector}
                    </span>
                  ))}
                </div>

                {/* Discover link */}
                <div className="mt-5 flex items-center gap-1.5 text-sm font-medium text-primary transition-colors group-hover:text-secondary">
                  <span>{discoverLabel}</span>
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
