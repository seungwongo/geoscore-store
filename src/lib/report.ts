import { supabaseAdmin, DOWNLOADS_TABLE } from "@/lib/supabase";
import { ANALYTICS_TABLE, sourceLabel } from "@/lib/analytics";

export interface DailyStats {
  hours: number;
  pageViews: number;
  visitors: number;
  buyClicks: number;
  buyClickSessions: number;
  purchases: number;
  revenue: number;
  currency: string;
  cvrVisitor: string; // 방문 → 구매
  cvrClick: string; // 클릭 → 구매
  topCountries: [string, number][];
  topSources: [string, number][];
}

interface ARow {
  event_type: string;
  session_id: string | null;
  country: string | null;
  referrer: string | null;
}
interface DRow {
  amount: number | null;
  currency: string | null;
  session_id: string | null;
}

function pct(n: number, d: number): string {
  if (!d) return "0%";
  return `${((n / d) * 100).toFixed(1)}%`;
}

function top(rows: ARow[], key: "country" | "referrer", limit = 5): [string, number][] {
  const map = new Map<string, number>();
  for (const r of rows) {
    const raw = r[key];
    const label = key === "referrer" ? sourceLabel(raw) : (raw || "—").toUpperCase();
    map.set(label, (map.get(label) ?? 0) + 1);
  }
  return [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, limit);
}

/** Compute stats for events in the last `hours` hours (default 24). */
export async function computeDailyStats(hours = 24): Promise<DailyStats> {
  const since = new Date(Date.now() - hours * 3600e3).toISOString();
  const sb = supabaseAdmin();

  const [{ data: aData }, { data: dData }] = await Promise.all([
    sb
      .from(ANALYTICS_TABLE)
      .select("event_type, session_id, country, referrer")
      .gte("created_at", since)
      .limit(100000),
    sb.from(DOWNLOADS_TABLE).select("amount, currency, session_id").gte("created_at", since).limit(5000),
  ]);
  const rows = (aData ?? []) as ARow[];
  const dls = (dData ?? []) as DRow[];

  const pv = rows.filter((r) => r.event_type === "page_view");
  const bc = rows.filter((r) => r.event_type === "buy_click");
  const uniq = (rs: { session_id: string | null }[]) =>
    new Set(rs.map((r) => r.session_id).filter(Boolean)).size;

  const visitors = uniq(pv);
  const buyClickSessions = uniq(bc);
  const purchases = dls.length;
  const purchaseSessions = uniq(dls);

  const byCur = new Map<string, number>();
  for (const d of dls) {
    if (d.amount == null) continue;
    const c = d.currency || "USD";
    byCur.set(c, (byCur.get(c) ?? 0) + Number(d.amount));
  }
  const currency = [...byCur.keys()][0] ?? "USD";
  const revenue = byCur.get(currency) ?? 0;

  return {
    hours,
    pageViews: pv.length,
    visitors,
    buyClicks: bc.length,
    buyClickSessions,
    purchases,
    revenue,
    currency,
    cvrVisitor: pct(purchaseSessions, visitors),
    cvrClick: pct(purchaseSessions, buyClickSessions),
    topCountries: top(pv, "country"),
    topSources: top(pv, "referrer"),
  };
}
