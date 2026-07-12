import type { LucideIcon } from "lucide-react";
import {
  BrainCircuit,
  HeartPulse,
  Landmark,
  Building2,
  Sprout,
  GraduationCap,
  Truck,
  Building,
  ShieldCheck,
  Cloud,
  BarChart3,
  RefreshCw,
  Code2,
  Smartphone,
  Container,
  GitBranch,
  Lightbulb,
  Rocket,
  Trophy,
  FileText,
  Calendar,
  BookOpen,
  Eye,
} from "lucide-react";

export const ARTICLE_CATEGORIES = [
  "ai",
  "ehealth",
  "fintech",
  "govtech",
  "agritech",
  "education",
  "logistics",
  "smart-cities",
  "cybersecurity",
  "cloud",
  "data-analytics",
  "digital-transformation",
  "web-development",
  "mobile",
  "devops",
  "open-source",
  "innovation",
  "african-startups",
  "success-stories",
  "case-studies",
  "events",
  "tutorials",
  "tech-watch",
] as const;

export type ArticleCategory = (typeof ARTICLE_CATEGORIES)[number];

export type ArticleLevel = "beginner" | "intermediate" | "expert";

export const CATEGORY_ICONS: Record<ArticleCategory, LucideIcon> = {
  ai: BrainCircuit,
  ehealth: HeartPulse,
  fintech: Landmark,
  govtech: Building2,
  agritech: Sprout,
  education: GraduationCap,
  logistics: Truck,
  "smart-cities": Building,
  cybersecurity: ShieldCheck,
  cloud: Cloud,
  "data-analytics": BarChart3,
  "digital-transformation": RefreshCw,
  "web-development": Code2,
  mobile: Smartphone,
  devops: Container,
  "open-source": GitBranch,
  innovation: Lightbulb,
  "african-startups": Rocket,
  "success-stories": Trophy,
  "case-studies": FileText,
  events: Calendar,
  tutorials: BookOpen,
  "tech-watch": Eye,
};

export interface ArticleAuthor {
  name: string;
  role: string;
  avatar: string;
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  categories: ArticleCategory[];
  tags: string[];
  author: ArticleAuthor;
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  level: ArticleLevel;
  views: number;
  featured?: boolean;
}

const AUTHORS: Record<string, ArticleAuthor> = {
  diouf: {
    name: "Amadou Diouf",
    role: "CTO & Co-fondateur",
    avatar: "/articles/authors/avatar-placeholder.svg",
  },
  ndiaye: {
    name: "Fatou Ndiaye",
    role: "Lead Data Scientist",
    avatar: "/articles/authors/avatar-placeholder.svg",
  },
  diallo: {
    name: "Moussa Diallo",
    role: "Senior Software Engineer",
    avatar: "/articles/authors/avatar-placeholder.svg",
  },
  fall: {
    name: "Aïssatou Fall",
    role: "Product Manager",
    avatar: "/articles/authors/avatar-placeholder.svg",
  },
};

export const ARTICLES: Article[] = [
  {
    slug: "trois-retards-mortalite-maternelle-neonatale",
    title:
      "Les trois retards : comprendre pourquoi des mères et des nouveau-nés meurent encore de causes évitables",
    excerpt:
      "Chaque jour, plus de 700 femmes meurent de complications liées à la grossesse. Le modèle des trois retards explique pourquoi — et comment le numérique peut changer la donne.",
    content: `
## Chaque grossesse devrait se terminer par une naissance heureuse

Donner la vie ne devrait jamais mettre une femme en danger. Pourtant, chaque jour, plus de 700 femmes meurent dans le monde de complications liées à la grossesse ou à l'accouchement. La grande majorité de ces décès pourrait être évitée grâce à des soins appropriés et accessibles. L'Afrique subsaharienne reste la région la plus touchée, concentrant près de 70 % des décès maternels mondiaux.

**Mais pourquoi ces décès surviennent-ils encore ?**

Les chercheurs ont montré que, bien souvent, ce ne sont pas uniquement les complications médicales qui sont en cause. Le véritable problème réside dans les retards qui empêchent une femme de recevoir les soins dont elle a besoin au bon moment.

## Le modèle des « trois retards »

Depuis plus de 30 ans, les professionnels de santé utilisent le modèle des trois retards, développé par Deborah Thaddeus et Deborah Maine, pour comprendre les causes des décès maternels évitables.

Le principe est simple : lorsqu'une complication survient pendant la grossesse ou l'accouchement, chaque minute compte.

Si l'un de ces trois maillons échoue, le risque de décès augmente considérablement.

## Premier retard : décider de consulter

Le premier obstacle apparaît souvent à la maison.

Une femme enceinte peut hésiter à se rendre dans un centre de santé parce qu'elle pense que les douleurs sont normales, qu'elle manque d'informations sur les signes de danger ou qu'elle ne dispose pas des ressources financières nécessaires. Dans certaines communautés, la décision dépend également de la famille ou du conjoint.

Ce retard peut transformer une complication traitable en urgence vitale.

## Deuxième retard : atteindre une structure de santé

Même lorsqu'une décision est prise rapidement, encore faut-il pouvoir rejoindre un établissement de santé.

Dans de nombreuses zones rurales, les distances sont longues, les routes difficiles et les moyens de transport rares ou coûteux. Une ambulance peut être indisponible ou arriver trop tard.

Pour une femme victime d'une hémorragie, quelques heures de retard peuvent faire la différence entre la vie et la mort.

## Troisième retard : recevoir des soins de qualité

Arriver à l'hôpital ne garantit pas toujours une prise en charge immédiate.

Le personnel peut être insuffisant, certains médicaments essentiels indisponibles ou les équipements inadaptés. Des délais administratifs ou un manque de coordination peuvent également retarder les soins.

C'est ce troisième retard qui révèle les défis auxquels sont confrontés de nombreux systèmes de santé : disponibilité des ressources, organisation des services et qualité des soins.

## Pourquoi cela concerne aussi les nouveau-nés ?

La santé de la mère et celle du bébé sont étroitement liées.

Une complication obstétricale peut entraîner :

- une naissance prématurée
- une asphyxie à la naissance
- un faible poids de naissance
- ou le décès du nouveau-né

Améliorer les soins maternels permet donc également d'améliorer la survie des nouveau-nés.

## Le numérique peut faire la différence

Les technologies numériques offrent aujourd'hui de nouvelles possibilités pour réduire ces retards :

- **Identifier précocement** les grossesses à risque
- **Envoyer des rappels** de consultations prénatales
- **Faciliter la communication** entre les postes de santé et les hôpitaux
- **Coordonner les références** des patientes
- **Suivre les indicateurs** de santé en temps réel

Ces outils ne remplacent pas les professionnels de santé, mais ils les aident à agir plus vite et à mieux coordonner les soins.

## Comment KEREYA contribue à cette mission

C'est précisément dans cette logique qu'a été conçu KEREYA.

La plateforme vise à accompagner les équipes de santé tout au long du parcours de soins, depuis le suivi de la grossesse jusqu'à la référence hospitalière. Elle facilite le partage d'informations entre les acteurs, améliore le suivi des patientes et fournit des données fiables pour aider les districts sanitaires à prendre des décisions éclairées.

KEREYA ne remplace pas les systèmes nationaux existants ; il les complète en apportant des outils de coordination, de suivi et d'aide à la décision adaptés aux réalités des zones rurales.

## À retenir

La plupart des décès maternels et néonatals sont évitables. Les trois retards — décider de consulter, atteindre une structure de santé et recevoir des soins de qualité — restent les principaux obstacles à une prise en charge efficace. En combinant une meilleure organisation des services, des professionnels bien formés et des solutions numériques comme KEREYA, il est possible de réduire ces retards et d'améliorer durablement la santé des mères et des enfants.
    `,
    coverImage: "/articles/trois-retards-mortalite-maternelle.svg",
    categories: ["ehealth", "innovation", "case-studies"],
    tags: [
      "santé maternelle",
      "trois retards",
      "mortalité néonatale",
      "KEREYA",
      "Afrique",
      "santé numérique",
    ],
    author: AUTHORS.diouf,
    publishedAt: "2026-07-11",
    readingTime: 5,
    level: "beginner",
    views: 342,
    featured: true,
  },
  {
    slug: "donnees-sauvent-des-vies-countdown-2030-senegal",
    title:
      "Les données sauvent des vies : ce que révèle le rapport Countdown 2030 sur le Sénégal et comment KEREYA peut renforcer le système de santé",
    excerpt:
      "Le Sénégal dispose d'un système de collecte de données de santé performant grâce à DHIS2. Le principal défi est désormais d'améliorer leur qualité et leur utilisation pour orienter les décisions.",
    content: `
## Les données sont devenues un enjeu de santé publique

Pour améliorer la santé des mères et des enfants, il ne suffit plus de construire des hôpitaux ou de former des professionnels. Il faut également disposer de **données fiables, complètes et disponibles au bon moment** pour orienter les décisions.

C'est précisément l'objectif du rapport **« Analyse des indicateurs de santé reproductive, maternelle, néonatale, infantile et des adolescents »**, réalisé dans le cadre de l'initiative **Countdown to 2030** en collaboration avec le Ministère de la Santé et de l'Action sociale du Sénégal. Le rapport analyse les données issues du système national **DHIS2**, utilisé par les structures de santé pour remonter les informations de routine.

Le constat est encourageant : le Sénégal dispose aujourd'hui d'un système d'information sanitaire de plus en plus robuste. Mais il reste encore des défis à relever pour transformer ces données en décisions capables de sauver des vies.

## Ce que révèle le rapport

Le rapport met en évidence plusieurs avancées importantes.

Le Sénégal a considérablement renforcé la collecte des données de santé grâce à DHIS2. Les autorités sanitaires disposent désormais d'informations régulières sur :

- les consultations prénatales ;
- les accouchements assistés ;
- les vaccinations ;
- la planification familiale ;
- la nutrition ;
- la santé des nouveau-nés et des adolescents.

Ces informations permettent de suivre les progrès réalisés et d'identifier les régions nécessitant davantage d'investissements.

## Le principal défi n'est plus la collecte des données

L'un des messages les plus importants du rapport est que **le défi n'est plus seulement de collecter des données, mais de garantir leur qualité et leur utilisation**.

Parmi les difficultés identifiées :

- des données parfois incomplètes ;
- des retards dans la transmission des informations ;
- des incohérences entre certains indicateurs ;
- une utilisation encore limitée des analyses dans la prise de décision.

Autrement dit, disposer de milliers de données ne suffit pas si elles ne permettent pas d'agir rapidement.

## Pourquoi la qualité des données est-elle si importante ?

Imaginons qu'un district sanitaire constate une augmentation des complications obstétricales.

Si les données sont incomplètes ou arrivent plusieurs semaines plus tard, les responsables ne pourront pas :

- identifier rapidement le problème ;
- mobiliser des équipes supplémentaires ;
- renforcer les stocks de médicaments ;
- organiser des évacuations sanitaires.

À l'inverse, des données fiables permettent d'anticiper les besoins et d'améliorer la qualité des soins.

Les données deviennent alors un véritable outil d'aide à la décision.

## DHIS2 : une base solide pour le système de santé

Le rapport souligne que **DHIS2 constitue aujourd'hui la principale plateforme de gestion des données sanitaires de routine au Sénégal**.

Grâce à ce système, les établissements de santé peuvent transmettre régulièrement leurs indicateurs au niveau du district, de la région puis du ministère.

DHIS2 joue donc un rôle essentiel dans le suivi des programmes de santé publique et dans l'évaluation des progrès vers les Objectifs de développement durable.

## Comment KEREYA peut compléter ce dispositif

Chez **IMPACT SOLUTIONS**, nous pensons que les systèmes nationaux existants constituent une base indispensable. L'objectif de **KEREYA** n'est pas de remplacer DHIS2, mais de le compléter en apportant des fonctionnalités adaptées au suivi opérationnel des patientes.

KEREYA peut notamment contribuer à :

- suivre les grossesses à risque dès le niveau communautaire ;
- améliorer la coordination entre les agents de santé, les postes de santé, les centres de santé et les hôpitaux ;
- faciliter la gestion des références et contre-références ;
- envoyer des alertes en cas de situations à risque ;
- produire des tableaux de bord opérationnels pour les districts sanitaires.

Ainsi, les informations utiles sont disponibles plus rapidement pour les équipes de terrain, tout en restant compatibles avec les systèmes nationaux de suivi.

## Une vision tournée vers la décision

L'avenir des systèmes d'information sanitaire ne repose plus uniquement sur les tableaux de chiffres.

Les professionnels de santé ont besoin de réponses simples à des questions concrètes :

- Quels districts enregistrent une baisse des consultations prénatales ?
- Où observe-t-on une augmentation des complications obstétricales ?
- Quels centres rencontrent des difficultés de référence des patientes ?
- Quelles zones nécessitent une intervention urgente ?

Les technologies numériques, combinées à l'intelligence artificielle et à l'analyse des données, permettent désormais de transformer ces informations en recommandations directement exploitables par les décideurs.

## Des données au service des vies humaines

Le rapport Countdown 2030 rappelle une réalité essentielle : derrière chaque indicateur se trouve une femme, un enfant ou une famille.

Améliorer la qualité des données, accélérer leur circulation et faciliter leur utilisation ne constitue pas seulement un enjeu technique. C'est un levier majeur pour réduire les décès évitables et renforcer l'efficacité des politiques de santé.

Chez IMPACT SOLUTIONS, cette conviction guide le développement de **KEREYA** : concevoir des solutions numériques qui complètent les systèmes existants, renforcent les capacités des professionnels de santé et transforment les données en décisions capables d'améliorer durablement la santé des populations africaines.

## À retenir

- Le Sénégal dispose d'un système national de collecte des données de santé de plus en plus performant grâce à DHIS2.
- Le principal défi est désormais d'améliorer la qualité, la rapidité et l'utilisation des données pour orienter les décisions.
- Les solutions numériques peuvent compléter les systèmes existants en facilitant le suivi des patientes, la coordination des soins et l'analyse en temps réel.
- KEREYA s'inscrit dans cette approche en renforçant le pilotage opérationnel de la santé maternelle, néonatale et infantile sans se substituer aux plateformes nationales.

## Références

- Rapport *Analyse des indicateurs SRMNIA-N de routine* (Countdown to 2030, Ministère de la Santé et de l'Action sociale du Sénégal).
- *Analyse des indicateurs de santé reproductive, maternelle, néonatale, infantile et des adolescents – Sénégal 2019-2023*.
- Countdown to 2030 – Maternal and Newborn Health.
- Countdown to 2030 – Country analysis: synthesis and data quality approach.
    `,
    coverImage: "/articles/donnees-countdown-2030-senegal.svg",
    categories: ["ehealth", "data-analytics", "innovation"],
    tags: [
      "données de santé",
      "DHIS2",
      "Countdown 2030",
      "Sénégal",
      "KEREYA",
      "santé maternelle",
    ],
    author: AUTHORS.diouf,
    publishedAt: "2026-07-09",
    readingTime: 6,
    level: "beginner",
    views: 567,
  },
  {
    slug: "intelligence-artificielle-ethique-sante-afrique",
    title:
      "L'intelligence artificielle peut-elle sauver des vies ? Vers une IA éthique et responsable au service de la santé",
    excerpt:
      "L'IA transforme la santé, mais son efficacité dépendra de la confiance que les professionnels et patients pourront lui accorder. Comment développer une IA transparente et responsable.",
    content: `
## L'intelligence artificielle transforme déjà la santé

L'intelligence artificielle (IA) est en train de révolutionner de nombreux secteurs, et la santé ne fait pas exception. Aujourd'hui, des systèmes d'IA sont capables d'aider les médecins à analyser des images médicales, d'identifier des patients à risque, de prédire certaines complications ou encore de faciliter la gestion des hôpitaux.

Mais dans un domaine aussi sensible que la santé, une question essentielle se pose :

**Comment utiliser l'IA sans mettre les patients en danger ?**

L'objectif ne doit pas être de remplacer les professionnels de santé, mais de leur fournir des outils fiables, transparents et responsables pour améliorer la qualité des soins. C'est d'ailleurs la position défendue par l'Organisation mondiale de la Santé (OMS), qui encourage une utilisation de l'IA centrée sur l'humain, encadrée par des règles éthiques strictes.

## Les promesses de l'IA pour les systèmes de santé

Lorsqu'elle est correctement utilisée, l'intelligence artificielle peut apporter une réelle valeur ajoutée.

Elle peut notamment permettre de :

- détecter plus rapidement les situations à risque ;
- analyser de grandes quantités de données en quelques secondes ;
- aider les professionnels à prendre des décisions fondées sur les preuves ;
- automatiser certaines tâches administratives ;
- produire des tableaux de bord pour les responsables de santé ;
- améliorer la coordination entre les différents niveaux du système de santé.

Dans les zones rurales, où les ressources médicales sont parfois limitées, ces outils peuvent contribuer à améliorer l'accès aux soins et à optimiser l'utilisation des ressources disponibles.

## Mais une IA en santé ne peut pas fonctionner sans règles

Une intelligence artificielle n'est pas infaillible.

Elle peut produire des informations incorrectes, reproduire des biais présents dans les données ou donner une réponse avec un niveau de confiance qui ne reflète pas la réalité.

Dans le domaine médical, ces erreurs peuvent avoir des conséquences importantes.

C'est pourquoi l'OMS recommande que toute IA utilisée en santé respecte plusieurs principes fondamentaux :

- protéger la vie privée des patients ;
- garantir la sécurité des utilisateurs ;
- être transparente et explicable ;
- éviter les discriminations ;
- rester sous la supervision de professionnels de santé ;
- être régulièrement évaluée et améliorée.

## Qu'est-ce que la Constitutional AI ?

Chez Anthropic, une approche originale appelée **Constitutional AI** a été développée pour rendre les systèmes d'IA plus sûrs.

Le principe est simple : au lieu de répondre uniquement en fonction de ce qu'elle a appris, l'IA s'appuie également sur un ensemble explicite de principes qui guident son comportement.

Ces principes encouragent notamment le modèle à :

- être honnête lorsqu'il ne connaît pas une réponse ;
- éviter les contenus dangereux ;
- expliquer son raisonnement de manière compréhensible ;
- reconnaître ses limites ;
- privilégier la sécurité des utilisateurs.

Cette approche vise à rendre les modèles plus fiables, plus transparents et plus respectueux des valeurs humaines.

## À quoi pourrait ressembler une IA responsable dans KEREYA ?

Chez IMPACT SOLUTIONS, nous pensons que l'IA doit rester **un assistant**, jamais un remplaçant du personnel médical.

Dans une plateforme comme **KEREYA**, l'IA pourrait par exemple :

- identifier automatiquement les grossesses à haut risque ;
- détecter les rendez-vous de suivi manqués ;
- alerter les équipes lorsqu'une référence devient urgente ;
- analyser les tendances observées dans un district sanitaire ;
- générer automatiquement des rapports pour les responsables de santé.

Mais surtout, chaque recommandation devrait être accompagnée d'une explication claire.

Par exemple :

> **Risque élevé détecté** — Cette alerte est générée car la patiente présente une hypertension, une grossesse multiple et deux consultations prénatales manquées. Niveau de confiance : élevé. Action recommandée : évaluation médicale dans les 24 heures.

L'objectif n'est pas que l'IA prenne une décision à la place du professionnel, mais qu'elle fournisse des informations utiles, compréhensibles et vérifiables.

## Les principes d'une IA de confiance

Pour être réellement utile, une IA utilisée dans la santé devrait respecter plusieurs engagements.

**Les professionnels gardent toujours le dernier mot.** L'IA ne pose pas un diagnostic. Elle propose une analyse qui doit être validée par un médecin, une sage-femme ou un autre professionnel qualifié.

**Les données des patients sont protégées.** Les informations médicales sont particulièrement sensibles. Elles doivent être sécurisées, chiffrées et accessibles uniquement aux personnes autorisées.

**Les recommandations sont explicables.** Une IA ne devrait jamais répondre uniquement « Risque élevé. » Elle devrait également expliquer pourquoi, sur quelles données elle s'appuie, et quel est son niveau de confiance.

**Les performances sont régulièrement évaluées.** Comme tout outil médical, une IA doit être testée, surveillée et améliorée en continu afin de garantir sa fiabilité.

## Une opportunité pour les systèmes de santé africains

L'Afrique connaît une transformation numérique rapide.

Les systèmes d'information sanitaire se modernisent, les données sont de mieux en mieux collectées et les professionnels disposent progressivement d'outils numériques adaptés à leurs besoins.

L'intelligence artificielle peut accélérer cette transformation, à condition qu'elle soit développée dans le respect des réalités locales, des cadres réglementaires et des principes éthiques.

Pour des plateformes comme **KEREYA**, l'ambition est claire : utiliser l'IA pour aider les équipes de santé à agir plus tôt, mieux coordonner les soins et améliorer les décisions, tout en laissant la responsabilité finale aux professionnels.

## Conclusion

L'intelligence artificielle représente une formidable opportunité pour renforcer les systèmes de santé africains. Toutefois, son efficacité dépendra moins de la puissance des algorithmes que de la confiance que les professionnels et les patients pourront lui accorder.

En s'appuyant sur les recommandations de l'OMS et sur des approches comme la **Constitutional AI**, il est possible de développer une IA plus transparente, plus explicable et plus responsable.

Chez **IMPACT SOLUTIONS**, nous sommes convaincus que l'avenir de la santé numérique ne réside pas dans une IA qui remplace les soignants, mais dans une IA qui les accompagne, les informe et les aide à prendre de meilleures décisions au bénéfice des patients.

## À retenir

- L'IA peut améliorer la prévention, le suivi des patients et la prise de décision.
- En santé, l'IA doit toujours rester sous la supervision des professionnels.
- Les recommandations doivent être explicables, transparentes et fondées sur des données fiables.
- Les principes de l'OMS et l'approche Constitutional AI montrent qu'il est possible de concevoir une IA plus sûre, plus éthique et mieux adaptée aux besoins des systèmes de santé.
    `,
    coverImage: "/articles/ia-ethique-sante-afrique.svg",
    categories: ["ai", "ehealth", "innovation"],
    tags: [
      "intelligence artificielle",
      "IA éthique",
      "Constitutional AI",
      "OMS",
      "KEREYA",
      "santé numérique",
    ],
    author: AUTHORS.diouf,
    publishedAt: "2026-07-07",
    readingTime: 7,
    level: "beginner",
    views: 489,
  },
  {
    slug: "fintech-inclusion-financiere-afrique-ouest",
    title:
      "FinTech et inclusion financière en Afrique de l'Ouest : les modèles qui fonctionnent",
    excerpt:
      "Mobile money, néobanques, assurtech : analyse des modèles FinTech qui réussissent à bancariser les populations non desservies.",
    content: `
## L'opportunité FinTech ouest-africaine

Avec 60% de la population non bancarisée, l'Afrique de l'Ouest est le terrain le plus fertile pour l'innovation financière.

## Les modèles gagnants

- **Mobile Money 2.0** — Au-delà du simple transfert
- **Micro-assurance paramétrique** — Protéger les agriculteurs
- **Crédit scoring alternatif** — L'IA au service de l'inclusion
- **Épargne communautaire digitalisée** — Les tontines numériques

## Impact mesurable

| Indicateur | Avant | Après |
|-----------|-------|-------|
| Taux de bancarisation | 23% | 58% |
| Temps d'accès au crédit | 3 semaines | 48h |
| Coût de transfert | 7% | 1.2% |

## Conclusion

La FinTech africaine ne copie plus les modèles occidentaux. Elle invente ses propres solutions, adaptées à ses propres réalités.
    `,
    coverImage: "/articles/fintech-west-africa.svg",
    categories: ["fintech", "innovation", "african-startups"],
    tags: [
      "FinTech",
      "mobile money",
      "inclusion financière",
      "Afrique de l'Ouest",
    ],
    author: AUTHORS.ndiaye,
    publishedAt: "2026-06-28",
    readingTime: 10,
    level: "beginner",
    views: 1089,
  },
  {
    slug: "cybersecurite-enjeux-entreprises-africaines",
    title:
      "Cybersécurité : les enjeux critiques pour les entreprises africaines en 2026",
    excerpt:
      "Ransomware, phishing, fuite de données : le paysage des menaces cyber en Afrique et les stratégies de défense efficaces.",
    content: `
## État des menaces en Afrique

L'Afrique a connu une augmentation de 300% des cyberattaques entre 2023 et 2026. Les entreprises et institutions sont devenues des cibles privilégiées.

## Les vecteurs d'attaque principaux

1. **Phishing ciblé** — 78% des intrusions commencent par un email
2. **Ransomware** — Multiplication par 5 des demandes de rançon
3. **Attaques supply chain** — Compromission des fournisseurs
4. **Ingénierie sociale** — Exploitation de la confiance

## Stratégies de défense

### Zero Trust Architecture

Le principe « ne faire confiance à personne » est particulièrement adapté aux environnements africains où le BYOD et le travail mobile sont la norme.

### SOC as a Service

Pour les PME qui n'ont pas les moyens d'un SOC interne, les services managés offrent une protection accessible.

## Conclusion

La cybersécurité n'est plus optionnelle. C'est un investissement stratégique qui protège la confiance des clients et la pérennité de l'entreprise.
    `,
    coverImage: "/articles/cybersecurity-africa.svg",
    categories: ["cybersecurity", "digital-transformation"],
    tags: [
      "cybersécurité",
      "ransomware",
      "zero trust",
      "SOC",
      "entreprises africaines",
    ],
    author: AUTHORS.diouf,
    publishedAt: "2026-06-22",
    readingTime: 9,
    level: "intermediate",
    views: 756,
  },
  {
    slug: "data-engineering-lagos-nairobi-dakar",
    title:
      "Data Engineering à l'africaine : retours d'expérience de Lagos, Nairobi et Dakar",
    excerpt:
      "Comment construire des pipelines de données robustes quand l'infrastructure est imprévisible et les données souvent non structurées.",
    content: `
## Les défis du Data Engineering en Afrique

Construire des pipelines de données en Afrique, c'est résoudre des problèmes que les manuels techniques n'abordent pas.

## Patterns éprouvés

- **Ingestion tolérante aux pannes** — Retry exponential avec dead letter queues
- **Data quality en contexte multilingue** — NER pour 50+ langues africaines
- **Stockage hybride** — Cloud + on-premise pour la souveraineté
- **Orchestration légère** — Apache Airflow optimisé pour les petites équipes

## Conclusion

Le Data Engineering africain est un terrain d'innovation. Les contraintes locales produisent des solutions souvent plus élégantes que les approches "standard".
    `,
    coverImage: "/articles/data-engineering-africa.svg",
    categories: ["data-analytics", "cloud", "tutorials"],
    tags: [
      "data engineering",
      "pipelines",
      "Airflow",
      "Afrique",
      "infrastructure",
    ],
    author: AUTHORS.ndiaye,
    publishedAt: "2026-06-15",
    readingTime: 11,
    level: "expert",
    views: 423,
  },
];

export function getArticles(): Article[] {
  return ARTICLES.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getFeaturedArticle(): Article | undefined {
  return ARTICLES.find((a) => a.featured);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: ArticleCategory): Article[] {
  return getArticles().filter((a) => a.categories.includes(category));
}

export function getRelatedArticles(article: Article, limit = 3): Article[] {
  return getArticles()
    .filter(
      (a) =>
        a.slug !== article.slug &&
        a.categories.some((c) => article.categories.includes(c))
    )
    .slice(0, limit);
}

export function getPopularArticles(limit = 4): Article[] {
  return [...ARTICLES].sort((a, b) => b.views - a.views).slice(0, limit);
}

export function getRecentArticles(limit = 6): Article[] {
  return getArticles().slice(0, limit);
}

export function searchArticles(query: string): Article[] {
  const q = query.toLowerCase();
  return getArticles().filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.tags.some((t) => t.toLowerCase().includes(q))
  );
}

export function filterArticles(opts: {
  category?: ArticleCategory;
  level?: ArticleLevel;
  query?: string;
}): Article[] {
  let results = getArticles();
  if (opts.category) {
    results = results.filter((a) => a.categories.includes(opts.category!));
  }
  if (opts.level) {
    results = results.filter((a) => a.level === opts.level);
  }
  if (opts.query) {
    const q = opts.query.toLowerCase();
    results = results.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q))
    );
  }
  return results;
}
