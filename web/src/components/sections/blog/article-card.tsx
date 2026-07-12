"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, Eye, ArrowRight } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import type { Article } from "@/lib/articles";
import { CATEGORY_ICONS } from "@/lib/articles";

interface ArticleCardProps {
  article: Article;
  index?: number;
  translations: {
    readArticle: string;
    views: string;
    levels: Record<string, string>;
    categories: Record<string, string>;
  };
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.08,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

export function ArticleCard({
  article,
  index = 0,
  translations,
}: ArticleCardProps) {
  const primaryCategory = article.categories[0];
  const CategoryIcon = CATEGORY_ICONS[primaryCategory];

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      custom={index}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow duration-300 hover:shadow-lg hover:shadow-primary/5"
    >
      <Link
        href={`/news/${article.slug}`}
        className="absolute inset-0 z-10"
        aria-label={article.title}
      />

      <div className="relative aspect-[16/9] overflow-hidden bg-muted">
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized={article.coverImage.endsWith(".svg")}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <Badge
            variant="secondary"
            className="gap-1 bg-background/90 backdrop-blur-sm"
          >
            <CategoryIcon className="size-3" />
            {translations.categories[primaryCategory]}
          </Badge>
        </div>

        <div className="absolute top-3 right-3">
          <Badge
            variant="outline"
            className="border-white/30 bg-black/40 text-xs text-white backdrop-blur-sm"
          >
            {translations.levels[article.level]}
          </Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="line-clamp-2 text-lg font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary">
          {article.title}
        </h3>

        <p className="line-clamp-2 text-sm text-muted-foreground">
          {article.excerpt}
        </p>

        <div className="mt-auto flex items-center justify-between pt-3 border-t border-border/50">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="size-3.5" />
              {article.readingTime} min
            </span>
            <span className="flex items-center gap-1">
              <Eye className="size-3.5" />
              {article.views.toLocaleString()}
            </span>
          </div>

          <time
            dateTime={article.publishedAt}
            className="text-xs text-muted-foreground"
          >
            {new Date(article.publishedAt).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </time>
        </div>

        <div className="flex items-center gap-2 text-sm font-medium text-primary opacity-0 transition-all duration-300 group-hover:opacity-100">
          {translations.readArticle}
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </motion.article>
  );
}
