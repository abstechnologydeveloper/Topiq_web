import Link from "next/link";

export default function AboutFinalCtaSection() {
  return (
    <section className="ruled" style={{ background: "var(--paper-dim)", paddingTop: 0 }}>
      <div className="wrap">
        <div className="final-cta">
          <h2>Want AbSTopiq in your school or district?</h2>
          <p>Tell us a bit about your institution and we&apos;ll take it from there.</p>
          <div className="final-actions">
            <Link className="btn btn-ember" href="/contact">
              Get in touch
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}