import type { LucideIcon } from "lucide-react";

interface ExpertiseCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function ExpertiseCard({
  icon: Icon,
  title,
  description,
}: ExpertiseCardProps) {
  return (
    <div className="group relative flex flex-col gap-4 rounded-2xl border border-border bg-background p-6 transition-colors hover:border-primary/30 hover:bg-muted/50">
      <div className="flex size-11 items-center justify-center rounded-xl bg-primary/5 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon className="size-5" strokeWidth={1.75} />
      </div>
      <div className="flex flex-col gap-1.5">
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
