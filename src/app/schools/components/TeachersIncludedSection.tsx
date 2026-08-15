import Image from "next/image";
import teachersImg from "../../assets/school_6.png";

export default function TeachersIncludedSection() {
  return (
    <section className="ruled" style={{ background: "var(--paper-dim)" }}>
      <div className="wrap">
        <div className="split-panel">
          <div className="tour-copy">
            <h3>Every teacher, covered automatically</h3>
            <p>
              Teacher accounts are free the moment your school is on a plan — no
              separate sign-up, no separate invoice, no &quot;ask your HOD to
              approve it.&quot;
            </p>
          </div>
          <div className="tour-visual school-screen-visual" style={{ width: "100%" }}>
            <div className="shot-browser">
              <Image
                src={teachersImg.src}
                alt="AbSTopiq teacher seats overview"
                width={1128}
                height={552}
                className="school-teachers-image"
              />
            </div>
            <p className="shot-browser-hint">↔ scroll to see the full screen</p>
          </div>
        </div>
      </div>
    </section>
  );
}
