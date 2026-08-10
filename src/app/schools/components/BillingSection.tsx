import Image from "next/image";
import RealBadge from "./RealBadge";

export default function BillingSection() {
  return (
    <section>
      <div className="wrap">
        <div className="split-panel">
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
                src="/schools-billing.png"
                alt="AbSTopiq school billing screen"
                width={910}
                height={500}
              />
            </div>
            <p className="shot-browser-hint">↔ scroll to see the full screen</p>
          </div>
        </div>
      </div>
    </section>
  );
}