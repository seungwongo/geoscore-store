import Link from "next/link";

type Section = { h: string; items: string[] };

export default function LegalDoc({
  locale,
  updated,
  backHome,
  title,
  intro,
  sections,
}: {
  locale: string;
  updated: string;
  backHome: string;
  title: string;
  intro: string;
  sections: Section[];
}) {
  return (
    <main className="doc">
      <Link className="back" href={`/${locale}`}>
        {backHome}
      </Link>
      <h1>{title}</h1>
      <div className="updated">{updated}</div>
      <p className="intro">{intro}</p>
      {sections.map((s, i) => (
        <section key={i} style={{ padding: 0 }}>
          <h2>{s.h}</h2>
          <ul>
            {s.items.map((it, j) => (
              <li key={j}>{it}</li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
