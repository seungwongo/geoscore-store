"use client";

import { useEffect, useState } from "react";

export interface HeroSlide {
  line1: string;
  line2: string;
  lead: string;
}

export default function HeroSlider({
  slides,
  interval = 5000,
}: {
  slides: HeroSlide[];
  interval?: number;
}) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setTimeout(() => setI((v) => (v + 1) % slides.length), interval);
    return () => clearTimeout(id);
  }, [i, slides.length, interval]);

  const s = slides[i] ?? slides[0];

  return (
    <div className="hero-slider">
      <div className="hero-dots" role="tablist" aria-label="hero messages">
        {slides.map((_, k) => (
          <button
            key={k}
            type="button"
            className={`hero-dot${k === i ? " active" : ""}`}
            aria-label={`슬라이드 ${k + 1} / ${slides.length}`}
            aria-selected={k === i}
            onClick={() => setI(k)}
          />
        ))}
      </div>
      <div className="hero-slide" key={i}>
        <h1>
          {s.line1}
          <br />
          {s.line2}
        </h1>
        <p className="lead" dangerouslySetInnerHTML={{ __html: s.lead }} />
      </div>
    </div>
  );
}
