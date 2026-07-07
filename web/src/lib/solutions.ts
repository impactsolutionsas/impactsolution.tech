import { HeartPulse, Bus, Leaf, Blocks, type LucideIcon } from "lucide-react";

export interface SolutionMeta {
  key: string;
  icon: LucideIcon;
  /** Bright brand accent — decorative use only (tints, underline, ghost icon). Never as text color (fails WCAG on white). */
  accent: string;
  /** Darkened variant of `accent` — safe for icon/text glyphs (>=4.5:1 on white). */
  accentSafe: string;
}

export const SOLUTIONS = {
  kereya: { key: "kereya", icon: HeartPulse, accent: "#00BBD3", accentSafe: "#00829A" },
  passbi: { key: "passbi", icon: Bus, accent: "#3DDC97", accentSafe: "#00884A" },
  afriassess: { key: "afriassess", icon: Leaf, accent: "#F5A623", accentSafe: "#AC6100" },
  custom: { key: "custom", icon: Blocks, accent: "#8B93FF", accentSafe: "#666BD2" },
} as const satisfies Record<string, SolutionMeta>;

export type SolutionKey = keyof typeof SOLUTIONS;

export const SOLUTION_KEYS = Object.keys(SOLUTIONS) as SolutionKey[];
