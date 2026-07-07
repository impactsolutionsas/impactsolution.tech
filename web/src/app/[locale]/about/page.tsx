import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import {
  Compass,
  Eye,
  Lightbulb,
  Award,
  Target,
  ShieldCheck,
  Globe2,
  Users,
  Scale,
} from "lucide-react";

import { PageHeader } from "@/components/sections/page-header";
import { ExpertiseCard } from "@/components/sections/expertise-card";
import { CtaSection } from "@/components/sections/cta-section";

const VALUE_ICONS = {
  innovation: Lightbulb,
  excellence: Award,
  impact: Target,
  reliability: ShieldCheck,
  openness: Globe2,
  collaboration: Users,
  ethics: Scale,
} as const;

const VALUE_KEYS = Object.keys(VALUE_ICONS) as (keyof typeof VALUE_ICONS)[];

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("AboutPage");
  return {
    title: t("hero.title"),
  };
}

export default async function AboutPage() {
  const [t, tHome] = await Promise.all([
    getTranslations("AboutPage"),
    getTranslations("HomePage"),
  ]);

  return (
    <>
      <PageHeader eyebrow={t("hero.eyebrow")} title={t("hero.title")} />

      {/* History */}
      <section className="border-t border-border">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground lg:col-span-4">
            {t("history.title")}
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground lg:col-span-7 lg:col-start-6">
            {t("history.body")}
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="border-t border-border bg-muted/40">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-20 sm:px-6 md:grid-cols-2 lg:px-8">
          <div className="flex flex-col gap-4 rounded-2xl border border-border bg-background p-8">
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary/5 text-primary">
              <Compass className="size-6" strokeWidth={1.75} />
            </div>
            <h2 className="font-heading text-xl font-bold text-foreground">
              {t("mission.title")}
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              {t("mission.body")}
            </p>
          </div>
          <div className="flex flex-col gap-4 rounded-2xl border border-border bg-background p-8">
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary/5 text-primary">
              <Eye className="size-6" strokeWidth={1.75} />
            </div>
            <h2 className="font-heading text-xl font-bold text-foreground">
              {t("vision.title")}
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              {t("vision.body")}
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="text-center font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("values.title")}
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {VALUE_KEYS.map((key) => (
              <ExpertiseCard
                key={key}
                icon={VALUE_ICONS[key]}
                title={t(`values.${key}.title`)}
                description={t(`values.${key}.body`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="border-t border-border bg-muted/40">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 px-4 py-20 text-center sm:px-6 lg:px-8">
          <span className="text-sm font-semibold tracking-wide text-primary uppercase">
            {t("approach.title")}
          </span>
          <p className="text-2xl leading-snug font-semibold tracking-tight text-foreground sm:text-3xl">
            {t("approach.body")}
          </p>
        </div>
      </section>

      {/* Team */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("team.title")}
          </h2>
          <div className="mt-10 flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-muted/40 py-16 text-center">
            <p className="max-w-lg text-sm font-medium text-muted-foreground">
              {t("team.body")}
            </p>
          </div>
        </div>
      </section>

      <CtaSection
        eyebrow={tHome("cta.eyebrow")}
        title={tHome("cta.title")}
        subtitle={tHome("cta.subtitle")}
        primaryLabel={tHome("cta.button")}
        secondaryLabel={tHome("cta.secondaryButton")}
      />
    </>
  );
}
