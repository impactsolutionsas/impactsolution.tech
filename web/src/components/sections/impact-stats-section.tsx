import Image from "next/image";

import { cn } from "@/lib/utils";

interface ImpactStat {
  value: string;
  label: string;
}

interface ImpactStatsSectionProps {
  stats: [ImpactStat, ImpactStat, ImpactStat, ImpactStat];
}

function StatItem({
  stat,
  index,
}: {
  stat: ImpactStat;
  index: number;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1",
        index > 0 && "sm:border-l sm:border-border sm:pl-6 lg:pl-8"
      )}
    >
      <span className="font-heading text-3xl font-bold tracking-tight text-primary sm:text-4xl">
        {stat.value}
      </span>
      <span className="text-xs text-muted-foreground sm:text-sm">
        {stat.label}
      </span>
    </div>
  );
}

export function ImpactStatsSection({ stats }: ImpactStatsSectionProps) {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Mobile: solid stat grid, photo shown as a separate strip (avoids text-over-face legibility issues) */}
      <div className="sm:hidden">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-8 px-4 py-10">
          {stats.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} index={i % 2} />
          ))}
        </div>
        <div className="relative h-36">
          <Image
            src="/brand/kpis.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[65%_center]"
          />
        </div>
      </div>

      {/* sm+: full-bleed photo bar with stats overlaid on the light side */}
      <div className="relative hidden sm:block sm:min-h-[200px] lg:h-44">
        <Image
          src="/brand/kpis.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[78%_center]"
        />
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/85 via-45% to-transparent" />
        <div className="relative z-10 mx-auto grid h-full max-w-7xl grid-cols-4 items-center gap-x-8 px-6 lg:px-8">
          {stats.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
