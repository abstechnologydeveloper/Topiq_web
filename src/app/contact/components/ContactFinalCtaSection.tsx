import Link from "next/link";

export default function ContactFinalCtaSection() {
  return (
    <section className="ruled" style={{ background: "var(--paper-dim)", paddingTop: 0 }}>
      <div className="wrap">
        <div className="final-cta">
          <h2>Still deciding?</h2>
          <p>See what&apos;s free, what teachers get, or what a school plan looks like.</p>
          <div className="final-actions">
            <Link className="btn btn-ember" href="/pricing">
              See pricing
            </Link>
            <Link className="btn btn-outline-light" href="/schools">
              See the Schools page
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}