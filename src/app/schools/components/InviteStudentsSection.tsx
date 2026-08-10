import Image from "next/image";
import RealBadge from "./RealBadge";

export default function InviteStudentsSection() {
  return (
    <section className="ruled" style={{ background: "var(--paper-dim)" }}>
      <div className="wrap">
        <div className="split-panel">
          <div className="tour-copy">
            <RealBadge />
            <h3>Roll out to a whole class in one go</h3>
            <p>
              Invite students one at a time, or paste a whole class list at once
              — each gets an email invite, and joins free under the school&apos;s
              plan the moment they accept.
            </p>
          </div>
          <div className="tour-visual" style={{ width: "100%" }}>
            <div className="shot-browser">
              <Image
                src="/schools-invite.png"
                alt="AbSTopiq invite students screen"
                width={910}
                height={500}
              />
            </div>
            <p className="shot-browser-hint">↔ scroll to see the full screen</p>
          </div>
        </div>
      </div>
    </section>
  );
}