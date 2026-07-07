"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { SOLUTIONS, type SolutionKey } from "@/lib/solutions";
import { SolutionCard } from "@/components/sections/solution-card";

interface ProductsCarouselItem {
  key: SolutionKey;
  name: string;
  tagline: string;
  description: string;
  href: string;
  cta: string;
}

interface ProductsCarouselProps {
  items: ProductsCarouselItem[];
}

export function ProductsCarousel({ items }: ProductsCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const { scrollLeft, scrollWidth, clientWidth } = track;
    setCanScrollPrev(scrollLeft > 8);
    setCanScrollNext(scrollLeft < scrollWidth - clientWidth - 8);

    const cardWidth = track.children[0]?.getBoundingClientRect().width ?? 1;
    const gap = 24;
    const index = Math.round(scrollLeft / (cardWidth + gap));
    setActiveIndex(Math.min(index, items.length - 1));
  }, [items.length]);

  useEffect(() => {
    updateScrollState();
    const track = trackRef.current;
    if (!track) return;

    track.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      track.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[index] as HTMLElement | undefined;
    if (!card) return;
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
  };

  const scrollBy = (direction: 1 | -1) => {
    scrollToIndex(Math.max(0, Math.min(items.length - 1, activeIndex + direction)));
  };

  return (
    <div>
      <div className="flex items-center justify-end gap-2 pb-6">
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          disabled={!canScrollPrev}
          aria-label="Previous"
          className="flex size-10 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-30"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          disabled={!canScrollNext}
          aria-label="Next"
          className="flex size-10 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-30"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      <div
        ref={trackRef}
        className="-mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-4 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => {
          const meta = SOLUTIONS[item.key];
          return (
            <div
              key={item.key}
              className="w-[82%] shrink-0 snap-start sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)]"
            >
              <SolutionCard
                icon={meta.icon}
                name={item.name}
                tagline={item.tagline}
                description={item.description}
                href={item.href}
                cta={item.cta}
                accent={meta.accent}
                accentSafe={meta.accentSafe}
              />
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex justify-center gap-2">
        {items.map((item, i) => (
          <button
            key={item.key}
            type="button"
            onClick={() => scrollToIndex(i)}
            aria-label={`Go to ${item.name}`}
            aria-current={i === activeIndex}
            className={cn(
              "h-2 rounded-full transition-all",
              i === activeIndex ? "w-6 bg-primary" : "w-2 bg-border hover:bg-muted-foreground/40"
            )}
          />
        ))}
      </div>
    </div>
  );
}
