import { ArrowRight } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

interface CtaSectionProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryLabel: string;
  secondaryLabel: string;
}

export function CtaSection({
  eyebrow,
  title,
  subtitle,
  primaryLabel,
  secondaryLabel,
}: CtaSectionProps) {
  return (
    <section className="relative overflow-hidden bg-navy-deep pt-24 pb-32 sm:pt-28 sm:pb-36">
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 size-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/15 blur-[120px]"
      />
      {/* dot-grid texture, echoes the Mission section motif */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle,rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_55%_65%_at_50%_40%,black,transparent)]"
      />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-5 px-4 text-center sm:px-6 lg:px-8">
        <span className="text-sm font-semibold tracking-wide text-secondary uppercase">
          {eyebrow}
        </span>
        <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
          {title}
        </h2>
        <p className="max-w-xl text-lg text-white/70">{subtitle}</p>
        <div className="mt-3 flex flex-wrap justify-center gap-3">
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="h-11 px-7 text-base text-navy-deep"
          >
            <Link href="/contact">
              {primaryLabel}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-11 border-white/25 bg-transparent px-7 text-base text-white hover:bg-white/10 hover:text-white"
          >
            <Link href="/contact">{secondaryLabel}</Link>
          </Button>
        </div>
      </div>

      {/* seam connector — bridges into the footer, which shares this exact background color */}
      <div
        aria-hidden
        className="absolute bottom-0 left-1/2 flex -translate-x-1/2 translate-y-1/2 flex-col items-center"
      >
        <span className="size-2.5 rounded-full bg-secondary shadow-[0_0_0_6px_rgba(0,187,211,0.2)]" />
        <span className="h-14 w-px bg-linear-to-b from-secondary/60 to-transparent" />
      </div>
    </section>
  );
}
