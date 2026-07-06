import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";

import { Link } from "@/i18n/navigation";

interface SolutionCardProps {
  icon: LucideIcon;
  name: string;
  tagline: string;
  description: string;
  href: string;
  cta: string;
  /** Bright brand accent — decorative use only (tints, underline, ghost icon). Never as text color (fails WCAG on white). */
  accent: string;
  /** Darkened variant of `accent` — safe for the icon glyph (>=4.5:1 on white). */
  accentSafe: string;
}

export function SolutionCard({
  icon: Icon,
  name,
  tagline,
  description,
  href,
  cta,
  accent,
  accentSafe,
}: SolutionCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-background transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div
        aria-hidden
        className="relative h-40 overflow-hidden sm:h-44"
        style={{
          background: `linear-gradient(135deg, ${accent}26, ${accent}08)`,
        }}
      >
        <Icon
          className="absolute -right-5 -bottom-8 size-36 rotate-[-8deg]"
          style={{ color: accent, opacity: 0.35 }}
          strokeWidth={1}
        />
      </div>

      <div className="relative -mt-7 flex flex-1 flex-col gap-3 px-6 pb-6">
        <div className="flex size-14 items-center justify-center rounded-2xl bg-background shadow-md ring-1 ring-border">
          <Icon
            className="size-6"
            style={{ color: accentSafe }}
            strokeWidth={1.75}
          />
        </div>

        <span
          className="text-xs font-semibold tracking-wide uppercase"
          style={{ color: accentSafe }}
        >
          {tagline}
        </span>
        <h3 className="font-heading text-xl font-bold tracking-tight text-foreground">
          {name}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>

        <div className="mt-auto flex items-center justify-between pt-4">
          <span
            aria-hidden
            className="h-1 w-9 rounded-full transition-all duration-300 group-hover:w-14"
            style={{ backgroundColor: accent }}
          />
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground">
            {cta}
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
