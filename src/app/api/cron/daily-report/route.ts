import { NextRequest, NextResponse } from "next/server";
import { computeDailyStats } from "@/lib/report";
import { sendDailyReportEmail } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
// Allow up to 60s for the report query + email.
export const maxDuration = 60;

function authorized(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  // If no secret is configured, only allow Vercel's own cron invocations.
  if (!secret) return req.headers.get("x-vercel-cron") === "1";
  return req.headers.get("authorization") === `Bearer ${secret}`;
}

async function handle(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    const stats = await computeDailyStats(24);
    await sendDailyReportEmail(stats);
    return NextResponse.json({ ok: true, stats });
  } catch (err) {
    console.error("[cron/daily-report] failed:", err);
    return NextResponse.json({ error: "report_failed" }, { status: 500 });
  }
}

// Vercel Cron sends a GET request.
export const GET = handle;
// Allow manual POST triggering (also protected) for testing.
export const POST = handle;
