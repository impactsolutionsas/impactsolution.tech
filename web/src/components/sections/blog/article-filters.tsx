"use client";

import { useState, useTransition } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useRouter, usePathname } from "@/i18n/navigation";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ARTICLE_CATEGORIES,
  type ArticleCategory,
  type ArticleLevel,
  CATEGORY_ICONS,
} from "@/lib/articles";

interface ArticleFiltersProps {
  translations: {
    search: string;
    allCategories: string;
    allLevels: string;
    levels: Record<string, string>;
    categories: Record<string, string>;
    filters: string;
    clearFilters: string;
  };
  currentCategory?: string;
  currentLevel?: string;
  currentQuery?: string;
}

export function ArticleFilters({
  translations,
  currentCategory,
  currentLevel,
  currentQuery,
}: ArticleFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [showFilters, setShowFilters] = useState(false);
  const [searchValue, setSearchValue] = useState(currentQuery ?? "");

  function updateParams(updates: Record<string, string | undefined>) {
    const params = new URLSearchParams();
    const current = {
      category: currentCategory,
      level: currentLevel,
      q: currentQuery,
      ...updates,
    };
    Object.entries(current).forEach(([key, val]) => {
      if (val) params.set(key, val);
    });
    const qs = params.toString();
    startTransition(() => {
      router.replace(`${pathname}${qs ? `?${qs}` : ""}` as never);
    });
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    updateParams({ q: searchValue || undefined });
  }

  function clearAll() {
    setSearchValue("");
    startTransition(() => {
      router.replace(pathname as never);
    });
  }

  const hasActiveFilters = currentCategory || currentLevel || currentQuery;

  const DISPLAY_CATEGORIES: ArticleCategory[] = [
    "ai",
    "ehealth",
    "fintech",
    "govtech",
    "cybersecurity",
    "cloud",
    "digital-transformation",
    "innovation",
    "tutorials",
    "african-startups",
  ];

  const LEVELS: ArticleLevel[] = ["beginner", "intermediate", "expert"];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <form onSubmit={handleSearch} className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder={translations.search}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="pl-9 h-10"
          />
        </form>

        <Button
          variant={showFilters ? "secondary" : "outline"}
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="gap-1.5 cursor-pointer"
        >
          <SlidersHorizontal className="size-4" />
          <span className="hidden sm:inline">{translations.filters}</span>
        </Button>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAll}
            className="gap-1.5 text-destructive cursor-pointer"
          >
            <X className="size-4" />
            <span className="hidden sm:inline">
              {translations.clearFilters}
            </span>
          </Button>
        )}
      </div>

      {showFilters && (
        <div
          className="space-y-4 rounded-xl border border-border bg-muted/30 p-4 animate-in fade-in slide-in-from-top-2 duration-200"
          data-pending={isPending || undefined}
        >
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-foreground">
              {translations.allCategories}
            </h4>
            <div className="flex flex-wrap gap-2">
              {DISPLAY_CATEGORIES.map((cat) => {
                const Icon = CATEGORY_ICONS[cat];
                const isActive = currentCategory === cat;
                return (
                  <Badge
                    key={cat}
                    variant={isActive ? "default" : "outline"}
                    className="cursor-pointer gap-1 transition-colors"
                    onClick={() =>
                      updateParams({
                        category: isActive ? undefined : cat,
                      })
                    }
                  >
                    <Icon className="size-3" />
                    {translations.categories[cat]}
                  </Badge>
                );
              })}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium text-foreground">
              {translations.allLevels}
            </h4>
            <div className="flex flex-wrap gap-2">
              {LEVELS.map((level) => {
                const isActive = currentLevel === level;
                return (
                  <Badge
                    key={level}
                    variant={isActive ? "default" : "outline"}
                    className="cursor-pointer transition-colors"
                    onClick={() =>
                      updateParams({
                        level: isActive ? undefined : level,
                      })
                    }
                  >
                    {translations.levels[level]}
                  </Badge>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
