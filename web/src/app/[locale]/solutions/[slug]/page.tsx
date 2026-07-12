import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import { SOLUTIONS, SOLUTION_KEYS, type SolutionKey } from "@/lib/solutions";
import { SolutionPageContent } from "@/components/sections/solutions/solution-page-content";

const VALID_SLUGS = ["kereya", "passbi", "afriassess", "jokoai", "amanet"] as const;
type ValidSlug = (typeof VALID_SLUGS)[number];

function isValidSlug(slug: string): slug is ValidSlug {
  return (VALID_SLUGS as readonly string[]).includes(slug);
}

export function generateStaticParams() {
  return VALID_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isValidSlug(slug)) return {};

  const t = await getTranslations("SolutionsPage");
  return {
    title: `${t(`items.${slug}.name`)} — ${t(`items.${slug}.tagline`)}`,
    description: t(`items.${slug}.pitch`),
  };
}

export default async function SolutionSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isValidSlug(slug)) notFound();

  const meta = SOLUTIONS[slug];
  const t = await getTranslations("SolutionsPage");
  const tp = await getTranslations("SolutionPage");

  const hasInnovation = slug === "afriassess" || slug === "jokoai";
  const hasMarkets = slug === "afriassess";

  const data = {
    slug: slug as SolutionKey,
    name: t(`items.${slug}.name`),
    tagline: t(`items.${slug}.tagline`),
    pitch: t(`items.${slug}.pitch`),
    status: t(`items.${slug}.status`),
    problem: t.raw(`items.${slug}.problem`) as string[],
    value: t.raw(`items.${slug}.value`) as Array<{ title: string; body: string; featured?: boolean }>,
    impact: t.raw(`items.${slug}.impact`) as Array<{ persona: string; metric: string; body: string }>,
    stack: t.raw(`items.${slug}.stack`) as string[],
    users: t.raw(`items.${slug}.users`) as string[],
    innovation: hasInnovation ? (t.raw(`items.${slug}.innovation`) as Array<{ title: string; body: string }>) : undefined,
    markets: hasMarkets ? (t.raw(`items.${slug}.markets`) as string[]) : undefined,
  };

  const keyMetric = tp.raw(`keyMetrics.${slug}`) as { value: string; label: string; context: string };

  const labels = {
    back: tp("back"),
    context: tp("context"),
    features: tp("features", { name: data.name }),
    showcase: tp("showcase"),
    impact: tp("impact"),
    stack: tp("stack"),
    users: tp("users"),
    markets: tp("markets"),
    innovation: tp("innovation"),
    ctaTitle: tp("cta.title", { name: data.name }),
    ctaSubtitle: tp("cta.subtitle"),
    ctaPrimary: tp("cta.primary"),
    ctaSecondary: tp("cta.secondary"),
  };

  return (
    <SolutionPageContent
      data={data}
      meta={meta}
      labels={labels}
      keyMetric={keyMetric}
    />
  );
}
