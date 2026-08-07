import Link from "next/link";
import type { Metadata } from "next";
import { getDictionary, isLocale, defaultLocale, type Locale } from "@/lib/i18n";
import { articles } from "@/content/articles";
import ArticleHeader from "@/components/ArticleHeader";
import Footer from "@/components/Footer";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const t = getDictionary(params.locale).articles;
  return { title: `${t.title} · GeoScore`, description: t.subtitle };
}

export default function ArticlesListPage({ params }: { params: { locale: string } }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const t = getDictionary(locale).articles;
  const sorted = [...articles].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <>
      <ArticleHeader locale={locale} />
      <main className="articles-wrap">
        <div className="sec-head" style={{ marginBottom: 32 }}>
          <p className="eyebrow">{t.eyebrow}</p>
          <h1 style={{ fontSize: 34, margin: "6px 0 10px" }}>{t.title}</h1>
          <p style={{ color: "var(--gray)", fontSize: 16 }}>{t.subtitle}</p>
        </div>

        <div className="article-grid">
          {sorted.map((a) => {
            const c = a[locale];
            return (
              <Link key={a.slug} href={`/${locale}/articles/${a.slug}`} className="article-card">
                <span className="article-cat">{c.category}</span>
                <h2>{c.title}</h2>
                <p>{c.description}</p>
                <div className="article-meta">
                  <span>{a.date}</span>
                  <span>
                    {c.readMins} {t.minRead}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <p style={{ marginTop: 36 }}>
          <Link className="back" href={`/${locale}`}>
            {t.backHome}
          </Link>
        </p>
      </main>
      <Footer locale={locale} />
    </>
  );
}
