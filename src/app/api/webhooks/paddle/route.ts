import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { fulfillPurchase } from "@/lib/fulfill";

export const runtime = "nodejs";

// Events that mean "the customer has paid".
const PAID_EVENTS = new Set(["transaction.completed", "transaction.paid"]);

/** Verify Paddle's `Paddle-Signature: ts=..;h1=..` header against the raw body. */
function verifySignature(rawBody: string, header: string | null, secret: string): boolean {
  if (!header) return false;
  const parts = Object.fromEntries(
    header.split(";").map((kv) => {
      const i = kv.indexOf("=");
      return [kv.slice(0, i).trim(), kv.slice(i + 1).trim()];
    }),
  ) as Record<string, string>;
  const ts = parts.ts;
  const h1 = parts.h1;
  if (!ts || !h1) return false;

  const digest = crypto
    .createHmac("sha256", secret)
    .update(`${ts}:${rawBody}`)
    .digest("hex");
  const a = Buffer.from(digest);
  const b = Buffer.from(h1);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export async function POST(req: NextRequest) {
  const secret = process.env.PADDLE_WEBHOOK_SECRET;
  if (!secret) {
    console.error("[webhook] PADDLE_WEBHOOK_SECRET not set");
    return NextResponse.json({ error: "not_configured" }, { status: 500 });
  }

  const raw = await req.text();
  if (!verifySignature(raw, req.headers.get("paddle-signature"), secret)) {
    return NextResponse.json({ error: "invalid_signature" }, { status: 401 });
  }

  let event: { event_type?: string; data?: { id?: string; custom_data?: { locale?: string } } };
  try {
    event = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  if (event.event_type && PAID_EVENTS.has(event.event_type) && event.data?.id) {
    try {
      // Backup fulfillment path (the client success page usually wins). Locale
      // is unknown here, so fulfill falls back to the default locale.
      await fulfillPurchase({
        transactionId: event.data.id,
        locale: event.data.custom_data?.locale ?? null,
      });
    } catch (err) {
      console.error("[webhook] fulfill failed:", err);
      // 500 tells Paddle to retry later.
      return NextResponse.json({ error: "fulfill_failed" }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true });
}
