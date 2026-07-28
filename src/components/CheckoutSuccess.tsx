"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";
import { getSessionId } from "@/lib/session";

const MAX_ATTEMPTS = 8;
const DELAY_MS = 1500;

export default function CheckoutSuccess({
  txn,
  locale,
  t,
}: {
  txn: string | null;
  locale: Locale;
  t: Dictionary["checkout"];
}) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!txn) {
      window.location.replace(`/${locale}`);
      return;
    }
    let cancelled = false;

    async function attempt(n: number): Promise<void> {
      if (cancelled) return;
      try {
        const res = await fetch("/api/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ transactionId: txn, locale, sessionId: getSessionId() }),
        });
        if (res.ok) {
          const data = (await res.json()) as { id: string };
          window.location.replace(`/${locale}/download?id=${encodeURIComponent(data.id)}`);
          return;
        }
      } catch {
        /* retry below */
      }
      if (n >= MAX_ATTEMPTS) {
        if (!cancelled) setFailed(true);
        return;
      }
      // Paddle may still be finalizing the transaction — wait and retry.
      setTimeout(() => attempt(n + 1), DELAY_MS);
    }

    attempt(1);
    return () => {
      cancelled = true;
    };
  }, [txn, locale]);

  return (
    <main className="dl">
      <div className="dl-mark">◔</div>
      {failed ? (
        <>
          <h1>{t.failed}</h1>
          <p>{t.failedDesc}</p>
          <p style={{ marginTop: 24 }}>
            <Link className="btn" href={`/${locale}`}>
              {t.backHome}
            </Link>
          </p>
        </>
      ) : (
        <>
          <div className="spinner" aria-hidden />
          <h1>{t.processing}</h1>
          <p>{t.processingDesc}</p>
        </>
      )}
    </main>
  );
}
