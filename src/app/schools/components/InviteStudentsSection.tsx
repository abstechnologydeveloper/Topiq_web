import Image from "next/image";
import RealBadge from "./RealBadge";
import inviteImg from "../../assets/school_3.png";

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
                src={inviteImg.src}
                alt="AbSTopiq invite students screen"
                width={1173}
                height={421}
                style={{ height: 230, objectFit: "contain", objectPosition: "center" }}
              />
            </div>
            <p className="shot-browser-hint">↔ scroll to see the full screen</p>
          </div>
        </div>
      </div>
    </section>
  );
}