import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { MapPin, Mail, Phone } from "lucide-react";

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

  const infoItems = [
    { icon: MapPin, label: t("info.addressLabel"), value: t("info.address") },
    { icon: Mail, label: t("info.emailLabel2"), value: t("info.email") },
    { icon: Phone, label: t("info.phoneLabel"), value: t("info.phone") },
  ];

  return (
    <>
      <PageHeader
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.subtitle")}
      />

      <section className="border-t border-border">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-7">
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
                messageLabel: t("form.messageLabel"),
                messagePlaceholder: t("form.messagePlaceholder"),
                messageError: t("form.messageError"),
                submit: t("form.submit"),
                submitting: t("form.submitting"),
                privacyNote: t("form.privacyNote"),
                successTitle: t("form.successTitle"),
                successBody: t("form.successBody"),
                errorBody: t("form.errorBody"),
              }}
            />
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <div className="flex flex-col gap-6 rounded-2xl border border-border bg-muted/40 p-8">
              <h2 className="font-heading text-lg font-bold text-foreground">
                {t("info.title")}
              </h2>
              <ul className="flex flex-col gap-5">
                {infoItems.map((item) => (
                  <li key={item.label} className="flex items-start gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/5 text-primary">
                      <item.icon className="size-4" strokeWidth={1.75} />
                    </span>
                    <span className="flex flex-col gap-0.5">
                      <span className="text-xs font-medium text-muted-foreground">
                        {item.label}
                      </span>
                      <span className="text-sm text-foreground">
                        {item.value}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
