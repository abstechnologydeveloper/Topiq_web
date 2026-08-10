import SubjectsSlider from "./SubjectsSlider";

export default function SubjectsSection() {
  return (
    <section id="subjects" className="ruled" style={{ background: "var(--paper-dim)" }}>
      <div className="wrap">
        <div className="section-head center">
          <div className="eyebrow-row center">
            <span className="eyebrow">Your library</span>
          </div>
          <h2>
            Every subject, grounded in your syllabus — no board attached to
            learning
          </h2>
          <p className="lede" style={{ margin: "0 auto" }}>
            Learn each subject on its own terms. When you&apos;re ready to
            practise for a specific exam, these are the boards each subject is
            covered for.
          </p>
        </div>
        <SubjectsSlider />
        <p className="subject-note">
          New subjects are added every term — every answer grounded in the
          syllabus, whichever board you&apos;re sitting.
        </p>
      </div>
    </section>
  );
}