import ChromeBar from "./ChromeBar";

export default function LiveClassSection() {
  return (
    <section>
      <div className="wrap">
        <div className="split-panel">
          <div className="tour-copy">
            <h3>Teach live, together</h3>
            <p>
              Run an interactive live session — your class follows along and
              answers polls in real time, right inside the app, on their own
              devices.
            </p>
          </div>
          <div className="tour-visual" style={{ width: "100%" }}>
            <div className="device-browser">
              <ChromeBar url="app.abstopiq.com/teacher/live" />
              <div className="screen">
                <div className="live-banner">
                  <span className="live-dot"></span> Live now — SS2 Biology, Poll
                  2 of 4
                </div>
                <div className="poll-mock">
                  <div className="poll-q">
                    Which stage of photosynthesis needs light directly?
                  </div>
                  <div className="poll-opt">
                    <div className="poll-opt-label">
                      <span>Light-dependent reaction</span>
                      <span>26 of 34</span>
                    </div>
                    <div className="poll-track">
                      <div
                        className="poll-fill"
                        style={{ width: "76%", background: "var(--thread)" }}
                      ></div>
                    </div>
                  </div>
                  <div className="poll-opt">
                    <div className="poll-opt-label">
                      <span>Calvin cycle</span>
                      <span>8 of 34</span>
                    </div>
                    <div className="poll-track">
                      <div
                        className="poll-fill"
                        style={{ width: "24%", background: "var(--coral)" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}