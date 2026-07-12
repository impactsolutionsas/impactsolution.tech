"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Article } from "@/lib/articles";

interface HomeNewsSectionProps {
  articles: Article[];
  translations: {
    eyebrow: string;
    title: string;
    viewAll: string;
    readArticle: string;
    categories: Record<string, string>;
  };
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

export function HomeNewsSection({
  articles,
  translations,
}: HomeNewsSectionProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {articles.slice(0, 3).map((article) => (
        <motion.article
          key={article.slug}
          variants={item}
          className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5"
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
          </div>

          <div className="flex flex-1 flex-col gap-3 p-5">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {translations.categories[article.categories[0]]}
              </Badge>
              <time
                dateTime={article.publishedAt}
                className="text-xs text-muted-foreground"
              >
                {new Date(article.publishedAt).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "short",
                })}
              </time>
            </div>

            <h3 className="line-clamp-2 text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
              {article.title}
            </h3>

            <p className="line-clamp-2 text-sm text-muted-foreground">
              {article.excerpt}
            </p>

            <div className="mt-auto flex items-center justify-between pt-2">
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="size-3.5" />
                {article.readingTime} min
              </span>
              <span className="flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                {translations.readArticle}
                <ArrowRight className="size-3.5" />
              </span>
            </div>
          </div>
        </motion.article>
      ))}
    </motion.div>
  );
}
