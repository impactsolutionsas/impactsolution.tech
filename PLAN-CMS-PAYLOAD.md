# Plan de développement — Backoffice CMS (Payload)

> Remplace la section cdc.md §26 (CMS Headless Directus). Décision utilisateur du 2026-07-10 : **Payload CMS** remplace Directus comme solution retenue. Ce document est le plan de référence pour le chantier CMS ; `NOTES.md` reste le journal de session/avancement global du site.

## 0. Pourquoi Payload répond au cahier des charges

Le cdc (§26) exigeait : auto-hébergement, souveraineté des données, rôles/permissions, workflow éditorial (brouillon/validation/publication), versioning, prévisualisation, publication différée, multilingue, SEO natif, API REST/GraphQL, sauvegardes. Payload couvre tout ça nativement, en TypeScript, sans DSL propriétaire :

| Exigence cdc | Réponse Payload |
|---|---|
| Auto-hébergé, code-first | Open source, s'installe comme une app Next.js, schéma défini en TS (versionné dans le repo, pas dans une UI tierce) |
| Rôles & permissions | `access` functions par collection/champ, basées sur un champ `role` dans `Users` |
| Workflow éditorial | `versions.drafts` natif (brouillon → publié), `schedulePublish` pour la publication différée |
| Prévisualisation | `admin.livePreview` (iframe live vers le front Next.js en draft mode) |
| Multilingue FR/EN | `localization` natif (config `locales`, champs `localized: true`) |
| SEO | Plugin `@payloadcms/plugin-seo` (title/description/OG/canonical par doc) |
| API REST/GraphQL | Générées automatiquement par collection, sans config supplémentaire |
| Formulaire contact "intelligent" | Plugin `@payloadcms/plugin-form-builder` (formulaires dynamiques + soumissions stockées) |
| Sauvegardes | Déléguées à Supabase (backups Postgres automatiques + PITR selon plan) |

## 1. Stack retenue

| Couche | Techno |
|---|---|
| CMS | **Payload 3.x** (app Next.js dédiée, séparée du site public) |
| DB | **Supabase Postgres** via `@payloadcms/db-postgres` |
| Storage média | **Supabase Storage** (bucket S3-compatible) via `@payloadcms/storage-s3` |
| Éditeur riche | `@payloadcms/richtext-lexical` |
| Formulaires | `@payloadcms/plugin-form-builder` |
| SEO | `@payloadcms/plugin-seo` |
| Déploiement CMS | **Render** (Web Service Docker, recommandé) — repli possible sur Vercel |
| Déploiement front | **Vercel** (`web/` existant, inchangé) |
| Auth admin | Native Payload (email/password + sessions), 2FA à activer en prod |

## 2. Architecture cible

```
Utilisateur / Éditeur
        │
        ▼
   Cloudflare (proxy, cache, WAF)
        │
   ┌────┴─────────────────────────┐
   ▼                              ▼
Frontend Next.js (web/)     CMS Payload (cms/)
   Vercel                   Render (Docker) ou Vercel
   │  fetch REST/GraphQL         │
   │  + webhook revalidate ◄─────┤ (afterChange hook)
   ▼                              ▼
        Supabase Postgres (schéma partagé, connection pooler)
                              │
                              ▼
                    Supabase Storage (buckets media-public / media-private)
```

Deux apps Next.js distinctes dans le même repo (monorepo) :
- `web/` : site public existant (inchangé dans sa structure).
- `cms/` : nouvelle app, ne contient que Payload (`/admin` + `/api`), aucune page publique.

**Pourquoi séparé plutôt qu'embarqué dans `web/`** : le cdc (§26, objectifs) prévoit de mutualiser à terme une seule instance CMS pour Impact Solutions + KEREYA + PASSBI + AFRIASSESS. Une instance Payload indépendante peut servir plusieurs frontends sans être couplée au cycle de déploiement du site vitrine. Ça correspond aussi à l'architecture découplée déjà actée dans NOTES.md (frontend Vercel / CMS séparé / Supabase).

## 3. Hypothèses retenues (à confirmer, sinon j'ajuste le plan)

- Monorepo unique (`cms/` ajouté à côté de `web/`), pas de repo séparé.
- Render pour le CMS en cible principale (process persistant → cron interne pour publication différée plus simple qu'avec Vercel Cron). Vercel reste un repli documenté si le budget/l'infra impose de tout consolider chez Vercel.
- Une seule instance Supabase (déjà décidée pour Directus) est réutilisée telle quelle pour Payload — pas de nouveau projet Supabase à provisionner.
- Contenu déjà rédigé FR/EN dans `web/src/messages/{fr,en}.json` sert de **données de seed** initiales dans Payload (pas retapé à la main), puis ce fichier est progressivement vidé au profit du CMS.
- Rôles : Admin, Éditeur, Auteur, Lecteur (repris tels quels du cdc).

---

## Découpage en lots

Chaque lot est livrable et testable indépendamment. Ordre = dépendances réelles (un lot peut démarrer dès que ses prérequis sont verts).

### LOT 0 — Setup & fondations infra
**Effort estimé : 1,5 j** · Prérequis : aucun

- Scaffold `cms/` (`npx create-payload-app@latest`, template blank + Postgres)
- Config TypeScript stricte, ESLint aligné sur `web/`
- `@payloadcms/db-postgres` branché sur Supabase (connection string pooler, pas la connexion directe — évite l'épuisement de connexions)
- `.env.example` (`DATABASE_URI`, `PAYLOAD_SECRET`, `SUPABASE_STORAGE_*`, `NEXT_PUBLIC_SITE_URL` pour le live preview)
- `docker-compose.yml` dev local (Postgres local ou pointage direct vers Supabase dev)
- GitHub Actions : lint + typecheck + build pour `cms/` (job séparé de celui de `web/`)

**Done quand** : `npm run dev` dans `cms/` ouvre `/admin`, création du premier compte admin fonctionne, connexion Postgres confirmée.

---

### LOT 1 — Modélisation des données
**Effort estimé : 4 j** · Prérequis : LOT 0

Collections (mapping direct cdc §10/§16) :

- `Pages` — page builder par **blocks** (Hero, Mission, Stats, Cards, RichText, CTA, LogoGrid…) pour Accueil/À propos/Innovation, en réutilisant la structure des sections déjà codées dans `web/src/components/sections/`
- `Solutions` (KEREYA, PASSBI, AFRIASSESS, Custom) — présentation, fonctionnalités, captures, vidéos, documents, partenaires liés, résultats, CTA
- `Expertises` (11 fiches) — chacune avec ses propres champs SEO (cdc §23)
- `Articles` (blog) — titre, corps (lexical), catégories, tags, auteur (relation `Team`), statut, date de publication programmée
- `CaseStudies` (Réalisations) — contexte/défi/solution/résultats/impact/technologies/partenaires, galerie média
- `Resources` (livres blancs, guides, rapports, docs téléchargeables) — fichier + métadonnées
- `Team` — photo, bio, fonction, réseaux sociaux
- `Partners` — logo, description, type de partenariat, lien
- `Testimonials`
- `FAQ` — question/réponse, catégorie
- `JobPostings` (Carrières) — offres, candidature spontanée (formulaire lié)
- `Media` (upload collection, branchée LOT 3)
- `Redirects` — source/destination/type (301/302)

Globals (config site-wide, cdc §16) :
- `Settings` (nom du site, coordonnées, réseaux sociaux, tagline)
- `Navigation` (menu principal + mega menu)
- `Footer`
- `SEODefaults` (title/description/OG par défaut, JSON-LD organisation)

Transverse :
- Champ `seo` (group réutilisable via plugin SEO) sur toutes les collections orientées contenu
- `localization: { locales: ['fr','en'], defaultLocale: 'fr' }` activé globalement, champs de contenu marqués `localized: true`
- Relations croisées (Solutions ↔ CaseStudies ↔ Partners ↔ Testimonials)

**Done quand** : toutes les collections/globals sont typés (`payload generate:types`), un doc de test créé dans chaque collection s'affiche correctement dans `/admin`, FR/EN switchable.

---

### LOT 2 — Auth, rôles & workflow éditorial
**Effort estimé : 2 j** · Prérequis : LOT 1

- `Users` collection : champ `role` (`admin` | `editor` | `author` | `viewer`), auth Payload native
- Fonctions `access` par collection : lecture publique (API) vs écriture selon rôle ; un `author` ne modifie que ses propres `Articles`, un `viewer` lecture seule back-office
- `versions.drafts.autosave` + `schedulePublish` activés sur les collections éditoriales (Pages, Articles, Solutions, CaseStudies, Resources)
- `admin.livePreview` configuré (URL du front `web/` en dev/preview/prod, iframe avec draft mode Next.js)
- 2FA sur les comptes admin (prod uniquement)

**Done quand** : un compte `editor` peut créer un brouillon, le prévisualiser en live, le programmer, puis un `admin` (ou lui-même si autorisé) le publie ; un `viewer` ne peut rien modifier.

---

### LOT 3 — Media & Storage Supabase
**Effort estimé : 1,5 j** · Prérequis : LOT 0

- `@payloadcms/storage-s3` configuré avec l'endpoint S3-compatible de Supabase Storage
- Deux buckets : `media-public` (images/vidéos du site, accès public) et `media-private` (documents sous formulaire/gated, cdc mentionne des téléchargements contrôlés)
- Config `imageSizes` (thumbnail/card/hero/og) + génération AVIF/WebP à l'upload (`sharp`)
- Politique RLS Supabase sur `media-private` si accès restreint nécessaire

**Done quand** : un upload dans `/admin` atterrit dans le bon bucket Supabase, les variantes de taille sont générées, les URLs publiques servent correctement depuis le front.

---

### LOT 4 — Intégration API côté front (`web/`)
**Effort estimé : 3 j** · Prérequis : LOT 1, LOT 3 (au moins un jeu de données réel)

- Client typé : réutilisation des types générés par Payload (`payload-types.ts` partagé ou dupliqué dans `web/src/lib/cms/`)
- Fetchers par collection avec `fetch` + `next: { tags: [...] }` (cache Next.js), pas de client React Query pour le contenu CMS (Server Components d'abord, cf. cdc §21 instructions)
- Endpoint `POST /api/revalidate` côté `web/` déclenché par un hook `afterChange`/`afterDelete` de Payload (`cms/` → webhook signé → `revalidateTag`)
- Draft mode Next.js branché sur `admin.livePreview` (LOT 2)
- Migration progressive du contenu FR/EN de `src/messages/*.json` vers les collections Payload (Home, About, Contact d'abord — déjà livrées, non bloquantes)

**Done quand** : une modification publiée dans `/admin` apparaît sur le site en < 60 s sans redeploy ; le mode preview affiche un brouillon non publié à un éditeur connecté.

---

### LOT 5 — Pages front restantes, branchées CMS
**Effort estimé : 6-8 j** (réutilise le travail NOTES.md Phase 3, remplace le contenu JSON par des fetchers CMS) · Prérequis : LOT 4

- `PG-EXPERTISES` (index + 11 fiches) — lues depuis `Expertises`
- `PG-SOLUTIONS` (index + 4 mini-sites) — lues depuis `Solutions`
- `PG-CASES` (Réalisations) — `CaseStudies`
- `PG-INNOVATION` — page `Pages` (blocks) + `Articles` filtrés catégorie R&D
- `PG-RESOURCES` (blog + ressources) — `Articles` + `Resources`, pagination, recherche
- `PG-CAREERS` — `JobPostings` + formulaire candidature spontanée (`plugin-form-builder`)
- Formulaire contact existant (`web/src/app/api/contact/route.ts`) : bascule de la persistance "log serveur" vers une soumission Payload (`plugin-form-builder` ou collection `ContactSubmissions` dédiée)

**Done quand** : plus aucun contenu éditorial n'est codé en dur (conforme cdc §21 "ne jamais coder des contenus statiques").

---

### LOT 6 — SEO, Perf, A11y, Sécurité (cross-cutting)
**Effort estimé : 3 j** · Prérequis : LOT 5 en grande partie livré

- Metadata API Next.js alimentée par le champ `seo` de chaque doc CMS
- Sitemap dynamique (généré depuis les collections publiées) + `robots.txt`
- JSON-LD par type de contenu (Organization, Article, JobPosting…)
- Lighthouse > 95, images servies en AVIF via Payload/Supabase
- WCAG 2.2 AA (déjà en partie fait sur Home/About/Contact — étendre aux nouvelles pages)
- Sécurité : CSP, rate limiting sur `/admin` et sur les endpoints de soumission de formulaire, protection de la route `/admin` (Cloudflare Access ou IP allowlist en option), secrets de webhook signés

**Done quand** : Lighthouse ≥ 95 sur les pages clés, `/admin` non indexable et protégé, formulaires rate-limités.

---

### LOT 7 — Déploiement & Ops
**Effort estimé : 2 j** · Prérequis : tous les lots précédents en l'état "fonctionnel en dev"

- `cms/` : Dockerfile + déploiement Render (Web Service), migrations Payload exécutées au démarrage (`payload migrate`)
- Variables d'environnement prod (Render + Vercel) : `DATABASE_URI` (pooler Supabase), `PAYLOAD_SECRET`, clés S3 Supabase, `REVALIDATE_SECRET`
- Sauvegardes : vérifier la politique de backup Supabase (PITR) + export manuel périodique documenté
- Cloudflare devant le front (et éventuellement devant `/admin` pour une couche WAF supplémentaire)
- Domaine/DNS/SSL pour `cms.impactsolution.tech` (ou équivalent) + `www`
- Monitoring basique (uptime CMS, logs Render, alerte si webhook de revalidation échoue)

**Done quand** : CMS et front accessibles en prod sur les domaines finaux, publication d'un contenu test visible en prod de bout en bout, backup vérifié une fois manuellement.

---

## Récapitulatif effort

| Lot | Contenu | Effort estimé |
|---|---|---|
| 0 | Setup & fondations infra | 1,5 j |
| 1 | Modélisation des données | 4 j |
| 2 | Auth, rôles, workflow éditorial | 2 j |
| 3 | Media & Storage Supabase | 1,5 j |
| 4 | Intégration API front | 3 j |
| 5 | Pages front restantes | 6-8 j |
| 6 | SEO/Perf/A11y/Sécurité | 3 j |
| 7 | Déploiement & Ops | 2 j |
| **Total** | | **~23-25 j** (1 dev senior, hors imprévus/allers-retours contenu client) |

## Roadmap post-lancement (cdc §24, hors périmètre de ce plan)

Instance Payload mutualisée pour KEREYA/PASSBI/AFRIASSESS · portail partenaires · centre de connaissances · developer portal / API publique · médiathèque enrichie — chacun de ces chantiers ajoute des collections/rôles à l'instance existante plutôt que de repartir de zéro, une fois LOT 0-7 stabilisés.
