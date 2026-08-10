import Link from "next/link";

export default function SchoolsFinalCtaSection() {
  return (
    <section className="ruled" style={{ background: "var(--paper-dim)", paddingTop: 0 }}>
      <div className="wrap">
        <div className="final-cta">
          <h2>Talk to us about a school pilot</h2>
          <p>
            Tell us your institution name and rough student count — we&apos;ll
            walk you through setup and the per-term billing.
          </p>
          <div className="final-actions">
            <Link className="btn btn-ember" href="/contact">
              Get in touch about a pilot
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}