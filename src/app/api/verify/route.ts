import { NextRequest, NextResponse } from "next/server";
import { verifyPaddleTransaction } from "@/lib/paddle";
import { createDownloadToken } from "@/lib/token";
import { sendCustomerEmail, sendNotifyEmail } from "@/lib/email";
import { isLocale, defaultLocale, type Locale } from "@/lib/i18n";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: { transactionId?: string; email?: string; locale?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const transactionId = body.transactionId?.trim();
  const email = body.email?.trim();
  const locale: Locale = isLocale(body.locale) ? body.locale : defaultLocale;

  if (!transactionId) {
    return NextResponse.json({ error: "missing_transaction" }, { status: 400 });
  }
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  // Verify the payment server-side with Paddle.
  let verified;
  try {
    verified = await verifyPaddleTransaction(transactionId);
  } catch {
    return NextResponse.json({ error: "server_misconfigured" }, { status: 500 });
  }
  if (!verified) {
    return NextResponse.json({ error: "not_paid" }, { status: 402 });
  }

  const deliverTo = verified.email || email;
  const token = createDownloadToken(deliverTo, verified.id);

  // Send the customer email (with zip attached). Never block the download on email failure.
  let customerEmailSent = false;
  try {
    await sendCustomerEmail({ to: deliverTo, locale, downloadToken: token });
    customerEmailSent = true;
  } catch (err) {
    console.error("[verify] customer email failed:", err);
  }

  // Notify the owner of the purchase.
  try {
    await sendNotifyEmail({
      customerEmail: deliverTo,
      txn: verified.id,
      locale,
      customerEmailSent,
    });
  } catch (err) {
    console.error("[verify] notify email failed:", err);
  }

  return NextResponse.json({ token, emailSent: customerEmailSent });
}
