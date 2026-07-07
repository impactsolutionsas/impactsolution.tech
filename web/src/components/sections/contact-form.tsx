"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

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
    messageLabel: string;
    messagePlaceholder: string;
    messageError: string;
    submit: string;
    submitting: string;
    privacyNote: string;
    successTitle: string;
    successBody: string;
    errorBody: string;
  };
}

export function ContactForm({ messages }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

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
        body: JSON.stringify(values),
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
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-muted/40 px-6 py-16 text-center">
        <CheckCircle2 className="size-10 text-primary" strokeWidth={1.5} />
        <h3 className="font-heading text-xl font-bold text-foreground">
          {messages.successTitle}
        </h3>
        <p className="max-w-sm text-sm text-muted-foreground">
          {messages.successBody}
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-5"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{messages.nameLabel}</FormLabel>
              <FormControl>
                <Input placeholder={messages.namePlaceholder} {...field} />
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
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="organization"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{messages.organizationLabel}</FormLabel>
              <FormControl>
                <Input
                  placeholder={messages.organizationPlaceholder}
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

        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="h-11 text-base"
        >
          {form.formState.isSubmitting && (
            <Loader2 className="size-4 animate-spin" />
          )}
          {form.formState.isSubmitting ? messages.submitting : messages.submit}
        </Button>

        <p className="text-xs text-muted-foreground">{messages.privacyNote}</p>
      </form>
    </Form>
  );
}
