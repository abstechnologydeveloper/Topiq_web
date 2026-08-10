import ChromeBar from "./ChromeBar";

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
            <div className="device-browser">
              <ChromeBar url="app.abstopiq.com/teacher/classes/ss2-biology" />
              <div className="screen">
                <div className="topic-row" style={{ padding: "12px 0" }}>
                  <span
                    className="topic-dot"
                    style={{ background: "var(--thread)" }}
                  ></span>
                  <span className="topic-title">Chidinma O.</span>
                  <span className="topic-bar-track" style={{ width: 60 }}>
                    <span
                      className="topic-bar-fill"
                      style={{ width: "72%", background: "var(--thread)" }}
                    ></span>
                  </span>
                  <span className="topic-pct">72%</span>
                </div>
                <div className="topic-row" style={{ padding: "12px 0" }}>
                  <span
                    className="topic-dot"
                    style={{ background: "var(--coral)" }}
                  ></span>
                  <span className="topic-title">Bode A.</span>
                  <span className="topic-bar-track" style={{ width: 60 }}>
                    <span
                      className="topic-bar-fill"
                      style={{ width: "31%", background: "var(--coral)" }}
                    ></span>
                  </span>
                  <span className="topic-pct">31%</span>
                </div>
                <div
                  className="topic-row"
                  style={{ padding: "12px 0", borderBottom: "none" }}
                >
                  <span
                    className="topic-dot"
                    style={{ background: "var(--violet)" }}
                  ></span>
                  <span className="topic-title">Funmi T.</span>
                  <span className="topic-bar-track" style={{ width: 60 }}>
                    <span
                      className="topic-bar-fill"
                      style={{ width: "88%", background: "var(--violet)" }}
                    ></span>
                  </span>
                  <span className="topic-pct">88%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}