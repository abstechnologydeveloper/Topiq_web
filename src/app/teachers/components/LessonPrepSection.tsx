import ChromeBar from "./ChromeBar";

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
            <div className="device-browser">
              <ChromeBar url="app.abstopiq.com/teacher/lesson-prep" />
              <div className="screen">
                <div className="dash-row">
                  <div className="main">
                    <div className="ttl">Respiration — Scheme of work</div>
                    <div className="meta">Generated, ready to edit</div>
                  </div>
                  <span className="dash-badge c-violet">AI draft</span>
                </div>
                <div className="dash-row">
                  <div className="main">
                    <div className="ttl">
                      Respiration — Quiz questions (10)
                    </div>
                    <div className="meta">Grounded in your syllabus</div>
                  </div>
                  <span className="dash-badge c-violet">AI draft</span>
                </div>
                <div className="dash-row">
                  <div className="main">
                    <div className="ttl">Cell Structure — Lesson notes</div>
                    <div className="meta">Edited &amp; saved to class</div>
                  </div>
                  <span className="dash-badge c-thread">Saved</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}