# NOTES.md — Impact Solutions Website (impactsolution.tech)
> Last updated: 2026-07-06 · Session: /init — lecture cdc.md + branding

## Current Goal
Refonte complète du site institutionnel **Impact Solutions SAS** — positionnement premium (Stripe/OpenAI/Palantir), crédibilité auprès des bailleurs (Banque mondiale, AFD, UNICEF, FID). Site headless piloté par Directus, aucun contenu codé en dur, extensible à un écosystème multi-produits (KEREYA, PASSBI, AFRIASSESS + futurs).

**Tagline** : *Engineering Digital Impact*.

## Stack (dérive du cdc — remplace le mapping par défaut du skill)
| Layer | Tech |
|-------|------|
| Frontend | Next.js 15 · React 19 · TS strict · Tailwind · shadcn/ui · Framer Motion · TanStack Query · React Hook Form + Zod |
| CMS | Directus (self-hosted Docker) — Coolify sur VPS **ou** Render |
| DB | Supabase Postgres |
| Storage / Media | Cloudflare R2 |
| CDN / Edge | Cloudflare |
| Analytics | Plausible ou GA4 |
| Deploy front | Vercel |
| CI | GitHub Actions |
| i18n | FR/EN (extensible) |

## Identité visuelle (verrouillée par cdc §6, §7)
- Primary `#072D5B` (bleu nuit)
- Secondary `#00B7D6` (turquoise / accent cyan)
- Background `#FFFFFF` · Surface `#F8FAFC` · Text `#0F172A` · Border `#E2E8F0`
- Headings : **Plus Jakarta Sans** · Body : **Inter** · Mono : **JetBrains Mono**
- Style : minimaliste, très lumineux, beaucoup de blanc, animations discrètes, illustrations isométriques

## Assets branding disponibles
- `branding/kereya.png`, `branding/kereya-2.png` (logos KEREYA — pour page Solutions)
- `branding/logo/logo-1.png`, `logo-b.png` (Impact Solutions — light + dark)
- `branding/logo/icon.png`, `icon-b.png` (favicons / touch icons)
- `branding/logo/ChatGPT Image 6 juil. 2026, 19_02_56.png` (asset annexe — à trier)
- ⚠️ Pas de version SVG — prévoir vectorisation ou export propre avant prod

## Arborescence cible (cdc §25)
```
Accueil · À propos · Expertises · Solutions · Réalisations · Innovation · Ressources · Actualités · Carrières · Contact
```
+ mini-sites par solution (KEREYA / PASSBI / AFRIASSESS / Custom).

## Completed
- [x] Lecture cdc.md v2.0 (1338 lignes) + inventaire branding — 2026-07-06

## In Progress
_(rien — bootstrap)_

## Blocked
- **Choix d'hébergement Directus** : Coolify+VPS (recommandé cdc §26 option 1) vs Render — à trancher avec le client au moment du deploy. Impact P1.
- **Analytics** : Plausible vs GA4 — à trancher (RGPD → Plausible recommandé).
- **Contenus** : aucun texte de production fourni pour l'instant → placeholders Directus + collecte à planifier.
- **Assets** : pas de SVG vectoriels des logos ni photothèque — à commander/produire.

## Next (queued — dépendances ordonnées)

### Phase 0 — Foundations [P0]
- [ ] **INIT-1** Bootstrap Next.js 15 App Router + TS strict + Tailwind + shadcn/ui + Framer Motion + Zod + TanStack Query
- [ ] **INIT-2** Design tokens (couleurs cdc §6, typo cdc §7, spacing, radius) → `tailwind.config.ts` + CSS vars
- [ ] **INIT-3** Layout global (Navbar mega-menu, Footer, i18n FR/EN scaffolding via `next-intl`)
- [ ] **INIT-4** GitHub repo + Actions (lint, typecheck, build) + preview Vercel

### Phase 1 — CMS Directus [P0]
- [ ] **CMS-1** `docker-compose.yml` Directus + Postgres (dev local) + `.env.example`
- [ ] **CMS-2** Modélisation collections (cdc §10) : `pages`, `articles`, `solutions`, `case_studies`, `services`, `partners`, `team`, `testimonials`, `faq`, `downloads`, `media`, `events`, `careers`, `settings`, `navigation`, `footer`, `seo`, `redirects`
- [ ] **CMS-3** Rôles & permissions (Admin / Éditeur / Auteur / Lecteur) + workflow brouillon→publié
- [ ] **CMS-4** i18n natif Directus (translations FR/EN) + versioning + preview tokens
- [ ] **CMS-5** Storage → adapter Cloudflare R2 (S3-compatible)

### Phase 2 — Data layer front [P0]
- [ ] **DATA-1** SDK Directus typé (`@directus/sdk`) + génération TS depuis schema
- [ ] **DATA-2** Fetchers ISR + revalidateTag par collection (webhook Directus → `revalidateTag`)
- [ ] **DATA-3** Preview mode pour éditeurs (draft mode Next.js)

### Phase 3 — Pages [P0 → P2]
- [ ] **PG-HOME** [P0] Accueil : Hero + Mission + Expertises + Produits + Réalisations + Impact + News + CTA
- [ ] **PG-ABOUT** [P0] À propos (histoire, mission, vision, valeurs, approche, équipe)
- [ ] **PG-EXPERTISES** [P0] Index + 11 sous-pages (cdc §10) — chaque expertise SEO-optimisée (cdc §23)
- [ ] **PG-SOLUTIONS** [P0] Index + mini-sites KEREYA / PASSBI / AFRIASSESS / Custom
- [ ] **PG-CASES** [P1] Réalisations (contexte, défi, solution, résultats, impact, techs, partenaires)
- [ ] **PG-INNOVATION** [P1] R&D, Publications, Roadmap, Lab IA
- [ ] **PG-RESOURCES** [P1] Blog (MDX via Directus), livres blancs, guides, docs, FAQ
- [ ] **PG-CAREERS** [P2] Culture, métiers, offres, spontanée
- [ ] **PG-CONTACT** [P0] Formulaire intelligent (RHF+Zod) + carte + prise de RDV

### Phase 4 — Cross-cutting [P0 → P1]
- [ ] **SEO-1** [P0] Metadata API Next.js, Schema.org, OpenGraph, JSON-LD par type, sitemap, robots, canonical
- [ ] **PERF-1** [P0] Images AVIF, ISR par tag, Server Components par défaut, code splitting, Lighthouse >95
- [ ] **A11Y-1** [P0] WCAG 2.2 AA, focus visible, nav clavier, ARIA — checklist par composant
- [ ] **SEC-1** [P1] CSP strict, headers, rate limit (Cloudflare + middleware), sanitize MDX
- [ ] **ANLY-1** [P1] Plausible (recommandé RGPD) ou GA4

### Phase 5 — Deploy [P1]
- [ ] **DEP-1** Vercel prod + preview + env vars
- [ ] **DEP-2** Directus prod : décision Coolify/VPS vs Render (voir Blocked)
- [ ] **DEP-3** Cloudflare front (proxy, WAF, cache rules) + R2 bucket
- [ ] **DEP-4** Domaine + DNS + SSL

## Key decisions (à valider)
- **Contenu 100% CMS** : jamais de texte hardcodé — même titres/CTA/labels via `settings` collection Directus
- **i18n** : `next-intl` côté front + collections traduites côté Directus
- **Blog** : MDX stocké en Directus (champ `content` markdown + rendu MDX côté Next)
- **Multi-produits** : une seule instance Directus mutualisée pour Impact + KEREYA + PASSBI + AFRIASSESS (cf. cdc §26 "Objectifs")
- **Pas de shared package cross-sites** : duplication assumée (règle Tech Lead)

## Environment (à créer au bootstrap)
- `DIRECTUS_URL` (server) · `DIRECTUS_PUBLIC_URL` (client)
- `DIRECTUS_STATIC_TOKEN` (server, lecture publique)
- `DIRECTUS_WEBHOOK_SECRET` (revalidateTag)
- `NEXT_PUBLIC_SITE_URL`
- `R2_ACCOUNT_ID` · `R2_ACCESS_KEY_ID` · `R2_SECRET_ACCESS_KEY` · `R2_BUCKET`
- `SUPABASE_DB_URL` (pour Directus)
- `PLAUSIBLE_DOMAIN` ou `NEXT_PUBLIC_GA_ID`

## Risks
- **Périmètre très large** (10 sections × mini-sites + CMS complet) → risque de dépassement si tout mené en un sprint. **Mitigation** : livrer d'abord Accueil + Solutions + Contact + CMS branché, puis itérer.
- **Absence de contenu rédigé** → risque de blocage design. **Mitigation** : lorem crédible + relecture par le client par section.
- **Directus self-host** : sauvegardes Postgres + monitoring à ne pas oublier.
- **Perf Lighthouse >95** avec Framer Motion : discipliner les animations, préférer CSS quand possible.

## Session Summary — 2026-07-06

**Completed this session:**
- Lecture intégrale du cdc.md (v2.0) et inventaire du dossier `branding/`
- Création de NOTES.md (source de vérité inter-sessions)
- Plan de travail décomposé en 5 phases avec dépendances

**Handoffs produced:** aucun (session d'orchestration seule)

**NOTES.md updated:** yes

**Next session should start with:**
> Read NOTES.md, valider les décisions clés avec le client, puis lancer **INIT-1** (bootstrap Next.js 15) et **CMS-1** (docker-compose Directus) en parallèle.
