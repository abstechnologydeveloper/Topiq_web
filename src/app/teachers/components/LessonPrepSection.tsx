import Image from "next/image";
import lessonPrepImg from "../../assets/teacher-4.png";

export default function LessonPrepSection() {
  return (
    <section className="ruled" style={{ background: "var(--paper-dim)" }}>
      <div className="wrap">
        <div className="split-panel">
          <div className="tour-copy">
            <h3>Lesson planning, done before your coffee&apos;s cold</h3>
            <p>
              Lesson Prep AI drafts lesson notes, schemes of work and quiz
              questions — grounded in your syllabus, ready to edit and share with
              your class.
            </p>
          </div>
          <div className="tour-visual" style={{ width: "100%" }}>
            <div className="shot-browser" style={{ width: "100%" }}>
              <Image
                src={lessonPrepImg.src}
                alt="AbSTopiq lesson prep overview"
                width={1173}
                height={811}
                style={{ height: 360, objectFit: "cover", objectPosition: "center top" }}
              />
            </div>
            <p className="shot-browser-hint">↔ scroll to see the full screen</p>
          </div>
        </div>
      </div>
    </section>
  );
}