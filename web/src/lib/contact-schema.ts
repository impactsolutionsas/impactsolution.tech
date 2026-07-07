import { z } from "zod";

export interface ContactFormMessages {
  nameError: string;
  emailError: string;
  organizationError: string;
  messageError: string;
}

export function createContactSchema(messages: ContactFormMessages) {
  return z.object({
    name: z.string().min(2, messages.nameError),
    email: z.email(messages.emailError),
    organization: z.string().min(2, messages.organizationError),
    message: z.string().min(10, messages.messageError),
  });
}

export type ContactFormValues = z.infer<ReturnType<typeof createContactSchema>>;
