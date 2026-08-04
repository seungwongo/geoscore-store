import nodemailer from "nodemailer";
import { getDictionary, type Locale } from "@/lib/i18n";
import type { DailyStats } from "@/lib/report";

const BRAND = "#2563eb";
const BRAND_DARK = "#1d4ed8";
const INK = "#0f172a";
const GRAY = "#475569";
const LINE = "#e5e7eb";

function transport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.GOOGLE_MAIL,
      pass: process.env.GOOGLE_PASSWORD,
    },
  });
}

function appUrl(): string {
  return process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") || "http://localhost:3000";
}

function customerHtml(locale: Locale, downloadUrl: string): string {
  const dict = getDictionary(locale);
  const t = dict.email.customer;
  const apiLinks = dict.install.apiProviders
    .map(
      (p) =>
        `<a href="${p.url}" style="display:inline-block;margin:0 8px 8px 0;padding:8px 12px;
          border:1px solid ${LINE};border-radius:8px;color:${BRAND};text-decoration:none;
          font-size:13px;font-weight:600;">${p.name} ↗</a>`,
    )
    .join("");
  const steps = t.installSteps
    .map(
      (s, i) => `
      <tr>
        <td style="vertical-align:top;padding:6px 0;">
          <span style="display:inline-block;width:26px;height:26px;line-height:26px;text-align:center;
            background:#eff6ff;color:${BRAND};font-weight:700;border-radius:7px;font-size:13px;">${i + 1}</span>
        </td>
        <td style="padding:6px 0 6px 12px;color:${GRAY};font-size:14px;line-height:1.6;">${s}</td>
      </tr>`,
    )
    .join("");

  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f8fafc;">
    <span style="display:none;opacity:0;color:transparent;height:0;width:0;overflow:hidden;">${t.preheader}</span>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:32px 12px;">
      <tr><td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
          style="max-width:560px;background:#ffffff;border:1px solid ${LINE};border-radius:18px;overflow:hidden;
          font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Apple SD Gothic Neo','Noto Sans KR',Roboto,sans-serif;">
          <tr>
            <td style="background:radial-gradient(600px 240px at 80% -20%, #eff6ff 0%, #ffffff 70%);padding:32px 32px 8px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="width:38px;height:38px;background:${BRAND};color:#fff;border-radius:10px;
                    text-align:center;font-size:20px;line-height:38px;">◔</td>
                  <td style="padding-left:10px;font-weight:800;font-size:18px;color:${INK};">GeoScore</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 32px 0;">
              <h1 style="margin:0 0 10px;font-size:24px;color:${INK};letter-spacing:-0.01em;">${t.heading}</h1>
              <p style="margin:0 0 20px;color:${GRAY};font-size:15px;line-height:1.7;">${t.intro}</p>
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:6px 0 22px;">
                <tr><td style="border-radius:10px;background:${BRAND};">
                  <a href="${downloadUrl}" style="display:inline-block;padding:13px 26px;color:#ffffff;
                    text-decoration:none;font-weight:700;font-size:15px;border-radius:10px;background:${BRAND};">${t.button}</a>
                </td></tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:4px 32px 8px;">
              <div style="border:1px solid ${LINE};border-radius:14px;padding:18px 20px;">
                <div style="font-weight:700;font-size:15px;color:${INK};margin-bottom:6px;">${t.installTitle}</div>
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%">${steps}</table>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 32px 4px;">
              <div style="border:1px solid ${LINE};border-radius:14px;padding:18px 20px;">
                <div style="font-weight:700;font-size:15px;color:${INK};margin-bottom:6px;">${t.apiTitle}</div>
                <p style="margin:0 0 12px;color:${GRAY};font-size:14px;line-height:1.6;">${t.apiIntro}</p>
                ${apiLinks}
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:18px 32px 30px;">
              <p style="margin:0;color:#94a3b8;font-size:12.5px;line-height:1.6;border-top:1px solid ${LINE};padding-top:16px;">
                ${t.footerNote}
              </p>
            </td>
          </tr>
        </table>
        <div style="max-width:560px;margin:14px auto 0;color:#cbd5e1;font-size:11px;text-align:center;">
          © 2026 SEUNGWONGO.PRO
        </div>
      </td></tr>
    </table>
  </body>
</html>`;
}

export async function sendCustomerEmail(params: {
  to: string;
  locale: Locale;
  downloadId: string;
}): Promise<void> {
  const t = getDictionary(params.locale).email.customer;
  // Link only — the buyer verifies their email on the download page and then
  // downloads. (Gmail blocks Chrome-extension zips as attachments.)
  const downloadUrl = `${appUrl()}/${params.locale}/download?id=${encodeURIComponent(
    params.downloadId,
  )}`;

  await transport().sendMail({
    from: `GeoScore <${process.env.GOOGLE_MAIL}>`,
    to: params.to,
    subject: t.subject,
    html: customerHtml(params.locale, downloadUrl),
  });
}

export async function sendNotifyEmail(params: {
  customerEmail: string;
  txn: string;
  locale: Locale;
  customerEmailSent: boolean;
}): Promise<void> {
  const notifyTo = process.env.NOTIFY_EMAIL;
  if (!notifyTo) return;
  const t = getDictionary(params.locale).email.notify;
  const when = new Date().toISOString();

  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 12px 6px 0;color:${GRAY};font-size:13px;">${label}</td>
      <td style="padding:6px 0;color:${INK};font-size:13px;font-weight:600;">${value}</td></tr>`;

  const html = `<!doctype html><html><body style="margin:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
    <table role="presentation" width="100%" style="padding:28px 12px;"><tr><td align="center">
      <table role="presentation" style="max-width:480px;background:#fff;border:1px solid ${LINE};border-radius:14px;">
        <tr><td style="padding:22px 24px 6px;">
          <div style="font-weight:800;font-size:16px;color:${BRAND_DARK};">GeoScore</div>
          <h2 style="margin:8px 0 14px;font-size:18px;color:${INK};">${t.heading}</h2>
          <table role="presentation">
            ${row(t.labelEmail, params.customerEmail)}
            ${row(t.labelTxn, params.txn)}
            ${row(t.labelTime, when)}
            ${row(t.labelEmailSent, params.customerEmailSent ? "OK" : "FAILED")}
          </table>
        </td></tr>
      </table>
    </td></tr></table></body></html>`;

  await transport().sendMail({
    from: `GeoScore <${process.env.GOOGLE_MAIL}>`,
    to: notifyTo,
    subject: `${t.subject} · ${params.customerEmail}`,
    html,
  });
}

export async function sendDailyReportEmail(stats: DailyStats): Promise<void> {
  const notifyTo = process.env.NOTIFY_EMAIL;
  if (!notifyTo) return;

  const dateKst = new Date().toLocaleString("ko-KR", {
    timeZone: "Asia/Seoul",
    dateStyle: "long",
    timeStyle: "short",
  });
  const money = (() => {
    try {
      return new Intl.NumberFormat("en-US", { style: "currency", currency: stats.currency }).format(
        stats.revenue,
      );
    } catch {
      return `${stats.revenue} ${stats.currency}`;
    }
  })();

  const stat = (label: string, value: string, sub: string) => `
    <td style="width:50%;padding:8px;">
      <div style="border:1px solid ${LINE};border-radius:12px;padding:14px 16px;">
        <div style="font-size:22px;font-weight:800;color:${INK};">${value}</div>
        <div style="font-size:13px;color:${GRAY};font-weight:600;margin-top:2px;">${label}</div>
        <div style="font-size:11px;color:#94a3b8;margin-top:1px;">${sub}</div>
      </div>
    </td>`;

  const list = (title: string, items: [string, number][]) => {
    const body =
      items.length === 0
        ? `<div style="color:#94a3b8;font-size:13px;">데이터 없음</div>`
        : items
            .map(
              ([k, n]) =>
                `<div style="display:flex;justify-content:space-between;font-size:13px;color:${GRAY};padding:4px 0;border-bottom:1px solid #f1f5f9;">
                  <span>${k}</span><b style="color:${INK};">${n}</b></div>`,
            )
            .join("");
    return `<div style="border:1px solid ${LINE};border-radius:12px;padding:14px 16px;">
      <div style="font-weight:700;font-size:14px;color:${INK};margin-bottom:8px;">${title}</div>${body}</div>`;
  };

  const html = `<!doctype html><html><body style="margin:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Apple SD Gothic Neo',Roboto,sans-serif;">
    <table role="presentation" width="100%" style="padding:28px 12px;"><tr><td align="center">
      <table role="presentation" width="100%" style="max-width:560px;background:#fff;border:1px solid ${LINE};border-radius:16px;overflow:hidden;">
        <tr><td style="background:radial-gradient(600px 220px at 80% -20%, #eff6ff 0%, #ffffff 70%);padding:24px 24px 8px;">
          <div style="font-weight:800;font-size:16px;color:${BRAND_DARK};">GeoScore</div>
          <h1 style="margin:8px 0 2px;font-size:20px;color:${INK};">📊 일일 리포트 · 지난 24시간</h1>
          <div style="font-size:12px;color:#94a3b8;">${dateKst} (KST) 기준</div>
        </td></tr>
        <tr><td style="padding:8px 16px 4px;">
          <table role="presentation" width="100%"><tr>
            ${stat("방문자", String(stats.visitors), `${stats.pageViews} 페이지뷰`)}
            ${stat("구매버튼 클릭", String(stats.buyClickSessions), `${stats.buyClicks} 클릭`)}
          </tr><tr>
            ${stat("구매 완료", String(stats.purchases), `방문→구매 ${stats.cvrVisitor}`)}
            ${stat("매출", money, `클릭→구매 ${stats.cvrClick}`)}
          </tr></table>
        </td></tr>
        <tr><td style="padding:6px 24px 8px;">${list("국가별 (방문)", stats.topCountries)}</td></tr>
        <tr><td style="padding:2px 24px 22px;">${list("유입경로 (방문)", stats.topSources)}</td></tr>
        <tr><td style="padding:0 24px 24px;">
          <a href="${appUrl()}" style="font-size:12px;color:${BRAND};text-decoration:none;">GeoScore 대시보드 열기 →</a>
        </td></tr>
      </table>
    </td></tr></table></body></html>`;

  await transport().sendMail({
    from: `GeoScore <${process.env.GOOGLE_MAIL}>`,
    to: notifyTo,
    subject: `📊 GeoScore 일일 리포트 · 방문 ${stats.visitors} · 구매 ${stats.purchases} · 매출 ${money}`,
    html,
  });
}
