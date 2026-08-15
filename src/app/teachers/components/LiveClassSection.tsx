import Image from "next/image";
import liveImg from "../../assets/teacher_3_new.png";

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
          <div className="tour-visual live-class-visual" style={{ width: "100%" }}>
            <div className="shot-browser">
              <Image
                src={liveImg}
                alt="AbSTopiq live class session"
                width={1186}
                height={632}
              />
            </div>
            <p className="shot-browser-hint">↔ scroll to see the full screen</p>
          </div>
        </div>
      </div>
    </section>
  );
}
