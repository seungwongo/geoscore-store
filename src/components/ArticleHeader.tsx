import Link from "next/link";
import { getDictionary, type Locale } from "@/lib/i18n";

export default function ArticleHeader({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <header className="article-top">
      <div className="wrap article-top-inner">
        <Link href={`/${locale}`} className="brand" style={{ textDecoration: "none", color: "inherit" }}>
          <span className="mark">◔</span> GeoScore
        </Link>
        <div className="links">
          <Link href={`/${locale}/articles`}>{t.nav.articles}</Link>
          <Link href={`/${locale}#buy`} className="btn" style={{ padding: "8px 16px", fontSize: 14 }}>
            {t.nav.buy}
          </Link>
        </div>
      </div>
    </header>
  );
}
