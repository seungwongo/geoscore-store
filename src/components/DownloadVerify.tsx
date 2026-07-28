"use client";

import { useState } from "react";
import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function DownloadVerify({
  id,
  locale,
  t,
}: {
  id: string;
  locale: Locale;
  t: Dictionary["download"];
}) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  async function handleVerify() {
    setError(null);
    if (!EMAIL_RE.test(email.trim())) {
      setError(t.invalidEmail);
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/download-verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, email: email.trim() }),
      });
      if (res.status === 403) {
        setError(t.mismatch);
        return;
      }
      if (!res.ok) {
        setError(t.genericError);
        return;
      }
      const data = (await res.json()) as { token: string };
      const url = `/api/download?token=${encodeURIComponent(data.token)}`;
      setDownloadUrl(url);
      // Trigger the download immediately.
      window.location.href = url;
    } catch {
      setError(t.genericError);
    } finally {
      setBusy(false);
    }
  }

  if (downloadUrl) {
    return (
      <main className="dl">
        <div className="dl-mark">◔</div>
        <span className="badge-ok">{t.okEyebrow}</span>
        <h1>{t.okTitle}</h1>
        <p>{t.okDesc}</p>
        <p style={{ marginTop: 24 }}>
          <a className="btn" href={downloadUrl}>
            {t.button}
          </a>
        </p>
        <div className="install-box">
          <h3>{t.installTitle}</h3>
          <ol>
            {t.installSteps.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
        </div>
        <p>
          <Link className="back" href={`/${locale}`}>
            {t.backHome}
          </Link>
        </p>
      </main>
    );
  }

  return (
    <main className="dl">
      <div className="dl-mark">◔</div>
      <span className="badge-ok">{t.verifyEyebrow}</span>
      <h1>{t.verifyTitle}</h1>
      <p>{t.verifyDesc}</p>

      <div className="verify-form">
        <label htmlFor="dl-email">{t.emailLabel}</label>
        <input
          id="dl-email"
          type="email"
          autoFocus
          value={email}
          placeholder={t.emailPlaceholder}
          disabled={busy}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !busy) handleVerify();
          }}
        />
        {error && <p className="err">{error}</p>}
        <button type="button" className="btn" disabled={busy} onClick={handleVerify}>
          {busy ? t.verifying : t.verifyButton}
        </button>
      </div>

      <p style={{ marginTop: 24 }}>
        <Link className="back" href={`/${locale}`}>
          {t.backHome}
        </Link>
      </p>
    </main>
  );
}
