"use client";

import { useState } from "react";

type NavStrings = {
  geo: string;
  features: string;
  rubric: string;
  report: string;
  install: string;
  buy: string;
};

export default function HeroNav({ nav }: { nav: NavStrings }) {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#geo", label: nav.geo },
    { href: "#features", label: nav.features },
    { href: "#rubric", label: nav.rubric },
    { href: "#report", label: nav.report },
    { href: "#install", label: nav.install },
    { href: "#buy", label: nav.buy },
  ];

  return (
    <nav className="nav">
      <div className="brand">
        <span className="mark">◔</span> GeoScore
      </div>

      <div className="links">
        {links.map((l) => (
          <a key={l.href} href={l.href}>
            {l.label}
          </a>
        ))}
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
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
