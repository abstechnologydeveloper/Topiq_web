"use client";

import { useEffect, useState } from "react";

function fmtTime(sec: number) {
  const m = Math.floor(sec / 60);
  const s = String(Math.floor(sec % 60)).padStart(2, "0");
  return m + ":" + s;
}

export default function AudioPlayer({ duration }: { duration: number }) {
  const [elapsed, setElapsed] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setElapsed((prev) => {
        const next = Math.min(duration, prev + speed);
        if (next >= duration) setPlaying(false);
        return next;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [playing, speed, duration]);

  return (
    <div className="mb-[18px] flex items-center gap-3 rounded-card border-1_5 border-violet bg-violet-soft px-3.5 py-3">
      <button
        className="flex h-[42px] w-[42px] shrink-0 cursor-pointer items-center justify-center rounded-full border-none bg-violet text-white"
        onClick={() => setPlaying((p) => !p)}
      >
        <svg style={{ display: playing ? "none" : "block" }} width="15" height="15" viewBox="0 0 24 24" fill="#fff">
          <path d="M8 5v14l11-7z" />
        </svg>
        <span className={`ml-1.5 h-3 items-center gap-0.5 ${playing ? "inline-flex" : "hidden"}`}>
          {[0, 1, 2].map((b) => (
            <span
              key={b}
              className={`w-0.5 rounded-sm bg-surface ${playing ? "animate-[audiobar_.8s_ease-in-out_infinite]" : ""}`}
              style={{ height: 4, animationDelay: b ? `${b * 0.15}s` : undefined }}
            ></span>
          ))}
        </span>
      </button>
      <div className="min-w-0 flex-1">
        <div className="text-input mb-1 font-bold">🎧 Listen to this lesson</div>
        <div className="mb-1 h-[5px] overflow-hidden rounded [background:rgba(124,111,224,0.25)]">
          <div className="h-full w-0 rounded bg-violet" style={{ width: `${(elapsed / duration) * 100}%` }}></div>
        </div>
        <span className="font-mono text-[10.5px] text-ink-soft">
          {fmtTime(elapsed)} / {fmtTime(duration)}
        </span>
      </div>
      <button
        className="shrink-0 cursor-pointer rounded-tile border border-violet bg-surface px-[9px] py-1 font-mono text-fine font-bold text-violet"
        onClick={() => {
          const speeds = [1, 1.25, 1.5, 0.75];
          setSpeed(speeds[(speeds.indexOf(speed) + 1) % speeds.length]);
        }}
      >
        {speed}x
      </button>
    </div>
  );
}