import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin";
import { isLocale, defaultLocale, type Locale } from "@/lib/i18n";
import { supabaseAdmin, DOWNLOADS_TABLE } from "@/lib/supabase";
import { ANALYTICS_TABLE } from "@/lib/analytics";
import LogoutButton from "@/components/LogoutButton";

export const dynamic = "force-dynamic";

const FUNNEL_DAYS = 30;
const TREND_DAYS = 14;
const TREND_MONTHS = 6;

interface AnalyticsRow {
  event_type: "page_view" | "buy_click" | "purchase";
  session_id: string | null;
  country: string | null;
  language: string | null;
  referrer: string | null;
  created_at: string;
}

const SOURCE_LABEL: Record<string, string> = {
  direct: "직접 방문",
  "google.com": "Google",
  "google.co.kr": "Google",
  "bing.com": "Bing",
  "search.naver.com": "네이버",
  "naver.com": "네이버",
  "daum.net": "다음",
  "chatgpt.com": "ChatGPT (AI)",
  "chat.openai.com": "ChatGPT (AI)",
  "perplexity.ai": "Perplexity (AI)",
  "gemini.google.com": "Gemini (AI)",
  "facebook.com": "Facebook",
  "m.facebook.com": "Facebook",
  "t.co": "X (Twitter)",
  "x.com": "X (Twitter)",
  "twitter.com": "X (Twitter)",
  "instagram.com": "Instagram",
  "linkedin.com": "LinkedIn",
  "youtube.com": "YouTube",
  "reddit.com": "Reddit",
  "threads.net": "Threads",
};

function sourceLabel(ref: string): string {
  return SOURCE_LABEL[ref] || ref || "직접 방문";
}

function sourceCounts(rows: AnalyticsRow[], limit = 8): [string, number][] {
  const map = new Map<string, number>();
  for (const r of rows) {
    const key = r.referrer || "direct";
    map.set(key, (map.get(key) ?? 0) + 1);
  }
  return [...map.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([k, n]) => [sourceLabel(k), n] as [string, number]);
}

interface DownloadRow {
  amount: number | null;
  currency: string | null;
  session_id: string | null;
  download_count: number | null;
  transaction_id: string | null;
  email: string | null;
  created_at: string;
}

function pct(n: number, d: number): string {
  if (!d) return "0%";
  return `${((n / d) * 100).toFixed(1)}%`;
}

function money(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);
  } catch {
    return `${amount.toFixed(2)} ${currency}`;
  }
}

function topCounts(rows: AnalyticsRow[], key: "country" | "language", limit = 8) {
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

function Trend({
  buckets,
  labelOf,
  primaryCur,
}: {
  buckets: { key: string; views: number; purchases: number; revenue: number }[];
  labelOf: (key: string) => string;
  primaryCur: string;
}) {
  const maxViews = Math.max(1, ...buckets.map((b) => b.views));
  return (
    <div className="dash-trend">
      {buckets.map((b, idx) => (
        <div
          className={`dash-trend-col${idx < 2 ? " tip-right" : ""}${
            idx > buckets.length - 3 ? " tip-left" : ""
          }`}
          key={b.key}
        >
          <div className="dash-tip" role="tooltip">
            <div className="dash-tip-title">{b.key}</div>
            <div className="dash-tip-row">
              <span className="dash-tip-dot view" />
              페이지뷰 <b>{b.views.toLocaleString()}</b>
            </div>
            <div className="dash-tip-row">
              <span className="dash-tip-dot buy" />
              구매 <b>{b.purchases.toLocaleString()}</b>
            </div>
            <div className="dash-tip-row">
              <span className="dash-tip-dot rev" />
              매출 <b>{money(b.revenue, primaryCur)}</b>
            </div>
          </div>
          <span className="dash-trend-bar" style={{ height: `${(b.views / maxViews) * 100}%` }}>
            {b.purchases > 0 && (
              <span
                className="dash-trend-buy"
                style={{ height: `${Math.min(100, (b.purchases / Math.max(1, b.views)) * 100)}%` }}
              />
            )}
          </span>
          <span className="dash-trend-day">{labelOf(b.key)}</span>
        </div>
      ))}
    </div>
  );
}

export default async function AdminDashboard({ params }: { params: { locale: string } }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const admin = getAdminSession();
  if (!admin) redirect(`/${locale}`);

  const now = Date.now();
  const sinceAnalytics = new Date(now - TREND_MONTHS * 31 * 864e5).toISOString();
  const since30 = new Date(now - FUNNEL_DAYS * 864e5).toISOString();
  const sb = supabaseAdmin();

  const [{ data: aData }, { data: dData }] = await Promise.all([
    sb
      .from(ANALYTICS_TABLE)
      .select("event_type, session_id, country, language, referrer, created_at")
      .gte("created_at", sinceAnalytics)
      .order("created_at", { ascending: false })
      .limit(100000),
    sb
      .from(DOWNLOADS_TABLE)
      .select("amount, currency, session_id, download_count, transaction_id, email, created_at")
      .order("created_at", { ascending: false })
      .limit(5000),
  ]);
  const rows = (aData ?? []) as AnalyticsRow[];
  const downloads = (dData ?? []) as DownloadRow[];

  // ----- Revenue (all-time, from download records) -----
  const revenueByCur = new Map<string, number>();
  const countByCur = new Map<string, number>();
  let totalDownloads = 0;
  for (const d of downloads) {
    totalDownloads += d.download_count ?? 0;
    if (d.amount == null) continue;
    const c = d.currency || "USD";
    revenueByCur.set(c, (revenueByCur.get(c) ?? 0) + Number(d.amount));
    countByCur.set(c, (countByCur.get(c) ?? 0) + 1);
  }
  const currencies = [...revenueByCur.keys()].sort(
    (a, b) => (countByCur.get(b) ?? 0) - (countByCur.get(a) ?? 0),
  );
  const primaryCur = currencies[0] ?? "USD";
  const totalRevenue = revenueByCur.get(primaryCur) ?? 0;
  const totalPurchases = downloads.length;
  const paidCount = countByCur.get(primaryCur) ?? 0;
  const aov = paidCount ? totalRevenue / paidCount : 0;

  const monthKey = (iso: string) => iso.slice(0, 7);
  const thisMonth = new Date(now).toISOString().slice(0, 7);
  let thisMonthRevenue = 0;
  let thisMonthPurchases = 0;
  for (const d of downloads) {
    if (monthKey(d.created_at) === thisMonth) {
      thisMonthPurchases += 1;
      if (d.amount != null && (d.currency || "USD") === primaryCur) thisMonthRevenue += Number(d.amount);
    }
  }

  // ----- Funnel (last 30 days) -----
  const in30 = (iso: string) => iso >= since30;
  const pv = rows.filter((r) => r.event_type === "page_view" && in30(r.created_at));
  const bc = rows.filter((r) => r.event_type === "buy_click" && in30(r.created_at));
  const sessionsOf = <T extends { session_id: string | null }>(rs: T[]) =>
    new Set(rs.map((r) => r.session_id).filter(Boolean));
  const visitors = sessionsOf(pv).size;
  const buyClickSessions = sessionsOf(bc).size;
  const purchases30 = downloads.filter((d) => in30(d.created_at));
  const purchaseSessions30 = sessionsOf(purchases30).size;

  // ----- Daily trend (14 days) -----
  const dayKey = (iso: string) => iso.slice(0, 10);
  const days: { key: string; views: number; purchases: number; revenue: number }[] = [];
  for (let i = TREND_DAYS - 1; i >= 0; i--) {
    days.push({ key: new Date(now - i * 864e5).toISOString().slice(0, 10), views: 0, purchases: 0, revenue: 0 });
  }
  const dayIdx = new Map(days.map((d, i) => [d.key, i]));
  for (const r of rows) {
    if (r.event_type !== "page_view") continue;
    const i = dayIdx.get(dayKey(r.created_at));
    if (i !== undefined) days[i].views += 1;
  }
  for (const d of downloads) {
    const i = dayIdx.get(dayKey(d.created_at));
    if (i !== undefined) {
      days[i].purchases += 1;
      if (d.amount != null && (d.currency || "USD") === primaryCur) days[i].revenue += Number(d.amount);
    }
  }

  // ----- Monthly trend (6 months) -----
  const months: { key: string; views: number; purchases: number; revenue: number }[] = [];
  {
    const base = new Date(now);
    for (let i = TREND_MONTHS - 1; i >= 0; i--) {
      const d = new Date(base.getFullYear(), base.getMonth() - i, 1);
      months.push({ key: d.toISOString().slice(0, 7), views: 0, purchases: 0, revenue: 0 });
    }
  }
  const monIdx = new Map(months.map((m, i) => [m.key, i]));
  for (const r of rows) {
    if (r.event_type !== "page_view") continue;
    const i = monIdx.get(monthKey(r.created_at));
    if (i !== undefined) months[i].views += 1;
  }
  for (const d of downloads) {
    const i = monIdx.get(monthKey(d.created_at));
    if (i !== undefined) {
      months[i].purchases += 1;
      if (d.amount != null && (d.currency || "USD") === primaryCur) months[i].revenue += Number(d.amount);
    }
  }

  const recent = downloads.slice(0, 12);

  const revenueStats = [
    { label: "총 매출", value: money(totalRevenue, primaryCur), sub: currencies.length > 1 ? "주 통화 기준" : "전체 기간" },
    { label: "이번 달 매출", value: money(thisMonthRevenue, primaryCur), sub: `${thisMonthPurchases}건` },
    { label: "총 구매", value: totalPurchases, sub: "전체 기간" },
    { label: "평균 구매액", value: money(aov, primaryCur), sub: "결제당" },
  ];
  const funnelStats = [
    { label: "방문자", value: visitors, sub: `${pv.length} 페이지뷰` },
    { label: "구매버튼 클릭", value: buyClickSessions, sub: `${bc.length} 클릭` },
    { label: "구매 완료", value: purchases30.length, sub: `${purchaseSessions30} 세션` },
    { label: "클릭→구매 전환", value: pct(purchaseSessions30, buyClickSessions), sub: "세션 기준" },
    { label: "다운로드 실행", value: totalDownloads, sub: "누적" },
  ];

  return (
    <main className="dash">
      <div className="dash-head">
        <div>
          <h1>대시보드</h1>
          <p className="meta">{admin.email}</p>
        </div>
        <div className="dash-head-actions">
          <Link className="back" href={`/${locale}`}>
            ← 사이트
          </Link>
          <LogoutButton label="로그아웃" />
        </div>
      </div>

      <h2 className="dash-section">매출 · 구매 <span className="meta">(전체 기간)</span></h2>
      <div className="dash-stats dash-stats-4">
        {revenueStats.map((s) => (
          <div className="dash-stat" key={s.label}>
            <div className="dash-stat-val">{s.value}</div>
            <div className="dash-stat-label">{s.label}</div>
            <div className="dash-stat-sub">{s.sub}</div>
          </div>
        ))}
      </div>
      {currencies.length > 1 && (
        <p className="meta" style={{ marginTop: 8 }}>
          통화별 매출:{" "}
          {currencies.map((c) => `${money(revenueByCur.get(c) ?? 0, c)}`).join(" · ")}
        </p>
      )}

      <h2 className="dash-section">유입 · 전환 <span className="meta">(최근 {FUNNEL_DAYS}일)</span></h2>
      <div className="dash-stats">
        {funnelStats.map((s) => (
          <div className="dash-stat" key={s.label}>
            <div className="dash-stat-val">{s.value}</div>
            <div className="dash-stat-label">{s.label}</div>
            <div className="dash-stat-sub">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="dash-cols">
        <section className="dash-card">
          <h2>일별 추이 <span className="meta">(최근 {TREND_DAYS}일)</span></h2>
          <Trend buckets={days} labelOf={(k) => k.slice(5)} primaryCur={primaryCur} />
          <p className="meta">막대 = 페이지뷰, 하단 초록 = 구매</p>
        </section>

        <section className="dash-card">
          <h2>월별 추이 <span className="meta">(최근 {TREND_MONTHS}개월)</span></h2>
          <Trend buckets={months} labelOf={(k) => k.slice(2)} primaryCur={primaryCur} />
          <p className="meta">막대 = 페이지뷰, 하단 초록 = 구매</p>
        </section>

        <section className="dash-card">
          <h2>국가별 <span className="meta">(페이지뷰)</span></h2>
          <Bars data={topCounts(pv, "country")} />
        </section>

        <section className="dash-card">
          <h2>언어별 <span className="meta">(페이지뷰)</span></h2>
          <Bars data={topCounts(pv, "language")} />
        </section>

        <section className="dash-card">
          <h2>유입경로 <span className="meta">(페이지뷰)</span></h2>
          <Bars data={sourceCounts(pv)} />
        </section>

        <section className="dash-card dash-card-wide">
          <h2>최근 구매</h2>
          {recent.length === 0 ? (
            <p className="meta">데이터 없음</p>
          ) : (
            <table className="dash-table">
              <tbody>
                <tr>
                  <th>시각</th>
                  <th>금액</th>
                  <th>이메일</th>
                  <th>트랜잭션</th>
                </tr>
                {recent.map((r, i) => (
                  <tr key={i}>
                    <td>{new Date(r.created_at).toLocaleString("ko-KR")}</td>
                    <td>{r.amount != null ? money(Number(r.amount), r.currency || primaryCur) : "—"}</td>
                    <td>{r.email ?? "—"}</td>
                    <td className="mono">{r.transaction_id?.slice(0, 18) ?? "—"}</td>
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
