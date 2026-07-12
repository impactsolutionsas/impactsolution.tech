import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, Cpu, Layers, MoveDown } from "lucide-react";

import { Link } from "@/i18n/navigation";

export interface CustomApproachStep {
  step: string;
  title: string;
  body: string;
}

interface CustomSolutionDetailProps {
  id: string;
  icon: LucideIcon;
  accent: string;
  index: number;

  eyebrow: string;
  name: string;
  pitch: string;
  status: string;
  statusLabel: string;

  approachLabel: string;
  approach: CustomApproachStep[];

  domainsLabel: string;
  domains: string[];

  stackLabel: string;
  stack: string[];

  discoverCta: string;
  href: string;
}

export function CustomSolutionDetail({
  id,
  icon: Icon,
  accent,
  index,
  eyebrow,
  name,
  pitch,
  status,
  statusLabel,
  approachLabel,
  approach,
  domainsLabel,
  domains,
  stackLabel,
  stack,
  discoverCta,
  href,
}: CustomSolutionDetailProps) {
  return (
    <section
      id={id}
      className="relative scroll-mt-32 overflow-hidden border-t border-border bg-navy-deep text-white"
    >
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 size-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]"
        style={{ backgroundColor: `${accent}22` }}
      />
      {/* dot grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle,rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_60%_70%_at_50%_30%,black,transparent)]"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
        {/* Identity */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <span
                aria-hidden
                className="font-mono text-xs font-medium text-white/50"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span aria-hidden className="h-px w-8 bg-white/20" />
              <span
                className="text-xs font-semibold tracking-[0.14em] uppercase"
                style={{ color: accent }}
              >
                {eyebrow}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span
                className="flex size-16 items-center justify-center rounded-2xl ring-1 ring-white/10"
                style={{ backgroundColor: `${accent}22` }}
              >
                <Icon
                  className="size-8"
                  strokeWidth={1.75}
                  style={{ color: accent }}
                />
              </span>
              <h2 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl">
                {name}
              </h2>
            </div>

            <p className="max-w-2xl text-lg leading-relaxed text-white/70">
              {pitch}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 lg:justify-end lg:pt-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80">
              <span
                aria-hidden
                className="size-1.5 rounded-full"
                style={{ backgroundColor: accent }}
              />
              <span className="text-white/50">{statusLabel}</span>
              <span>{status}</span>
            </span>
          </div>
        </div>

        {/* Approach — vertical/horizontal stepper */}
        <div className="mt-16">
          <div className="flex items-center gap-2">
            <MoveDown
              className="size-4 text-white/60"
              strokeWidth={1.75}
            />
            <span
              className="text-xs font-semibold tracking-[0.14em] uppercase"
              style={{ color: accent }}
            >
              {approachLabel}
            </span>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {approach.map((s, i) => (
              <div
                key={s.step}
                className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm"
              >
                <div className="flex items-center justify-between">
                  <span
                    className="font-mono text-sm font-semibold"
                    style={{ color: accent }}
                  >
                    {s.step}
                  </span>
                  {i < approach.length - 1 && (
                    <span
                      aria-hidden
                      className="hidden h-px w-8 bg-white/15 lg:block"
                    />
                  )}
                </div>
                <p className="mt-4 text-sm font-semibold text-white">
                  {s.title}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-white/60">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Domains + Stack */}
        <div className="mt-20 grid gap-10 lg:grid-cols-2">
          <div>
            <div className="flex items-center gap-2">
              <Layers
                className="size-4 text-white/60"
                strokeWidth={1.75}
              />
              <span className="text-xs font-semibold tracking-[0.14em] uppercase text-white/60">
                {domainsLabel}
              </span>
            </div>
            <ul className="mt-4 flex flex-wrap gap-2">
              {domains.map((d) => (
                <li
                  key={d}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/85"
                >
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Cpu
                className="size-4 text-white/60"
                strokeWidth={1.75}
              />
              <span className="text-xs font-semibold tracking-[0.14em] uppercase text-white/60">
                {stackLabel}
              </span>
            </div>
            <ul className="mt-4 flex flex-wrap gap-2">
              {stack.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 font-mono text-xs text-white/85"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Discover CTA */}
        <div className="mt-14">
          <Link
            href={href}
            className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-navy-deep shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-deep"
          >
            {discoverCta}
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
