"use client";

import { QCARD, QCARD_VIOLET, QUESTION_TEXT, PASSAGE_TEXT, PASSAGE_ATTRIBUTION, PASSAGE_SOURCE, QTAG, OPTION_GROUP, OPTION_ROW, OPTION_FEEDBACK, OPTION_HEADING } from "./constants";

export default function QuestionCard({
  question,
  index,
  passagePending,
  passageText,
  passageAuthor,
  passageWork,
  optionState,
  onSelect,
}: {
  question: { text: string; options: string[]; multi?: boolean; passage?: string; subject?: string };
  index: number;
  passagePending: boolean;
  passageText?: string;
  passageAuthor?: string;
  passageWork?: string;
  optionState: { selected: Set<number>; show: boolean; correct: Set<number>; answered: boolean };
  onSelect: (i: number) => void;
}) {
  if (passagePending) {
    return (
      <div className={QCARD}>
        <div className={PASSAGE_ATTRIBUTION}>{passageText || "Passage"}</div>
        {passageAuthor && <div className={PASSAGE_SOURCE}>by {passageAuthor}{passageWork ? ` — ${passageWork}` : ""}</div>}
        <div className={PASSAGE_TEXT}>{question.passage || question.text}</div>
        <button className="mt-3 cursor-pointer rounded-[20px] border-none bg-ink px-4 py-2 text-label font-bold text-paper" onClick={() => onSelect(-1)}>
          I've read the passage — Show Questions →
        </button>
      </div>
    );
  }

  return (
    <div className={`${QCARD} ${optionState.show && question.subject === "english" ? QCARD_VIOLET : ""}`}>
      <div className={QTAG}>
        {question.subject || "Q"} — Question {index + 1}
        {question.multi ? " · select all that apply" : ""}
      </div>
      <div className={QUESTION_TEXT}>{question.text}</div>
      <div className={OPTION_GROUP}>
        {question.options.map((opt, i) => {
          const isSel = optionState.selected.has(i);
          const isCorrect = optionState.show && optionState.correct.has(i);
          const isWrong = optionState.show && isSel && !optionState.correct.has(i);
          let cls = OPTION_ROW;
          if (isCorrect) cls += " border-thread bg-thread-soft";
          else if (isWrong) cls += " border-coral bg-coral-soft";
          else if (isSel) cls += " border-thread bg-thread-soft/50";
          else cls += " border-ash-line";
          return (
            <div key={i} className={cls} onClick={() => onSelect(i)}>
              <span>{opt}</span>
              {isCorrect && <span className="text-thread font-bold">✓</span>}
              {isWrong && <span className="text-coral font-bold">✕</span>}
            </div>
          );
        })}
      </div>
      {optionState.show && (
        <div className={OPTION_FEEDBACK}>
          <div className={OPTION_HEADING}>Explanation</div>
          {optionState.answered ? "Correct!" : "The correct answers are highlighted above."}
        </div>
      )}
    </div>
  );
}