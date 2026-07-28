import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin, DOWNLOADS_TABLE } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Poll for a freshly-created download record for this browser session. The
 * webhook (or the verify path) creates the record with the session id carried
 * through Paddle custom_data, so the success page can find it without needing
 * Paddle's transaction-id query param.
 */
export async function GET(req: NextRequest) {
  const sid = req.nextUrl.searchParams.get("sid");
  if (!sid) return NextResponse.json({ pending: false, error: "missing_sid" }, { status: 400 });

  // Only match recent records so an old session can't resurface a purchase.
  const since = new Date(Date.now() - 30 * 60 * 1000).toISOString();

  const { data, error } = await supabaseAdmin()
    .from(DOWNLOADS_TABLE)
    .select("id")
    .eq("session_id", sid)
    .gte("created_at", since)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("[checkout-status] lookup failed:", error);
    return NextResponse.json({ pending: true }, { status: 200 });
  }
  if (data?.id) return NextResponse.json({ ready: true, id: data.id });
  return NextResponse.json({ pending: true });
}
