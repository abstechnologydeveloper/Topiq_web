const MILESTONES = [
  {
    phase: "Foundation",
    title: "The grounding engine",
    body: "Built Learn, Practice and Sabi AI on one syllabus-grounded engine, across Biology, Physics, Chemistry, Mathematics, English, Economics and more.",
  },
  {
    phase: "Partnership",
    title: "Lagos State Government",
    body: "Partnered with the Lagos State Government's Education District IV to bring AbSTopiq into public schools.",
  },
  {
    phase: "Now",
    title: "80+ schools",
    body: "80+ schools across District IV are actively learning with AbSTopiq, alongside individual students and teachers nationwide.",
    now: true,
  },
  {
    phase: "Next",
    title: "Deeper & wider",
    body: "Richer teacher tools, more subjects, and more districts — in Lagos State and beyond.",
  },
];

export default function MilestonesSection() {
  return (
    <section className="ruled" style={{ background: "var(--paper-dim)" }}>
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow-row">
            <span className="eyebrow">Milestones</span>
          </div>
          <h2 style={{ fontSize: 24 }}>Where we&apos;ve gotten to so far</h2>
        </div>
        <div className="roadmap">
          {MILESTONES.map((m) => (
            <div
              className={`roadmap-item${m.now ? " now" : ""}`}
              key={m.phase}
            >
              <div className="phase">{m.phase}</div>
              <h4>{m.title}</h4>
              <p>{m.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}