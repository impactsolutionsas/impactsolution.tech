import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { ExpertiseHero } from "@/components/sections/expertise/expertise-hero";
import { ApproachTimeline } from "@/components/sections/expertise/approach-timeline";
import { DomainGrid, type DomainData } from "@/components/sections/expertise/domain-grid";
import { SectorsGrid } from "@/components/sections/expertise/sectors-grid";
import { TechWall } from "@/components/sections/expertise/tech-wall";
import { MethodologyTimeline } from "@/components/sections/expertise/methodology-timeline";
import { WhyChooseUs } from "@/components/sections/expertise/why-choose-us";
import { CaseStudiesSection } from "@/components/sections/expertise/case-studies-section";
import { KpiSection } from "@/components/sections/expertise/kpi-section";
import { TestimonialsSection } from "@/components/sections/expertise/testimonials-section";
import { FaqSection } from "@/components/sections/expertise/faq-section";
import { CtaSection } from "@/components/sections/cta-section";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("ExpertisePage");
  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function ExpertisePage() {
  const t = await getTranslations("ExpertisePage");

  const domains: DomainData[] = [
    {
      key: "ai",
      title: t("domains.ai.title"),
      description: t("domains.ai.description"),
      technologies: ["IA Générative", "Agents IA", "NLP", "Vision", "ML", "LangChain", "CrewAI"],
      sectors: [t("domains.ai.sector1"), t("domains.ai.sector2"), t("domains.ai.sector3")],
    },
    {
      key: "web",
      title: t("domains.web.title"),
      description: t("domains.web.description"),
      technologies: ["React", "Next.js", "NestJS", "Go", "PostgreSQL", "SaaS"],
      sectors: [t("domains.web.sector1"), t("domains.web.sector2"), t("domains.web.sector3")],
    },
    {
      key: "mobile",
      title: t("domains.mobile.title"),
      description: t("domains.mobile.description"),
      technologies: ["Flutter", "React Native", "iOS", "Android", "PWA", "Offline"],
      sectors: [t("domains.mobile.sector1"), t("domains.mobile.sector2"), t("domains.mobile.sector3")],
    },
    {
      key: "cloud",
      title: t("domains.cloud.title"),
      description: t("domains.cloud.description"),
      technologies: ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "CI/CD"],
      sectors: [t("domains.cloud.sector1"), t("domains.cloud.sector2"), t("domains.cloud.sector3")],
    },
    {
      key: "cybersecurity",
      title: t("domains.cybersecurity.title"),
      description: t("domains.cybersecurity.description"),
      technologies: ["Pentest", "IAM", "SIEM", "Zero Trust", "Conformité"],
      sectors: [t("domains.cybersecurity.sector1"), t("domains.cybersecurity.sector2"), t("domains.cybersecurity.sector3")],
    },
    {
      key: "data",
      title: t("domains.data.title"),
      description: t("domains.data.description"),
      technologies: ["ETL", "Data Warehouse", "BigQuery", "Tableau", "Python"],
      sectors: [t("domains.data.sector1"), t("domains.data.sector2"), t("domains.data.sector3")],
    },
    {
      key: "ehealth",
      title: t("domains.ehealth.title"),
      description: t("domains.ehealth.description"),
      technologies: ["FHIR", "DHIS2", "HL7", "Télémédecine", "IA Médicale"],
      sectors: [t("domains.ehealth.sector1"), t("domains.ehealth.sector2"), t("domains.ehealth.sector3")],
    },
    {
      key: "logistics",
      title: t("domains.logistics.title"),
      description: t("domains.logistics.description"),
      technologies: ["TMS", "IoT", "GTFS", "Fleet Management", "NFC"],
      sectors: [t("domains.logistics.sector1"), t("domains.logistics.sector2"), t("domains.logistics.sector3")],
    },
    {
      key: "fintech",
      title: t("domains.fintech.title"),
      description: t("domains.fintech.description"),
      technologies: ["Mobile Money", "OHADA", "Wave", "Orange Money", "API Banking"],
      sectors: [t("domains.fintech.sector1"), t("domains.fintech.sector2"), t("domains.fintech.sector3")],
    },
    {
      key: "agritech",
      title: t("domains.agritech.title"),
      description: t("domains.agritech.description"),
      technologies: ["IoT", "Smart Farming", "Traçabilité", "Drones", "ML"],
      sectors: [t("domains.agritech.sector1"), t("domains.agritech.sector2"), t("domains.agritech.sector3")],
    },
    {
      key: "govtech",
      title: t("domains.govtech.title"),
      description: t("domains.govtech.description"),
      technologies: ["e-Government", "ID Numérique", "Portails", "Open Data"],
      sectors: [t("domains.govtech.sector1"), t("domains.govtech.sector2"), t("domains.govtech.sector3")],
    },
    {
      key: "transformation",
      title: t("domains.transformation.title"),
      description: t("domains.transformation.description"),
      technologies: ["Audit SI", "Schéma Directeur", "Urbanisation", "Change Mgmt"],
      sectors: [t("domains.transformation.sector1"), t("domains.transformation.sector2"), t("domains.transformation.sector3")],
    },
  ];

  const approachSteps = Array.from({ length: 7 }, (_, i) => ({
    title: t(`approach.steps.s${i + 1}.title`),
    description: t(`approach.steps.s${i + 1}.description`),
  }));

  const methodologySteps = Array.from({ length: 8 }, (_, i) => ({
    title: t(`methodology.steps.s${i + 1}.title`),
    description: t(`methodology.steps.s${i + 1}.description`),
  }));

  const sectors = Array.from({ length: 12 }, (_, i) => t(`sectors.items.s${i + 1}`));

  const techCategories = [
    { label: "Backend", items: ["Node.js", "NestJS", "Spring Boot", "Laravel", ".NET", "Python", "Go"] },
    { label: "Frontend", items: ["React", "Angular", "Vue", "Next.js", "Flutter", "Ionic"] },
    { label: "Cloud", items: ["AWS", "Azure", "Google Cloud", "Supabase", "Firebase"] },
    { label: "IA", items: ["OpenAI", "Claude", "Gemini", "Llama", "LangChain", "CrewAI"] },
    { label: "Bases de données", items: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "ElasticSearch"] },
  ];

  const whyUsItems = Array.from({ length: 8 }, (_, i) => ({
    title: t(`whyUs.items.i${i + 1}.title`),
    description: t(`whyUs.items.i${i + 1}.description`),
  }));

  const caseStudies = Array.from({ length: 4 }, (_, i) => ({
    client: t(`caseStudies.items.c${i + 1}.client`),
    sector: t(`caseStudies.items.c${i + 1}.sector`),
    problem: t(`caseStudies.items.c${i + 1}.problem`),
    solution: t(`caseStudies.items.c${i + 1}.solution`),
    result: t(`caseStudies.items.c${i + 1}.result`),
  }));

  const kpis = Array.from({ length: 6 }, (_, i) => ({
    value: t(`kpis.items.k${i + 1}.value`),
    label: t(`kpis.items.k${i + 1}.label`),
  }));

  const testimonials = Array.from({ length: 3 }, (_, i) => ({
    name: t(`testimonials.items.t${i + 1}.name`),
    company: t(`testimonials.items.t${i + 1}.company`),
    quote: t(`testimonials.items.t${i + 1}.quote`),
  }));

  const faqItems = Array.from({ length: 5 }, (_, i) => ({
    question: t(`faq.items.q${i + 1}.question`),
    answer: t(`faq.items.q${i + 1}.answer`),
  }));

  return (
    <>
      <ExpertiseHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        primaryCta={t("hero.primaryCta")}
        secondaryCta={t("hero.secondaryCta")}
      />

      <ApproachTimeline
        eyebrow={t("approach.eyebrow")}
        title={t("approach.title")}
        subtitle={t("approach.subtitle")}
        steps={approachSteps}
      />

      <DomainGrid
        eyebrow={t("domains.eyebrow")}
        title={t("domains.title")}
        subtitle={t("domains.subtitle")}
        domains={domains}
        discoverLabel={t("domains.discover")}
      />

      <SectorsGrid
        eyebrow={t("sectors.eyebrow")}
        title={t("sectors.title")}
        subtitle={t("sectors.subtitle")}
        sectors={sectors}
      />

      <TechWall
        eyebrow={t("techWall.eyebrow")}
        title={t("techWall.title")}
        subtitle={t("techWall.subtitle")}
        categories={techCategories}
      />

      <MethodologyTimeline
        eyebrow={t("methodology.eyebrow")}
        title={t("methodology.title")}
        subtitle={t("methodology.subtitle")}
        steps={methodologySteps}
      />

      <WhyChooseUs
        eyebrow={t("whyUs.eyebrow")}
        title={t("whyUs.title")}
        subtitle={t("whyUs.subtitle")}
        items={whyUsItems}
      />

      <CaseStudiesSection
        eyebrow={t("caseStudies.eyebrow")}
        title={t("caseStudies.title")}
        studies={caseStudies}
        seeMoreLabel={t("caseStudies.seeMore")}
        problemLabel={t("caseStudies.problemLabel")}
        solutionLabel={t("caseStudies.solutionLabel")}
        resultLabel={t("caseStudies.resultLabel")}
      />

      <KpiSection
        eyebrow={t("kpis.eyebrow")}
        title={t("kpis.title")}
        kpis={kpis}
      />

      <TestimonialsSection
        eyebrow={t("testimonials.eyebrow")}
        title={t("testimonials.title")}
        testimonials={testimonials}
      />

      <FaqSection
        eyebrow={t("faq.eyebrow")}
        title={t("faq.title")}
        items={faqItems}
      />

      <CtaSection
        eyebrow={t("cta.eyebrow")}
        title={t("cta.title")}
        subtitle={t("cta.subtitle")}
        primaryLabel={t("cta.primary")}
        secondaryLabel={t("cta.secondary")}
      />
    </>
  );
}
