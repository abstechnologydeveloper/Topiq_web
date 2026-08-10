import Link from "next/link";

export default function TeacherFinalCtaSection() {
  return (
    <section className="ruled" style={{ background: "var(--paper-dim)", paddingTop: 0 }}>
      <div className="wrap">
        <div className="final-cta">
          <h2>Set up your first class in minutes</h2>
          <p>
            No admin sign-off, no card, no waiting on your school. Start with one
            class and see what it does to your grading pile.
          </p>
          <div className="final-actions">
            <Link className="btn btn-ember" href="/pricing">
              Start teaching free
            </Link>
            <Link className="btn btn-outline-light" href="/schools">
              Rolling out school-wide instead? →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}