import Image from "next/image";
import assignmentsImg from "../../assets/teacher_2.png";

export default function AssignmentsSection() {
  return (
    <section className="ruled" style={{ background: "var(--paper-dim)" }}>
      <div className="wrap">
        <div className="split-panel">
          <div className="tour-copy">
            <h3>Assign it once, watch it finish live</h3>
            <p>
              Set a topic or practice set to a class in a tap. Completion updates
              in real time as students submit — no chasing, no spreadsheet.
            </p>
          </div>
          <div className="tour-visual assignments-visual" style={{ width: "100%" }}>
            <div className="shot-browser">
              <Image
                src={assignmentsImg}
                alt="AbSTopiq assignments overview"
                width={1173}
                height={490}
              />
            </div>
            <p className="shot-browser-hint">↔ scroll to see the full screen</p>
          </div>
        </div>
      </div>
    </section>
  );
}
