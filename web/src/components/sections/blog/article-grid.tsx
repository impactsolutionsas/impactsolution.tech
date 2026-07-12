"use client";

import { ArticleCard } from "./article-card";
import type { Article } from "@/lib/articles";

interface ArticleGridProps {
  articles: Article[];
  translations: {
    readArticle: string;
    views: string;
    noResults: string;
    levels: Record<string, string>;
    categories: Record<string, string>;
  };
}

export function ArticleGrid({ articles, translations }: ArticleGridProps) {
  if (articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-muted/40 py-16 text-center">
        <p className="text-sm font-medium text-muted-foreground">
          {translations.noResults}
        </p>
      </div>
    );
  }

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
