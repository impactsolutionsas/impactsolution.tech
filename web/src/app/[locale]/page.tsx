import { getTranslations } from "next-intl/server";
import {
  RefreshCw,
  Code2,
  Cloud,
  Smartphone,
  Map,
  Database,
  BrainCircuit,
  Network,
  ArrowRight,
  HeartPulse,
  Bus,
  Leaf,
  Blocks,
} from "lucide-react";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/sections/hero-section";
import { MissionSection } from "@/components/sections/mission-section";
import { ImpactStatsSection } from "@/components/sections/impact-stats-section";
import { SectionHeading } from "@/components/sections/section-heading";
import { ExpertiseCard } from "@/components/sections/expertise-card";
import { SolutionCard } from "@/components/sections/solution-card";
import { CtaSection } from "@/components/sections/cta-section";

const EXPERTISE_ICONS = {
  digitalTransformation: RefreshCw,
  softwareDevelopment: Code2,
  cloudArchitecture: Cloud,
  mobileApps: Smartphone,
  gis: Map,
  dataEngineering: Database,
  ai: BrainCircuit,
  interoperability: Network,
} as const;

const SOLUTIONS = {
  kereya: { icon: HeartPulse, accent: "#00BBD3", accentSafe: "#00829A" },
  passbi: { icon: Bus, accent: "#3DDC97", accentSafe: "#00884A" },
  afriassess: { icon: Leaf, accent: "#F5A623", accentSafe: "#AC6100" },
  custom: { icon: Blocks, accent: "#8B93FF", accentSafe: "#666BD2" },
} as const;

export default async function HomePage() {
  const [tHome, tExp, tSol] = await Promise.all([
    getTranslations("HomePage"),
    getTranslations("ExpertisesPage"),
    getTranslations("SolutionsPage"),
  ]);

  const expertiseKeys = Object.keys(
    EXPERTISE_ICONS
  ) as (keyof typeof EXPERTISE_ICONS)[];
  const solutionKeys = Object.keys(SOLUTIONS) as (keyof typeof SOLUTIONS)[];

  return (
    <>
      <HeroSection
        title={tHome.rich("hero.title", {
          accent: (chunks) => (
            <span className="text-accent-text">{chunks}</span>
          ),
        })}
        subtitle={tHome("hero.subtitle")}
        primaryCta={tHome("hero.primaryCta")}
        secondaryCta={tHome("hero.secondaryCta")}
      />

      <MissionSection
        eyebrow={tHome("mission.eyebrow")}
        paragraph1={tHome("mission.paragraph1")}
        paragraph2={tHome("mission.paragraph2")}
        paragraph3={tHome("mission.paragraph3")}
      />

      <ImpactStatsSection
        stats={[
          {
            value: tHome("impactSection.stat1Value"),
            label: tHome("impactSection.stat1Label"),
          },
          {
            value: tHome("impactSection.stat2Value"),
            label: tHome("impactSection.stat2Label"),
          },
          {
            value: tHome("impactSection.stat3Value"),
            label: tHome("impactSection.stat3Label"),
          },
          {
            value: tHome("impactSection.stat4Value"),
            label: tHome("impactSection.stat4Label"),
          },
        ]}
      />

      {/* Expertise */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow={tHome("expertiseSection.eyebrow")}
              title={tHome("expertiseSection.title")}
            />
            <Button asChild variant="ghost" className="shrink-0">
              <Link href="/expertise">
                {tHome("expertiseSection.viewAll")}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {expertiseKeys.map((key) => (
              <ExpertiseCard
                key={key}
                icon={EXPERTISE_ICONS[key]}
                title={tExp(`items.${key}.title`)}
                description={tExp(`items.${key}.body`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="border-t border-border bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading
            align="center"
            eyebrow={tHome("solutionsSection.eyebrow")}
            title={tHome("solutionsSection.title")}
            description={tHome("solutionsSection.description")}
          />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {solutionKeys.map((key) => (
              <SolutionCard
                key={key}
                icon={SOLUTIONS[key].icon}
                name={tSol(`items.${key}.name`)}
                tagline={tSol(`items.${key}.tagline`)}
                description={tSol(`items.${key}.body`)}
                href={`/solutions/${key}`}
                cta={tSol("cta")}
                accent={SOLUTIONS[key].accent}
                accentSafe={SOLUTIONS[key].accentSafe}
              />
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Button asChild variant="outline">
              <Link href="/solutions">
                {tHome("solutionsSection.viewAll")}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* News */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={tHome("newsSection.eyebrow")}
            title={tHome("newsSection.title")}
          />
          <div className="mt-12 flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-muted/40 py-16 text-center">
            <p className="text-sm font-medium text-muted-foreground">
              {tHome("newsSection.comingSoon")}
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
