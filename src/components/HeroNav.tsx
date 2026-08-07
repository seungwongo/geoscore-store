"use client";

import { useState } from "react";
import Link from "next/link";

type NavStrings = {
  geo: string;
  features: string;
  rubric: string;
  report: string;
  install: string;
  buy: string;
  articles: string;
};

export default function HeroNav({ nav, locale }: { nav: NavStrings; locale: string }) {
  const [open, setOpen] = useState(false);

  const anchors = [
    { href: "#geo", label: nav.geo },
    { href: "#features", label: nav.features },
    { href: "#rubric", label: nav.rubric },
    { href: "#report", label: nav.report },
    { href: "#install", label: nav.install },
    { href: "#buy", label: nav.buy },
  ];
  const articlesHref = `/${locale}/articles`;

  return (
    <nav className="nav">
      <div className="brand">
        <span className="mark">◔</span> GeoScore
      </div>

      <div className="links">
        {anchors.map((l) => (
          <a key={l.href} href={l.href}>
            {l.label}
          </a>
        ))}
        <Link href={articlesHref} className="nav-articles">
          {nav.articles}
        </Link>
      </div>

      <button
        type="button"
        className={`nav-toggle${open ? " open" : ""}`}
        aria-label="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span />
        <span />
        <span />
      </button>

      {open && (
        <div className="nav-menu">
          {anchors.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <Link href={articlesHref} onClick={() => setOpen(false)}>
            {nav.articles}
          </Link>
        </div>
      )}
    </nav>
  );
}
