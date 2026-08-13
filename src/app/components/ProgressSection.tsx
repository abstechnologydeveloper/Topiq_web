import Link from "next/link";
import Image from "next/image";
import RealBadge from "./RealBadge";
import secondImg from "../assets/second.jpeg";

export default function ProgressSection() {
  return (
    <section className="ruled" style={{ background: "var(--paper-dim)" }}>
      <div className="wrap">
        <div className="split-panel">
          <div className="tour-copy">
            <RealBadge />
            <h3>See exactly where you stand</h3>
            <p>
              Grounded in what you&apos;ve actually covered, not a guess. Mastery
              is tracked topic by topic, so &quot;I think I know this&quot; turns
              into a number you can trust — and a clear list of what to practise
              next.
            </p>
            <div className="hero-actions" style={{ marginTop: 0 }}>
              <Link className="btn btn-primary" href="/pricing">
                Start tracking free
              </Link>
            </div>
          </div>
          <div className="tour-visual">
            <div className="shot-phone progress-phone">
              <div className="notch"></div>
              <Image
                src={secondImg}
                alt="AbSTopiq progress tracking screen"
                width={694}
                height={761}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}