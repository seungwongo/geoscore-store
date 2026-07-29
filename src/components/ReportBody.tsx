import type { Dictionary, Locale } from "@/lib/i18n";

export function Gauge({ size = 130 }: { size?: number }) {
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

/** The inner cards of the sample diagnostic report (reused by the hero preview
 *  and the #report section). */
export default function ReportBody({ t, locale }: { t: Dictionary; locale: Locale }) {
  return (
    <>
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
    </>
  );
}
