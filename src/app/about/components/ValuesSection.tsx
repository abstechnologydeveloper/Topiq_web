const VALUES = [
  {
    ic: "📖",
    title: "Grounded beats generic",
    body: "Every answer should trace back to the syllabus, every time — not just when it's convenient.",
  },
  {
    ic: "🆓",
    title: "Free where it counts",
    body: "Learning shouldn't wait behind a paywall. Practice and Sabi AI can.",
  },
  {
    ic: "📶",
    title: "Built for real data budgets",
    body: "Audio, low-bandwidth screens and offline-friendly practice, not a video-only app.",
  },
  {
    ic: "🏫",
    title: "Teachers & schools matter too",
    body: "Not an afterthought feature — a first-class part of the product.",
  },
];

export default function ValuesSection() {
  return (
    <section className="ruled" style={{ background: "var(--paper-dim)" }}>
      <div className="wrap">
        <div className="section-head center">
          <div className="eyebrow-row center">
            <span className="eyebrow">What we believe</span>
          </div>
          <h2 style={{ fontSize: 24 }}>A few things we won&apos;t compromise on</h2>
        </div>
        <div className="value-grid">
          {VALUES.map((v) => (
            <div className="value-card" key={v.title}>
              <div className="ic">{v.ic}</div>
              <h4>{v.title}</h4>
              <p>{v.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}