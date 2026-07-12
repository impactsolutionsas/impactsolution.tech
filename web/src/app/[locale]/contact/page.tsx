import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { MapPin, Mail, Phone, Clock, CalendarDays } from "lucide-react";

import { PageHeader } from "@/components/sections/page-header";
import { ContactForm } from "@/components/sections/contact-form";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("ContactPage");
  return {
    title: t("hero.title"),
  };
}

export default async function ContactPage() {
  const t = await getTranslations("ContactPage");

  const subjects: string[] = t.raw("form.subjects");

  return (
    <>
      <PageHeader
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.subtitle")}
      />

      <section className="relative border-t border-border">
        {/* Dot-grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
          {/* Form column */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-border bg-background p-6 shadow-sm sm:p-8">
              <ContactForm
                messages={{
                  nameLabel: t("form.nameLabel"),
                  namePlaceholder: t("form.namePlaceholder"),
                  nameError: t("form.nameError"),
                  emailLabel: t("form.emailLabel"),
                  emailPlaceholder: t("form.emailPlaceholder"),
                  emailError: t("form.emailError"),
                  organizationLabel: t("form.organizationLabel"),
                  organizationPlaceholder: t("form.organizationPlaceholder"),
                  organizationError: t("form.organizationError"),
                  subjectLabel: t("form.subjectLabel"),
                  subjects,
                  messageLabel: t("form.messageLabel"),
                  messagePlaceholder: t("form.messagePlaceholder"),
                  messageError: t("form.messageError"),
                  submit: t("form.submit"),
                  submitting: t("form.submitting"),
                  privacyNote: t("form.privacyNote"),
                  successTitle: t("form.successTitle"),
                  successBody: t("form.successBody"),
                  successAction: t("form.successAction"),
                  errorBody: t("form.errorBody"),
                }}
              />
            </div>
          </div>

          {/* Info sidebar */}
          <div className="flex flex-col gap-6 lg:col-span-4 lg:col-start-9">
            {/* Contact details card */}
            <div className="flex flex-col gap-5 rounded-2xl border border-border bg-muted/40 p-6">
              <h2 className="font-heading text-base font-bold text-foreground">
                {t("info.title")}
              </h2>
              <ul className="flex flex-col gap-4">
                <li className="flex items-start gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/5 text-primary">
                    <MapPin className="size-4" strokeWidth={1.75} />
                  </span>
                  <span className="flex flex-col gap-0.5">
                    <span className="text-xs font-medium text-muted-foreground">
                      {t("info.addressLabel")}
                    </span>
                    <span className="text-sm text-foreground">
                      {t("info.address")}
                    </span>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/5 text-primary">
                    <Mail className="size-4" strokeWidth={1.75} />
                  </span>
                  <span className="flex flex-col gap-0.5">
                    <span className="text-xs font-medium text-muted-foreground">
                      {t("info.emailLabel2")}
                    </span>
                    <a
                      href={`mailto:${t("info.email")}`}
                      className="text-sm text-foreground underline-offset-4 hover:underline"
                    >
                      {t("info.email")}
                    </a>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/5 text-primary">
                    <Phone className="size-4" strokeWidth={1.75} />
                  </span>
                  <span className="flex flex-col gap-0.5">
                    <span className="text-xs font-medium text-muted-foreground">
                      {t("info.phoneLabel")}
                    </span>
                    <a
                      href={`tel:${t("info.phone").replace(/\s/g, "")}`}
                      className="text-sm text-foreground underline-offset-4 hover:underline"
                    >
                      {t("info.phone")}
                    </a>
                  </span>
                </li>
              </ul>
            </div>

            {/* Response time card */}
            <div className="flex items-start gap-3 rounded-2xl border border-border bg-muted/40 p-6">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-green-500/10 text-green-600 dark:text-green-400">
                <Clock className="size-4" strokeWidth={1.75} />
              </span>
              <span className="flex flex-col gap-0.5">
                <span className="text-sm font-semibold text-foreground">
                  {t("info.responseTitle")}
                </span>
                <span className="text-sm text-muted-foreground">
                  {t("info.responseBody")}
                </span>
              </span>
            </div>

            {/* Availability card */}
            <div className="flex items-start gap-3 rounded-2xl border border-border bg-muted/40 p-6">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/5 text-primary">
                <CalendarDays className="size-4" strokeWidth={1.75} />
              </span>
              <span className="flex flex-col gap-0.5">
                <span className="text-sm font-semibold text-foreground">
                  {t("info.availabilityTitle")}
                </span>
                <span className="text-sm text-muted-foreground">
                  {t("info.availabilityBody")}
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
