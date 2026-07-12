import {
  HeartPulse,
  Bus,
  Leaf,
  Rocket,
  Truck,
  Blocks,
  type LucideIcon,
} from "lucide-react";

/**
 * Solutions registry.
 *
 * ─────────────────────────────────────────────────────────────────────
 *  How to add a new solution (e.g. Joko, Royal Transport, …)
 * ─────────────────────────────────────────────────────────────────────
 *
 * 1. Pick an icon from lucide-react and import it above (`import { Icon }`).
 *
 * 2. Add an entry to `SOLUTIONS` below with:
 *      - `icon`         → the imported Lucide component
 *      - `accent`       → the brand accent color (used for tints, glow, chip fills,
 *                          persistent "featured" liseret). Any hex is OK for these
 *                          decorative uses.
 *      - `accentSafe`   → a darker variant of `accent` that meets WCAG AA on white
 *                          background (≥ 4.5:1). Used for text glyphs, chips and the
 *                          Discover CTA background. Rule of thumb: derive `accentSafe`
 *                          from `accent` by lowering the luminance until white text
 *                          reaches ≥ 4.5:1 contrast.
 *   The order of keys in this object is the display order across the site
 *   (overview grid, anchor nav, homepage carousel, navbar mega menu). Keep
 *   `custom` last — it renders with a different dark template.
 *
 * 3. Add the localized copy in `web/src/messages/{fr,en}.json` under
 *    `SolutionsPage.items.<yourKey>` with the same shape as existing entries
 *    (`name`, `tagline`, `body`, `pitch`, `status`, `problem[]`, `value[]`,
 *    `impact[]`, `stack[]`, `users[]`, `discover`). Optional:
 *      - `innovation[]`  → to expose an "Innovation & AI" differentiator block
 *      - `markets[]`     → to surface initial go-to-market countries
 *      - `value[].featured` → set to `true` on ONE card to render a persistent
 *                            accent liseret (highlight the flagship module).
 *
 * 4. In `web/src/app/[locale]/solutions/page.tsx`:
 *      - Add the key to `PRODUCT_KEYS` if the solution renders with the standard
 *        SolutionDetail template. Skip if it should render with the dark
 *        `CustomSolutionDetail` template.
 *      - Optional: add the key to `INNOVATION_KEYS`, `MARKETS_KEYS` or
 *        `EXTERNAL_HREFS` (for an external product-site CTA that opens in a new tab).
 *
 * 5. That's it. Section numbering (01, 02, 03, …) is computed automatically from
 *    the array position — no manual index anywhere.
 */

export type MediaItem =
  | { type: "image"; src: string; alt: string }
  | { type: "youtube"; videoId: string; alt: string; poster?: string };

export interface SolutionMeta {
  key: string;
  icon: LucideIcon;
  /** Bright brand accent — decorative use only (tints, underline, ghost icon). Never as text color (fails WCAG on white). */
  accent: string;
  /** Darkened variant of `accent` — safe for icon/text glyphs (≥ 4.5:1 on white). */
  accentSafe: string;
  /** Hero media items — rendered as a slider when multiple entries. */
  media?: MediaItem[];
}

export const SOLUTIONS = {
  kereya: {
    key: "kereya",
    icon: HeartPulse,
    accent: "#00BBD3",
    accentSafe: "#00829A",
    media: [
      { type: "youtube", videoId: "KggufVIBj3A", alt: "Reportage vidéo KEREYA", poster: "/solutions/kereya-event.jpg" },
      { type: "image", src: "/solutions/kereya-event.jpg", alt: "Remise de tablettes KEREYA — partenariat USAID Owod" },
      { type: "image", src: "/solutions/kereya-meeting.jpg", alt: "Présentation KEREYA aux autorités locales de Médina Yéro Foulah" },
      { type: "image", src: "/solutions/kereya-interview.jpg", alt: "Interview officielle lors du lancement KEREYA" },
      { type: "image", src: "/solutions/kereya-team.jpg", alt: "Équipe terrain KEREYA" },
    ],
  },
  passbi: {
    key: "passbi",
    icon: Bus,
    accent: "#3DDC97",
    accentSafe: "#00884A",
    media: [
      { type: "image", src: "/solutions/passbi-mockup.jpg", alt: "PassBi — interfaces multi-opérateurs Dem Dikk, Sunu BRT, TER" },
      { type: "image", src: "/solutions/passbi-route.jpg", alt: "Tracé de la route Diamniadio → Dakar dans l'application PassBi" },
      { type: "image", src: "/solutions/passbi-gitex.jpg", alt: "Présentation de PassBi au GITEX Africa — stand ADEPME" },
      { type: "image", src: "/solutions/passbi-govathon.jpg", alt: "Remise du prix Gov'Athon 2025 — Kit technologique" },
      { type: "image", src: "/solutions/passbi-demo.jpg", alt: "Démonstration live de PassBi au GITEX Africa" },
    ],
  },
  afriassess: { key: "afriassess", icon: Leaf, accent: "#A67639", accentSafe: "#7A5228" },
  jokoai: { key: "jokoai", icon: Rocket, accent: "#F43F5E", accentSafe: "#BE123C" },
  amanet: { key: "amanet", icon: Truck, accent: "#E8610A", accentSafe: "#A64300" },
  custom: { key: "custom", icon: Blocks, accent: "#8B93FF", accentSafe: "#666BD2" },
} as const satisfies Record<string, SolutionMeta>;

export type SolutionKey = keyof typeof SOLUTIONS;

export const SOLUTION_KEYS = Object.keys(SOLUTIONS) as SolutionKey[];
