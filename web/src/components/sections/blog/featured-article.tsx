"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, Eye, ArrowRight } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Article } from "@/lib/articles";
import { CATEGORY_ICONS } from "@/lib/articles";

interface FeaturedArticleProps {
  article: Article;
  translations: {
    featured: string;
    readArticle: string;
    categories: Record<string, string>;
  };
}

export function FeaturedArticle({
  article,
  translations,
}: FeaturedArticleProps) {
  const primaryCategory = article.categories[0];
  const CategoryIcon = CATEGORY_ICONS[primaryCategory];

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card"
    >
      <div className="grid lg:grid-cols-2">
        <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[400px]">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            unoptimized={article.coverImage.endsWith(".svg")}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent lg:bg-gradient-to-l lg:from-transparent lg:to-black/5" />
        </div>

        <div className="flex flex-col justify-center gap-5 p-6 sm:p-8 lg:p-10">
          <div className="flex items-center gap-2">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/15">
              {translations.featured}
            </Badge>
            <Badge variant="outline" className="gap-1">
              <CategoryIcon className="size-3" />
              {translations.categories[primaryCategory]}
            </Badge>
          </div>

          <h2 className="text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            {article.title}
          </h2>

          <p className="text-base text-muted-foreground lg:text-lg">
            {article.excerpt}
          </p>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-full bg-muted" />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground">
                  {article.author.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {article.author.role}
                </span>
              </div>
            </div>
            <span className="text-muted-foreground">·</span>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
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

          <Button asChild className="w-fit group/btn cursor-pointer">
            <Link href={`/news/${article.slug}`}>
              {translations.readArticle}
              <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
