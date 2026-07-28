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

export async function recordEvent(params: {
  event: AnalyticsEvent;
  sessionId?: string | null;
  locale?: string | null;
  path?: string | null;
  country?: string | null;
  language?: string | null;
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
      transaction_id: params.transactionId ?? null,
    });
}
