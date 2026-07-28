import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export const DOWNLOADS_TABLE = "geoscore_downloads";

export interface DownloadRow {
  id: string;
  email: string;
  transaction_id: string | null;
  session_id: string | null;
  amount: number | null;
  currency: string | null;
  created_at: string;
  expires_at: string;
  download_count: number;
  last_downloaded_at: string | null;
}

/** Server-only Supabase client using the service-role key (bypasses RLS). */
export function supabaseAdmin(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase env not configured");
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export const DOWNLOAD_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days
