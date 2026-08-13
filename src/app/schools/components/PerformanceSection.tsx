import Image from "next/image";
import performanceImg from "../../assets/school_4.png";

export default function PerformanceSection() {
  return (
    <section className="ruled" style={{ background: "var(--paper-dim)" }}>
      <div className="wrap">
        <div className="split-panel">
          <div className="tour-copy">
            <h3>See which classes need help, before parents ask</h3>
            <p>
              Cross-class visibility, not just one teacher&apos;s view of one
              class — so slipping averages get caught school-wide, early.
            </p>
          </div>
          <div className="tour-visual" style={{ width: "100%" }}>
            <div className="shot-browser">
              <Image
                src={performanceImg.src}
                alt="AbSTopiq cross-class performance overview"
                width={1137}
                height={537}
                style={{ height: 302, objectFit: "contain", objectPosition: "center" }}
              />
            </div>
            <p className="shot-browser-hint">↔ scroll to see the full screen</p>
          </div>
        </div>
      </div>
    </section>
  );
}