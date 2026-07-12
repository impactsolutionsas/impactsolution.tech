import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { SectionHeading } from "@/components/sections/section-heading";
import { FeaturedArticle } from "@/components/sections/blog/featured-article";
import { ArticleFilters } from "@/components/sections/blog/article-filters";
import { ArticleGrid } from "@/components/sections/blog/article-grid";
import { CtaSection } from "@/components/sections/cta-section";
import {
  getFeaturedArticle,
  filterArticles,
  type ArticleCategory,
  type ArticleLevel,
} from "@/lib/articles";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("BlogPage");
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    openGraph: {
      title: t("meta.title"),
      description: t("meta.description"),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("meta.title"),
      description: t("meta.description"),
    },
  };
}

interface Props {
  searchParams: Promise<{
    category?: string;
    level?: string;
    q?: string;
  }>;
}

export default async function NewsPage({ searchParams }: Props) {
  const params = await searchParams;
  const [t, tCta] = await Promise.all([
    getTranslations("BlogPage"),
    getTranslations("HomePage"),
  ]);

  const featured = getFeaturedArticle();

  const articles = filterArticles({
    category: params.category as ArticleCategory | undefined,
    level: params.level as ArticleLevel | undefined,
    query: params.q,
  });

  const categoryTranslations: Record<string, string> = {};
  const categories = [
    "ai",
    "ehealth",
    "fintech",
    "govtech",
    "agritech",
    "education",
    "logistics",
    "smart-cities",
    "cybersecurity",
    "cloud",
    "data-analytics",
    "digital-transformation",
    "web-development",
    "mobile",
    "devops",
    "open-source",
    "innovation",
    "african-startups",
    "success-stories",
    "case-studies",
    "events",
    "tutorials",
    "tech-watch",
  ];
  categories.forEach((cat) => {
    categoryTranslations[cat] = t(`categories.${cat}`);
  });

  const levelTranslations: Record<string, string> = {
    beginner: t("levels.beginner"),
    intermediate: t("levels.intermediate"),
    expert: t("levels.expert"),
  };

  const hasFilters = params.category || params.level || params.q;

  return (
    <>
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 pt-16 pb-12 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={t("hero.eyebrow")}
            title={t("hero.title")}
            description={t("hero.description")}
          />
        </div>
      </section>

      {featured && !hasFilters && (
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <FeaturedArticle
              article={featured}
              translations={{
                featured: t("featured"),
                readArticle: t("readArticle"),
                categories: categoryTranslations,
              }}
            />
          </div>
        </section>
      )}

      <section>
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <ArticleFilters
            currentCategory={params.category}
            currentLevel={params.level}
            currentQuery={params.q}
            translations={{
              search: t("search"),
              allCategories: t("allCategories"),
              allLevels: t("allLevels"),
              levels: levelTranslations,
              categories: categoryTranslations,
              filters: t("filters"),
              clearFilters: t("clearFilters"),
            }}
          />

          <div className="mt-8">
            <ArticleGrid
              articles={articles}
              translations={{
                readArticle: t("readArticle"),
                views: t("views"),
                noResults: t("noResults"),
                levels: levelTranslations,
                categories: categoryTranslations,
              }}
            />
          </div>
        </div>
      </section>

      <CtaSection
        eyebrow={tCta("cta.eyebrow")}
        title={tCta("cta.title")}
        subtitle={tCta("cta.subtitle")}
        primaryLabel={tCta("cta.button")}
        secondaryLabel={tCta("cta.secondaryButton")}
      />
    </>
  );
}
