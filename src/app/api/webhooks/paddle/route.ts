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

  let event: {
    event_type?: string;
    data?: {
      id?: string;
      custom_data?: { locale?: string; sessionId?: string };
      items?: { price?: { id?: string } }[];
    };
  };
  try {
    event = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  // The Paddle account is shared across products (GeoScore, Sasang Table, …) and
  // every webhook destination receives every event — only fulfill our own price.
  const ourPriceId = process.env.NEXT_PUBLIC_PADDLE_PRICE_ID;
  const items = event.data?.items ?? [];
  if (ourPriceId && items.length > 0 && !items.some((i) => i.price?.id === ourPriceId)) {
    console.log(`[webhook] skipping foreign product txn ${event.data?.id}`);
    return NextResponse.json({ ok: true });
  }

  if (event.event_type && PAID_EVENTS.has(event.event_type) && event.data?.id) {
    try {
      // Locale + session id ride along in the transaction's custom_data, so the
      // webhook attributes the purchase to the browser session for funnel
      // analytics and localizes the email — same result as the client path.
      await fulfillPurchase({
        transactionId: event.data.id,
        locale: event.data.custom_data?.locale ?? null,
        sessionId: event.data.custom_data?.sessionId || null,
      });
    } catch (err) {
      console.error("[webhook] fulfill failed:", err);
      // 500 tells Paddle to retry later.
      return NextResponse.json({ error: "fulfill_failed" }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true });
}
