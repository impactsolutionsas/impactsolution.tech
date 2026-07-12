"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { Globe } from "lucide-react";

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function switchLocale(next: Locale) {
    if (next === locale) return;
    router.replace(pathname, { locale: next });
  }

  return (
    <div className="flex items-center gap-0.5 rounded-lg border border-border/50 bg-foreground/[0.03] p-0.5">
      <Globe className="mx-1.5 size-3.5 text-muted-foreground" />
      {routing.locales.map((l) => (
        <button
          key={l}
          onClick={() => switchLocale(l)}
          className={`rounded-md px-2 py-1 text-xs font-semibold uppercase transition-all duration-200 ${
            l === locale
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

export function LocaleSwitcherMobile() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function switchLocale(next: Locale) {
    if (next === locale) return;
    router.replace(pathname, { locale: next });
  }

  return (
    <div className="flex items-center gap-1 rounded-lg border border-border bg-muted/50 p-1">
      {routing.locales.map((l) => (
        <button
          key={l}
          onClick={() => switchLocale(l)}
          className={`flex-1 rounded-md px-3 py-2 text-sm font-semibold uppercase transition-all duration-200 ${
            l === locale
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {l === "fr" ? "Français" : "English"}
        </button>
      ))}
    </div>
  );
}
