"use client";

import type { ReactNode } from "react";
import { SpeakButtonSVG, ThreadMark } from "../../components/screens/shared";
import { CHIP, GROUNDING, SPEAK_BTN } from "./constants";

export default function GroundedReply({ intro, chipLabel }: { intro: ReactNode; chipLabel: string }) {
  return (
    <>
      {intro}
      <div className={GROUNDING}>
        <ThreadMark />
        <span className={CHIP}>{chipLabel}</span>
      </div>
      <button className={SPEAK_BTN}>
        <SpeakButtonSVG />
        <span className="text-[10.5px] font-bold text-violet">Listen</span>
      </button>
    </>
  );
}