"use client";

import { useCallback, useRef } from "react";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";

const SUBJECTS = [
  { ico: "🧬", nm: "Biology", bd: "WAEC · NECO · GCE" },
  { ico: "⚡", nm: "Physics", bd: "WAEC · JAMB · GCE" },
  { ico: "🧪", nm: "Chemistry", bd: "WAEC · NECO · GCE" },
  { ico: "📐", nm: "Mathematics", bd: "WAEC · JAMB · SAT" },
  { ico: "📝", nm: "English Lang.", bd: "WAEC · JAMB · SAT" },
  { ico: "📊", nm: "Economics", bd: "WAEC · JAMB" },
  { ico: "🏛️", nm: "Government", bd: "WAEC · NECO · JAMB" },
  { ico: "🌾", nm: "Agric. Science", bd: "WAEC · NECO · JAMB" },
  { ico: "📖", nm: "Literature", bd: "WAEC · NECO" },
  { ico: "➗", nm: "Further Maths", bd: "WAEC · GCE" },
  { ico: "🗺️", nm: "Geography", bd: "WAEC · NECO" },
  { ico: "💼", nm: "Commerce", bd: "WAEC · NECO · JAMB" },
  { ico: "🧾", nm: "Fin. Accounting", bd: "WAEC · NECO" },
  { ico: "🕊️", nm: "CRS / IRS", bd: "WAEC · NECO" },
];

export default function SubjectsSlider() {
  const ref = useRef<HTMLDivElement | null>(null);

  const scroll = useCallback((dir: -1 | 1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * 168, behavior: "smooth" });
  }, []);

  return (
    <>
      <div className="slider-nav">
        <button
          className="slider-arrow"
          onClick={() => scroll(-1)}
          aria-label="Scroll left"
        >
          <ChevronLeftIcon />
        </button>
        <button
          className="slider-arrow"
          onClick={() => scroll(1)}
          aria-label="Scroll right"
        >
          <ChevronRightIcon />
        </button>
      </div>
      <div className="subject-slider" id="subjectSlider" ref={ref}>
        {SUBJECTS.map((s) => (
          <div className="subject-tile" key={s.nm}>
            <div className="ico">{s.ico}</div>
            <div className="nm">{s.nm}</div>
            <div className="bd">{s.bd}</div>
          </div>
        ))}
        <Link className="subject-tile subject-tile-more" href="/contact">
          <div className="ico">＋</div>
          <div className="nm">Yours not listed?</div>
          <div className="bd">Tell us — ask anyway</div>
        </Link>
      </div>
    </>
  );
}