"use client";

import { EXAM_BOARDS, MOCK_SUBJECT_LIMIT, MOCK_TYPES, type BoardKey } from "../../data";
import { examYearsFor, subjectsForBoard } from "./practiceTypes";
import type { SubjectData } from "../../components/screens/DiscoverScreen";
import {
  MODAL_OVERLAY, MODAL_SHEET, MODAL_CLOSE, MODAL_DONE,
  MOCK_PICKER_ROW, MOCK_PICKER_LABEL, ASK_CONTEXT_ROW,
  CONTEXT_CHIP, CONTEXT_CHIP_ACTIVE,
  MOCK_SUBJECT_PINNED, PASSAGE_LOCK_NOTE,
  YEAR_SELECT,
  BOARD_SWITCH, BOARD_BTN, BOARD_BTN_ACTIVE,
  MOCK_TOTAL_BOX,
} from "./constants";

export default function MockSetupModal({
  mockBoard, mockSubjects, mockType, mockYear, mockTotalBoxOpen,
  allBoards, mockChips, atLimit, ready, years,
  onClose, onPickBoard, onToggleSubject, onSetType, onSetYear, onToggleTotalBox,
  onStart, subjects,
}: {
  mockBoard: string | null; mockSubjects: string[]; mockType: "full" | "quick"; mockYear: string | null;
  mockTotalBoxOpen: boolean;
  allBoards: string[]; mockChips: string[]; atLimit: boolean; ready: boolean; years: string[];
  onClose: () => void; onPickBoard: (b: string) => void; onToggleSubject: (id: string) => void;
  onSetType: (t: "full" | "quick") => void; onSetYear: (y: string) => void; onToggleTotalBox: () => void;
  onStart: () => void;
  subjects: Record<string, SubjectData>;
}) {
  return (
    <div className={MODAL_OVERLAY}>
      <div className={MODAL_SHEET}>
        <button className={MODAL_CLOSE} onClick={onClose}>✕</button>
        <h2>Set up your mock exam</h2>
        <p style={{ fontSize: 13, color: "var(--ash)", marginBottom: 18 }}>
          Just like the real thing — English is compulsory and selected first, then pick 3 more subjects (4 total). Switch freely between them once the exam starts.
        </p>
        <div className={MOCK_PICKER_ROW}>
          <span className={MOCK_PICKER_LABEL}>Exam board</span>
          <div className={ASK_CONTEXT_ROW}>
            {allBoards.map((b) => (
              <button
                key={b}
                className={`${CONTEXT_CHIP} ${mockBoard === b ? CONTEXT_CHIP_ACTIVE : "border-ash-line text-ash"}`}
                onClick={() => onPickBoard(b)}
              >
                {EXAM_BOARDS[b as BoardKey].icon} {b}
              </button>
            ))}
          </div>
        </div>
        <div className={MOCK_PICKER_ROW}>
          <span className={MOCK_PICKER_LABEL}>Subjects — English is compulsory, pick 3 more</span>
          <div className={`${MOCK_SUBJECT_PINNED} flex`}>
            <span>📝 English Language</span>
            <span className="lock-tag">🔒 Compulsory</span>
          </div>
          <div className={ASK_CONTEXT_ROW}>
            {mockChips.length ? (
              mockChips.map((id) => {
                const s = subjects[id];
                const sel = mockSubjects.includes(id);
                const disabled = !sel && atLimit;
                return (
                  <button
                    key={id}
                    className={`${CONTEXT_CHIP} ${sel ? CONTEXT_CHIP_ACTIVE : "border-ash-line text-ash"} ${disabled ? "opacity-45 cursor-not-allowed" : ""}`}
                    disabled={disabled}
                    onClick={() => onToggleSubject(id)}
                  >
                    {s.icon} {s.name}
                    <span className="chip-add-mark">{sel ? "✓" : "+"}</span>
                  </button>
                );
              })
            ) : (
              <span className="text-meta text-ash">No subjects yet for this board</span>
            )}
          </div>
          <div className={PASSAGE_LOCK_NOTE}>
            {!mockSubjects.length ? "" : ready ? `All ${MOCK_SUBJECT_LIMIT} subjects selected ✓` : `English is locked in — pick ${MOCK_SUBJECT_LIMIT - mockSubjects.length} more subject${MOCK_SUBJECT_LIMIT - mockSubjects.length === 1 ? "" : "s"} (${mockSubjects.length}/${MOCK_SUBJECT_LIMIT} selected)`}
          </div>
        </div>
        {ready && mockBoard && (
          <>
            <div className={MOCK_PICKER_ROW}>
              <span className={MOCK_PICKER_LABEL}>Exam year</span>
              <select className={YEAR_SELECT} value={mockYear || ""} onChange={(e) => onSetYear(e.target.value)}>
                {years.map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
            <div className={MOCK_PICKER_ROW}>
              <span className={MOCK_PICKER_LABEL}>Mock type</span>
              <div className={BOARD_SWITCH}>
                {Object.keys(MOCK_TYPES).map((key) => {
                  const t = MOCK_TYPES[key as "full" | "quick"];
                  const total = t.english + t.other * Math.max(0, mockSubjects.length - 1);
                  return (
                    <button
                      key={key}
                      className={`${BOARD_BTN} ${mockType === key ? BOARD_BTN_ACTIVE : ""}`}
                      onClick={() => onSetType(key as "full" | "quick")}
                    >
                      {t.name} · {total} Qs
                    </button>
                  );
                })}
              </div>
              <div className={MOCK_TOTAL_BOX} onClick={onToggleTotalBox}>
                <div className="mtb-summary">
                  <span>
                    {mockSubjects.map((id) => {
                      const t = MOCK_TYPES[mockType];
                      return id === "english" ? t.english : t.other;
                    }).reduce((a, b) => a + b, 0)} questions total — tap to {mockTotalBoxOpen ? "hide" : "view"} breakdown
                  </span>
                  <svg className={`mtb-chev${mockTotalBoxOpen ? " open" : ""}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </div>
                <div className="mtb-breakdown" style={{ display: mockTotalBoxOpen ? "flex" : "none" }}>
                  {mockSubjects.map((id) => {
                    const s = subjects[id];
                    const count = id === "english" ? MOCK_TYPES[mockType].english : MOCK_TYPES[mockType].other;
                    return (
                      <div key={id} className="mtb-row">
                        <span>{s.icon} {s.name}</span>
                        <span className="mtb-count">{count} Qs</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}
        <button className={MODAL_DONE} disabled={!ready || !mockYear} onClick={onStart}>
          Start timed session →
        </button>
      </div>
    </div>
  );
}