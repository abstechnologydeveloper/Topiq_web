"use client";

import { useState } from "react";

type QuickCheckData = { text: string; options: string[]; correct: number; explain: string };

export default function QuickCheck({ data }: { data: QuickCheckData }) {
  const [answerIdx, setAnswerIdx] = useState<number | null>(null);

  return (
    <div className="mb-4 rounded-btn border-1_5 border-ember bg-ember-soft p-3.5">
      <div className="mb-2 font-mono text-[10.5px] font-bold uppercase tracking-[0.04em] text-ink">Quick check</div>
      <div className="text-sub mb-2.5 font-semibold">{data.text}</div>
      <div>
        {data.options.map((opt, oi) => {
          const isCorrect = answerIdx !== null && oi === data.correct;
          const isWrong = answerIdx === oi && oi !== data.correct;
          return (
            <div
              key={oi}
              className={`mb-1.5 cursor-pointer rounded-input border-1_5 px-[11px] py-[9px] text-body font-semibold ${
                isCorrect
                  ? "border-ink bg-ink text-white"
                  : isWrong
                    ? "border-ash-line bg-paper-dim text-ash line-through"
                    : "border-ash-line bg-surface"
              }`}
              onClick={() => answerIdx === null && setAnswerIdx(oi)}
            >
              {opt}
            </div>
          );
        })}
      </div>
      {answerIdx !== null && (
        <div className="mt-1.5 text-meta leading-[1.5] text-ink-soft">{data.explain}</div>
      )}
    </div>
  );
}