const STATS = [
  { n: "< 1 day", l: "Usual first reply" },
  { n: "Human", l: "A person reads every message" },
  { n: "No spam", l: "We only reply about what you asked" },
];

export default function SupportSection() {
  return (
    <section className="ruled" style={{ background: "var(--paper-dim)" }}>
      <div className="wrap">
        <div className="section-head center">
          <div className="eyebrow-row center">
            <span className="eyebrow">Support</span>
          </div>
          <h2 style={{ fontSize: 24 }}>What to expect after you write in</h2>
        </div>
        <div className="stat-trio">
          {STATS.map((s) => (
            <div className="st" key={s.n}>
              <span className="n">{s.n}</span>
              <span className="l">{s.l}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}