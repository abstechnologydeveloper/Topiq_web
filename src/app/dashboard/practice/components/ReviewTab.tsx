"use client";

import { REVIEW_TOPIC, REVIEW_TOPIC_TITLE, REVIEW_ROW, REVIEW_YOUR, REVIEW_CORRECT, REVIEW_LABEL, PS_TIMER } from "./constants";

export default function ReviewTab({
  subjectId,
  icon,
  name,
  rows,
}: {
  subjectId: string;
  icon: string;
  name: string;
  rows: { q: string; your: string; correct: string; isCorrect: boolean }[];
}) {
  return (
    <div>
      <div className={REVIEW_TOPIC}>
        <span>{icon}</span>
        <div className={REVIEW_TOPIC_TITLE}>{name}</div>
      </div>
      {rows.map((r, i) => (
        <div key={i} className={REVIEW_ROW}>
          <div className={REVIEW_LABEL}>{r.q}</div>
          <div className={r.isCorrect ? REVIEW_CORRECT : REVIEW_YOUR}>{r.isCorrect ? r.correct : r.your}</div>
          {!r.isCorrect && <span className="ml-1 text-fine text-ash">→ {r.correct}</span>}
        </div>
      ))}
    </div>
  );
}