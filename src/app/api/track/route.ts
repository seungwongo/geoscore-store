import { NextRequest, NextResponse } from "next/server";
import {
  recordEvent,
  countryFromHeaders,
  languageFromHeaders,
  type AnalyticsEvent,
} from "@/lib/analytics";

export const runtime = "nodejs";

const ALLOWED: AnalyticsEvent[] = ["page_view", "buy_click"];

export async function POST(req: NextRequest) {
  let body: { type?: string; sessionId?: string; locale?: string; path?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const type = body.type as AnalyticsEvent;
  if (!ALLOWED.includes(type)) {
    return NextResponse.json({ error: "invalid_type" }, { status: 400 });
  }

  try {
    await recordEvent({
      event: type,
      sessionId: body.sessionId?.slice(0, 64) ?? null,
      locale: body.locale?.slice(0, 8) ?? null,
      path: body.path?.slice(0, 256) ?? null,
      country: countryFromHeaders(req.headers),
      language: languageFromHeaders(req.headers),
    });
  } catch (err) {
    console.error("[track] insert failed:", err);
    // Analytics must never break the UX.
    return NextResponse.json({ ok: false }, { status: 200 });
  }

  return NextResponse.json({ ok: true });
}
