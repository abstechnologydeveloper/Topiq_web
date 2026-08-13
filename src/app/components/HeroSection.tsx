import Link from "next/link";
import DevicePhone from "./DevicePhone";
import firstImg from "../assets/first.jpeg";

export default function HeroSection() {
  return (
    <header className="hero" id="top">
      <div className="hero-watermark">sabi it</div>
      <div className="hero-grid">
        <div>
          <div className="eyebrow-row">
            <span className="eyebrow">Every subject, grounded</span>
            <span className="grade-mark">no board attached to learning</span>
          </div>
          <h1>
            Learn it. Practice it.{" "}
            <span className="underline">
              Sabi it
              <svg viewBox="0 0 100 12" preserveAspectRatio="none">
                <path
                  d="M2 8 Q 25 2, 50 7 T 98 5"
                  stroke="#D8383E"
                  strokeWidth="3.5"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            .
          </h1>
          <p className="lede">
            AbSTopiq teaches every subject in your syllabus properly, first —
            lessons, videos, and a 100,000+ book &amp; textbook library. When
            exam season comes, switch into real WAEC, NECO, JAMB and GCE
            practice. Stuck anywhere in between? Sabi AI explains it, grounded
            in your syllabus, not the open web.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-ember" href="/pricing">
              Start free — no card needed
            </Link>
            <a className="btn btn-ghost" href="#pillars">
              See how it works
            </a>
          </div>
          <p className="hero-note">
            PRACTICE · FLASHCARDS · LESSONS ARE FREE, ALWAYS — NO TRIAL, NO CATCH
          </p>
          <p className="hero-note" style={{ marginTop: 6 }}>
            WORKS IN YOUR BROWSER — NO APP DOWNLOAD NEEDED, LIGHT ENOUGH FOR SLOW
            DATA
          </p>
          <div className="board-line">
            <span className="bl-label">Practice covers</span>
            {["WAEC", "NECO", "JAMB", "GCE", "IGCSE", "SAT"].map((b) => (
              <span className="bl-item" key={b}>
                {b}
              </span>
            ))}
          </div>
        </div>
        <div className="grounded-wrap">
          <div className="hero-stamp">
            <span className="n">🔥12</span>
            <span className="t">Day streak</span>
          </div>
          <div className="sticky-note sn-1">3 sessions today</div>
          <div className="sticky-note sn-2">64% through Photosynthesis</div>
          <DevicePhone
            src={firstImg.src}
            alt="AbSTopiq app showing syllabus-grounded learning progress"
            width={600}
            height={1280}
            frame={{ width: 280 }}
            imgStyle={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", marginTop: 0, borderRadius: "20px" }}
          />
        </div>
      </div>
    </header>
  );
}