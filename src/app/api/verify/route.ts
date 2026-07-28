import { NextRequest, NextResponse } from "next/server";
import { fulfillPurchase } from "@/lib/fulfill";
import { countryFromHeaders, languageFromHeaders } from "@/lib/analytics";
import { isLocale, defaultLocale, type Locale } from "@/lib/i18n";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let body: { transactionId?: string; locale?: string; sessionId?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const transactionId = body.transactionId?.trim();
  const locale: Locale = isLocale(body.locale) ? body.locale : defaultLocale;

  if (!transactionId) {
    return NextResponse.json({ error: "missing_transaction" }, { status: 400 });
  }

  let result;
  try {
    result = await fulfillPurchase({
      transactionId,
      locale,
      sessionId: body.sessionId?.slice(0, 64) ?? null,
      country: countryFromHeaders(req.headers),
      language: languageFromHeaders(req.headers),
    });
  } catch (err) {
    console.error("[verify] fulfill failed:", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }

  if (!result) {
    // Paddle may not have finalized the transaction yet — let the client retry.
    return NextResponse.json({ error: "not_paid" }, { status: 402 });
  }

  return NextResponse.json({ id: result.id });
}
