"use client";

import { useState } from "react";

export default function VideoMock({
  gradientBg,
  durationLabel,
}: {
  gradientBg: string;
  durationLabel: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <>
      <div
        className="relative mb-1.5 flex aspect-video w-full cursor-pointer items-center justify-center overflow-hidden rounded-card"
        onClick={() => setPlaying((p) => !p)}
        style={{ background: gradientBg }}
      >
        <span className="absolute right-2.5 top-2.5 rounded-lg bg-[rgba(20,23,43,0.65)] px-2 py-[3px] font-mono text-[10.5px] font-semibold text-white">
          {durationLabel}
        </span>
        <span className="absolute bottom-2.5 left-2.5 rounded bg-[rgba(20,23,43,0.65)] px-1.5 py-0.5 text-[10px] font-bold text-white">CC</span>
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-[0_6px_16px_rgba(0,0,0,0.25)] transition-transform duration-150 hover:scale-105 ${playing ? "!bg-white/50" : ""}`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#18181B">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
      <div className="mb-4 h-[5px] overflow-hidden rounded bg-ash-line">
        <div className="h-full w-0 rounded bg-coral transition-[width] duration-[3000ms]" style={{ width: playing ? "58%" : "0%" }}></div>
      </div>
    </>
  );
}