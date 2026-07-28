import { getDictionary, isLocale, defaultLocale, type Locale } from "@/lib/i18n";
import PurchaseButton from "@/components/PurchaseButton";
import Footer from "@/components/Footer";
import AnalyticsTracker from "@/components/AnalyticsTracker";

export const dynamic = "force-dynamic";

function Html({ as = "p", className, html }: { as?: "p" | "span" | "li"; className?: string; html: string }) {
  const Tag = as;
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

function Gauge({ size = 130 }: { size?: number }) {
  const c = size / 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={c} cy={c} r="52" fill="none" stroke="#e5e7eb" strokeWidth="12" />
      <circle
        cx={c}
        cy={c}
        r="52"
        fill="none"
        stroke="#d97706"
        strokeWidth="12"
        strokeLinecap="round"
        strokeDasharray="326.7"
        strokeDashoffset="137.2"
        transform={`rotate(-90 ${c} ${c})`}
      />
      <text x={c} y={c - 4} textAnchor="middle" fontSize="30" fontWeight="800" fill="#0f172a">
        58
      </text>
      <text x={c} y={c + 16} textAnchor="middle" fontSize="11" fill="#94a3b8">
        / 100
      </text>
    </svg>
  );
}

export default function LandingPage({ params }: { params: { locale: string } }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const t = getDictionary(locale);

  return (
    <>
      <AnalyticsTracker locale={locale} />
      {/* HERO */}
      <header className="hero">
        <div className="wrap">
          <nav className="nav">
            <div className="brand">
              <span className="mark">◔</span> GeoScore
            </div>
            <div className="links">
              <a href="#geo">{t.nav.geo}</a>
              <a href="#features">{t.nav.features}</a>
              <a href="#rubric">{t.nav.rubric}</a>
              <a href="#report">{t.nav.report}</a>
              <a href="#install">{t.nav.install}</a>
              <a href="#buy">{t.nav.buy}</a>
            </div>
          </nav>
          <div className="hero-grid">
            <div>
              <p className="eyebrow">{t.hero.eyebrow}</p>
              <h1>
                {t.hero.h1_line1}
                <br />
                {t.hero.h1_line2}
              </h1>
              <Html className="lead" html={t.hero.lead} />
              <div className="cta-row">
                <PurchaseButton locale={locale} label={t.hero.ctaBuy} modal={t.modal} />
                <a className="btn ghost" href="#report">
                  {t.hero.ctaReport}
                </a>
              </div>
              <p className="cta-note">{t.hero.ctaNote}</p>
              <p className="engines">
                {t.hero.enginesLabel} <b>{t.hero.enginesValue}</b>
              </p>
            </div>

            <div className="report" style={{ maxWidth: 360 }}>
              <div className="rhead">
                <div className="b">
                  <span className="mark">◔</span> GeoScore
                </div>
                <span className="meta">{t.hero.demoTag}</span>
              </div>
              <div className="rbody">
                <div className="rcard gauge">
                  <Gauge size={128} />
                  <span className="badge" style={{ background: "#d97706" }}>
                    {t.hero.demoBadge}
                  </span>
                  <div className="subs">
                    <span>{t.hero.demoContent}</span>
                    <span>{t.hero.demoTech}</span>
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
              <div className="rcard gauge">
                <Gauge size={130} />
                <span className="badge" style={{ background: "#d97706" }}>
                  {t.report.badge}
                </span>
                <div className="subs">
                  <span>{t.report.content}</span>
                  <span>{t.report.tech}</span>
                </div>
                <span className="meta">{t.report.scoreMeta}</span>
              </div>

              <div className="rcard">
                <h4>{t.report.reasonsTitle}</h4>
                {t.report.reasons.map((r, i) => (
                  <div key={i} className={`li ${r.good ? "li-good" : "li-bad"}`}>
                    {r.text}
                  </div>
                ))}
              </div>

              <div className="rcard">
                <h4>{t.report.scorecardTitle}</h4>
                <div className="row">
                  <span>
                    {t.rubric.tech[0].item} <span className="g">·35</span>
                  </span>
                  <span>4/5</span>
                </div>
                <div className="bar">
                  <span style={{ width: "80%" }} />
                </div>
                <div className="row" style={{ marginTop: 8 }}>
                  <span>
                    {t.rubric.tech[2].item} <span className="g">·20</span>
                  </span>
                  <span>0/5</span>
                </div>
                <div className="bar">
                  <span style={{ width: "0%", background: "#dc2626" }} />
                </div>
                <div className="row" style={{ marginTop: 8 }}>
                  <span>
                    {t.rubric.content[0].item} <span className="g">·15</span>
                  </span>
                  <span>2/5</span>
                </div>
                <div className="bar">
                  <span style={{ width: "40%", background: "#d97706" }} />
                </div>
                <div className="row" style={{ marginTop: 8 }}>
                  <span>
                    {t.rubric.content[1].item} <span className="g">·15</span>
                  </span>
                  <span>4/5</span>
                </div>
                <div className="bar">
                  <span style={{ width: "80%" }} />
                </div>
                <div className="row" style={{ marginTop: 8 }}>
                  <span>
                    {t.rubric.content[4].item} <span className="g">·14</span>
                  </span>
                  <span>3/5</span>
                </div>
                <div className="bar">
                  <span style={{ width: "60%" }} />
                </div>
                <p className="meta" style={{ margin: "8px 0 0" }}>
                  {t.report.scorecardMore}
                </p>
              </div>

              <div className="rcard">
                <h4>{t.report.accordionTitle}</h4>
                {t.report.accordion.map((a, i) => (
                  <div className="acc" key={i}>
                    <div className="t">
                      <span>{a.item}</span>
                      <span className="meta">{a.score}</span>
                    </div>
                    <div className="why">
                      <b>{locale === "ko" ? "왜:" : "Why:"}</b> {a.why}
                    </div>
                    <div className="ev">{a.ev}</div>
                  </div>
                ))}
              </div>

              <div className="rcard">
                <h4>{t.report.cepTitle}</h4>
                <p className="meta" style={{ margin: "-4px 0 8px" }}>
                  <span className="cov" style={{ background: "#dc2626" }}>
                    {t.report.cepSummary.none}
                  </span>{" "}
                  <span className="cov" style={{ background: "#d97706" }}>
                    {t.report.cepSummary.partial}
                  </span>{" "}
                  <span className="cov" style={{ background: "#16a34a" }}>
                    {t.report.cepSummary.full}
                  </span>
                </p>

                {t.report.cep.map((cep, i) => (
                  <div className="cep" key={i}>
                    <div>
                      <span
                        className="cov"
                        style={{ background: cep.cov === "none" ? "#dc2626" : "#d97706" }}
                      >
                        {cep.covLabel}
                      </span>{" "}
                      <b>{cep.title}</b>
                    </div>
                    <div style={{ margin: "5px 0" }}>
                      {cep.pills.map((p, j) => (
                        <span className="pill" key={j}>
                          {p}
                        </span>
                      ))}
                    </div>
                    <div className="meta">
                      <b>{locale === "ko" ? "예상 질문:" : "Likely question:"}</b> {cep.q}
                    </div>
                    <div className="meta">
                      <b>{locale === "ko" ? "부족한 점:" : "Gap:"}</b> {cep.lack}
                    </div>
                    <div className="before">
                      <b>Before</b> {cep.before}
                    </div>
                    <div className="after">
                      <b>After</b> {cep.after}
                    </div>
                    <div className="needs">{cep.needs}</div>
                  </div>
                ))}

                <p className="meta" style={{ marginTop: 8 }}>
                  {t.report.cepFoot}
                </p>
              </div>

              <div className="rcard">
                <h4>{t.report.techTitle}</h4>
                <div className="meta">jsonld</div>
                <pre>{`<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "${locale === "ko" ? "콜드브루 원두 250g" : "Cold Brew Beans 250g"}",
  "author": { "@type": "Person", "name": "[${locale === "ko" ? "저자 이름" : "author name"}]" },
  "datePublished": "2026-05-10",
  "dateModified": "2026-05-10"
}
</script>`}</pre>
              </div>

              <div className="rcard">
                <h4>{t.report.introTitle}</h4>
                <pre>{t.report.introSnippet}</pre>
              </div>
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
          <Html className="disc" html={t.ctaFinal.disclaimer} />
        </div>
      </section>

      <Footer locale={locale} />
    </>
  );
}
