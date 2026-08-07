import { Fragment } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, defaultLocale, locales, type Locale } from "@/lib/i18n";
import { articles, getArticle, type ArticleBlock } from "@/content/articles";
import ArticleHeader from "@/components/ArticleHeader";
import ArticleCta from "@/components/ArticleCta";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  return locales.flatMap((locale) => articles.map((a) => ({ locale, slug: a.slug })));
}

export function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Metadata {
  const article = getArticle(params.slug);
  if (!article) return {};
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const c = article[locale];
  const appUrl = (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000").replace(/\/$/, "");
  const url = `${appUrl}/${locale}/articles/${article.slug}`;
  return {
    title: `${c.title} · GeoScore`,
    description: c.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: c.title,
      description: c.description,
      url,
      images: [{ url: `${appUrl}/geoscore-store.png`, width: 1376, height: 768, alt: "GeoScore" }],
    },
    twitter: {
      card: "summary_large_image",
      title: c.title,
      description: c.description,
      images: [`${appUrl}/geoscore-store.png`],
    },
  };
}

// One CTA per article. Placement (middle vs end) is derived from the slug so it
// varies article-to-article but stays stable across renders (no hydration drift).
function ctaPlacement(slug: string): "middle" | "end" {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h += slug.charCodeAt(i);
  return h % 2 === 0 ? "middle" : "end";
}

function Block({ block, locale }: { block: ArticleBlock; locale: Locale }) {
  switch (block.t) {
    case "h2":
      return <h2>{block.x}</h2>;
    case "p":
      return <p dangerouslySetInnerHTML={{ __html: block.x }} />;
    case "ul":
      return (
        <ul>
          {block.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol>
          {block.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ol>
      );
    case "quote":
      return <blockquote>{block.x}</blockquote>;
    case "cta":
      return <ArticleCta locale={locale} />;
    default:
      return null;
  }
}

export default function ArticleDetailPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const article = getArticle(params.slug);
  if (!article) notFound();
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const t = getDictionary(locale).articles;
  const c = article[locale];

  // Exactly one CTA per article. Ignore any legacy inline cta markers; place the
  // single CTA either mid-article (before the h2 nearest the middle) or at the end.
  const contentBlocks = c.blocks.filter((b) => b.t !== "cta");
  let ctaBefore = -1;
  if (ctaPlacement(article.slug) === "middle" && contentBlocks.length > 2) {
    const mid = contentBlocks.length / 2;
    const h2s = contentBlocks
      .map((b, i) => (b.t === "h2" ? i : -1))
      .filter((i) => i > 0);
    ctaBefore = h2s.length
      ? h2s.reduce((best, i) => (Math.abs(i - mid) < Math.abs(best - mid) ? i : best), h2s[0])
      : Math.floor(mid);
  }
  const showEndCta = ctaBefore === -1;

  const appUrl = (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000").replace(/\/$/, "");
  const url = `${appUrl}/${locale}/articles/${article.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: c.title,
    description: c.description,
    inLanguage: locale,
    datePublished: article.date,
    dateModified: article.date,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: `${appUrl}/geoscore-store.png`,
    author: { "@type": "Organization", name: "SEUNGWONGO.PRO", url: "https://seungwongo.pro" },
    publisher: {
      "@type": "Organization",
      name: "GeoScore",
      logo: { "@type": "ImageObject", url: `${appUrl}/android-chrome-512x512.png` },
    },
  };

  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArticleHeader locale={locale} />
      <main className="article-wrap">
        <p style={{ marginBottom: 18 }}>
          <Link className="back" href={`/${locale}/articles`}>
            {t.backToList}
          </Link>
        </p>

        <span className="article-cat">{c.category}</span>
        <h1 className="article-title">{c.title}</h1>
        <div className="article-meta article-meta-lead">
          <span>
            {t.publishedOn} {article.date}
          </span>
          <span>
            {c.readMins} {t.minRead}
          </span>
        </div>

        <article className="article-body">
          {contentBlocks.map((block, i) => (
            <Fragment key={i}>
              {i === ctaBefore && <ArticleCta locale={locale} />}
              <Block block={block} locale={locale} />
            </Fragment>
          ))}
        </article>

        {showEndCta && <ArticleCta locale={locale} />}

        <section className="article-related">
          <h3>{t.related}</h3>
          <div className="article-related-list">
            {related.map((a) => (
              <Link key={a.slug} href={`/${locale}/articles/${a.slug}`}>
                {a[locale].title}
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
