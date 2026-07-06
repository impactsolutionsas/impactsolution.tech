import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export async function Footer() {
  const [t, tNav, tExp, tSol] = await Promise.all([
    getTranslations("Footer"),
    getTranslations("Navigation"),
    getTranslations("ExpertisesPage.items"),
    getTranslations("SolutionsPage.items"),
  ]);

  const year = new Date().getFullYear();

  const navLinks = [
    { key: "about", href: "/about" },
    { key: "solutions", href: "/solutions" },
    { key: "caseStudies", href: "/case-studies" },
    { key: "resources", href: "/resources" },
    { key: "careers", href: "/careers" },
    { key: "contact", href: "/contact" },
  ] as const;

  const expertiseLinks = [
    { key: "digitalTransformation", href: "/expertise/digital-transformation" },
    { key: "ai", href: "/expertise/artificial-intelligence" },
    { key: "cloudArchitecture", href: "/expertise/cloud-architecture" },
    { key: "cybersecurity", href: "/expertise/cybersecurity" },
  ] as const;

  const solutionLinks = [
    { key: "kereya", href: "/solutions/kereya" },
    { key: "passbi", href: "/solutions/passbi" },
    { key: "afriassess", href: "/solutions/afriassess" },
    { key: "custom", href: "/solutions/custom" },
  ] as const;

  return (
    <footer className="relative bg-navy-deep text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2 flex flex-col gap-4 sm:col-span-3 lg:col-span-2">
            <span className="font-heading text-lg font-bold tracking-tight text-white">
              IMPACT<span className="text-secondary">SOLUTIONS</span>
            </span>
            <p className="max-w-xs text-sm text-white/60">
              {t("description")}
            </p>
            <p className="text-xs font-semibold tracking-wide text-secondary uppercase">
              {t("tagline")}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-white">
              {t("navigationTitle")}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {tNav(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-white">
              {t("expertiseTitle")}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {expertiseLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {tExp(`${link.key}.title`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-white">
              {t("solutionsTitle")}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {solutionLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {tSol(`${link.key}.name`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 flex flex-col gap-3 sm:col-span-3 lg:col-span-1">
            <h3 className="text-sm font-semibold text-white">
              {t("newsletterTitle")}
            </h3>
            <p className="text-sm text-white/60">
              {t("newsletterDescription")}
            </p>
            <form className="flex flex-col gap-2">
              <Input
                type="email"
                placeholder={t("newsletterPlaceholder")}
                className="border-white/15 bg-white/5 text-white placeholder:text-white/40 focus-visible:ring-secondary"
              />
              <Button
                type="submit"
                variant="secondary"
                className="w-full text-navy-deep"
              >
                {t("newsletterCta")}
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/50">
            {t("copyright", { year })}
          </p>
          <div className="flex gap-6">
            <Link
              href="/legal/privacy"
              className="text-xs text-white/50 hover:text-white"
            >
              {t("legalPrivacy")}
            </Link>
            <Link
              href="/legal/terms"
              className="text-xs text-white/50 hover:text-white"
            >
              {t("legalTerms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
