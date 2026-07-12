import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import {
  Clock,
  Eye,
  Calendar,
  ChevronRight,
  Share2,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getArticleBySlug,
  getRelatedArticles,
  getArticles,
  CATEGORY_ICONS,
} from "@/lib/articles";
import { ArticleContent } from "@/components/sections/blog/article-content";
import { RelatedArticles } from "@/components/sections/blog/related-articles";

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.author.name],
      images: [{ url: article.coverImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
    },
  };
}

export function generateStaticParams() {
  return getArticles().map((a) => ({ slug: a.slug }));
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const t = await getTranslations("BlogPage");
  const related = getRelatedArticles(article, 3);
  const allArticles = getArticles();
  const currentIndex = allArticles.findIndex((a) => a.slug === slug);
  const prevArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;
  const nextArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;

  const categoryTranslations: Record<string, string> = {};
  article.categories.forEach((cat) => {
    categoryTranslations[cat] = t(`categories.${cat}`);
  });
  related.forEach((r) => {
    r.categories.forEach((cat) => {
      categoryTranslations[cat] = t(`categories.${cat}`);
    });
  });

  const levelTranslations: Record<string, string> = {
    beginner: t("levels.beginner"),
    intermediate: t("levels.intermediate"),
    expert: t("levels.expert"),
  };

  const primaryCategory = article.categories[0];
  const CategoryIcon = CATEGORY_ICONS[primaryCategory];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: article.coverImage,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: {
      "@type": "Person",
      name: article.author.name,
      jobTitle: article.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: "Impact Solutions",
      logo: { "@type": "ImageObject", url: "/brand/logo-light.png" },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="border-b border-border bg-muted/30"
      >
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                {t("breadcrumb.home")}
              </Link>
            </li>
            <li>
              <ChevronRight className="size-3.5" />
            </li>
            <li>
              <Link
                href="/news"
                className="hover:text-foreground transition-colors"
              >
                {t("breadcrumb.news")}
              </Link>
            </li>
            <li>
              <ChevronRight className="size-3.5" />
            </li>
            <li className="truncate font-medium text-foreground max-w-[200px] sm:max-w-none">
              {article.title}
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative">
        <div className="relative aspect-[21/9] max-h-[480px] w-full overflow-hidden bg-muted">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            priority
            sizes="100vw"
            unoptimized={article.coverImage.endsWith(".svg")}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 px-4 pb-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <div className="flex items-center gap-2 mb-4">
                <Badge className="gap-1 bg-white/20 text-white backdrop-blur-sm border-white/20">
                  <CategoryIcon className="size-3" />
                  {categoryTranslations[primaryCategory]}
                </Badge>
                <Badge className="bg-white/20 text-white backdrop-blur-sm border-white/20">
                  {levelTranslations[article.level]}
                </Badge>
              </div>
              <h1 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl xl:text-5xl leading-tight">
                {article.title}
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Article Meta */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="size-10 rounded-full bg-muted" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">
                    {article.author.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {article.author.role}
                  </span>
                </div>
              </div>
              <span className="hidden sm:inline text-border">|</span>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="size-3.5" />
                  {new Date(article.publishedAt).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="size-3.5" />
                  {article.readingTime} min
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="size-3.5" />
                  {article.views.toLocaleString()}
                </span>
              </div>
            </div>

            <Button variant="outline" size="sm" className="gap-1.5 cursor-pointer">
              <Share2 className="size-3.5" />
              {t("share")}
            </Button>
          </div>
        </div>
      </div>

      {/* Article Body */}
      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <ArticleContent content={article.content} />

        {/* Tags */}
        <div className="mt-12 flex flex-wrap gap-2 border-t border-border pt-6">
          {article.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              #{tag}
            </Badge>
          ))}
        </div>
      </article>

      {/* Navigation prev/next */}
      <nav className="border-t border-border">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {prevArticle ? (
              <Link
                href={`/news/${prevArticle.slug}`}
                className="group flex items-center gap-3 rounded-xl border border-border p-4 transition-colors hover:bg-muted cursor-pointer"
              >
                <ArrowLeft className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-x-1" />
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="text-xs text-muted-foreground">
                    {t("prevArticle")}
                  </span>
                  <span className="text-sm font-medium truncate">
                    {prevArticle.title}
                  </span>
                </div>
              </Link>
            ) : (
              <div />
            )}
            {nextArticle && (
              <Link
                href={`/news/${nextArticle.slug}`}
                className="group flex items-center justify-end gap-3 rounded-xl border border-border p-4 transition-colors hover:bg-muted cursor-pointer sm:text-right"
              >
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="text-xs text-muted-foreground">
                    {t("nextArticle")}
                  </span>
                  <span className="text-sm font-medium truncate">
                    {nextArticle.title}
                  </span>
                </div>
                <ArrowRight className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="border-t border-border bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold tracking-tight mb-8">
              {t("relatedArticles")}
            </h2>
            <RelatedArticles
              articles={related}
              translations={{
                readArticle: t("readArticle"),
                views: t("views"),
                levels: levelTranslations,
                categories: categoryTranslations,
              }}
            />
          </div>
        </section>
      )}
    </>
  );
}
