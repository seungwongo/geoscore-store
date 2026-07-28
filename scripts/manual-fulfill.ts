/**
 * Manually fulfill a real, already-paid Paddle order when automatic fulfillment
 * failed (e.g. a bad server API key). Trusts that the payment is confirmed in
 * the Paddle dashboard — it does NOT call the Paddle API.
 *
 * Usage:
 *   FF_EMAIL=buyer@example.com FF_TXN=txn_xxx FF_LOCALE=ko npx tsx scripts/manual-fulfill.ts
 */
import fs from "fs";

for (const line of fs.readFileSync(".env.local", "utf8").split("\n")) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
}

async function main() {
  const email = (process.env.FF_EMAIL || "").trim().toLowerCase();
  const txn = (process.env.FF_TXN || "").trim();
  const locale = (process.env.FF_LOCALE || "en").trim() as "ko" | "en";
  if (!email || !txn) throw new Error("Set FF_EMAIL and FF_TXN");

  const { supabaseAdmin, DOWNLOADS_TABLE, DOWNLOAD_TTL_MS } = await import("../src/lib/supabase");
  const { sendCustomerEmail, sendNotifyEmail } = await import("../src/lib/email");
  const { recordEvent } = await import("../src/lib/analytics");

  const sb = supabaseAdmin();

  // Idempotent: reuse existing record for this transaction if present.
  const existing = await sb
    .from(DOWNLOADS_TABLE)
    .select("id")
    .eq("transaction_id", txn)
    .maybeSingle();

  let id: string;
  if (existing.data) {
    id = existing.data.id as string;
    console.log(`↺ existing record ${id}`);
  } else {
    const expiresAt = new Date(Date.now() + DOWNLOAD_TTL_MS).toISOString();
    const ins = await sb
      .from(DOWNLOADS_TABLE)
      .insert({ email, transaction_id: txn, expires_at: expiresAt })
      .select("id")
      .single();
    if (ins.error || !ins.data) throw ins.error ?? new Error("insert failed");
    id = ins.data.id as string;
    console.log(`✓ created download record ${id}`);
  }

  await sendCustomerEmail({ to: email, locale, downloadId: id });
  console.log(`✓ customer email sent to ${email}`);

  await sendNotifyEmail({ customerEmail: email, txn, locale, customerEmailSent: true });
  console.log("✓ owner notified");

  await recordEvent({
    event: "purchase",
    locale,
    path: `/${locale}`,
    transactionId: txn,
  }).catch(() => {});

  const appUrl = (process.env.NEXT_PUBLIC_APP_URL || "").replace(/\/$/, "");
  console.log(`\nDownload link: ${appUrl}/${locale}/download?id=${id}`);
}

main().catch((e) => {
  console.error("MANUAL FULFILL FAILED:", e);
  process.exit(1);
});
