import { supabaseAdmin } from "@/lib/supabase";

export const ANALYTICS_TABLE = "geoscore_analytics";

export type AnalyticsEvent = "page_view" | "buy_click" | "purchase";

/** Best-effort country from CDN/proxy headers (no raw IP is stored). */
export function countryFromHeaders(headers: Headers): string | null {
  return (
    headers.get("x-vercel-ip-country") ||
    headers.get("cf-ipcountry") ||
    headers.get("x-country") ||
    null
  );
}

/** Primary language subtag from Accept-Language, e.g. "ko", "en". */
export function languageFromHeaders(headers: Headers): string | null {
  const al = headers.get("accept-language");
  if (!al) return null;
  const first = al.split(",")[0]?.trim().split("-")[0]?.toLowerCase();
  return first || null;
}

/** Normalize a raw referrer URL + utm_source into a compact source label
 *  (hostname only, no path/query) — "direct" for same-site or empty. */
export function normalizeSource(
  rawRef: string | null | undefined,
  utm: string | null | undefined,
  selfHost: string | null | undefined,
): string {
  if (utm) return utm.toLowerCase().slice(0, 60);
  if (!rawRef) return "direct";
  try {
    const host = new URL(rawRef).hostname.replace(/^www\./, "").toLowerCase();
    if (!host || host === (selfHost || "").replace(/^www\./, "").toLowerCase()) return "direct";
    return host.slice(0, 80);
  } catch {
    return "direct";
  }
}

export async function recordEvent(params: {
  event: AnalyticsEvent;
  sessionId?: string | null;
  locale?: string | null;
  path?: string | null;
  country?: string | null;
  language?: string | null;
  referrer?: string | null;
  transactionId?: string | null;
}): Promise<void> {
  await supabaseAdmin()
    .from(ANALYTICS_TABLE)
    .insert({
      event_type: params.event,
      session_id: params.sessionId ?? null,
      locale: params.locale ?? null,
      path: params.path ?? null,
      country: params.country ?? null,
      language: params.language ?? null,
      referrer: params.referrer ?? null,
      transaction_id: params.transactionId ?? null,
    });
}
