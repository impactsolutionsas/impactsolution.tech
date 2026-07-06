import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Menu } from "lucide-react";

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

const NAV_ITEMS = [
  { key: "about", href: "/about" },
  { key: "expertise", href: "/expertise" },
  { key: "solutions", href: "/solutions" },
  { key: "caseStudies", href: "/case-studies" },
  { key: "innovation", href: "/innovation" },
  { key: "resources", href: "/resources" },
  { key: "news", href: "/news" },
  { key: "careers", href: "/careers" },
] as const;

export async function Navbar() {
  const t = await getTranslations("Navigation");

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
            width={168}
            height={40}
            priority
            className="h-8 w-auto sm:h-9"
          />
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 lg:flex"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {t(item.key)}
            </Link>
          ))}
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
              className="flex flex-1 flex-col gap-1 px-4"
            >
              {NAV_ITEMS.map((item) => (
                <SheetClose asChild key={item.key}>
                  <Link
                    href={item.href}
                    className="rounded-md px-3 py-2.5 text-base font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {t(item.key)}
                  </Link>
                </SheetClose>
              ))}
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
