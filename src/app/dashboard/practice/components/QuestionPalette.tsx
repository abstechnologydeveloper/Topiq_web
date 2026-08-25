"use client";

import {
  Q_PALETTE_TOGGLE, Q_PALETTE_TRACK, Q_PALETTE_FILL, Q_PALETTE_BODY,
  PS_TIMER,
} from "./constants";

export default function QuestionPalette({
  total, answered, current, expanded, onToggle, onJump,
  timerLabel,
}: {
  total: number; answered: number; current: number; expanded: boolean;
  onToggle: () => void; onJump: (i: number) => void; timerLabel: string;
}) {
  const pct = total > 0 ? (answered / total) * 100 : 0;
  return (
    <div>
      <div className={Q_PALETTE_TOGGLE}>
        <span className={PS_TIMER}>{timerLabel} · {total > 0 ? `${answered}/${total}` : ""}</span>
        <button className={Q_PALETTE_BODY} onClick={onToggle}>
          <span>🎯 Question Palette ({Math.round(pct)}%)</span>
          <svg className={`transition-transform ${expanded ? "rotate-180" : ""}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </div>
      <div className={Q_PALETTE_TRACK}>
        <div className={Q_PALETTE_FILL} style={{ width: `${pct}%` }}></div>
      </div>
      {expanded && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {Array.from({ length: total }, (_, i) => (
            <button
              key={i}
              className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border-1_5 text-fine font-bold
                ${i === current ? "border-thread bg-thread text-white" : "border-ash-line bg-surface text-ash"}`}
              onClick={() => onJump(i)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}