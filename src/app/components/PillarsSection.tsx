const CHIPS = [
  "📚 100,000+ books & textbooks",
  "📅 Timetable, homework & exam countdown",
  "🏅 Badges & certificates per subject",
  "🎯 Challenges to keep you going",
];

export default function PillarsSection() {
  return (
    <section id="pillars" className="ruled" style={{ background: "var(--paper-dim)" }}>
      <div className="wrap">
        <div className="section-head center">
          <div className="eyebrow-row center">
            <span className="eyebrow">How AbSTopiq works</span>
          </div>
          <h2>Three modes. One syllabus underneath all of them.</h2>
        </div>
        <div className="how-grid">
          <div className="how-step">
            <span className="how-q">Learn</span>
            <h3>Every subject, properly explained</h3>
            <p>
              Lessons and videos for each topic in your syllabus — no exam board
              attached, just the curriculum, taught until it clicks. Backed by a
              100,000+ book &amp; textbook library.
            </p>
          </div>
          <div className="how-step">
            <span className="how-q">Practice</span>
            <h3>Then, when it&apos;s time, prove it</h3>
            <p>
              WAEC first — also JAMB, NECO, GCE and international boards — or
              just practise by subject. Real past questions, timed mock exams,
              graded instantly.
            </p>
          </div>
          <div className="how-step">
            <span className="how-q">Sabi</span>
            <h3>Stuck? Sabi AI has you</h3>
            <p>
              Type it, say it, or scan it. Every answer traces back to your
              syllabus, on its own page — so you can check it, not just trust
              it.
            </p>
          </div>
        </div>
        <div className="extra-row">
          {CHIPS.map((c) => (
            <span className="extra-chip" key={c}>
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}