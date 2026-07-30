"use client";

/** Stable anonymous session id (localStorage) used to link funnel events. */
export function getSessionId(): string {
  if (typeof window === "undefined") return "";
  try {
    let id = localStorage.getItem("gs_sid");
    if (!id) {
      id =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      localStorage.setItem("gs_sid", id);
    }
    return id;
  } catch {
    return "";
  }
}

export function track(type: "page_view" | "buy_click", locale: string): void {
  try {
    const utm =
      typeof window !== "undefined"
        ? new URLSearchParams(window.location.search).get("utm_source")
        : null;
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type,
        sessionId: getSessionId(),
        locale,
        path: typeof window !== "undefined" ? window.location.pathname : undefined,
        ref: typeof document !== "undefined" ? document.referrer : undefined,
        utm,
      }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* analytics must never break UX */
  }
}
