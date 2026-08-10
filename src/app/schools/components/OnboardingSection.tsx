import Image from "next/image";
import RealBadge from "./RealBadge";

export default function OnboardingSection() {
  return (
    <section>
      <div className="wrap">
        <div className="split-panel">
          <div className="tour-copy">
            <RealBadge />
            <h3>Onboarding is one code, not one form per person</h3>
            <p>
              Every school gets its own code. Share it once, and every teacher or
              student who enters it during signup joins your plan automatically —
              free, no individual payment, no manual approval queue.
            </p>
          </div>
          <div className="tour-visual" style={{ width: "100%" }}>
            <div className="shot-browser">
              <Image
                src="/schools-onboard.png"
                alt="AbSTopiq school onboarding screen"
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