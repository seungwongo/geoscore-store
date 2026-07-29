import { getDictionary, isLocale, defaultLocale, type Locale } from "@/lib/i18n";
import PurchaseButton from "@/components/PurchaseButton";
import Footer from "@/components/Footer";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import HeroSlider from "@/components/HeroSlider";
import HeroNav from "@/components/HeroNav";
import ReportBody from "@/components/ReportBody";

export const dynamic = "force-dynamic";

function Html({ as = "p", className, html }: { as?: "p" | "span" | "li"; className?: string; html: string }) {
  const Tag = as;
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

export default function LandingPage({ params }: { params: { locale: string } }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const t = getDictionary(locale);

  const appUrl = (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000").replace(/\/$/, "");
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: "GeoScore",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Chrome",
        url: `${appUrl}/${locale}`,
        image: `${appUrl}/geoscore-store.png`,
        description: t.meta.description,
        softwareVersion: "0.1.0",
        inLanguage: locale,
        offers: {
          "@type": "Offer",
          price: "19",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: `${appUrl}/${locale}#buy`,
        },
        publisher: {
          "@type": "Organization",
          name: "SEUNGWONGO.PRO",
          url: "https://seungwongo.pro",
        },
      },
      {
        "@type": "WebSite",
        name: "GeoScore",
        url: appUrl,
        inLanguage: locale,
        publisher: {
          "@type": "Organization",
          name: "SEUNGWONGO.PRO",
          url: "https://seungwongo.pro",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AnalyticsTracker locale={locale} />
      {/* HERO */}
      <header className="hero">
        <div className="wrap">
          <HeroNav nav={t.nav} />
          <div className="hero-grid">
            <div>
              <p className="eyebrow">{t.hero.eyebrow}</p>
              <HeroSlider slides={t.hero.slides} />
              <div className="cta-row">
                <PurchaseButton locale={locale} label={t.hero.ctaBuy} modal={t.modal} />
                <a className="btn ghost" href="#report">
                  {t.hero.ctaReport}
                </a>
              </div>
              <p className="cta-once">{t.hero.onceNote}</p>
              <p className="cta-note">{t.hero.ctaNote}</p>
              <p className="engines">
                {t.hero.enginesLabel} <b>{t.hero.enginesValue}</b>
              </p>
            </div>

            <div className="hero-report-frame">
              <div className="rhead">
                <div className="b">
                  <span className="mark">◔</span> GeoScore
                </div>
                <span className="meta">{t.hero.demoTag}</span>
              </div>
              <div className="hero-report-viewport">
                <div className="hero-report-track">
                  <div className="hero-report-copy">
                    <ReportBody t={t} locale={locale} />
                  </div>
                  <div className="hero-report-copy" aria-hidden="true">
                    <ReportBody t={t} locale={locale} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* WHAT IS GEO */}
      <section id="geo" className="alt">
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">{t.geo.eyebrow}</p>
            <h2>{t.geo.h2}</h2>
            <Html html={t.geo.lead} />
          </div>
          <div className="geo-grid">
            {t.geo.cards.map((card, i) => (
              <div className="card" key={i}>
                <div className="ico">{card.ico}</div>
                <h3>{card.h3}</h3>
                <p>{card.p}</p>
              </div>
            ))}
          </div>
          <p className="geo-closing">{t.geo.closing}</p>
        </div>
      </section>

      {/* WHY */}
      <section>
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">{t.why.eyebrow}</p>
            <h2>{t.why.h2}</h2>
            <Html html={t.why.p} />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="alt">
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">{t.features.eyebrow}</p>
            <h2>{t.features.h2}</h2>
            <p>{t.features.p}</p>
          </div>
          <div className="feat-grid">
            {t.features.cards.map((card, i) => (
              <div className="card" key={i}>
                <div className="ico">{card.ico}</div>
                <h3>{card.h3}</h3>
                <p>{card.p}</p>
                <ul>
                  {card.ul.map((li, j) => (
                    <li key={j}>{li}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RUBRIC */}
      <section id="rubric">
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">{t.rubric.eyebrow}</p>
            <h2>{t.rubric.h2}</h2>
            <p>{t.rubric.p}</p>
          </div>
          <div className="rubric">
            <table className="r">
              <caption>{t.rubric.contentCaption}</caption>
              <tbody>
                <tr>
                  <th>{t.rubric.colItem}</th>
                  <th>{t.rubric.colScore}</th>
                  <th className="w">{t.rubric.colWeight}</th>
                </tr>
                {t.rubric.content.map((r, i) => (
                  <tr key={i}>
                    <td>{r.item}</td>
                    <td>
                      <span className={`tag ${r.llm ? "h" : "a"}`}>
                        {r.llm ? t.rubric.tagLlm : t.rubric.tagHeuristic}
                      </span>
                    </td>
                    <td className="w">{r.w}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <table className="r">
              <caption>{t.rubric.techCaption}</caption>
              <tbody>
                <tr>
                  <th>{t.rubric.colItem}</th>
                  <th>{t.rubric.colDesc}</th>
                  <th className="w">{t.rubric.colWeight}</th>
                </tr>
                {t.rubric.tech.map((r, i) => (
                  <tr key={i}>
                    <td>{r.item}</td>
                    <td className="meta">{r.desc}</td>
                    <td className="w">{r.w}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={3} style={{ border: 0, paddingTop: 14 }} className="meta">
                    {t.rubric.penalty}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SAMPLE REPORT */}
      <section id="report" className="alt">
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">{t.report.eyebrow}</p>
            <h2>{t.report.h2}</h2>
            <p>{t.report.p}</p>
          </div>

          <div className="report">
            <div className="rhead">
              <div className="b">
                <span className="mark">◔</span> GeoScore
              </div>
              <span className="meta">{t.report.url}</span>
            </div>
            <div className="rbody">
              <ReportBody t={t} locale={locale} />
            </div>
          </div>
          <p className="meta" style={{ textAlign: "center", maxWidth: 620, margin: "22px auto 0" }}>
            {t.report.disclaimer}
          </p>
        </div>
      </section>

      {/* HOW */}
      <section>
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">{t.how.eyebrow}</p>
            <h2>{t.how.h2}</h2>
          </div>
          <div className="steps">
            {t.how.steps.map((s, i) => (
              <div className="step" key={i}>
                <div className="n">{i + 1}</div>
                <h4>{s.h4}</h4>
                <p>{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRIVACY */}
      <section id="privacy" className="alt">
        <div className="wrap priv">
          <div>
            <p className="eyebrow">{t.privacy.eyebrow}</p>
            <h2 style={{ fontSize: 30, margin: "6px 0 14px" }}>{t.privacy.h2}</h2>
            <ul>
              {t.privacy.list.map((li, i) => (
                <Html as="li" key={i} html={li} />
              ))}
            </ul>
          </div>
          <div className="card">
            <div className="ico">{t.privacy.cardIco}</div>
            <h3>{t.privacy.cardH3}</h3>
            <p>{t.privacy.cardP}</p>
            <ul>
              {t.privacy.hosts.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* INSTALL */}
      <section id="install">
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">{t.install.eyebrow}</p>
            <h2>{t.install.h2}</h2>
            <p>{t.install.p}</p>
          </div>
          <div className="steps">
            {t.install.steps.map((s, i) => (
              <div className="step" key={i}>
                <div className="n">{i + 1}</div>
                <h4>{s.h4}</h4>
                <p>{s.p}</p>
              </div>
            ))}
          </div>
          <p className="meta" style={{ textAlign: "center", maxWidth: 620, margin: "24px auto 0" }}>
            {t.install.note}
          </p>
        </div>
      </section>

      {/* BUY */}
      <section id="buy" className="alt">
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">{t.purchase.eyebrow}</p>
            <h2>{t.purchase.h2}</h2>
            <p>{t.purchase.p}</p>
          </div>
          <div className="pricing">
            <div className="once-badge">{t.purchase.onceBadge}</div>
            <div className="price">{t.purchase.price}</div>
            <div className="price-unit">{t.purchase.priceUnit}</div>
            <ul>
              {t.purchase.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
            <PurchaseButton
              locale={locale}
              label={t.purchase.buyButton}
              className="btn"
              modal={t.modal}
            />
            <p className="secured">{t.purchase.securedBy}</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ textAlign: "center" }}>
        <div className="wrap">
          <h2 style={{ fontSize: 30, margin: "0 0 10px" }}>{t.ctaFinal.h2}</h2>
          <p style={{ color: "var(--gray)", fontSize: 16, margin: "0 0 24px" }}>{t.ctaFinal.p}</p>
          <PurchaseButton locale={locale} label={t.ctaFinal.button} modal={t.modal} />
          <p className="cta-once" style={{ margin: "16px auto 0" }}>
            {t.hero.onceNote}
          </p>
          <Html className="disc" html={t.ctaFinal.disclaimer} />
        </div>
      </section>

      <Footer locale={locale} />
    </>
  );
}
