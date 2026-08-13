import Image from "next/image";
import RealBadge from "./RealBadge";
import onboardImg from "../../assets/school_2.png";

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
                src={onboardImg.src}
                alt="AbSTopiq school onboarding screen"
                width={1173}
                height={825}
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