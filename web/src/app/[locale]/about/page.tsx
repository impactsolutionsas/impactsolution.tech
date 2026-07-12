import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/sections/page-header";
import { CtaSection } from "@/components/sections/cta-section";
import { AboutStory } from "@/components/sections/about/about-story";
import { AboutMissionVision } from "@/components/sections/about/about-mission-vision";
import { AboutStats } from "@/components/sections/about/about-stats";
import { AboutValues } from "@/components/sections/about/about-values";
import { AboutApproach } from "@/components/sections/about/about-approach";
import { AboutTeam } from "@/components/sections/about/about-team";

const VALUE_KEYS = [
  "innovation",
  "excellence",
  "impact",
  "reliability",
  "openness",
  "collaboration",
  "ethics",
] as const;

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
      <PageHeader
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
      />

      <AboutStory
        eyebrow={t("history.eyebrow")}
        title={t("history.title")}
        paragraph1={t("history.paragraph1")}
        paragraph2={t("history.paragraph2")}
        paragraph3={t("history.paragraph3")}
      />

      <AboutMissionVision
        missionTitle={t("mission.title")}
        missionBody={t("mission.body")}
        visionTitle={t("vision.title")}
        visionBody={t("vision.body")}
      />

      <AboutStats
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

      <AboutValues
        title={t("values.title")}
        subtitle={t("values.subtitle")}
        values={VALUE_KEYS.map((key) => ({
          key,
          title: t(`values.${key}.title`),
          description: t(`values.${key}.body`),
        }))}
      />

      <AboutApproach
        eyebrow={t("approach.eyebrow")}
        title={t("approach.title")}
        subtitle={t("approach.subtitle")}
        steps={[
          {
            number: t("approach.steps.s1.number"),
            title: t("approach.steps.s1.title"),
            body: t("approach.steps.s1.body"),
          },
          {
            number: t("approach.steps.s2.number"),
            title: t("approach.steps.s2.title"),
            body: t("approach.steps.s2.body"),
          },
          {
            number: t("approach.steps.s3.number"),
            title: t("approach.steps.s3.title"),
            body: t("approach.steps.s3.body"),
          },
          {
            number: t("approach.steps.s4.number"),
            title: t("approach.steps.s4.title"),
            body: t("approach.steps.s4.body"),
          },
          {
            number: t("approach.steps.s5.number"),
            title: t("approach.steps.s5.title"),
            body: t("approach.steps.s5.body"),
          },
        ]}
      />

      <AboutTeam
        subtitle={t("team.eyebrow")}
        title={t("team.title")}
        body={t("team.body")}
        cta={t("team.cta")}
      />

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
