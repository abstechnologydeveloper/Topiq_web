import Link from "next/link";
import Image from "next/image";
import billingImg from "../../assets/billing.png";

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
            <div className="shot-browser">
              <Image
                src={billingImg.src}
                alt="AbSTopiq school billing overview"
                width={1173}
                height={592}
                style={{ height: 320, objectFit: "contain", objectPosition: "center" }}
              />
            </div>
            <p className="shot-browser-hint">↔ scroll to see the full screen</p>
          </div>
        </div>
      </div>
    </section>
  );
}