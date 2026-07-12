import type { LucideIcon } from "lucide-react";
import { ArrowDown } from "lucide-react";

interface AnchorNavItem {
  href: string;
  name: string;
  icon: LucideIcon;
  accent: string;
  accentSafe: string;
}

interface SolutionsAnchorNavProps {
  label: string;
  items: AnchorNavItem[];
}

export function SolutionsAnchorNav({ label, items }: SolutionsAnchorNavProps) {
  return (
    <div className="sticky top-16 z-30 border-y border-border bg-background/85 backdrop-blur-md supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex max-w-7xl items-center gap-3 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
        <span className="hidden shrink-0 items-center gap-1.5 text-xs font-semibold tracking-[0.14em] uppercase text-muted-foreground sm:inline-flex">
          <ArrowDown className="size-3.5" strokeWidth={2} />
          {label}
        </span>
        <span
          aria-hidden
          className="hidden h-4 w-px shrink-0 bg-border sm:block"
        />
        <ul className="flex shrink-0 items-center gap-1.5">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="group inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground/75 transition-all duration-200 hover:-translate-y-0.5 hover:border-transparent hover:text-foreground hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  style={
                    {
                      ["--anchor-accent" as string]: item.accent,
                    } as React.CSSProperties
                  }
                >
                  <span
                    aria-hidden
                    className="flex size-5 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${item.accent}1F` }}
                  >
                    <Icon
                      className="size-3"
                      strokeWidth={2}
                      style={{ color: item.accentSafe }}
                    />
                  </span>
                  {item.name}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
