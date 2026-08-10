import ChromeBar from "./ChromeBar";

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
            <div className="device-browser">
              <ChromeBar url="app.abstopiq.com/admin/performance" />
              <div className="screen">
                <div className="dash-row">
                  <div className="main">
                    <div className="ttl">SS2 Biology (Set A)</div>
                    <div className="meta">Average 68% — below target</div>
                  </div>
                  <span className="dash-badge c-coral">Review</span>
                </div>
                <div className="dash-row">
                  <div className="main">
                    <div className="ttl">SS3 Chemistry (Set B)</div>
                    <div className="meta">Average 58% — below target</div>
                  </div>
                  <span className="dash-badge c-coral">Review</span>
                </div>
                <div className="dash-row">
                  <div className="main">
                    <div className="ttl">SS2 Mathematics</div>
                    <div className="meta">Average 91% — strong</div>
                  </div>
                  <span className="dash-badge c-thread">Good</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}