# NOTES.md — Impact Solutions Website (impactsolution.tech)
> Last updated: 2026-07-10 · Session: re-init / relecture cdc.md + branding pour reprise

## Current Goal
Refonte complète du site institutionnel **Impact Solutions SAS** — positionnement premium (Stripe/OpenAI/Palantir), crédibilité auprès des bailleurs (Banque mondiale, AFD, UNICEF, FID). Site headless piloté par Directus, aucun contenu codé en dur, extensible à un écosystème multi-produits (KEREYA, PASSBI, AFRIASSESS + futurs).

**Tagline** : *Engineering Digital Impact*.

## Stack (dérive du cdc — remplace le mapping par défaut du skill)
| Layer | Tech |
|-------|------|
| Frontend | **Next.js 16.2.10** (App Router, Turbopack) · React 19 · TS strict · Tailwind v4 · shadcn/ui (base radix) · Framer Motion · TanStack Query · React Hook Form + Zod · next-intl 4.13 |
| CMS | Directus (self-hosted Docker) → **Render** |
| DB | Supabase Postgres |
| Storage / Media | **Supabase Storage** (mutualisé avec la DB) |
| CDN / Edge | Cloudflare |
| Analytics | **Plausible** (RGPD-friendly, cookieless) |
| Deploy front | Vercel |
| CI | GitHub Actions |
| i18n | FR (défaut, sans préfixe) / EN (`/en`) via next-intl, `localePrefix: "as-needed"` |

⚠️ **Next.js 16 renomme `middleware.ts` → `proxy.ts`** (export nommé `proxy`, plus `middleware`). Impacte tout futur rate-limiting/SEC-1. Déjà utilisé pour le routing i18n dans `web/src/proxy.ts`.

## Identité visuelle — SOURCE D'AUTORITÉ = brand board, PAS le cdc texte
Le fichier `branding/logo/ChatGPT Image 6 juil. 2026, 19_02_56.png` est en réalité un **brand board complet** (logo, variantes, palette, typo, mockups), pas un asset annexe. Le client a validé (2026-07-06) que ce board fait autorité sur le cdc texte, qui donnait des valeurs légèrement différentes/génériques.

**Palette réelle (appliquée dans `web/src/app/globals.css`) :**
- `--navy-deep` `#0A1D3F` (fonds sombres : footer, sections impact)
- `--primary` `#132A54` (navy — CTA, texte accentué sur fond clair)
- `--secondary` `#00BBD3` (cyan — accents, fonds sombres uniquement, PAS comme texte sur blanc)
- `--muted` `#F4F6F8` (surface) · `--border` `#E6EBEF`
- Texte par défaut : `#0A1D3F` sur blanc (contraste 16.66:1)

**Typographie réelle :** **Poppins** (titres, `--font-heading`) + **Inter** (body) — remplace Plus Jakarta Sans du cdc.

**⚠️ Règle WCAG AA à respecter partout :** le cyan `#00BBD3` (`--secondary`) sur fond blanc ne fait que **2.32:1** de contraste (échoue, il faut 4.5:1, et même 3:1 en grand texte). Ne JAMAIS l'utiliser comme couleur de texte sur fond clair — seulement en décoratif (icônes, bordures, fonds) ou comme texte sur fond navy (`#0A1D3F`/`#132A54`, contraste 6-7:1, passe large). Pour du texte d'accent cyan sur fond clair (ex. mot-clé en emphase dans un titre), utiliser le token **`--accent-text` `#007A92`** (même teinte, plus foncée, 5:1 de contraste) via la classe `text-accent-text` — jamais `text-secondary` sur fond clair. `SectionHeading` (`web/src/components/sections/section-heading.tsx`) encode la même logique via une prop `tone="light"|"dark"`.

## Assets branding — état réel après inspection
- `branding/logo/logo-1.png` → copié `web/public/brand/logo-light.png`. PNG **opaque (RGB, pas d'alpha)**, fond blanc — fonctionne bien sur navbar blanche.
- `branding/logo/logo-b.png` → copié `web/public/brand/logo-dark.png`. **PNG opaque avec fond blanc et traits très clairs — INUTILISABLE sur fond sombre tel quel** (rend un rectangle blanc). Le footer utilise un wordmark texte de secours (`IMPACT` + `SOLUTIONS` en cyan) en attendant.
- `branding/logo/icon.png` → copié `web/public/brand/icon.png`. PNG RGBA (transparence), carte réseau Afrique sur fond dégradé sombre — plus utilisé dans le Hero actuel (remplacé par `hero.png`), mais conservé, réutilisable ailleurs (About, Innovation...).
- `web/public/brand/hero.png` : photo authentique (femme en tenue africaine, skyline, overlay réseau) fournie par l'utilisateur le 2026-07-06 — utilisée en fond du Hero (desktop : full-bleed avec dégradé vers blanc ; mobile : bandeau sous le texte). Remplace l'ancienne approche Spline (essayée puis abandonnée sur demande explicite — packages désinstallés).
- **Action requise avant prod** : faire produire des SVG vectoriels propres (logo clair + logo foncé transparent + favicon carré) — aucun des assets actuels n'est un vrai "dark logo" utilisable.
- `branding/kereya.png`, `kereya-2.png` : logos KEREYA, pas encore utilisés (réservés page Solutions/KEREYA).

## Faits découverts via le brand board (à vérifier avec le client)
- Le mockup carte de visite dans le brand board indique : **CEO = Djibril Sagna**, domaine **impactsolutions.sn** (Sénégal) — alors que ce projet/dossier s'appelle `impactsolution.tech`. À clarifier : le `.tech` est-il le nouveau domaine cible, ou `.sn` reste le domaine de prod ?
- Le brand board donne une 3e variante de tagline : *"Engineering digital systems for Africa's future"* (en plus de "Engineering Digital Impact" et "Engineering Solutions for Africa" du cdc). On a gardé "Engineering Digital Impact" (cdc §6) comme tagline affichée sur le site.
- **Incohérence mineure cdc** : §7 (cdc v2.0) liste 7 valeurs (Innovation, Excellence, Impact, **Fiabilité**, Ouverture, Collaboration, **Éthique**) ; §4 du PRD en liste 6 (remplace Fiabilité/Éthique par **Intégrité**, retire Éthique). On a retenu la liste à 7 (plus complète) dans `AboutPage.values.*` des messages i18n — à confirmer avec le client.

## Arborescence cible (cdc §25)
```
Accueil · À propos · Expertises · Solutions · Réalisations · Innovation · Ressources · Actualités · Carrières · Contact
```
+ mini-sites par solution (KEREYA / PASSBI / AFRIASSESS / Custom).

## Completed
- [x] Lecture cdc.md v2.0 (1338 lignes) + inventaire branding — 2026-07-06
- [x] **INIT-1** Bootstrap Next.js 16.2.10 (App Router, Turbopack, TS strict, Tailwind v4, ESLint) dans `web/` — 2026-07-06
- [x] **INIT-2** shadcn/ui initialisé (preset nova, base radix) + composants installés (button, card, badge, navigation-menu, sheet, input, textarea, label, form, separator, accordion, tabs, avatar, dialog) — 2026-07-06
- [x] Dépendances installées : framer-motion, zod, react-hook-form, @hookform/resolvers, @tanstack/react-query, next-intl, @directus/sdk, clsx, tailwind-merge, class-variance-authority, lucide-react
- [x] Design tokens brand board appliqués dans `globals.css` (voir section Identité visuelle) — couleurs converties en OKLCH exact
- [x] **INIT-3** i18n complet : `src/i18n/{routing,navigation,request}.ts`, `src/proxy.ts` (convention Next 16), `src/messages/{fr,en}.json` avec copy complet pour Navigation/Footer/HomePage/AboutPage/ExpertisesPage/SolutionsPage/ContactPage
- [x] **CONTENT-A** Rédaction FR/EN complète (voix de marque : affirmatif, sobre, chiffré) pour Home, About, Expertises (11), Solutions (4), Contact. Placeholders `[CLIENT-FILL]` pour données factuelles manquantes (stats impact, adresse, historique, équipe)
- [x] Navbar (`web/src/components/layout/navbar.tsx`) : sticky, logo, 8 liens, CTA, menu mobile via Sheet — testé FR/EN/mobile/desktop dans le navigateur, fonctionnel
- [x] Footer (`web/src/components/layout/footer.tsx`) : colonnes Navigation/Expertises/Solutions/Newsletter, wordmark texte (pas d'image, cf. limitation asset)
- [x] Homepage complète (`web/src/app/[locale]/page.tsx`) : Hero (photo `hero.png` + accroche accentuée), Mission (citation + points, transition dégradée), **Impact stats** (photo `kpis.png`, repositionné entre Mission et Expertises — voir ci-dessous), Expertises (grille 8/11), Solutions (4 cartes), News (coming soon), CTA final — build + typecheck + preview navigateur validés
- [x] **Impact stats** (`web/src/components/sections/impact-stats-section.tsx`) : bandeau photo (`public/brand/kpis.png`, enfants scolarisés) + 4 KPI. Valeurs **réelles fournies par le client** (2026-07-06), ne sont plus des `[CLIENT-FILL]` : 50+ projets réalisés, 12+ pays d'intervention, 100+ partenaires & institutions, 1M+ personnes impactées. Layout responsive dédié : sm+ = photo full-bleed avec dégradé + stats overlay (comme la maquette fournie) ; mobile = grille solide séparée de la photo (l'overlay sur visage échouait en lisibilité en 2×2)
- [x] `.claude/launch.json` créé pour lancer le serveur dev via l'outil Preview (`npm run dev` dans `web/`)

## In Progress
- [ ] Reste à construire : pages About / Expertises (index + 11 détails) / Solutions (index + 4 mini-sites) / Réalisations / Innovation / Ressources / Actualités / Carrières / Contact — contenu déjà rédigé dans les messages i18n pour About/Expertises/Solutions/Contact, il manque juste les composants de page.

## Blocked
_(rien — toutes les décisions arch tranchées 2026-07-06)_

## Decisions locked (2026-07-06, révisé 2026-07-10)
- ⚠️ **2026-07-10 : pivot CMS** — Directus abandonné, remplacé par **Payload CMS**. Plan de dev détaillé dans [`PLAN-CMS-PAYLOAD.md`](./PLAN-CMS-PAYLOAD.md). Toutes les tâches `CMS-*`/`DATA-*` ci-dessous référençant Directus sont supersédées par ce nouveau plan (lots 0-7).
- ✅ **Payload** → app Next.js dédiée `cms/`, déployée sur **Render** (recommandé) ou Vercel — cf. PLAN-CMS-PAYLOAD.md
- ✅ **LOT 0 livré (2026-07-10)** : `cms/` scaffoldé (Payload 3.86.0 + Next 16.2.10, template `blank` officiel adapté), `@payloadcms/db-postgres` branché (remplace l'adapter Mongo par défaut), localization FR/EN activée dans `payload.config.ts`, `.env.example`, `docker-compose.yml` (Postgres local dev), ESLint aligné sur `web/`, CI GitHub Actions (`.github/workflows/cms-ci.yml`, lint+typecheck+build avec service Postgres). Vérifié en local : schéma Postgres auto-créé, `/admin` sert l'écran "Create first user", `npm run build` passe. `.claude/launch.json` a une entrée `cms` (port 3001, `web` reste 3000).
- ~~✅ **Directus** → déployé sur **Render** (Docker) — cdc §26 option 2~~ (abandonné)
- ✅ **Analytics** → **Plausible** (self-host optionnel plus tard)
- ✅ **Contenu** → Claude propose les textes (voir section "Content strategy" ci-dessous)
- ✅ **Logos** → vectorisation SVG à produire (livrable design séparé)
- ✅ **Storage média** → **Supabase Storage** (buckets S3-compat, RLS possible) — remplace Cloudflare R2 du cdc

## Next (queued — dépendances ordonnées)

### Phase 0 — Foundations [P0]
- [x] ~~INIT-1, INIT-2, INIT-3~~ — voir Completed
- [ ] **INIT-4** GitHub repo + Actions (lint, typecheck, build) + preview Vercel

### Phase 1 — CMS Directus [P0]
- [ ] **CMS-1** `docker-compose.yml` Directus + Postgres (dev local) + `.env.example`
- [ ] **CMS-2** Modélisation collections (cdc §10) : `pages`, `articles`, `solutions`, `case_studies`, `services`, `partners`, `team`, `testimonials`, `faq`, `downloads`, `media`, `events`, `careers`, `settings`, `navigation`, `footer`, `seo`, `redirects`
- [ ] **CMS-3** Rôles & permissions (Admin / Éditeur / Auteur / Lecteur) + workflow brouillon→publié
- [ ] **CMS-4** i18n natif Directus (translations FR/EN) + versioning + preview tokens
- [ ] **CMS-5** Storage → adapter **Supabase Storage** (extension `directus-extension-supabase-storage` ou driver S3 pointé sur endpoint Supabase)

### Phase 2 — Data layer front [P0]
- [ ] **DATA-1** SDK Directus typé (`@directus/sdk`) + génération TS depuis schema
- [ ] **DATA-2** Fetchers ISR + revalidateTag par collection (webhook Directus → `revalidateTag`)
- [ ] **DATA-3** Preview mode pour éditeurs (draft mode Next.js)

### Phase 3 — Pages [P0 → P2]
- [x] **PG-HOME** [P0] ~~Accueil~~ — livré 2026-07-06 (voir Completed). Reste : brancher sur Directus quand CMS-1/2 prêts (actuellement contenu via `src/messages/*.json` en dur, conforme pour v1 mais à terme cdc exige 100% CMS)
- [x] **PG-ABOUT** [P0] ~~À propos~~ — livré 2026-07-06 (`web/src/app/[locale]/about/page.tsx`). Header réutilisable créé (`page-header.tsx`), sections Histoire/Mission&Vision/Valeurs (7, grille 4+3, réutilise `ExpertiseCard`)/Approche (citation centrée)/Équipe (placeholder honnête, pas de faux profils fabriqués)/CTA final partagé. `[CLIENT-FILL]` visibles tels quels pour histoire et équipe — à combler par le client.
- [ ] **PG-EXPERTISES** [P0] Index + 11 sous-pages (cdc §10) — chaque expertise SEO-optimisée (cdc §23). Copy déjà prête dans `messages.ExpertisesPage.items.*`
- [ ] **PG-SOLUTIONS** [P0] Index + mini-sites KEREYA / PASSBI / AFRIASSESS / Custom. Copy déjà prête dans `messages.SolutionsPage.items.*`
- [ ] **PG-CASES** [P1] Réalisations (contexte, défi, solution, résultats, impact, techs, partenaires)
- [ ] **PG-INNOVATION** [P1] R&D, Publications, Roadmap, Lab IA
- [ ] **PG-RESOURCES** [P1] Blog (MDX via Directus), livres blancs, guides, docs, FAQ
- [ ] **PG-CAREERS** [P2] Culture, métiers, offres, spontanée
- [x] **PG-CONTACT** [P0] ~~Formulaire intelligent~~ — livré 2026-07-06 (`web/src/app/[locale]/contact/page.tsx`). RHF + Zod v4 (`z.email()`), validation localisée FR/EN, route `POST /api/contact` (`web/src/app/api/contact/route.ts`) avec validation serveur miroir + log sans PII. Testé de bout en bout (erreurs de validation + soumission réussie → écran succès). **Reste** : carte + prise de RDV (non demandées, cdc les mentionne en option) ; brancher la route API sur Directus (`contact_submissions`) une fois CMS-1 prêt — actuellement juste un log serveur, aucune persistance.

### Phase 4 — Cross-cutting [P0 → P1]
- [ ] **SEO-1** [P0] Metadata API Next.js, Schema.org, OpenGraph, JSON-LD par type, sitemap, robots, canonical
- [ ] **PERF-1** [P0] Images AVIF, ISR par tag, Server Components par défaut, code splitting, Lighthouse >95
- [ ] **A11Y-1** [P0] WCAG 2.2 AA, focus visible, nav clavier, ARIA — checklist par composant
- [ ] **SEC-1** [P1] CSP strict, headers, rate limit (Cloudflare + middleware), sanitize MDX
- [ ] **ANLY-1** [P1] Plausible (recommandé RGPD) ou GA4

### Phase 5 — Deploy [P1]
- [ ] **DEP-1** Vercel prod + preview + env vars
- [ ] **DEP-2** Directus prod → Render (Web Service Docker) + volume persistant
- [ ] **DEP-3** Cloudflare front (proxy, WAF, cache rules) + Supabase Storage buckets (`media-public`, `media-private`)
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
- `SUPABASE_URL` · `SUPABASE_SERVICE_KEY` · `SUPABASE_DB_URL` (Directus + storage)
- `SUPABASE_STORAGE_BUCKET_PUBLIC` · `SUPABASE_STORAGE_BUCKET_PRIVATE`
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`

## Risks
- **Périmètre très large** (10 sections × mini-sites + CMS complet) → risque de dépassement si tout mené en un sprint. **Mitigation** : livrer d'abord Accueil + Solutions + Contact + CMS branché, puis itérer.
- **Absence de contenu rédigé** → risque de blocage design. **Mitigation** : lorem crédible + relecture par le client par section.
- **Directus self-host** : sauvegardes Postgres + monitoring à ne pas oublier.
- **Perf Lighthouse >95** avec Framer Motion : discipliner les animations, préférer CSS quand possible.

## Session Summary — 2026-07-06

**Completed this session:**
- Lecture intégrale du cdc.md (v2.0) et inventaire du dossier `branding/`
- Décisions arch validées avec le client : Render (Directus), Plausible, Supabase Storage, contenu proposé par Claude
- Découverte que le brand board PNG fait autorité sur le cdc texte pour couleurs/typo — client a confirmé
- Bootstrap complet Next.js 16.2.10 + shadcn/ui + Tailwind v4 + i18n next-intl (FR/EN)
- Rédaction complète du contenu FR/EN pour 5 pages (Home/About/Expertises/Solutions/Contact)
- Navbar + Footer + Homepage entièrement construits et vérifiés dans le navigateur (desktop, mobile, menu burger, FR, EN)
- Vérification WCAG AA des contrastes de couleurs (règle cyan documentée)

**Handoffs produced:** aucun (tout traité dans cette session)

**NOTES.md updated:** yes

**Next session should start with:**
> Read NOTES.md, puis construire les pages restantes dans l'ordre : PG-CONTACT (le formulaire est le plus proche d'une conversion business), PG-SOLUTIONS (mini-sites produits), PG-ABOUT, PG-EXPERTISES. Le contenu FR/EN est déjà rédigé dans `web/src/messages/{fr,en}.json` — ne pas le réinventer. Envisager de lancer **CMS-1** (docker-compose Directus) en parallèle puisque le layout/design system est maintenant stable.

---

## Session Summary — 2026-07-10 (re-init)

**Contexte** : nouvelle session, l'utilisateur a lancé `/tech-lead-orchestrator /init read cdc.md and branding folder`. NOTES.md déjà en place et complet, donc pas de rewrite.

**Vérifications effectuées** :
- ✅ Relecture `cdc.md` (1338 lignes, v2.0 + PRD) — cohérent avec l'analyse du 2026-07-06
- ✅ Audit `branding/` — logos KEREYA + Impact Solutions (variantes claire/sombre + icônes) présents
- ✅ État `web/` : Next.js 16.2.10 + shadcn/ui + Tailwind v4 + next-intl + `@directus/sdk` installé · sections `solution-card`, `products-carousel` livrées · Home + About + Contact livrées per NOTES précédent

**État réel du projet (rappel)** :
- Livré : Home, About, Contact (formulaire fonctionnel avec route API), Navbar, Footer, i18n FR/EN complet, design tokens brand board, KPI stats section
- Reste P0 : PG-EXPERTISES (index + 11 sous-pages) · PG-SOLUTIONS (index + 4 mini-sites) · CMS Directus (docker-compose, collections, permissions) · DATA layer branché · SEO/PERF/A11Y avant prod
- Reste P1/P2 : Réalisations, Innovation, Ressources, Actualités, Carrières · déploiement (Vercel + Render + Cloudflare + DNS)

**Priorité recommandée pour la prochaine action** :
1. **PG-SOLUTIONS** (index + 4 mini-sites KEREYA/PASSBI/AFRIASSESS/Custom) — copy déjà prête dans `messages.SolutionsPage.items.*`, logo KEREYA disponible dans `branding/kereya.png` / `kereya-2.png`
2. **PG-EXPERTISES** (index + 11 sous-pages) — copy prête dans `messages.ExpertisesPage.items.*`
3. En parallèle : **CMS-1** (docker-compose Directus + Postgres local) — débloque toute la Phase 2 Data layer

**NOTES.md updated:** yes (session line seulement, plan intact)

**Next session should start with:**
> Read NOTES.md · lancer PG-SOLUTIONS (page index + 4 mini-sites) OU CMS-1 (docker-compose Directus) selon la préférence utilisateur.
