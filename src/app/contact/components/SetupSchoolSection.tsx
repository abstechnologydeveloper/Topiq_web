export default function SetupSchoolSection() {
  return (
    <section className="ruled" style={{ background: "var(--paper-dim)" }}>
      <div className="wrap">
        <div className="mini-feat-row">
          <span className="mini-feat-num">01</span>
          <div>
            <h3 style={{ fontSize: 19, marginBottom: 8 }}>
              Setting up a school or district?
            </h3>
            <p style={{ color: "var(--ink-soft)", fontSize: 14 }}>
              Use the form above and mention your institution name and a rough
              student count — that&apos;s all we need to start the conversation,
              whether it&apos;s one school or a whole district like Lagos
              State&apos;s Education District IV.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}