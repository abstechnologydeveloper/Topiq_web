"use client";

import { EXAM_BOARDS, type BoardKey } from "../../data";
import { subjectsForBoard } from "./practiceTypes";
import type { SubjectData } from "../../components/screens/DiscoverScreen";
import {
  BACK_ROW,
  CARD,
  BOARD_DETAIL_HEADER,
  SUBJECT_GRID,
  SUBJECT_CARD,
  SUBJECT_INFO,
  SUBJECT_NAME,
  SUBJECT_META,
  PLAN_ICON,
  RESULT_ROW,
  RESULT_ICON,
  RESULT_MAIN,
  RESULT_TITLE,
  RESULT_META,
} from "./constants";

export default function BoardSubjectList({
  boards,
  paneKey,
  detail,
  onDetail,
  subjects,
  onPracticeSetup,
}: {
  boards: string[];
  paneKey: "nigeria" | "intl";
  detail: string | null;
  onDetail: (v: string | null) => void;
  subjects: Record<string, SubjectData>;
  onPracticeSetup: (id: string, board: string) => void;
}) {
  if (detail) {
    const meta = EXAM_BOARDS[detail as BoardKey];
    const subs = subjectsForBoard(subjects, detail);
    return (
      <div className={SUBJECT_GRID}>
        <div className={`${BACK_ROW}`} style={{ gridColumn: "1/-1" }} onClick={() => onDetail(null)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Back
        </div>
        <div className={CARD} style={{ padding: "6px 16px", gridColumn: "1/-1" }}>
          <div className={BOARD_DETAIL_HEADER} style={{ paddingTop: 10 }}>
            <div className={`${PLAN_ICON} h-10 w-10`}>{meta.icon}</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>{detail}</div>
              <div style={{ fontSize: 12, color: "var(--ash)" }}>{meta.desc}</div>
            </div>
          </div>
          {subs.map((id) => {
            const s = subjects[id];
            return (
              <div key={id} className={RESULT_ROW} onClick={() => onPracticeSetup(id, detail)}>
                <div className={RESULT_ICON} style={{ background: `var(--${s.color}-soft)` }}>
                  {s.icon}
                </div>
                <div className={RESULT_MAIN}>
                  <div className={RESULT_TITLE}>{s.name}</div>
                  <div className={RESULT_META}>{s.mastery}% mastery · Practice now</div>
                </div>
                <svg className="h-4 w-4 shrink-0 text-ash" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className={SUBJECT_GRID}>
      {boards.map((b) => {
        const meta = EXAM_BOARDS[b as BoardKey];
        const subs = subjectsForBoard(subjects, b);
        return (
          <div key={b} className={SUBJECT_CARD} onClick={() => onDetail(b)}>
            <div className={PLAN_ICON} style={{ width: 44, height: 44, fontSize: 19, background: "var(--paper-dim)" }}>
              {meta.icon}
            </div>
            <div className={SUBJECT_INFO}>
              <div className={SUBJECT_NAME}>{b}</div>
              <div className={SUBJECT_META}>{meta.region} · {subs.length} subjects</div>
            </div>
            <svg className="h-[18px] w-[18px] shrink-0 text-ash" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>
        );
      })}
    </div>
  );
}