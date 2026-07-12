import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Users2,
  Cpu,
} from "lucide-react";

import { Link } from "@/i18n/navigation";

export interface SolutionValueItem {
  title: string;
  body: string;
}

export interface SolutionImpactItem {
  persona: string;
  metric: string;
  body: string;
}

interface SolutionDetailProps {
  id: string;
  icon: LucideIcon;
  accent: string;
  accentSafe: string;
  index: number;

  eyebrow: string;
  name: string;
  pitch: string;
  status: string;
  statusLabel: string;

  problemLabel: string;
  problem: string[];

  valueLabel: string;
  value: SolutionValueItem[];

  impactLabel: string;
  impact: SolutionImpactItem[];

  stackLabel: string;
  stack: string[];

  usersLabel: string;
  users: string[];

  discoverCta: string;
  href: string;
}

export function SolutionDetail({
  id,
  icon: Icon,
  accent,
  accentSafe,
  index,
  eyebrow,
  name,
  pitch,
  status,
  statusLabel,
  problemLabel,
  problem,
  valueLabel,
  value,
  impactLabel,
  impact,
  stackLabel,
  stack,
  usersLabel,
  users,
  discoverCta,
  href,
}: SolutionDetailProps) {
  return (
    <section
      id={id}
      className="relative scroll-mt-32 border-t border-border"
    >
      {/* subtle accent glow anchored top-right of each section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-64 opacity-60"
        style={{
          backgroundImage: `radial-gradient(ellipse 60% 100% at 100% 0%, ${accent}18, transparent 70%)`,
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
        {/* Identity */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <span
                aria-hidden
                className="font-mono text-xs font-medium text-muted-foreground"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span
                aria-hidden
                className="h-px w-8 bg-border"
              />
              <span
                className="text-xs font-semibold tracking-[0.14em] uppercase"
                style={{ color: accentSafe }}
              >
                {eyebrow}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span
                className="flex size-16 items-center justify-center rounded-2xl shadow-sm ring-1 ring-border"
                style={{ backgroundColor: `${accent}14` }}
              >
                <Icon
                  className="size-8"
                  strokeWidth={1.75}
                  style={{ color: accentSafe }}
                />
              </span>
              <h2 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                {name}
              </h2>
            </div>

            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {pitch}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 lg:justify-end lg:pt-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground/70">
              <span
                aria-hidden
                className="size-1.5 rounded-full"
                style={{ backgroundColor: accent }}
              />
              <span className="text-muted-foreground">{statusLabel}</span>
              <span className="text-foreground">{status}</span>
            </span>
          </div>
        </div>

        {/* Problem + Value grid */}
        <div className="mt-16 grid gap-6 lg:grid-cols-12">
          {/* Problem */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2">
              <AlertTriangle
                className="size-4 text-muted-foreground"
                strokeWidth={1.75}
              />
              <span className="text-xs font-semibold tracking-[0.14em] uppercase text-muted-foreground">
                {problemLabel}
              </span>
            </div>
            <ul className="mt-5 space-y-4">
              {problem.map((item, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-[0.95rem] leading-relaxed text-foreground/80"
                >
                  <span
                    aria-hidden
                    className="mt-2 size-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: accent }}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Value */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2">
              <CheckCircle2
                className="size-4"
                strokeWidth={1.75}
                style={{ color: accentSafe }}
              />
              <span
                className="text-xs font-semibold tracking-[0.14em] uppercase"
                style={{ color: accentSafe }}
              >
                {valueLabel}
              </span>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {value.map((v, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-background p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                    style={{ backgroundColor: accent }}
                  />
                  <p className="text-sm font-semibold text-foreground">
                    {v.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {v.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Impact */}
        <div className="mt-20">
          <div className="flex items-center gap-2">
            <Sparkles
              className="size-4"
              strokeWidth={1.75}
              style={{ color: accentSafe }}
            />
            <span
              className="text-xs font-semibold tracking-[0.14em] uppercase"
              style={{ color: accentSafe }}
            >
              {impactLabel}
            </span>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {impact.map((imp, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-2xl border border-border bg-muted/40 p-6"
              >
                <div
                  aria-hidden
                  className="absolute -top-8 -right-8 size-24 rounded-full blur-xl"
                  style={{ backgroundColor: `${accent}26` }}
                />
                <p className="relative text-[0.7rem] font-semibold tracking-[0.14em] uppercase text-muted-foreground">
                  {imp.persona}
                </p>
                <p
                  className="relative mt-3 font-heading text-2xl leading-tight font-bold tracking-tight sm:text-[1.75rem]"
                  style={{ color: accentSafe }}
                >
                  {imp.metric}
                </p>
                <p className="relative mt-3 text-sm leading-relaxed text-foreground/75">
                  {imp.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stack + Users */}
        <div className="mt-20 grid gap-10 lg:grid-cols-2">
          <div>
            <div className="flex items-center gap-2">
              <Cpu
                className="size-4 text-muted-foreground"
                strokeWidth={1.75}
              />
              <span className="text-xs font-semibold tracking-[0.14em] uppercase text-muted-foreground">
                {stackLabel}
              </span>
            </div>
            <ul className="mt-4 flex flex-wrap gap-2">
              {stack.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-border bg-background px-3 py-1.5 font-mono text-xs text-foreground/80"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Users2
                className="size-4 text-muted-foreground"
                strokeWidth={1.75}
              />
              <span className="text-xs font-semibold tracking-[0.14em] uppercase text-muted-foreground">
                {usersLabel}
              </span>
            </div>
            <ul className="mt-4 flex flex-wrap gap-2">
              {users.map((u) => (
                <li
                  key={u}
                  className="rounded-full bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary"
                >
                  {u}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Discover CTA */}
        <div className="mt-14">
          <Link
            href={href}
            className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            style={{
              backgroundColor: accentSafe,
            }}
          >
            {discoverCta}
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
