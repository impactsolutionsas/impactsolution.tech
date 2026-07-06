import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** "dark" is for use on navy/dark backgrounds (e.g. footer, CTA banner) where cyan text has sufficient contrast. */
  tone?: "light" | "dark";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex max-w-2xl flex-col gap-3",
        align === "center" && "mx-auto items-center text-center",
        className
      )}
    >
      <span
        className={cn(
          "text-sm font-semibold tracking-wide uppercase",
          tone === "light" ? "text-primary" : "text-secondary"
        )}
      >
        {eyebrow}
      </span>
      <h2
        className={cn(
          "text-3xl font-semibold tracking-tight sm:text-4xl",
          tone === "light" ? "text-foreground" : "text-white"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-base sm:text-lg",
            tone === "light" ? "text-muted-foreground" : "text-white/70"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
