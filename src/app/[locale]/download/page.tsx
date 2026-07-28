import Link from "next/link";
import { getDictionary, isLocale, defaultLocale, type Locale } from "@/lib/i18n";
import { verifyDownloadToken } from "@/lib/token";

export const dynamic = "force-dynamic";

export default function DownloadPage({
  params,
  searchParams,
}: {
  params: { locale: string };
  searchParams: { token?: string };
}) {
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const t = getDictionary(locale).download;
  const payload = verifyDownloadToken(searchParams.token);

  if (!payload) {
    return (
      <main className="dl">
        <span className="badge-ok blocked-badge">{t.blockedEyebrow}</span>
        <h1>{t.blockedTitle}</h1>
        <p>{t.blockedDesc}</p>
        <p style={{ marginTop: 28 }}>
          <Link className="btn" href={`/${locale}#buy`}>
            {t.blockedCta}
          </Link>
        </p>
      </main>
    );
  }

  const downloadUrl = `/api/download?token=${encodeURIComponent(searchParams.token || "")}`;

  return (
    <main className="dl">
      <div className="dl-mark">◔</div>
      <span className="badge-ok">{t.okEyebrow}</span>
      <h1>{t.okTitle}</h1>
      <p>{t.okDesc}</p>
      <p style={{ marginTop: 6 }}>
        {t.forEmail} <span className="email-tag">{payload.email}</span>
      </p>

      <p style={{ marginTop: 24 }}>
        <a className="btn" href={downloadUrl}>
          {t.button}
        </a>
      </p>

      <div className="install-box">
        <h3>{t.installTitle}</h3>
        <ol>
          {t.installSteps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
      </div>

      <p>
        <Link className="back" href={`/${locale}`}>
          {t.backHome}
        </Link>
      </p>
    </main>
  );
}
