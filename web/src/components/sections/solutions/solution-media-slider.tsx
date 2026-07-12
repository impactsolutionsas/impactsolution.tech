"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import type { MediaItem } from "@/lib/solutions";

interface SolutionMediaSliderProps {
  media: MediaItem[];
  accent: string;
  name: string;
}

export function SolutionMediaSlider({
  media,
  accent,
  name,
}: SolutionMediaSliderProps) {
  const [current, setCurrent] = useState(0);
  const [youtubeLoaded, setYoutubeLoaded] = useState<Record<number, boolean>>(
    {},
  );

  const prev = useCallback(
    () => setCurrent((c) => (c === 0 ? media.length - 1 : c - 1)),
    [media.length],
  );
  const next = useCallback(
    () => setCurrent((c) => (c === media.length - 1 ? 0 : c + 1)),
    [media.length],
  );

  const item = media[current];

  return (
    <div className="group/slider relative">
      <div
        className="relative aspect-[4/3] overflow-hidden rounded-2xl"
        style={{ backgroundColor: `${accent}08` }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            backgroundImage: `radial-gradient(ellipse 80% 80% at 60% 40%, ${accent}1A, transparent 70%)`,
          }}
        />

        {item.type === "image" ? (
          <Image
            src={item.src}
            alt={item.alt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
        ) : youtubeLoaded[current] ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${item.videoId}?autoplay=1&rel=0`}
            title={item.alt}
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="absolute inset-0 z-20 size-full"
          />
        ) : (
          <button
            type="button"
            onClick={() =>
              setYoutubeLoaded((prev) => ({ ...prev, [current]: true }))
            }
            className="absolute inset-0 z-20 flex cursor-pointer items-center justify-center"
            aria-label={`Lire la vidéo : ${item.alt}`}
          >
            <Image
              src={item.poster ?? `https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`}
              alt={item.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
              unoptimized={!item.poster}
            />
            <span
              className="relative flex size-16 items-center justify-center rounded-full shadow-lg transition-transform duration-200 hover:scale-110"
              style={{ backgroundColor: accent }}
            >
              <Play className="size-7 fill-white text-white" />
            </span>
          </button>
        )}
      </div>

      {media.length > 1 && (
        <>
          {/* Navigation arrows */}
          <button
            type="button"
            onClick={prev}
            className="absolute top-1/2 left-2 z-30 flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/40 text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 hover:bg-black/60 group-hover/slider:opacity-100"
            aria-label="Image précédente"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute top-1/2 right-2 z-30 flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/40 text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 hover:bg-black/60 group-hover/slider:opacity-100"
            aria-label="Image suivante"
          >
            <ChevronRight className="size-4" />
          </button>

          {/* Dots */}
          <div className="mt-3 flex justify-center gap-1.5">
            {media.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setCurrent(i);
                  if (media[i].type === "youtube") {
                    setYoutubeLoaded((prev) => ({ ...prev, [i]: false }));
                  }
                }}
                className={`size-2 cursor-pointer rounded-full transition-all duration-200 ${
                  i === current ? "scale-125" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                style={i === current ? { backgroundColor: accent } : undefined}
                aria-label={`Aller au média ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
