import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";

import { PageHeader } from "@/components/sections/page-header";
import { CtaSection } from "@/components/sections/cta-section";
import { SectionHeading } from "@/components/sections/section-heading";
import { SolutionsAnchorNav } from "@/components/sections/solutions/anchor-nav";
import {
  SolutionDetail,
  type SolutionValueItem,
  type SolutionImpactItem,
  type SolutionInnovationItem,
} from "@/components/sections/solutions/solution-detail";
import {
  CustomSolutionDetail,
  type CustomApproachStep,
} from "@/components/sections/solutions/custom-solution-detail";
import { SOLUTIONS, SOLUTION_KEYS, type SolutionKey } from "@/lib/solutions";

/** Product keys rendered with the standard `SolutionDetail` template.
 *  Order matches `SOLUTIONS` in lib/solutions.ts (which drives section numbering).
 *  `custom` is intentionally excluded — it renders with the dark `CustomSolutionDetail`. */
const PRODUCT_KEYS = ["kereya", "passbi", "afriassess", "jokoai", "amanet"] as const satisfies readonly SolutionKey[];

/** Products that expose an "Innovation & AI" differentiator block on their detail card. */
const INNOVATION_KEYS = new Set<SolutionKey>(["afriassess", "jokoai"]);
/** Products that surface initial go-to-market countries. */
const MARKETS_KEYS = new Set<SolutionKey>(["afriassess"]);
/** Products whose Discover CTA points to an external product site (opens in a new tab). */
const EXTERNAL_HREFS: Partial<Record<SolutionKey, string>> = {
  passbi: "https://senpassbi.com",
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("SolutionsPage");
  return {
    title: t("hero.title"),
    description: t("hero.description"),
  };
}

export default async function SolutionsPage() {
  const t = await getTranslations("SolutionsPage");

  const navItems = SOLUTION_KEYS.map((key) => {
    const meta = SOLUTIONS[key];
    return {
      href: `#${key}`,
      name: t(`items.${key}.name`),
      icon: meta.icon,
      accent: meta.accent,
      accentSafe: meta.accentSafe,
    };
  });

  return (
    <>
      <PageHeader
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
      />

      {/* Overview strip — product teasers */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <SectionHeading
            eyebrow={t("overview.eyebrow")}
            title={t("overview.title")}
            description={t("overview.description")}
          />

          <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {SOLUTION_KEYS.map((key, i) => {
              const meta = SOLUTIONS[key];
              const Icon = meta.icon;
              return (
                <li key={key}>
                  <a
                    href={`#${key}`}
                    className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <div
                      aria-hidden
                      className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                      style={{ backgroundColor: meta.accent }}
                    />
                    <div className="flex items-center justify-between">
                      <span
                        className="flex size-11 items-center justify-center rounded-xl"
                        style={{ backgroundColor: `${meta.accent}14` }}
                      >
                        <Icon
                          className="size-5"
                          strokeWidth={1.75}
                          style={{ color: meta.accentSafe }}
                        />
                      </span>
                      <span
                        aria-hidden
                        className="font-mono text-xs text-muted-foreground"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <p className="font-heading text-lg font-bold tracking-tight text-foreground">
                        {t(`items.${key}.name`)}
                      </p>
                      <p className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">
                        {t(`items.${key}.tagline`)}
                      </p>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {t(`items.${key}.body`)}
                    </p>
                    <span
                      className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold"
                      style={{ color: meta.accentSafe }}
                    >
                      {t("overview.jumpTo")}
                      <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Sticky anchor nav */}
      <SolutionsAnchorNav label={t("overview.jumpTo")} items={navItems} />

      {/* Product deep dives */}
      {PRODUCT_KEYS.map((key, i) => {
        const meta = SOLUTIONS[key];
        const innovation = INNOVATION_KEYS.has(key)
          ? (t.raw(`items.${key}.innovation`) as SolutionInnovationItem[])
          : undefined;
        const markets = MARKETS_KEYS.has(key)
          ? (t.raw(`items.${key}.markets`) as string[])
          : undefined;

        return (
          <SolutionDetail
            key={key}
            id={key}
            icon={meta.icon}
            accent={meta.accent}
            accentSafe={meta.accentSafe}
            index={i}
            eyebrow={t(`items.${key}.tagline`)}
            name={t(`items.${key}.name`)}
            pitch={t(`items.${key}.pitch`)}
            status={t(`items.${key}.status`)}
            statusLabel={t("badges.status")}
            problemLabel={t("sections.problem")}
            problem={t.raw(`items.${key}.problem`) as string[]}
            valueLabel={t("sections.value")}
            value={t.raw(`items.${key}.value`) as SolutionValueItem[]}
            innovationLabel={innovation ? t("sections.innovation") : undefined}
            innovation={innovation}
            impactLabel={t("sections.impact")}
            impact={t.raw(`items.${key}.impact`) as SolutionImpactItem[]}
            stackLabel={t("sections.stack")}
            stack={t.raw(`items.${key}.stack`) as string[]}
            usersLabel={t("sections.users")}
            users={t.raw(`items.${key}.users`) as string[]}
            marketsLabel={markets ? t("sections.markets") : undefined}
            markets={markets}
            discoverCta={t(`items.${key}.discover`)}
            href={EXTERNAL_HREFS[key] ?? `/solutions/${key}`}
            media={(meta as import("@/lib/solutions").SolutionMeta).media}
          />
        );
      })}

      {/* Custom (dark variant) */}
      <CustomSolutionDetail
        id="custom"
        icon={SOLUTIONS.custom.icon}
        accent={SOLUTIONS.custom.accent}
        index={PRODUCT_KEYS.length}
        eyebrow={t("items.custom.tagline")}
        name={t("items.custom.name")}
        pitch={t("items.custom.pitch")}
        status={t("items.custom.status")}
        statusLabel={t("badges.status")}
        approachLabel={t("sections.approach")}
        approach={t.raw("items.custom.approach") as CustomApproachStep[]}
        domainsLabel={t("sections.domains")}
        domains={t.raw("items.custom.domains") as string[]}
        stackLabel={t("sections.stack")}
        stack={t.raw("items.custom.stack") as string[]}
        discoverCta={t("items.custom.discover")}
        href="/contact"
      />

      <CtaSection
        eyebrow={t("finalCta.eyebrow")}
        title={t("finalCta.title")}
        subtitle={t("finalCta.subtitle")}
        primaryLabel={t("finalCta.primary")}
        secondaryLabel={t("finalCta.secondary")}
      />
    </>
  );
}
