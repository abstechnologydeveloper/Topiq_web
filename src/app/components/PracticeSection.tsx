import Link from "next/link";
import Image from "next/image";
import RealBadge from "./RealBadge";
import fifthImg from "../assets/fifth.jpeg";

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
            <div className="shot-phone practice-phone">
              <div className="notch"></div>
              <Image
                src={fifthImg}
                alt="AbSTopiq exam practice screen"
                width={692}
                height={857}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}