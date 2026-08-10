import ChromeBar from "./ChromeBar";

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
          <div className="tour-visual" style={{ width: "100%" }}>
            <div className="device-browser">
              <ChromeBar url="app.abstopiq.com/admin/teachers" />
              <div className="screen">
                <div className="dash-row">
                  <div className="main">
                    <div className="ttl">Teacher seats</div>
                    <div className="meta">28 teachers, included free</div>
                  </div>
                  <span className="dash-badge c-thread">Active</span>
                </div>
                <div className="dash-row">
                  <div className="main">
                    <div className="ttl">Mrs. Adeyemi</div>
                    <div className="meta">
                      SS2/SS3 Biology · Lesson Prep AI enabled
                    </div>
                  </div>
                  <span className="dash-badge c-violet">Active</span>
                </div>
                <div className="dash-row">
                  <div className="main">
                    <div className="ttl">Mr. Okonkwo</div>
                    <div className="meta">SS1/SS2 Mathematics</div>
                  </div>
                  <span className="dash-badge c-violet">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}