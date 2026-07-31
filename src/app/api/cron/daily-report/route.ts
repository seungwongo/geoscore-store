import { NextRequest, NextResponse } from "next/server";
import { computeDailyStats } from "@/lib/report";
import { sendDailyReportEmail } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
// Allow up to 60s for the report query + email.
export const maxDuration = 60;

function authorized(req: NextRequest): boolean {
  // Preferred: CRON_SECRET as a Bearer token (Vercel adds this automatically
  // when the env var is set; also used for manual/testing calls).
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.get("authorization") === `Bearer ${secret}`) return true;
  // Fallback: Vercel's own cron invocations (so it still works if CRON_SECRET
  // hasn't been set in the project env).
  const ua = req.headers.get("user-agent") || "";
  if (ua.includes("vercel-cron")) return true;
  if (req.headers.get("x-vercel-cron") === "1") return true;
  return false;
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
