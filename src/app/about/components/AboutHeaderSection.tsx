import Link from "next/link";

export default function AboutHeaderSection() {
  return (
    <header className="persona-hero">
      <div className="wrap">
        <div className="persona-hero-inner">
          <span className="persona-eyebrow-badge">About us</span>
          <h1>Built to make Nigerian classrooms un-stuck</h1>
          <p className="lede" style={{ fontSize: 16 }}>
            AbSTopiq started from a simple frustration: generic AI and generic
            content don&apos;t match what a Nigerian student is actually taught.
            So we built a syllabus-grounded engine for learning, practice and AI
            help — and made the free version good enough to actually use.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary" href="/">
              Start free
            </Link>
            <Link className="btn btn-ghost" href="/contact">
              Talk to us
            </Link>
          </div>
          <div className="persona-stats">
            <div className="persona-stat">
              <span className="n">80+</span>
              <span className="l">Schools, via Lagos State District IV</span>
            </div>
            <div className="persona-stat">
              <span className="n">3</span>
              <span className="l">Modes — Learn, Practice, Sabi</span>
            </div>
            <div className="persona-stat">
              <span className="n">100k+</span>
              <span className="l">Books &amp; textbooks in the library</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}