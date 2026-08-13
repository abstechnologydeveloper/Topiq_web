import Image from "next/image";
import RealBadge from "./RealBadge";
import billingImg from "../../assets/school_5.png";

export default function BillingSection() {
  return (
    <section>
      <div className="wrap">
        <div className="split-panel" style={{ gridTemplateColumns: "0.88fr 1.12fr" }}>
          <div className="tour-copy">
            <RealBadge />
            <h3>Billing that makes sense</h3>
            <p>
              ₦500 per student per term on the 100+ seat plan, one invoice for
              the whole school — not a separate charge per class or per feature.
            </p>
          </div>
          <div className="tour-visual" style={{ width: "100%" }}>
            <div className="shot-browser">
              <Image
                src={billingImg.src}
                alt="AbSTopiq school billing screen"
                width={1173}
                height={588}
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