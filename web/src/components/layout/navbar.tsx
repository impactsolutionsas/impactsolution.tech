import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Menu, ArrowRight, Sparkles } from "lucide-react";

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

export async function Navbar() {
  const [t, tSol] = await Promise.all([
    getTranslations("Navigation"),
    getTranslations("SolutionsPage"),
  ]);

  return (
    <header className="fixed top-0 right-0 left-0 z-40 lg:top-4 lg:right-6 lg:left-6">
      <div className="mx-auto max-w-7xl">
        <div className="border-b border-border bg-background/80 backdrop-blur-xl backdrop-saturate-150 lg:rounded-2xl lg:border lg:border-white/15 lg:bg-background/70 lg:shadow-lg lg:shadow-black/[0.04]">
          <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:h-[68px] lg:px-5">
            {/* Logo — left */}
            <Link
              href="/"
              className="flex shrink-0 items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={t("home")}
            >
              <Image
                src="/brand/logo-light.png"
                alt="Impact Solutions"
                width={300}
                height={72}
                priority
                className="h-9 w-auto sm:h-10 lg:h-11"
              />
            </Link>

            {/* Nav — centered */}
            <nav aria-label="Primary" className="hidden flex-1 items-center justify-center lg:flex">
              <NavigationMenu viewport={false}>
                <NavigationMenuList className="gap-0.5">
                  <NavigationMenuItem>
                    <Link
                      href="/about"
                      className="rounded-lg px-3.5 py-2 text-[13px] font-medium text-foreground/65 transition-all duration-200 hover:bg-foreground/[0.04] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {t("about")}
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link
                      href="/expertise"
                      className="rounded-lg px-3.5 py-2 text-[13px] font-medium text-foreground/65 transition-all duration-200 hover:bg-foreground/[0.04] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {t("expertise")}
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="rounded-lg bg-transparent px-3.5 py-2 text-[13px] font-medium text-foreground/65 transition-all duration-200 hover:bg-foreground/[0.04] hover:text-foreground data-open:bg-foreground/[0.04] data-open:text-foreground">
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
                                  className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-muted"
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
                            className="flex items-center justify-between rounded-lg p-2.5 text-sm font-medium text-primary transition-colors hover:bg-muted"
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
                      className="rounded-lg px-3.5 py-2 text-[13px] font-medium text-foreground/65 transition-all duration-200 hover:bg-foreground/[0.04] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {t("news")}
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link
                      href="/careers"
                      className="rounded-lg px-3.5 py-2 text-[13px] font-medium text-foreground/65 transition-all duration-200 hover:bg-foreground/[0.04] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {t("careers")}
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </nav>

            {/* Actions — right */}
            <div className="hidden shrink-0 items-center gap-2.5 lg:flex">
              <Button
                asChild
                size="sm"
                variant="ghost"
                className="text-[13px] text-foreground/65 hover:bg-foreground/[0.04] hover:text-foreground"
              >
                <Link href="/contact">{t("contact")}</Link>
              </Button>
              <Button
                asChild
                size="sm"
                className="group relative h-9 overflow-hidden rounded-lg bg-gradient-to-r from-primary via-primary to-navy-deep px-5 text-[13px] font-semibold text-primary-foreground shadow-md shadow-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:brightness-110"
              >
                <Link href="/contact">
                  <Sparkles className="mr-1.5 size-3.5 opacity-70 transition-opacity group-hover:opacity-100" />
                  {t("cta")}
                </Link>
              </Button>
            </div>

            {/* Mobile trigger */}
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
                      width={200}
                      height={48}
                      className="h-8 w-auto"
                    />
                  </SheetTitle>
                </SheetHeader>
                <nav
                  aria-label="Mobile"
                  className="flex flex-1 flex-col gap-1 overflow-y-auto px-4"
                >
                  <SheetClose asChild>
                    <Link
                      href="/about"
                      className="rounded-lg px-3 py-2.5 text-base font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
                    >
                      {t("about")}
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/expertise"
                      className="rounded-lg px-3 py-2.5 text-base font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
                    >
                      {t("expertise")}
                    </Link>
                  </SheetClose>

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
                          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-base font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
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
                    <SheetClose asChild>
                      <Link
                        href="/news"
                        className="block rounded-lg px-3 py-2.5 text-base font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
                      >
                        {t("news")}
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        href="/careers"
                        className="block rounded-lg px-3 py-2.5 text-base font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
                      >
                        {t("careers")}
                      </Link>
                    </SheetClose>
                  </div>
                </nav>
                <div className="mt-auto flex flex-col gap-2 border-t border-border p-4">
                  <SheetClose asChild>
                    <Button asChild variant="outline" className="rounded-lg">
                      <Link href="/contact">{t("contact")}</Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button
                      asChild
                      className="rounded-lg bg-gradient-to-r from-primary via-primary to-navy-deep font-semibold shadow-md shadow-primary/20"
                    >
                      <Link href="/contact">
                        <Sparkles className="mr-1.5 size-3.5 opacity-70" />
                        {t("cta")}
                      </Link>
                    </Button>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
