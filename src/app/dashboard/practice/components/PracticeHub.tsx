"use client";

import { useEffect, useState } from "react";
import { EXAM_BOARDS, INTL_BOARDS, MOCK_SUBJECT_LIMIT, MOCK_TYPES, NIGERIA_BOARDS, type BoardKey } from "../../data";
import {
  examYearsFor, subjectsForBoard,
  type MockSessionCfg, type SessionCfg, type SingleSessionCfg,
} from "./practiceTypes";
import type { SubjectData } from "../../components/screens/DiscoverScreen";
import ExamBoardPicker from "./ExamBoardPicker";
import BoardSubjectList from "./BoardSubjectList";
import MockSetupModal from "./MockSetupModal";
import {
  EYEBROW, PAGE_TITLE, PAGE_SUB, SCREEN,
  MOCK_CARD, MC_EYEBROW,
  SUBNAV, SUBNAV_BTN, SUBNAV_BTN_ACTIVE, SUBNAV_BTN_INACTIVE,
  SUBJECT_GRID, SUBJECT_CARD, SUBJECT_INFO, SUBJECT_NAME, SUBJECT_META,
  PLAN_ICON,
  MODAL_OVERLAY, MODAL_SHEET, MODAL_CLOSE, MODAL_DONE,
  MOCK_PICKER_ROW, MOCK_PICKER_LABEL, YEAR_SELECT,
  STEPPER_ROW, STEPPER_BTN,
} from "./constants";

type Props = {
  subjects: Record<string, SubjectData>;
  participated: string[];
  onStartSession: (cfg: SessionCfg) => void;
  initialSetupSubject?: string | null;
};

export default function PracticeHub({ subjects, participated, onStartSession, initialSetupSubject = null }: Props) {
  const [pane, setPane] = useState<"nigeria" | "intl" | "bysubject">("nigeria");
  const [mockOpen, setMockOpen] = useState(false);
  const [mockBoard, setMockBoard] = useState<string | null>(null);
  const [mockSubjects, setMockSubjects] = useState<string[]>([]);
  const [mockType, setMockType] = useState<"full" | "quick">("full");
  const [mockTotalBoxOpen, setMockTotalBoxOpen] = useState(false);
  const [mockYear, setMockYear] = useState<string | null>(null);
  const [setupOpen, setSetupOpen] = useState(false);
  const [psSubject, setPsSubject] = useState<string | null>(null);
  const [psBoard, setPsBoard] = useState<string | null>(null);
  const [psYear, setPsYear] = useState<string | null>(null);
  const [psDuration, setPsDuration] = useState(20);
  const [psCount, setPsCount] = useState(10);
  const [boardDetail, setBoardDetail] = useState<Record<string, string | null>>({});
  const [qPaletteOpen, setQPaletteOpen] = useState(true);

  useEffect(() => {
    if (initialSetupSubject && subjects[initialSetupSubject]) openPracticeSetup(initialSetupSubject);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialSetupSubject]);

  const allBoards = [...NIGERIA_BOARDS, ...INTL_BOARDS];
  const mockChips = mockBoard ? subjectsForBoard(subjects, mockBoard).filter((id) => id !== "english") : [];
  const atLimit = mockSubjects.length >= MOCK_SUBJECT_LIMIT;
  const mockReady = mockSubjects.length === MOCK_SUBJECT_LIMIT;
  const years = mockBoard ? examYearsFor(subjects, mockSubjects[0]) : [];

  useEffect(() => {
    if (mockReady && mockBoard && !mockYear) {
      const y = examYearsFor(subjects, mockSubjects[0]);
      if (y.length) setMockYear(y[0]);
    }
  }, [mockReady, mockBoard, mockYear, mockSubjects, subjects]);

  const startMockPicker = () => { setMockBoard(null); setMockSubjects([]); setMockYear(null); setMockType("full"); setMockTotalBoxOpen(false); setMockOpen(true); };
  const pickMockBoard = (b: string) => { setMockBoard(b); const eng = subjectsForBoard(subjects, b).includes("english") ? "english" : null; setMockSubjects(eng ? [eng] : []); };
  const toggleMockSubject = (id: string) => { if (id === "english") return; setMockSubjects((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : prev.length >= MOCK_SUBJECT_LIMIT ? prev : [...prev, id]); };
  const confirmStartMock = () => {
    if (!mockBoard || !mockYear || mockSubjects.length !== MOCK_SUBJECT_LIMIT) return;
    setMockOpen(false);
    onStartSession({ mode: "mock", board: mockBoard, year: mockYear, mockType, ordered: ["english", ...mockSubjects.filter((id) => id !== "english")], totalMinutes: MOCK_TYPES[mockType].minutes });
  };

  const openPracticeSetup = (subjectId: string, board: string | null = null) => {
    setPsSubject(subjectId); setPsBoard(board); setPsYear(board ? (examYearsFor(subjects, subjectId)[0]) : null); setPsDuration(20); setPsCount(10); setSetupOpen(true);
  };
  const confirmPracticeSetup = () => {
    if (!psSubject) return; setSetupOpen(false);
    onStartSession({ mode: "single", subjectId: psSubject, board: psBoard, year: psYear, duration: psDuration, count: psCount });
  };

  return (
    <>
      <section className={SCREEN}>
        <span className={EYEBROW}>Practice, any exam board</span>
        <h1 className={PAGE_TITLE}>Practice</h1>
        <p className={PAGE_SUB}>WAEC first — also JAMB, NECO, GCE, and international boards — or just practise by subject.</p>
        <div className={MOCK_CARD}>
          <div className={MC_EYEBROW}>Timed · full simulation</div>
          <h3>Start a mock exam</h3>
          <p>A timed, exam-style practice session — just like sitting the real thing, graded instantly.</p>
          <div style={{ fontSize: 12, color: "#4ade80", marginBottom: 12, fontWeight: 600 }}>✅ Mock exams unlocked!</div>
          <button onClick={startMockPicker}>Start a Mock Exam →</button>
        </div>
        <ExamBoardPicker pane={pane} onPane={setPane} />
        {pane === "nigeria" && <BoardSubjectList boards={NIGERIA_BOARDS} paneKey="nigeria" detail={boardDetail.nigeria ?? null} onDetail={(v) => setBoardDetail((d) => ({ ...d, nigeria: v }))} subjects={subjects} onPracticeSetup={openPracticeSetup} />}
        {pane === "intl" && <BoardSubjectList boards={INTL_BOARDS} paneKey="intl" detail={boardDetail.intl ?? null} onDetail={(v) => setBoardDetail((d) => ({ ...d, intl: v }))} subjects={subjects} onPracticeSetup={openPracticeSetup} />}
        {pane === "bysubject" && (
          <div>
            <p className={PAGE_SUB} style={{ marginTop: -4 }}>Normal practice questions, no specific exam board — just topic-level revision.</p>
            <div className={SUBJECT_GRID}>
              {Object.keys(subjects).map((id) => {
                const s = subjects[id];
                const isParticipated = participated.includes(id);
                return (
                  <div key={id} className={SUBJECT_CARD} onClick={() => openPracticeSetup(id)}>
                    <div className={PLAN_ICON} style={{ width: 44, height: 44, fontSize: 19, background: `var(--${s.color}-soft)` }}>{s.icon}</div>
                    <div className={SUBJECT_INFO}><div className={SUBJECT_NAME}>{s.name}</div><div className={SUBJECT_META}>{s.questions.length} practice questions {isParticipated ? "· ✅ Participated" : ""}</div></div>
                    <svg className="h-[18px] w-[18px] shrink-0 text-ash" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {mockOpen && (
        <MockSetupModal
          mockBoard={mockBoard} mockSubjects={mockSubjects} mockType={mockType} mockYear={mockYear}
          mockTotalBoxOpen={mockTotalBoxOpen} allBoards={allBoards} mockChips={mockChips} atLimit={atLimit} ready={mockReady} years={years}
          onClose={() => setMockOpen(false)} onPickBoard={pickMockBoard} onToggleSubject={toggleMockSubject}
          onSetType={setMockType} onSetYear={setMockYear} onToggleTotalBox={() => setMockTotalBoxOpen((o) => !o)}
          onStart={confirmStartMock} subjects={subjects}
        />
      )}

      {setupOpen && psSubject && (
        <div className={MODAL_OVERLAY}>
          <div className={MODAL_SHEET}>
            <button className={MODAL_CLOSE} onClick={() => setSetupOpen(false)}>✕</button>
            <h2>{subjects[psSubject].icon} {subjects[psSubject].name} practice</h2>
            <p style={{ fontSize: 13, color: "var(--ash)", marginBottom: 18 }}>
              {psBoard ? `${psBoard} — pick a year, duration and number of questions.` : "Pick a duration and number of questions to begin."}
            </p>
            {psBoard && (
              <div className={MOCK_PICKER_ROW}>
                <span className={MOCK_PICKER_LABEL}>Exam year</span>
                <select className={YEAR_SELECT} value={psYear || ""} onChange={(e) => setPsYear(e.target.value)}>
                  {examYearsFor(subjects, psSubject).map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
            )}
            <div className={MOCK_PICKER_ROW}>
              <span className={MOCK_PICKER_LABEL}>Duration</span>
              <div className={STEPPER_ROW}>
                <button className={STEPPER_BTN} onClick={() => setPsDuration((d) => Math.min(60, Math.max(10, d - 5)))}>−</button>
                <span>{psDuration} min</span>
                <button className={STEPPER_BTN} onClick={() => setPsDuration((d) => Math.min(60, Math.max(10, d + 5)))}>+</button>
              </div>
            </div>
            <div className={MOCK_PICKER_ROW}>
              <span className={MOCK_PICKER_LABEL}>Number of questions</span>
              <div className={STEPPER_ROW}>
                <button className={STEPPER_BTN} onClick={() => setPsCount((c) => Math.min(40, Math.max(5, c - 5)))}>−</button>
                <span>{psCount}</span>
                <button className={STEPPER_BTN} onClick={() => setPsCount((c) => Math.min(40, Math.max(5, c + 5)))}>+</button>
              </div>
            </div>
            <button className={MODAL_DONE} onClick={confirmPracticeSetup}>Start practice →</button>
          </div>
        </div>
      )}
    </>
  );
}