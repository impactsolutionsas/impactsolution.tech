import { NextResponse } from "next/server";
import { z } from "zod";

const payloadSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  organization: z.string().min(2),
  message: z.string().min(10),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = payloadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }

  // TODO: forward to Directus (contact_submissions collection) once CMS-1 is deployed.
  // No PII logged here — see cdc anti-pattern rule on PII in logs.
  console.info("[contact] submission received");

  return NextResponse.json({ ok: true });
}
