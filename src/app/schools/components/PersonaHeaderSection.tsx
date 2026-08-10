import Image from "next/image";
import Link from "next/link";
import RealBadge from "./RealBadge";

export default function PersonaHeaderSection() {
  return (
    <header className="persona-hero" id="schools">
      <div className="wrap">
        <div className="persona-hero-grid">
          <div className="persona-hero-inner">
            <span className="persona-eyebrow-badge">
              For schools &amp; institutions
            </span>
            <h1>Set up AbSTopiq for your whole school.</h1>
            <p className="lede" style={{ fontSize: 16 }}>
              Teachers, school-wide performance, and billing — all in one place.
              Every student and teacher gets the full experience, free at the
              point of use, on a single per-term invoice.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-primary" href="/contact">
                Talk to us about a school pilot
              </Link>
              <Link className="btn btn-ghost" href="/teachers">
                Just one teacher for now? →
              </Link>
            </div>
            <div className="persona-stats">
              <div className="persona-stat">
                <span className="n">₦500</span>
                <span className="l">Per student, per term (100+ seats)</span>
              </div>
              <div className="persona-stat">
                <span className="n">₦0</span>
                <span className="l">Extra for teacher accounts</span>
              </div>
              <div className="persona-stat">
                <span className="n">1</span>
                <span className="l">Invoice for the whole school</span>
              </div>
            </div>
          </div>
          <div className="persona-hero-visual">
            <div className="shot-browser">
              <RealBadge style={{ margin: "14px 14px 0" }} />
              <Image
                src="/schools-header.png"
                alt="AbSTopiq school admin overview"
                width={910}
                height={500}
              />
            </div>
            <p className="shot-browser-hint">↔ scroll to see the full screen</p>
          </div>
        </div>
      </div>
    </header>
  );
}