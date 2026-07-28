"use client";

import { useState } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";

type Strings = {
  adminLogin: string;
  dashboard: string;
  logout: string;
  modal: {
    loginTitle: string;
    email: string;
    password: string;
    submit: string;
    cancel: string;
    loggingIn: string;
    error: string;
  };
};

export default function AdminBar({
  locale,
  loggedIn,
  t,
}: {
  locale: Locale;
  loggedIn: boolean;
  t: Strings;
}) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleLogin() {
    setError(null);
    setBusy(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      if (!res.ok) {
        setError(t.modal.error);
        setBusy(false);
        return;
      }
      window.location.reload();
    } catch {
      setError(t.modal.error);
      setBusy(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" }).catch(() => {});
    window.location.reload();
  }

  if (loggedIn) {
    return (
      <span className="admin-area">
        <Link href={`/${locale}/admin`}>{t.dashboard}</Link>
        <button type="button" className="admin-link" onClick={handleLogout}>
          {t.logout}
        </button>
      </span>
    );
  }

  return (
    <span className="admin-area">
      <button type="button" className="admin-link" onClick={() => setOpen(true)}>
        {t.adminLogin}
      </button>

      {open && (
        <div
          className="modal-overlay"
          onClick={() => {
            if (!busy) setOpen(false);
          }}
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>{t.modal.loginTitle}</h3>
            <label htmlFor="admin-email">{t.modal.email}</label>
            <input
              id="admin-email"
              type="email"
              autoFocus
              value={email}
              disabled={busy}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="admin-password" style={{ marginTop: 12 }}>
              {t.modal.password}
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              disabled={busy}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !busy) handleLogin();
              }}
            />
            {error && <p className="err">{error}</p>}
            <div className="modal-actions">
              <button
                type="button"
                className="link-btn"
                disabled={busy}
                onClick={() => setOpen(false)}
              >
                {t.modal.cancel}
              </button>
              <button type="button" className="btn" disabled={busy} onClick={handleLogin}>
                {busy ? t.modal.loggingIn : t.modal.submit}
              </button>
            </div>
          </div>
        </div>
      )}
    </span>
  );
}
