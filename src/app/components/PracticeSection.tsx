import Link from "next/link";
import RealBadge from "./RealBadge";
import DevicePhone from "./DevicePhone";

export default function PracticeSection() {
  return (
    <section>
      <div className="wrap">
        <div className="split-panel">
          <div className="tour-copy">
            <RealBadge />
            <h3>When exam season comes, switch into Practice</h3>
            <p>
              WAEC first — also JAMB, NECO, GCE, and international boards — or
              just practise by subject. Full timed mock exams, graded instantly,
              built from real past questions grounded in the syllabus, not
              generic web lookalikes.
            </p>
            <div className="hero-actions" style={{ marginTop: 0 }}>
              <Link className="btn btn-primary" href="/pricing">
                See Practice plans
              </Link>
            </div>
          </div>
          <div className="tour-visual">
            <DevicePhone
              src="/practice.png"
              alt="AbSTopiq exam practice screen"
              width={260}
              height={560}
            />
          </div>
        </div>
      </div>
    </section>
  );
}