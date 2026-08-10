import Image from "next/image";
import Link from "next/link";
import RealBadge from "./RealBadge";

export default function PersonaHeaderSection() {
  return (
    <header className="persona-hero" id="teachers">
      <div className="wrap">
        <div className="persona-hero-grid">
          <div className="persona-hero-inner">
            <span className="persona-eyebrow-badge">For teachers</span>
            <h1>Track a class. Set assignments. Free to start.</h1>
            <p className="lede" style={{ fontSize: 16 }}>
              See which classes need attention today, assign a topic or practice
              set in a tap, and watch completion update live — free for one
              class, no admin sign-off needed.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-primary" href="/pricing">
                Start teaching free
              </Link>
              <Link className="btn btn-ghost" href="/schools">
                Set up a whole school instead →
              </Link>
            </div>
            <div className="persona-stats">
              <div className="persona-stat">
                <span className="n">1 class</span>
                <span className="l">Free forever, no card</span>
              </div>
              <div className="persona-stat">
                <span className="n">₦3,000</span>
                <span className="l">/month for unlimited classes</span>
              </div>
              <div className="persona-stat">
                <span className="n">₦0</span>
                <span className="l">If your school is covered</span>
              </div>
            </div>
          </div>
          <div className="persona-hero-visual">
            <div className="shot-browser">
              <RealBadge style={{ margin: "14px 14px 0" }} />
              <Image
                src="/teacher-dashboard.png"
                alt="AbSTopiq teacher dashboard"
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