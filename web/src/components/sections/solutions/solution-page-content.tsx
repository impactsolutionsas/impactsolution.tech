import Image from "next/image";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Link } from "@/i18n/navigation";
import type { SolutionKey, SolutionMeta } from "@/lib/solutions";

interface SolutionData {
  slug: SolutionKey;
  name: string;
  tagline: string;
  pitch: string;
  status: string;
  problem: string[];
  value: Array<{ title: string; body: string; featured?: boolean }>;
  impact: Array<{ persona: string; metric: string; body: string }>;
  stack: string[];
  users: string[];
  innovation?: Array<{ title: string; body: string }>;
  markets?: string[];
}

interface Labels {
  back: string;
  context: string;
  features: string;
  showcase: string;
  impact: string;
  stack: string;
  users: string;
  markets: string;
  innovation: string;
  ctaTitle: string;
  ctaSubtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

interface KeyMetric {
  value: string;
  label: string;
  context: string;
}

interface SolutionPageContentProps {
  data: SolutionData;
  meta: SolutionMeta;
  labels: Labels;
  keyMetric: KeyMetric;
}

export function SolutionPageContent({ data, meta, labels, keyMetric }: SolutionPageContentProps) {
  const featured = data.value.find((v) => v.featured);
  const otherValues = data.value.filter((v) => !v.featured);

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full opacity-[0.04] blur-3xl"
          style={{ backgroundColor: meta.accent }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 right-0 h-[600px] w-[400px] opacity-[0.03]"
          style={{ background: `radial-gradient(ellipse at 100% 0%, ${meta.accent}, transparent 70%)` }}
        />

        <div className="relative mx-auto max-w-7xl px-4 pt-12 pb-20 sm:px-6 sm:pt-16 sm:pb-28 lg:px-8">
          {/* Back link */}
          <Link
            href="/solutions"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" strokeWidth={2} />
            {labels.back}
          </Link>

          <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-8">
            {/* Left: text content */}
            <div className="lg:col-span-7">
              <p
                className="text-sm font-medium tracking-wide"
                style={{ color: meta.accentSafe }}
              >
                {data.tagline}
              </p>

              <h1 className="mt-4 font-heading text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                {data.name}
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                {data.pitch}
              </p>

              <p className="mt-5 text-sm text-muted-foreground/70">
                {data.status}
              </p>

              <div className="mt-8 flex items-center gap-6">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                  style={{ backgroundColor: meta.accentSafe }}
                >
                  {labels.ctaPrimary}
                  <ArrowUpRight className="size-3.5" />
                </Link>
                <Link
                  href="/contact"
                  className="text-sm font-medium text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground/30"
                >
                  {labels.ctaSecondary}
                </Link>
              </div>
            </div>

            {/* Right: contextual illustration */}
            <div className="relative flex items-center justify-center lg:col-span-5">
              <SolutionIllustration slug={data.slug} accent={meta.accent} accentSafe={meta.accentSafe} />
            </div>
          </div>
        </div>
      </section>

      {/* ─── KEY METRIC pull-quote ─── */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="flex items-start gap-5">
            <div
              className="mt-1 h-16 w-1 shrink-0 rounded-full sm:h-20"
              style={{ backgroundColor: meta.accent, opacity: 0.6 }}
            />
            <div>
              <span
                className="font-heading text-4xl font-bold tracking-tight sm:text-5xl"
                style={{ color: meta.accentSafe }}
              >
                {keyMetric.value}
              </span>
              <span className="ml-3 text-lg text-foreground/80 sm:text-xl">
                {keyMetric.label}
              </span>
              <p className="mt-2 text-sm text-muted-foreground">
                {keyMetric.context}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONTEXTE ─── */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {labels.context}
          </h2>

          <div className="mt-10 grid gap-8 lg:grid-cols-12">
            {/* Main narrative — first 2 problems as flowing text */}
            <div className="space-y-5 lg:col-span-7">
              {data.problem.slice(0, 2).map((p, i) => (
                <p key={i} className="text-base leading-relaxed text-foreground/75">
                  {p}
                </p>
              ))}
            </div>

            {/* Secondary points — smaller, offset */}
            <div className="space-y-4 lg:col-span-5 lg:pt-2">
              {data.problem.slice(2).map((p, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border/60 bg-muted/30 p-4"
                >
                  <p className="text-sm leading-relaxed text-foreground/70">{p}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURES / VALUE ─── */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {labels.features}
          </h2>

          {/* Featured module — large card */}
          {featured && (
            <div
              className="relative mt-10 overflow-hidden rounded-2xl border border-border/60 p-8 sm:p-10"
              style={{ background: `linear-gradient(135deg, ${meta.accent}08, transparent 60%)` }}
            >
              <div
                aria-hidden
                className="absolute top-0 left-0 h-full w-1 rounded-full"
                style={{ backgroundColor: meta.accent, opacity: 0.5 }}
              />
              <p className="text-xl font-semibold text-foreground sm:text-2xl">
                {featured.title}
              </p>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
                {featured.body}
              </p>
            </div>
          )}

          {/* Other modules — asymmetric layout */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {otherValues.map((v, i) => (
              <div
                key={i}
                className="group rounded-2xl border border-border/50 bg-background p-6 transition-all duration-300 hover:border-border hover:shadow-sm"
              >
                <p className="text-base font-semibold text-foreground">
                  {v.title}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SHOWCASE — image/video zone ─── */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <p className="text-sm font-medium text-muted-foreground">{labels.showcase}</p>
          <div
            className={`relative mt-6 overflow-hidden rounded-3xl ${data.slug === "kereya" || data.slug === "passbi" ? "" : "flex aspect-[16/9] items-center justify-center sm:aspect-[2.2/1]"}`}
            style={{ background: `linear-gradient(160deg, ${meta.accent}0A, ${meta.accent}03 40%, transparent)` }}
          >
            <div className="absolute inset-0 rounded-3xl border border-border/40" />
            <ShowcaseIllustration slug={data.slug} accent={meta.accent} accentSafe={meta.accentSafe} />
          </div>
        </div>
      </section>

      {/* ─── INNOVATION (conditional) ─── */}
      {data.innovation && data.innovation.length > 0 && (
        <section className="border-t border-border">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
            <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {labels.innovation}
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {data.innovation.map((item, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden rounded-2xl border border-border/50 bg-background p-6"
                >
                  <span
                    className="font-mono text-xs font-medium"
                    style={{ color: meta.accentSafe }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-4 text-base font-semibold text-foreground">
                    {item.title}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── IMPACT ─── */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {labels.impact}
          </h2>

          <div className="mt-10 divide-y divide-border/60">
            {data.impact.map((item, i) => (
              <div key={i} className="py-8 first:pt-0 last:pb-0">
                <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  {item.persona}
                </p>
                <p
                  className="mt-2 font-heading text-2xl font-bold tracking-tight sm:text-3xl"
                  style={{ color: meta.accentSafe }}
                >
                  {item.metric}
                </p>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-foreground/70">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STACK + USERS ─── */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{labels.stack}</p>
              <p className="mt-3 text-base text-foreground/75">
                {data.stack.join(" · ")}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">{labels.users}</p>
              <p className="mt-3 text-base text-foreground/75">
                {data.users.join(" · ")}
              </p>
            </div>
          </div>

          {data.markets && data.markets.length > 0 && (
            <div className="mt-8">
              <p className="text-sm font-medium text-muted-foreground">{labels.markets}</p>
              <p className="mt-3 text-base text-foreground/75">
                {data.markets.join(" · ")}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ─── CTA FINAL ─── */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {labels.ctaTitle}
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              {labels.ctaSubtitle}
            </p>
            <div className="mt-8 flex items-center justify-center gap-6">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                style={{ backgroundColor: meta.accentSafe }}
              >
                {labels.ctaPrimary}
                <ArrowUpRight className="size-3.5" />
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
              >
                {labels.ctaSecondary}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ─── HERO ILLUSTRATION per solution ─── */
function SolutionIllustration({ slug, accent, accentSafe }: { slug: SolutionKey; accent: string; accentSafe: string }) {
  const illustrations: Record<string, React.ReactNode> = {
    kereya: (
      <div className="relative flex items-center justify-center">
        <div
          className="absolute inset-0 rounded-full opacity-[0.06] blur-2xl"
          style={{ backgroundColor: accent }}
        />
        <Image
          src="/solutions/kereya-logo.png"
          alt="KEREYA — Santé maternelle et infantile"
          width={280}
          height={320}
          className="relative z-10 h-auto w-auto max-h-[300px] object-contain drop-shadow-sm"
          priority
        />
      </div>
    ),
    passbi: (
      <div className="relative flex items-center justify-center">
        <div
          className="absolute inset-0 rounded-full opacity-[0.06] blur-2xl"
          style={{ backgroundColor: accent }}
        />
        <Image
          src="/solutions/logo-passbi.jpg"
          alt="PassBi — Mobilité urbaine unifiée"
          width={320}
          height={320}
          className="relative z-10 h-auto w-auto max-h-[300px] object-contain drop-shadow-sm"
          priority
        />
      </div>
    ),
    afriassess: (
      <svg viewBox="0 0 400 360" fill="none" className="h-full w-full max-h-[320px]">
        <ellipse cx="200" cy="200" rx="150" ry="130" fill={accent} opacity="0.04" />
        <path d="M80 280 Q140 200 200 240 Q260 280 320 200 Q350 160 380 180" stroke={accentSafe} strokeWidth="2" opacity="0.2" fill="none" />
        <path d="M60 300 Q120 240 180 270 Q240 300 300 230 Q340 190 380 210" stroke={accent} strokeWidth="1.5" opacity="0.12" fill="none" />
        <path d="M120 140 L140 120 L160 135 L180 115 L200 130 L220 110 L240 125" stroke={accentSafe} strokeWidth="1.5" opacity="0.25" strokeLinecap="round" />
        <ellipse cx="280" cy="130" rx="50" ry="35" fill={accent} opacity="0.06" />
        <circle cx="280" cy="130" r="15" fill={accentSafe} opacity="0.12" />
        <rect x="100" y="160" width="80" height="60" rx="8" fill={accent} stroke={accent} strokeWidth="0.5" opacity="0.15" />
        <rect x="110" y="175" width="30" height="3" rx="1.5" fill={accentSafe} opacity="0.2" />
        <rect x="110" y="185" width="50" height="3" rx="1.5" fill={accent} opacity="0.12" />
        <rect x="110" y="195" width="40" height="3" rx="1.5" fill={accent} opacity="0.08" />
      </svg>
    ),
    jokoai: (
      <svg viewBox="0 0 400 360" fill="none" className="h-full w-full max-h-[320px]">
        <ellipse cx="200" cy="180" rx="140" ry="130" fill={accent} opacity="0.04" />
        <rect x="130" y="110" width="60" height="60" rx="12" fill={accent} opacity="0.08" />
        <rect x="210" y="110" width="60" height="60" rx="12" fill={accent} opacity="0.06" />
        <rect x="130" y="190" width="60" height="60" rx="12" fill={accent} opacity="0.06" />
        <rect x="210" y="190" width="60" height="60" rx="12" fill={accent} opacity="0.1" />
        <line x1="190" y1="140" x2="210" y2="140" stroke={accentSafe} strokeWidth="1.5" opacity="0.3" />
        <line x1="160" y1="170" x2="160" y2="190" stroke={accent} strokeWidth="1.5" opacity="0.2" />
        <line x1="240" y1="170" x2="240" y2="190" stroke={accent} strokeWidth="1.5" opacity="0.2" />
        <line x1="190" y1="220" x2="210" y2="220" stroke={accentSafe} strokeWidth="1.5" opacity="0.3" />
        <circle cx="200" cy="180" r="12" fill={accentSafe} opacity="0.2" />
        <circle cx="310" cy="160" r="25" fill={accent} opacity="0.06" />
        <path d="M300 155 L310 145 L320 155 L315 165 L305 165 Z" fill={accentSafe} opacity="0.15" />
      </svg>
    ),
    amanet: (
      <svg viewBox="0 0 400 360" fill="none" className="h-full w-full max-h-[320px]">
        <ellipse cx="200" cy="190" rx="155" ry="140" fill={accent} opacity="0.04" />
        <path d="M60 240 C120 240 120 180 180 180 C240 180 240 220 300 220 C340 220 360 200 380 200" stroke={accentSafe} strokeWidth="2.5" opacity="0.2" strokeLinecap="round" fill="none" />
        <path d="M80 270 C140 270 140 210 200 210 C260 210 260 250 320 250 C360 250 370 230 390 230" stroke={accent} strokeWidth="1.5" opacity="0.12" strokeLinecap="round" fill="none" />
        <rect x="150" y="120" width="100" height="55" rx="8" fill={accent} opacity="0.07" />
        <rect x="160" y="130" width="40" height="4" rx="2" fill={accentSafe} opacity="0.2" />
        <rect x="160" y="140" width="70" height="4" rx="2" fill={accent} opacity="0.12" />
        <rect x="160" y="150" width="55" height="4" rx="2" fill={accent} opacity="0.08" />
        <circle cx="100" cy="180" r="20" fill={accent} stroke={accentSafe} strokeWidth="1" opacity="0.15" />
        <circle cx="300" cy="160" r="15" fill={accent} stroke={accentSafe} strokeWidth="1" opacity="0.15" />
        <circle cx="180" cy="180" r="4" fill={accentSafe} opacity="0.4" />
        <circle cx="300" cy="220" r="5" fill={accent} opacity="0.5" />
      </svg>
    ),
  };

  return <>{illustrations[slug] ?? illustrations.kereya}</>;
}

/* ─── SHOWCASE ILLUSTRATION — larger, for the visual zone ─── */
function ShowcaseIllustration({ slug, accent, accentSafe }: { slug: SolutionKey; accent: string; accentSafe: string }) {
  const illustrations: Record<string, React.ReactNode> = {
    kereya: (
      <div className="grid w-full grid-cols-1 gap-3 p-4 sm:grid-cols-2 sm:p-6">
        {[
          { src: "/solutions/kereya-event.jpg", caption: "Remise de tablettes — partenariat USAID/RTI" },
          { src: "/solutions/kereya-meeting.jpg", caption: "Présentation aux autorités sanitaires de Kolda" },
          { src: "/solutions/kereya-interview.jpg", caption: "Interview officielle avec les autorités locales" },
          { src: "/solutions/kereya-team.jpg", caption: "Équipe terrain KEREYA" },
        ].map((photo) => (
          <div key={photo.src} className="group relative overflow-hidden rounded-xl">
            <Image
              src={photo.src}
              alt={photo.caption}
              width={600}
              height={400}
              className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent px-3 pb-3 pt-8">
              <p className="text-xs font-medium text-white/90 sm:text-sm">{photo.caption}</p>
            </div>
          </div>
        ))}
      </div>
    ),
    passbi: (
      <div className="grid w-full grid-cols-1 gap-3 p-4 sm:grid-cols-2 sm:p-6">
        {[
          { src: "/solutions/passbi-mockup.jpg", caption: "Application PassBi — SunuBRT, Dem Dikk, TER" },
          { src: "/solutions/passbi-demo.jpg", caption: "Démonstration live au GITEX Africa" },
          { src: "/solutions/passbi-govathon.jpeg", caption: "Lauréat Gov'Athon 2025 — Kit Technologique" },
          { src: "/solutions/passbi-route.jpg", caption: "Carte des itinéraires — Diamniadio-Dakar" },
        ].map((photo) => (
          <div key={photo.src} className="group relative overflow-hidden rounded-xl">
            <Image
              src={photo.src}
              alt={photo.caption}
              width={600}
              height={400}
              className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent px-3 pb-3 pt-8">
              <p className="text-xs font-medium text-white/90 sm:text-sm">{photo.caption}</p>
            </div>
          </div>
        ))}
      </div>
    ),
    afriassess: (
      <div className="flex flex-col items-center gap-4 p-8">
        <svg viewBox="0 0 800 300" fill="none" className="w-full max-w-2xl">
          {/* Document + map split */}
          <rect x="60" y="40" width="300" height="220" rx="12" fill={accent} stroke={accent} strokeWidth="1" opacity="0.1" />
          <rect x="80" y="65" width="120" height="8" rx="4" fill={accentSafe} opacity="0.2" />
          <rect x="80" y="85" width="250" height="5" rx="2.5" fill={accent} opacity="0.1" />
          <rect x="80" y="98" width="220" height="5" rx="2.5" fill={accent} opacity="0.07" />
          <rect x="80" y="111" width="240" height="5" rx="2.5" fill={accent} opacity="0.07" />
          <rect x="80" y="135" width="80" height="6" rx="3" fill={accentSafe} opacity="0.15" />
          <rect x="80" y="155" width="250" height="5" rx="2.5" fill={accent} opacity="0.08" />
          <rect x="80" y="168" width="200" height="5" rx="2.5" fill={accent} opacity="0.06" />
          <rect x="80" y="195" width="100" height="25" rx="6" fill={accentSafe} opacity="0.1" />
          <rect x="195" y="195" width="80" height="25" rx="6" fill={accent} opacity="0.06" />
          {/* Arrow */}
          <path d="M380 150 L440 150" stroke={accentSafe} strokeWidth="2" opacity="0.3" strokeDasharray="6 4" />
          {/* Map */}
          <rect x="460" y="40" width="280" height="220" rx="12" fill={accent} stroke={accent} strokeWidth="1" opacity="0.1" />
          <ellipse cx="600" cy="130" rx="80" ry="60" fill={accent} opacity="0.08" />
          <ellipse cx="580" cy="150" rx="40" ry="30" fill={accentSafe} opacity="0.08" />
          <circle cx="560" cy="140" r="6" fill={accentSafe} opacity="0.3" />
          <circle cx="620" cy="120" r="4" fill={accent} opacity="0.4" />
          <circle cx="590" cy="170" r="5" fill={accentSafe} opacity="0.25" />
          <rect x="480" y="210" width="60" height="14" rx="4" fill={accentSafe} opacity="0.12" />
          <rect x="550" y="210" width="45" height="14" rx="4" fill={accent} opacity="0.08" />
        </svg>
      </div>
    ),
    jokoai: (
      <div className="flex flex-col items-center gap-4 p-8">
        <svg viewBox="0 0 800 300" fill="none" className="w-full max-w-2xl">
          {/* Dashboard / OS modules */}
          <rect x="80" y="30" width="640" height="240" rx="16" fill={accent} stroke={accent} strokeWidth="1" opacity="0.08" />
          {/* Sidebar */}
          <rect x="80" y="30" width="140" height="240" rx="16" fill={accent} opacity="0.04" />
          <rect x="100" y="55" width="60" height="6" rx="3" fill={accentSafe} opacity="0.25" />
          <rect x="100" y="80" width="90" height="5" rx="2.5" fill={accent} opacity="0.12" />
          <rect x="100" y="95" width="80" height="5" rx="2.5" fill={accent} opacity="0.08" />
          <rect x="100" y="110" width="95" height="5" rx="2.5" fill={accent} opacity="0.08" />
          <rect x="100" y="125" width="70" height="5" rx="2.5" fill={accent} opacity="0.08" />
          <rect x="100" y="155" width="100" height="20" rx="6" fill={accentSafe} opacity="0.1" />
          {/* Main area */}
          <rect x="240" y="50" width="200" height="90" rx="10" fill={accent} stroke={accent} strokeWidth="0.5" opacity="0.1" />
          <rect x="260" y="70" width="80" height="7" rx="3.5" fill={accentSafe} opacity="0.2" />
          <rect x="260" y="90" width="160" height="5" rx="2.5" fill={accent} opacity="0.08" />
          <rect x="260" y="105" width="120" height="5" rx="2.5" fill={accent} opacity="0.06" />
          <rect x="260" y="120" width="60" height="12" rx="6" fill={accentSafe} opacity="0.12" />

          <rect x="460" y="50" width="240" height="90" rx="10" fill={accent} stroke={accent} strokeWidth="0.5" opacity="0.1" />
          <rect x="480" y="70" width="60" height="7" rx="3.5" fill={accentSafe} opacity="0.2" />
          <rect x="480" y="90" width="180" height="35" rx="6" fill={accent} opacity="0.04" />
          <rect x="492" y="100" width="50" height="4" rx="2" fill={accentSafe} opacity="0.15" />
          <rect x="492" y="110" width="80" height="4" rx="2" fill={accent} opacity="0.1" />

          <rect x="240" y="160" width="460" height="90" rx="10" fill={accent} stroke={accent} strokeWidth="0.5" opacity="0.08" />
          <rect x="260" y="180" width="100" height="7" rx="3.5" fill={accentSafe} opacity="0.2" />
          <rect x="260" y="200" width="400" height="5" rx="2.5" fill={accent} opacity="0.06" />
          <rect x="260" y="215" width="350" height="5" rx="2.5" fill={accent} opacity="0.05" />
          <rect x="260" y="230" width="80" height="12" rx="6" fill={accentSafe} opacity="0.12" />
        </svg>
      </div>
    ),
    amanet: (
      <div className="flex flex-col items-center gap-4 p-8">
        <svg viewBox="0 0 800 300" fill="none" className="w-full max-w-2xl">
          {/* ERP pipeline flow */}
          <rect x="40" y="100" width="130" height="100" rx="12" fill={accent} stroke={accent} strokeWidth="1" opacity="0.12" />
          <rect x="55" y="120" width="50" height="6" rx="3" fill={accentSafe} opacity="0.2" />
          <rect x="55" y="135" width="90" height="5" rx="2.5" fill={accent} opacity="0.1" />
          <rect x="55" y="148" width="70" height="5" rx="2.5" fill={accent} opacity="0.07" />
          <rect x="55" y="170" width="40" height="14" rx="4" fill={accentSafe} opacity="0.12" />

          <path d="M170 150 L210 150" stroke={accentSafe} strokeWidth="1.5" opacity="0.25" />
          <circle cx="190" cy="150" r="3" fill={accentSafe} opacity="0.3" />

          <rect x="210" y="100" width="130" height="100" rx="12" fill={accent} stroke={accent} strokeWidth="1" opacity="0.15" />
          <rect x="225" y="120" width="50" height="6" rx="3" fill={accentSafe} opacity="0.25" />
          <rect x="225" y="135" width="90" height="5" rx="2.5" fill={accent} opacity="0.12" />
          <rect x="225" y="148" width="80" height="5" rx="2.5" fill={accent} opacity="0.08" />
          <rect x="225" y="170" width="55" height="14" rx="4" fill={accentSafe} opacity="0.15" />

          <path d="M340 150 L380 150" stroke={accentSafe} strokeWidth="1.5" opacity="0.25" />
          <circle cx="360" cy="150" r="3" fill={accentSafe} opacity="0.3" />

          <rect x="380" y="100" width="130" height="100" rx="12" fill={accent} stroke={accent} strokeWidth="1" opacity="0.12" />
          <rect x="395" y="120" width="50" height="6" rx="3" fill={accentSafe} opacity="0.2" />
          <rect x="395" y="135" width="90" height="5" rx="2.5" fill={accent} opacity="0.1" />
          <rect x="395" y="148" width="75" height="5" rx="2.5" fill={accent} opacity="0.07" />
          <rect x="395" y="170" width="45" height="14" rx="4" fill={accentSafe} opacity="0.12" />

          <path d="M510 150 L550 150" stroke={accentSafe} strokeWidth="1.5" opacity="0.25" />
          <circle cx="530" cy="150" r="3" fill={accentSafe} opacity="0.3" />

          <rect x="550" y="100" width="130" height="100" rx="12" fill={accent} stroke={accent} strokeWidth="1" opacity="0.12" />
          <rect x="565" y="120" width="50" height="6" rx="3" fill={accentSafe} opacity="0.2" />
          <rect x="565" y="135" width="90" height="5" rx="2.5" fill={accent} opacity="0.1" />
          <rect x="565" y="148" width="85" height="5" rx="2.5" fill={accent} opacity="0.07" />
          <rect x="565" y="170" width="60" height="14" rx="4" fill={accentSafe} opacity="0.12" />

          <text x="105" y="85" textAnchor="middle" fill={accentSafe} fontSize="10" fontWeight="500" opacity="0.5">Devis</text>
          <text x="275" y="85" textAnchor="middle" fill={accentSafe} fontSize="10" fontWeight="500" opacity="0.5">Douane</text>
          <text x="445" y="85" textAnchor="middle" fill={accentSafe} fontSize="10" fontWeight="500" opacity="0.5">Flotte</text>
          <text x="615" y="85" textAnchor="middle" fill={accentSafe} fontSize="10" fontWeight="500" opacity="0.5">Facturation</text>
        </svg>
      </div>
    ),
  };

  return <>{illustrations[slug] ?? illustrations.kereya}</>;
}
