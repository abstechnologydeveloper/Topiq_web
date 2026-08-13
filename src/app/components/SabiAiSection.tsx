import { CheckIcon } from "@/components/icons";
import Image from "next/image";
import RealBadge from "./RealBadge";
import thirdImg from "../assets/third.jpeg";
import fourthImg from "../assets/fourth.jpeg";

const POINTS = [
  "Voice Learning — talk it through, hear the answer back",
  "Scan any textbook page and ask about it directly",
  "3 free questions a day, unlimited on Plus",
];

export default function SabiAiSection() {
  return (
    <section>
      <div className="wrap">
        <div className="split-panel">
          <div className="tour-visual sabi-visual" style={{ order: 1 }}>
            <div className="shot-phone sabi-phone">
              <div className="notch"></div>
              <Image
                src={thirdImg}
                alt="AbSTopiq Sabi AI conversation with citations"
                width={588}
                height={1153}
              />
            </div>
            <div className="shot-phone sabi-mini">
              <div className="notch"></div>
              <Image
                src={fourthImg}
                alt="Sabi AI answer citation"
                width={720}
                height={459}
              />
            </div>
          </div>
          <div className="tour-copy" style={{ order: 2 }}>
            <RealBadge />
            <h3>Stuck at 11pm? Sabi AI is still awake</h3>
            <p>
              Type it, say it out loud, or scan a photo of the page. Every answer
              is matched to your syllabus first, and comes with a citation —
              subject, topic, page — so you can check it, not just trust it.
            </p>
            <ul className="tour-list">
              {POINTS.map((p) => (
                <li key={p}>
                  <CheckIcon />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}