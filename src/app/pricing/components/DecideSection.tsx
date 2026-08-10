const CHOICES = [
  {
    ic: "🌱",
    title: "Just getting started",
    body: "Go Free. Learning, practice and flashcards cost nothing, always.",
  },
  {
    ic: "📅",
    title: "Exams are close",
    body: "Get the Exam-Ready Pass — unlimited Sabi AI and full mocks until results land.",
  },
  {
    ic: "🔁",
    title: "Want it year-round",
    body: "Go Plus — unlimited Sabi AI and audio lessons, every month.",
  },
  {
    ic: "🏫",
    title: "You're a school or teacher",
    body: "See the Teachers plan, or talk to us about a per-term school plan.",
  },
];

export default function DecideSection() {
  return (
    <section className="ruled" style={{ background: "var(--paper-dim)" }}>
      <div className="wrap">
        <div className="section-head center">
          <div className="eyebrow-row center">
            <span className="eyebrow">Not sure which one?</span>
          </div>
          <h2 style={{ fontSize: 24 }}>A quick way to decide</h2>
        </div>
        <div className="value-grid">
          {CHOICES.map((c) => (
            <div className="value-card" key={c.title}>
              <div className="ic">{c.ic}</div>
              <h4>{c.title}</h4>
              <p>{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}