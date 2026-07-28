"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import { openCheckout, isConfigured } from "@/lib/paddle-client";
import { getSessionId, track } from "@/lib/session";

type ModalStrings = {
  title: string;
  desc: string;
  emailLabel: string;
  emailPlaceholder: string;
  continue: string;
  cancel: string;
  invalidEmail: string;
  loading: string;
  verifying: string;
  error: string;
  notConfigured: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function PurchaseButton({
  locale,
  label,
  className = "btn",
  modal,
}: {
  locale: Locale;
  label: string;
  className?: string;
  modal: ModalStrings;
}) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<null | "loading" | "verifying">(null);

  const busy = status !== null;

  function reset() {
    setError(null);
    setStatus(null);
  }

  async function handleContinue() {
    setError(null);
    if (!EMAIL_RE.test(email.trim())) {
      setError(modal.invalidEmail);
      return;
    }
    if (!isConfigured()) {
      setError(modal.notConfigured);
      return;
    }
    const cleanEmail = email.trim();
    try {
      setStatus("loading");
      const transactionId = await openCheckout(cleanEmail);
      setStatus("verifying");
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transactionId, email: cleanEmail, locale, sessionId: getSessionId() }),
      });
      if (!res.ok) throw new Error("verify failed");
      const data = (await res.json()) as { id: string };
      window.location.href = `/${locale}/download?id=${encodeURIComponent(data.id)}`;
    } catch {
      setError(modal.error);
      setStatus(null);
    }
  }

  return (
    <>
      <button
        type="button"
        className={className}
        onClick={() => {
          reset();
          setOpen(true);
          track("buy_click", locale);
        }}
      >
        {label}
      </button>

      {open && (
        <div
          className="modal-overlay"
          onClick={() => {
            if (!busy) setOpen(false);
          }}
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>{modal.title}</h3>
            <p>{modal.desc}</p>
            <label htmlFor="purchase-email">{modal.emailLabel}</label>
            <input
              id="purchase-email"
              type="email"
              autoFocus
              value={email}
              placeholder={modal.emailPlaceholder}
              disabled={busy}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !busy) handleContinue();
              }}
            />
            {error && <p className="err">{error}</p>}
            {status && (
              <p className="status">
                {status === "loading" ? modal.loading : modal.verifying}
              </p>
            )}
            <div className="modal-actions">
              <button
                type="button"
                className="link-btn"
                disabled={busy}
                onClick={() => setOpen(false)}
              >
                {modal.cancel}
              </button>
              <button
                type="button"
                className="btn"
                disabled={busy}
                onClick={handleContinue}
              >
                {modal.continue}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
