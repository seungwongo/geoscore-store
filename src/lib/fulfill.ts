import { verifyPaddleTransaction } from "@/lib/paddle";
import { sendCustomerEmail, sendNotifyEmail } from "@/lib/email";
import { supabaseAdmin, DOWNLOADS_TABLE, DOWNLOAD_TTL_MS } from "@/lib/supabase";
import { recordEvent } from "@/lib/analytics";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n";

export interface FulfillResult {
  id: string;
  email: string;
  alreadyFulfilled: boolean;
}

async function findExisting(transactionId: string): Promise<{ id: string; email: string } | null> {
  const { data } = await supabaseAdmin()
    .from(DOWNLOADS_TABLE)
    .select("id, email")
    .eq("transaction_id", transactionId)
    .maybeSingle();
  return data ? { id: data.id as string, email: data.email as string } : null;
}

/**
 * Idempotently fulfill a paid Paddle transaction: verify with Paddle, create the
 * download record (unique per transaction), email the buyer + owner, and record
 * the purchase analytics event. Safe to call from both the webhook and the
 * client success path — only the first call for a transaction does the work.
 *
 * Returns null if the transaction is not actually paid.
 */
export async function fulfillPurchase(params: {
  transactionId: string;
  locale?: string | null;
  sessionId?: string | null;
  country?: string | null;
  language?: string | null;
}): Promise<FulfillResult | null> {
  const { transactionId } = params;
  const localeInput = params.locale ?? undefined;
  const locale: Locale = isLocale(localeInput) ? localeInput : defaultLocale;

  // Idempotency: if we already created a record for this transaction, reuse it.
  const existing = await findExisting(transactionId);
  if (existing) {
    return { id: existing.id, email: existing.email, alreadyFulfilled: true };
  }

  const verified = await verifyPaddleTransaction(transactionId);
  if (!verified) return null;

  const email = (verified.email || "").toLowerCase();
  const expiresAt = new Date(Date.now() + DOWNLOAD_TTL_MS).toISOString();

  // Insert; if a concurrent path (webhook vs. success page) beat us, the unique
  // index on transaction_id makes this fail — fall back to the existing row.
  const { data, error } = await supabaseAdmin()
    .from(DOWNLOADS_TABLE)
    .insert({
      email,
      transaction_id: verified.id,
      session_id: params.sessionId ?? null,
      amount: verified.amount,
      currency: verified.currency,
      expires_at: expiresAt,
    })
    .select("id")
    .single();

  if (error || !data) {
    const raced = await findExisting(transactionId);
    if (raced) return { id: raced.id, email: raced.email, alreadyFulfilled: true };
    throw error ?? new Error("insert returned no row");
  }

  const id = data.id as string;

  // Send customer email (download link). Never block fulfillment on email.
  let customerEmailSent = false;
  if (email) {
    try {
      await sendCustomerEmail({ to: email, locale, downloadId: id });
      customerEmailSent = true;
    } catch (err) {
      console.error("[fulfill] customer email failed:", err);
    }
  }

  try {
    await sendNotifyEmail({ customerEmail: email, txn: verified.id, locale, customerEmailSent });
  } catch (err) {
    console.error("[fulfill] notify email failed:", err);
  }

  try {
    await recordEvent({
      event: "purchase",
      sessionId: params.sessionId ?? null,
      locale,
      path: `/${locale}`,
      country: params.country ?? null,
      language: params.language ?? null,
      transactionId: verified.id,
    });
  } catch (err) {
    console.error("[fulfill] analytics record failed:", err);
  }

  return { id, email, alreadyFulfilled: false };
}
