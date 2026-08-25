"use client";

import {
  SCORE_SCREEN,
  SCORE_ROW, SCORE_BAR_TRACK, SCORE_BAR_FILL, SCORE_PCT,
  SCORE_SUBJECT, SCORE_CTA,
  REVIEW_TOPIC, REVIEW_TOPIC_TITLE, REVIEW_ROW, REVIEW_YOUR, REVIEW_CORRECT, REVIEW_LABEL,
  PERF_STATS, PERF_STAT, PERF_VALUE, PS_TIMER, PS_BACK,
  MODAL_DONE,
} from "./constants";

export default function ScoreScreen({
  score,
  total,
  pct,
  perSubject,
  weakTopics,
  reviewOpen,
  onToggleReview,
  onPracticeAgain,
  onStudyTopic,
  onExit,
}: {
  score: number; total: number; pct: number;
  perSubject: { id: string; icon: string; name: string; score: number; total: number }[];
  weakTopics: { subject: string; icon: string; label: string; pct: number }[];
  reviewOpen: Set<string>;
  onToggleReview: (s: string) => void;
  onPracticeAgain: () => void;
  onStudyTopic: (id: string) => void;
  onExit: () => void;
}) {
  return (
    <div className={SCORE_SCREEN}>
      <div className="mb-6 text-5xl font-bold text-thread">{score}/{total}</div>
      <div className="mb-6 text-2xl font-semibold">{pct}%</div>
      <div className="mb-6 font-mono text-fine text-ash">{pct >= 70 ? "Great work!" : pct >= 50 ? "Good effort!" : "Keep practising!"}</div>

      <div className={PERF_STATS}>
        <div className={PERF_STAT}>
          <div className={PERF_VALUE}>{score}</div>
          <div className="text-fine text-ash">Correct</div>
        </div>
        <div className={PERF_STAT}>
          <div className={PERF_VALUE}>{pct}%</div>
          <div className="text-fine text-ash">Accuracy</div>
        </div>
      </div>

      {perSubject.map((sub) => (
        <div key={sub.id} className={SCORE_SUBJECT}>
          <span>{sub.icon}</span>
          <span>{sub.name}</span>
          <button className={SCORE_CTA} onClick={() => onToggleReview(sub.id)}>
            {reviewOpen.has(sub.id) ? "Hide" : "Review"}
          </button>
        </div>
      ))}

      {weakTopics.length > 0 && (
        <div className="mb-6 mt-4 text-left">
          <div className="mb-2 text-input font-bold">Weak points to study</div>
          {weakTopics.map((w, i) => (
            <div key={i} className={REVIEW_ROW}>
              <span>{w.icon}</span>
              <div className={REVIEW_LABEL}>{w.label}</div>
              <span className="font-mono text-fine text-ash">{w.pct}%</span>
              <button className={SCORE_CTA} onClick={() => onStudyTopic(w.subject)}>Study →</button>
            </div>
          ))}
        </div>
      )}

      <button className={MODAL_DONE} onClick={onPracticeAgain}>Practice Again →</button>
      <button className={PS_BACK} style={{ marginTop: 12, justifyContent: "center", width: "100%" }} onClick={onExit}>Back to Practice Hub</button>
    </div>
  );
}