import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin";
import { isLocale, defaultLocale, type Locale } from "@/lib/i18n";
import { supabaseAdmin, DOWNLOADS_TABLE } from "@/lib/supabase";
import { ANALYTICS_TABLE } from "@/lib/analytics";
import LogoutButton from "@/components/LogoutButton";

export const dynamic = "force-dynamic";

const WINDOW_DAYS = 30;
const TREND_DAYS = 14;

interface Row {
  event_type: "page_view" | "buy_click" | "purchase";
  session_id: string | null;
  country: string | null;
  language: string | null;
  locale: string | null;
  transaction_id: string | null;
  created_at: string;
}

function pct(n: number, d: number): string {
  if (!d) return "0%";
  return `${((n / d) * 100).toFixed(1)}%`;
}

function topCounts(rows: Row[], key: "country" | "language" | "locale", limit = 8) {
  const map = new Map<string, number>();
  for (const r of rows) {
    const k = (r[key] || "—").toUpperCase();
    map.set(k, (map.get(k) ?? 0) + 1);
  }
  return [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, limit);
}

function Bars({ data }: { data: [string, number][] }) {
  const max = Math.max(1, ...data.map((d) => d[1]));
  return (
    <div className="dash-bars">
      {data.length === 0 && <p className="meta">데이터 없음</p>}
      {data.map(([label, n]) => (
        <div className="dash-bar-row" key={label}>
          <span className="dash-bar-label">{label}</span>
          <span className="dash-bar-track">
            <span className="dash-bar-fill" style={{ width: `${(n / max) * 100}%` }} />
          </span>
          <span className="dash-bar-val">{n}</span>
        </div>
      ))}
    </div>
  );
}

export default async function AdminDashboard({ params }: { params: { locale: string } }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const admin = getAdminSession();
  if (!admin) redirect(`/${locale}`);

  const since = new Date(Date.now() - WINDOW_DAYS * 864e5).toISOString();
  const sb = supabaseAdmin();

  const { data: rowsData } = await sb
    .from(ANALYTICS_TABLE)
    .select("event_type, session_id, country, language, locale, transaction_id, created_at")
    .gte("created_at", since)
    .order("created_at", { ascending: false })
    .limit(50000);
  const rows = (rowsData ?? []) as Row[];

  const { count: purchaseTotal } = await sb
    .from(DOWNLOADS_TABLE)
    .select("*", { count: "exact", head: true });

  const pv = rows.filter((r) => r.event_type === "page_view");
  const bc = rows.filter((r) => r.event_type === "buy_click");
  const pu = rows.filter((r) => r.event_type === "purchase");

  const sessionsOf = (rs: Row[]) => new Set(rs.map((r) => r.session_id).filter(Boolean));
  const visitors = sessionsOf(pv).size;
  const buyClickSessions = sessionsOf(bc).size;
  const purchaseSessions = sessionsOf(pu).size;

  // Daily trend (last TREND_DAYS days).
  const days: { day: string; pv: number; buy: number; purchase: number }[] = [];
  for (let i = TREND_DAYS - 1; i >= 0; i--) {
    const d = new Date(Date.now() - i * 864e5).toISOString().slice(0, 10);
    days.push({ day: d, pv: 0, buy: 0, purchase: 0 });
  }
  const dayIndex = new Map(days.map((d, i) => [d.day, i]));
  for (const r of rows) {
    const idx = dayIndex.get(r.created_at.slice(0, 10));
    if (idx === undefined) continue;
    if (r.event_type === "page_view") days[idx].pv++;
    else if (r.event_type === "buy_click") days[idx].buy++;
    else if (r.event_type === "purchase") days[idx].purchase++;
  }
  const maxDayPv = Math.max(1, ...days.map((d) => d.pv));

  const recentPurchases = pu.slice(0, 12);

  const stats = [
    { label: "방문자 (고유 세션)", value: visitors, sub: `${pv.length} 페이지뷰` },
    { label: "구매 버튼 클릭", value: buyClickSessions, sub: `${bc.length} 클릭` },
    { label: "구매 완료", value: purchaseSessions, sub: `누적 ${purchaseTotal ?? 0}건` },
    { label: "클릭 → 구매 전환", value: pct(purchaseSessions, buyClickSessions), sub: "구매/클릭 세션" },
    { label: "방문 → 구매 전환", value: pct(purchaseSessions, visitors), sub: "구매/방문 세션" },
  ];

  return (
    <main className="dash">
      <div className="dash-head">
        <div>
          <h1>대시보드</h1>
          <p className="meta">
            최근 {WINDOW_DAYS}일 · {admin.email}
          </p>
        </div>
        <div className="dash-head-actions">
          <Link className="back" href={`/${locale}`}>
            ← 사이트
          </Link>
          <LogoutButton label="로그아웃" />
        </div>
      </div>

      <div className="dash-stats">
        {stats.map((s) => (
          <div className="dash-stat" key={s.label}>
            <div className="dash-stat-val">{s.value}</div>
            <div className="dash-stat-label">{s.label}</div>
            <div className="dash-stat-sub">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="dash-cols">
        <section className="dash-card">
          <h2>일별 추이 (최근 {TREND_DAYS}일)</h2>
          <div className="dash-trend">
            {days.map((d) => (
              <div className="dash-trend-col" key={d.day} title={`${d.day} · ${d.pv}뷰 · ${d.purchase}구매`}>
                <span className="dash-trend-bar" style={{ height: `${(d.pv / maxDayPv) * 100}%` }}>
                  {d.purchase > 0 && (
                    <span
                      className="dash-trend-buy"
                      style={{ height: `${Math.min(100, (d.purchase / Math.max(1, d.pv)) * 100)}%` }}
                    />
                  )}
                </span>
                <span className="dash-trend-day">{d.day.slice(5)}</span>
              </div>
            ))}
          </div>
          <p className="meta">막대 = 페이지뷰, 하단 초록 = 구매</p>
        </section>

        <section className="dash-card">
          <h2>국가별 (페이지뷰)</h2>
          <Bars data={topCounts(pv, "country")} />
        </section>

        <section className="dash-card">
          <h2>언어별 (페이지뷰)</h2>
          <Bars data={topCounts(pv, "language")} />
        </section>

        <section className="dash-card">
          <h2>최근 구매</h2>
          {recentPurchases.length === 0 ? (
            <p className="meta">데이터 없음</p>
          ) : (
            <table className="dash-table">
              <tbody>
                <tr>
                  <th>시각</th>
                  <th>국가</th>
                  <th>트랜잭션</th>
                </tr>
                {recentPurchases.map((r, i) => (
                  <tr key={i}>
                    <td>{new Date(r.created_at).toLocaleString("ko-KR")}</td>
                    <td>{(r.country || "—").toUpperCase()}</td>
                    <td className="mono">{r.transaction_id?.slice(0, 20) ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>
    </main>
  );
}
