"use client";

import { ArticleCard } from "./article-card";
import type { Article } from "@/lib/articles";

interface RelatedArticlesProps {
  articles: Article[];
  translations: {
    readArticle: string;
    views: string;
    levels: Record<string, string>;
    categories: Record<string, string>;
  };
}

export function RelatedArticles({
  articles,
  translations,
}: RelatedArticlesProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article, i) => (
        <ArticleCard
          key={article.slug}
          article={article}
          index={i}
          translations={translations}
        />
      ))}
    </div>
  );
}
