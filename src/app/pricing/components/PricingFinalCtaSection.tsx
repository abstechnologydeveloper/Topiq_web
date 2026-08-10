import Link from "next/link";

export default function PricingFinalCtaSection() {
  return (
    <section className="ruled" style={{ background: "var(--paper-dim)", paddingTop: 0 }}>
      <div className="wrap">
        <div className="final-cta">
          <h2>Start free. Upgrade only if exam season needs it.</h2>
          <p>No card to begin, no lock-in to leave.</p>
          <div className="final-actions">
            <Link className="btn btn-ember" href="/">
              Start free — no card needed
            </Link>
            <Link className="btn btn-outline-light" href="/contact">
              Talk to us about a school or district plan
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}