"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, AlertCircle, Loader2, Send } from "lucide-react";

import { createContactSchema, type ContactFormValues } from "@/lib/contact-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface ContactFormProps {
  messages: {
    nameLabel: string;
    namePlaceholder: string;
    nameError: string;
    emailLabel: string;
    emailPlaceholder: string;
    emailError: string;
    organizationLabel: string;
    organizationPlaceholder: string;
    organizationError: string;
    subjectLabel: string;
    subjects: string[];
    messageLabel: string;
    messagePlaceholder: string;
    messageError: string;
    submit: string;
    submitting: string;
    privacyNote: string;
    successTitle: string;
    successBody: string;
    successAction: string;
    errorBody: string;
  };
}

export function ContactForm({ messages }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const schema = createContactSchema({
    nameError: messages.nameError,
    emailError: messages.emailError,
    organizationError: messages.organizationError,
    messageError: messages.messageError,
  });

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", organization: "", message: "" },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setStatus("idle");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, subject: selectedSubject }),
      });
      if (!res.ok) throw new Error("request_failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-muted/40 px-6 py-20 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-primary/5">
          <CheckCircle2 className="size-8 text-primary" strokeWidth={1.5} />
        </div>
        <h3 className="font-heading text-2xl font-bold text-foreground">
          {messages.successTitle}
        </h3>
        <p className="max-w-sm text-base text-muted-foreground">
          {messages.successBody}
        </p>
        <Button
          variant="outline"
          className="mt-2 cursor-pointer"
          onClick={() => setStatus("idle")}
        >
          {messages.successAction}
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-6"
      >
        {/* Subject chips */}
        <div className="flex flex-col gap-2.5">
          <span className="text-sm font-medium text-foreground">
            {messages.subjectLabel}
          </span>
          <div className="flex flex-wrap gap-2">
            {messages.subjects.map((subject) => (
              <button
                key={subject}
                type="button"
                onClick={() =>
                  setSelectedSubject(
                    selectedSubject === subject ? null : subject
                  )
                }
                className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  selectedSubject === subject
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground hover:border-primary/30 hover:text-foreground"
                }`}
              >
                {subject}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{messages.nameLabel}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={messages.namePlaceholder}
                    className="h-11"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{messages.emailLabel}</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder={messages.emailPlaceholder}
                    className="h-11"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="organization"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{messages.organizationLabel}</FormLabel>
              <FormControl>
                <Input
                  placeholder={messages.organizationPlaceholder}
                  className="h-11"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{messages.messageLabel}</FormLabel>
              <FormControl>
                <Textarea
                  rows={5}
                  placeholder={messages.messagePlaceholder}
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {status === "error" && (
          <div className="flex items-start gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
            <AlertCircle className="mt-0.5 size-4 shrink-0" />
            <span>{messages.errorBody}</span>
          </div>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button
            type="submit"
            size="lg"
            disabled={form.formState.isSubmitting}
            className="h-12 cursor-pointer px-8 text-base"
          >
            {form.formState.isSubmitting ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Send className="size-4" />
            )}
            {form.formState.isSubmitting ? messages.submitting : messages.submit}
          </Button>
          <p className="text-xs text-muted-foreground sm:max-w-[240px] sm:text-right">
            {messages.privacyNote}
          </p>
        </div>
      </form>
    </Form>
  );
}
