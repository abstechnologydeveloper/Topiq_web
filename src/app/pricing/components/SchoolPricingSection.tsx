import Link from "next/link";
import ChromeBar from "./ChromeBar";

export default function SchoolPricingSection() {
  return (
    <section>
      <div className="wrap">
        <div className="split-panel">
          <div className="tour-copy">
            <h3>Schools: one invoice, everyone covered</h3>
            <p>
              ₦500 per student per term on the 100+ seat plan. Every enrolled
              student gets the full Plus experience — unlimited Sabi AI, audio
              lessons, full mocks — free at the point of use. Teachers are
              included automatically, at no extra cost.
            </p>
            <div className="hero-actions" style={{ marginTop: 0 }}>
              <Link className="btn btn-primary" href="/schools">
                See the Schools page
              </Link>
            </div>
          </div>
          <div className="tour-visual" style={{ width: "100%" }}>
            <div className="device-browser">
              <ChromeBar url="app.abstopiq.com/admin/billing" />
              <div className="screen">
                <div className="seat-card">
                  <span className="k">100+ seats plan</span>
                  <span className="v">₦500 / student / term</span>
                </div>
                <div className="dash-row">
                  <div className="main">
                    <div className="ttl">Next invoice</div>
                    <div className="meta">Due in 18 days · 340 seats</div>
                  </div>
                  <span className="dash-badge c-ember">₦170,000</span>
                </div>
                <div className="dash-row">
                  <div className="main">
                    <div className="ttl">Teacher seats</div>
                    <div className="meta">28 teachers, included free</div>
                  </div>
                  <span className="dash-badge c-thread">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}