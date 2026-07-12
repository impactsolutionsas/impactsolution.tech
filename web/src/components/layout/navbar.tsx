import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Menu, ArrowRight } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { SOLUTION_KEYS, SOLUTIONS } from "@/lib/solutions";

const NAV_ITEMS = [
  { key: "about", href: "/about" },
  { key: "expertise", href: "/expertise" },
  { key: "caseStudies", href: "/case-studies" },
  { key: "news", href: "/news" },
  { key: "careers", href: "/careers" },
] as const;

export async function Navbar() {
  const [t, tSol] = await Promise.all([
    getTranslations("Navigation"),
    getTranslations("SolutionsPage"),
  ]);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={t("home")}
        >
          <Image
            src="/brand/logo-light.png"
            alt="Impact Solutions"
            width={250}
            height={60}
            priority
            className="h-8 w-auto sm:h-9"
          />
        </Link>

        <nav aria-label="Primary" className="hidden items-center lg:flex">
          <NavigationMenu viewport={false}>
            <NavigationMenuList className="gap-1">
              <NavigationMenuItem>
                <Link
                  href="/about"
                  className="rounded-md px-3 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {t("about")}
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link
                  href="/expertise"
                  className="rounded-md px-3 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {t("expertise")}
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="rounded-md bg-transparent px-3 py-2 text-sm font-medium text-foreground/70 hover:bg-muted hover:text-foreground data-open:bg-muted data-open:text-foreground">
                  {t("solutions")}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[560px] grid-cols-2 gap-1 p-2">
                    {SOLUTION_KEYS.map((key) => {
                      const meta = SOLUTIONS[key];
                      const Icon = meta.icon;
                      return (
                        <li key={key}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={`/solutions/${key}`}
                              className="flex items-start gap-3 rounded-lg p-3 hover:bg-muted"
                            >
                              <span
                                className="flex size-9 shrink-0 items-center justify-center rounded-lg"
                                style={{ backgroundColor: `${meta.accent}1A` }}
                              >
                                <Icon
                                  className="size-[18px]"
                                  style={{ color: meta.accentSafe }}
                                  strokeWidth={1.75}
                                />
                              </span>
                              <span className="flex flex-col gap-0.5">
                                <span className="text-sm font-semibold text-foreground">
                                  {tSol(`items.${key}.name`)}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {tSol(`items.${key}.tagline`)}
                                </span>
                              </span>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="border-t border-border p-2">
                    <NavigationMenuLink asChild>
                      <Link
                        href="/solutions"
                        className="flex items-center justify-between rounded-lg p-2.5 text-sm font-medium text-primary hover:bg-muted"
                      >
                        {tSol("cta")}
                        <ArrowRight className="size-4" />
                      </Link>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link
                  href="/news"
                  className="rounded-md px-3 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {t("news")}
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <Button asChild size="sm" variant="ghost">
            <Link href="/contact">{t("contact")}</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/contact">{t("cta")}</Link>
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label="Menu"
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:max-w-sm">
            <SheetHeader>
              <SheetTitle>
                <Image
                  src="/brand/logo-light.png"
                  alt="Impact Solutions"
                  width={150}
                  height={36}
                  className="h-7 w-auto"
                />
              </SheetTitle>
            </SheetHeader>
            <nav
              aria-label="Mobile"
              className="flex flex-1 flex-col gap-1 overflow-y-auto px-4"
            >
              {NAV_ITEMS.slice(0, 2).map((item) => (
                <SheetClose asChild key={item.key}>
                  <Link
                    href={item.href}
                    className="rounded-md px-3 py-2.5 text-base font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {t(item.key)}
                  </Link>
                </SheetClose>
              ))}

              <span className="px-3 pt-3 pb-1 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                {t("solutions")}
              </span>
              {SOLUTION_KEYS.map((key) => {
                const meta = SOLUTIONS[key];
                const Icon = meta.icon;
                return (
                  <SheetClose asChild key={key}>
                    <Link
                      href={`/solutions/${key}`}
                      className="flex items-center gap-3 rounded-md px-3 py-2.5 text-base font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
                    >
                      <span
                        className="flex size-8 shrink-0 items-center justify-center rounded-lg"
                        style={{ backgroundColor: `${meta.accent}1A` }}
                      >
                        <Icon
                          className="size-4"
                          style={{ color: meta.accentSafe }}
                          strokeWidth={1.75}
                        />
                      </span>
                      {tSol(`items.${key}.name`)}
                    </Link>
                  </SheetClose>
                );
              })}

              <div className="mt-2 border-t border-border pt-2">
                {NAV_ITEMS.slice(2).map((item) => (
                  <SheetClose asChild key={item.key}>
                    <Link
                      href={item.href}
                      className="block rounded-md px-3 py-2.5 text-base font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
                    >
                      {t(item.key)}
                    </Link>
                  </SheetClose>
                ))}
              </div>
            </nav>
            <div className="mt-auto flex flex-col gap-2 border-t border-border p-4">
              <SheetClose asChild>
                <Button asChild variant="outline">
                  <Link href="/contact">{t("contact")}</Link>
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button asChild>
                  <Link href="/contact">{t("cta")}</Link>
                </Button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
