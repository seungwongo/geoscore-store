import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin, DOWNLOADS_TABLE, type DownloadRow } from "@/lib/supabase";
import { createDownloadToken } from "@/lib/token";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function POST(req: NextRequest) {
  let body: { id?: string; email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const id = body.id?.trim();
  const email = body.email?.trim().toLowerCase();

  if (!id || !UUID_RE.test(id)) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  let row: DownloadRow | null;
  try {
    const { data, error } = await supabaseAdmin()
      .from(DOWNLOADS_TABLE)
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (error) throw error;
    row = data as DownloadRow | null;
  } catch (err) {
    console.error("[download-verify] supabase select failed:", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }

  if (!row) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }
  if (new Date(row.expires_at).getTime() < Date.now()) {
    return NextResponse.json({ error: "expired" }, { status: 410 });
  }
  if (row.email.toLowerCase() !== email) {
    return NextResponse.json({ error: "mismatch" }, { status: 403 });
  }

  // Record the download and issue a short-lived grant for the file stream.
  try {
    await supabaseAdmin()
      .from(DOWNLOADS_TABLE)
      .update({
        download_count: (row.download_count ?? 0) + 1,
        last_downloaded_at: new Date().toISOString(),
      })
      .eq("id", id);
  } catch (err) {
    console.error("[download-verify] update count failed (non-fatal):", err);
  }

  const token = createDownloadToken(email, id);
  return NextResponse.json({ token });
}
