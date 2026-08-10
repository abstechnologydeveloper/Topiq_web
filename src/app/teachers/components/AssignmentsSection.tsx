import ChromeBar from "./ChromeBar";

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
          <div className="tour-visual" style={{ width: "100%" }}>
            <div className="device-browser">
              <ChromeBar url="app.abstopiq.com/teacher/assignments" />
              <div className="screen">
                <div className="dash-row">
                  <div className="main">
                    <div className="ttl">Cell Structure — Assignment</div>
                    <div className="meta">31 of 34 submitted, updating live</div>
                  </div>
                  <span className="dash-badge c-thread">On time</span>
                </div>
                <div className="dash-row">
                  <div className="main">
                    <div className="ttl">Photosynthesis — quiz</div>
                    <div className="meta">18 of 34 submitted</div>
                  </div>
                  <span className="dash-badge c-ember">In progress</span>
                </div>
                <div className="dash-row">
                  <div className="main">
                    <div className="ttl">Respiration — set for Friday</div>
                    <div className="meta">Scheduled, not yet live</div>
                  </div>
                  <span className="dash-badge c-violet">Draft</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}