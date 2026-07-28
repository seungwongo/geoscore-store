"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";
import { getSessionId } from "@/lib/session";

const MAX_ATTEMPTS = 12;
const DELAY_MS = 1500;

export default function CheckoutSuccess({
  locale,
  t,
}: {
  locale: Locale;
  t: Dictionary["checkout"];
}) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const sid = getSessionId();
    if (!sid) {
      setFailed(true);
      return;
    }
    let cancelled = false;

    async function attempt(n: number): Promise<void> {
      if (cancelled) return;
      try {
        const res = await fetch(`/api/checkout-status?sid=${encodeURIComponent(sid)}`, {
          cache: "no-store",
        });
        if (res.ok) {
          const data = (await res.json()) as { ready?: boolean; id?: string };
          if (data.ready && data.id) {
            window.location.replace(`/${locale}/download?id=${encodeURIComponent(data.id)}`);
            return;
          }
        }
      } catch {
        /* retry below */
      }
      if (n >= MAX_ATTEMPTS) {
        if (!cancelled) setFailed(true);
        return;
      }
      // Wait for the webhook to create the download record, then retry.
      setTimeout(() => attempt(n + 1), DELAY_MS);
    }

    attempt(1);
    return () => {
      cancelled = true;
    };
  }, [locale]);

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
