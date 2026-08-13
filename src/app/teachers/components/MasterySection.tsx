import Image from "next/image";
import masteryImg from "../../assets/teacher_6.png";

export default function MasterySection() {
  return (
    <section>
      <div className="wrap">
        <div className="split-panel">
          <div className="tour-copy">
            <h3>Tap a class, see who&apos;s actually stuck</h3>
            <p>
              Class averages hide the students who need help most. See individual
              mastery per student, per topic — not just the class-wide number.
            </p>
          </div>
          <div className="tour-visual" style={{ width: "100%" }}>
            <div className="shot-browser">
              <Image
                src={masteryImg.src}
                alt="AbSTopiq mastery overview"
                width={1127}
                height={381}
                style={{ height: 260, objectFit: "contain", objectPosition: "center" }}
              />
            </div>
            <p className="shot-browser-hint">↔ scroll to see the full screen</p>
          </div>
        </div>
      </div>
    </section>
  );
}