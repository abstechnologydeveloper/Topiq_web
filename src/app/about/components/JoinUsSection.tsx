import Link from "next/link";

export default function JoinUsSection() {
  return (
    <section className="ruled" style={{ background: "var(--paper-dim)" }}>
      <div className="wrap">
        <div className="split-panel">
          <div className="tour-copy">
            <span className="eyebrow">Careers</span>
            <h3 style={{ marginTop: 10 }}>
              We&apos;re a small team building this properly
            </h3>
            <p>
              Most of what&apos;s on this page — the grounding engine, the
              district rollout, the teacher tools — was built by a small team,
              not a big one. If you want to help build the syllabus-grounded
              layer for African education, we&apos;d like to hear from you.
            </p>
            <div className="hero-actions" style={{ marginTop: 0 }}>
              <Link className="btn btn-primary" href="/contact">
                Get in touch
              </Link>
            </div>
          </div>
          <div className="tour-visual" style={{ width: "100%" }}>
            <div className="value-card" style={{ textAlign: "left", padding: 26 }}>
              <div className="ic">🌱</div>
              <h4 style={{ fontSize: 16, marginBottom: 8 }}>
                Early-stage, hands-on
              </h4>
              <p style={{ marginBottom: 14 }}>
                No open roles listed here yet — we&apos;re still small enough
                that it&apos;s a conversation, not a job board. Curriculum,
                engineering, or school partnerships: tell us what you&apos;d
                bring.
              </p>
              <p style={{ fontSize: 12, color: "var(--ash)", margin: 0 }}>
                We&apos;ll update this page with the real team and any open roles
                as they&apos;re confirmed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}