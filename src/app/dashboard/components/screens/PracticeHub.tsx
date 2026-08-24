"use client";

import { useEffect, useState } from "react";
import { EXAM_BOARDS, INTL_BOARDS, MOCK_SUBJECT_LIMIT, MOCK_TYPES, NIGERIA_BOARDS, type BoardKey } from "../../data";
import {
  examYearsFor,
  subjectsForBoard,
  type MockSessionCfg,
  type SessionCfg,
  type SingleSessionCfg,
} from "./practiceTypes";
import type { SubjectData } from "./DiscoverScreen";

type Props = {
  subjects: Record<string, SubjectData>;
  participated: string[];
  onStartSession: (cfg: SessionCfg) => void;
  initialSetupSubject?: string | null;
};

export default function PracticeHub({ subjects, participated, onStartSession, initialSetupSubject = null }: Props) {
  const [pane, setPane] = useState<"nigeria" | "intl" | "bysubject">("nigeria");

  // mock picker
  const [mockOpen, setMockOpen] = useState(false);
  const [mockBoard, setMockBoard] = useState<string | null>(null);
  const [mockSubjects, setMockSubjects] = useState<string[]>([]);
  const [mockType, setMockType] = useState<"full" | "quick">("full");
  const [mockTotalBoxOpen, setMockTotalBoxOpen] = useState(false);
  const [mockYear, setMockYear] = useState<string | null>(null);

  // plain practice setup
  const [setupOpen, setSetupOpen] = useState(false);
  const [psSubject, setPsSubject] = useState<string | null>(null);
  const [psBoard, setPsBoard] = useState<string | null>(null);
  const [psYear, setPsYear] = useState<string | null>(null);
  const [psDuration, setPsDuration] = useState(20);
  const [psCount, setPsCount] = useState(10);

  // board-detail drill-in per pane
  const [boardDetail, setBoardDetail] = useState<Record<string, string | null>>({});

  useEffect(() => {
    if (initialSetupSubject && subjects[initialSetupSubject]) {
      openPracticeSetup(initialSetupSubject);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialSetupSubject]);

  const allBoards = [...NIGERIA_BOARDS, ...INTL_BOARDS];
  const englishId = mockBoard && subjectsForBoard(subjects, mockBoard).includes("english") ? "english" : null;
  const mockEnglishPinned = !!englishId;
  const mockChips = mockBoard ? subjectsForBoard(subjects, mockBoard).filter((id) => id !== "english") : [];
  const atLimit = mockSubjects.length >= MOCK_SUBJECT_LIMIT;
  const mockReady = mockSubjects.length === MOCK_SUBJECT_LIMIT;
  const mockRemaining = MOCK_SUBJECT_LIMIT - mockSubjects.length;

  const startMockPicker = () => {
    setMockBoard(null);
    setMockSubjects([]);
    setMockYear(null);
    setMockType("full");
    setMockTotalBoxOpen(false);
    setMockOpen(true);
  };

  const pickMockBoard = (board: string) => {
    setMockBoard(board);
    const eng = subjectsForBoard(subjects, board).includes("english") ? "english" : null;
    setMockSubjects(eng ? [eng] : []);
  };

  const toggleMockSubject = (id: string) => {
    if (id === "english") return;
    setMockSubjects((prev) => {
      if (prev.includes(id)) return prev.filter((s) => s !== id);
      if (prev.length >= MOCK_SUBJECT_LIMIT) return prev;
      return [...prev, id];
    });
  };

  const confirmStartMock = () => {
    if (!mockBoard || !mockYear || mockSubjects.length !== MOCK_SUBJECT_LIMIT) return;
    const ordered = ["english", ...mockSubjects.filter((id) => id !== "english")];
    const totalMinutes = MOCK_TYPES[mockType].minutes;
    setMockOpen(false);
    const cfg: MockSessionCfg = {
      mode: "mock",
      board: mockBoard,
      year: mockYear,
      mockType,
      ordered,
      totalMinutes,
    };
    onStartSession(cfg);
  };

  const openPracticeSetup = (subjectId: string, board: string | null = null) => {
    setPsSubject(subjectId);
    setPsBoard(board);
    if (board) {
      const years = examYearsFor(subjects, subjectId);
      setPsYear(years[0]);
    } else {
      setPsYear(null);
    }
    setPsDuration(20);
    setPsCount(10);
    setSetupOpen(true);
  };

  const confirmPracticeSetup = () => {
    if (!psSubject) return;
    setSetupOpen(false);
    const cfg: SingleSessionCfg = {
      mode: "single",
      subjectId: psSubject,
      board: psBoard,
      year: psYear,
      duration: psDuration,
      count: psCount,
    };
    onStartSession(cfg);
  };

  const renderBoardList = (boards: string[], key: "nigeria" | "intl") => {
    const detail = boardDetail[key];
    if (detail) {
      const meta = EXAM_BOARDS[detail as BoardKey];
      const subs = subjectsForBoard(subjects, detail);
      return (
        <>
          <div className="back-row" style={{ gridColumn: "1/-1" }} onClick={() => setBoardDetail((d) => ({ ...d, [key]: null }))}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            Back
          </div>
          <div className="card" style={{ padding: "6px 16px", gridColumn: "1/-1" }}>
            <div className="board-detail-header" style={{ paddingTop: 10 }}>
              <div className="bd-icon">{meta.icon}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{detail}</div>
                <div style={{ fontSize: 12, color: "var(--ash)" }}>{meta.desc}</div>
              </div>
            </div>
            {subs.map((id) => {
              const s = subjects[id];
              return (
                <div key={id} className="result-row" onClick={() => openPracticeSetup(id, detail)}>
                  <div className="result-icon" style={{ background: `var(--${s.color}-soft)` }}>
                    {s.icon}
                  </div>
                  <div className="result-main">
                    <div className="result-title">{s.name}</div>
                    <div className="result-meta">{s.mastery}% mastery · Practice now</div>
                  </div>
                  <svg className="chev" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </div>
              );
            })}
          </div>
        </>
      );
    }
    return boards.map((b) => {
      const meta = EXAM_BOARDS[b as BoardKey];
      const subs = subjectsForBoard(subjects, b);
      return (
        <div
          key={b}
          className="subject-card"
          onClick={() => setBoardDetail((d) => ({ ...d, [key]: b }))}
        >
          <div className="plan-icon" style={{ width: 44, height: 44, fontSize: 19, background: "var(--paper-dim)" }}>
            {meta.icon}
          </div>
          <div className="subject-info">
            <div className="name">{b}</div>
            <div className="meta">{meta.region} · {subs.length} subjects</div>
          </div>
          <svg className="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
      );
    });
  };

  const mockUnlocked = "✅ Mock exams unlocked!";
  const years = mockBoard ? examYearsFor(subjects, mockSubjects[0]) : [];

  // When all subjects are selected, default the exam year to the most recent
  // available one (mirrors onMockSubjectsChanged in the mockup).
  useEffect(() => {
    if (mockReady && mockBoard && !mockYear) {
      const years = examYearsFor(subjects, mockSubjects[0]);
      if (years.length) setMockYear(years[0]);
    }
  }, [mockReady, mockBoard, mockYear, mockSubjects, subjects]);

  return (
    <>
      <section className="screen active" id="screen-practicehub">
        <span className="eyebrow">Practice, any exam board</span>
        <h1 className="page-title">Practice</h1>
        <p className="page-sub">
          WAEC first — also JAMB, NECO, GCE, and international boards — or just practise by subject.
        </p>

        <div className="mock-card mock-promo-card">
          <div className="mc-eyebrow">Timed · full simulation</div>
          <h3>Start a mock exam</h3>
          <p>A timed, exam-style practice session — just like sitting the real thing, graded instantly.</p>
          <div style={{ fontSize: 12, color: "#4ade80", marginBottom: 12, fontWeight: 600 }}>{mockUnlocked}</div>
          <button onClick={startMockPicker}>Start a Mock Exam →</button>
        </div>

        <div className="subnav">
          <button className={pane === "nigeria" ? "active" : ""} onClick={() => setPane("nigeria")}>
            Nigerian Boards
          </button>
          <button className={pane === "intl" ? "active" : ""} onClick={() => setPane("intl")}>
            International
          </button>
          <button className={pane === "bysubject" ? "active" : ""} onClick={() => setPane("bysubject")}>
            By Subject
          </button>
        </div>

        <div className={`ws-pane${pane === "nigeria" ? " active" : ""}`}>
          <div className="subject-grid">{renderBoardList(NIGERIA_BOARDS, "nigeria")}</div>
        </div>
        <div className={`ws-pane${pane === "intl" ? " active" : ""}`}>
          <div className="subject-grid">{renderBoardList(INTL_BOARDS, "intl")}</div>
        </div>
        <div className={`ws-pane${pane === "bysubject" ? " active" : ""}`}>
          <p className="page-sub" style={{ marginTop: -4 }}>
            Normal practice questions, no specific exam board — just topic-level revision.
          </p>
          <div className="subject-grid">
            {Object.keys(subjects).map((id) => {
              const s = subjects[id];
              const isParticipated = participated.includes(id);
              return (
                <div key={id} className="subject-card" onClick={() => openPracticeSetup(id)}>
                  <div className="plan-icon" style={{ width: 44, height: 44, fontSize: 19, background: `var(--${s.color}-soft)` }}>
                    {s.icon}
                  </div>
                  <div className="subject-info">
                    <div className="name">{s.name}</div>
                    <div className="meta">
                      {s.questions.length} practice questions {isParticipated ? "· ✅ Participated" : ""}
                    </div>
                  </div>
                  <svg className="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---- Mock exam picker ---- */}
      {mockOpen && (
        <div className="modal-overlay show" id="mockModal">
          <div className="modal-sheet">
            <button className="modal-close" onClick={() => setMockOpen(false)}>✕</button>
            <h2>Set up your mock exam</h2>
            <p style={{ fontSize: 13, color: "var(--ash)", marginBottom: 18 }}>
              Just like the real thing — English is compulsory and selected first, then pick 3 more subjects (4 total). Switch freely between them once the exam starts.
            </p>
            <div className="mock-picker-row">
              <span className="mock-picker-label">Exam board</span>
              <div className="ask-context-row">
                {allBoards.map((b) => (
                  <button
                    key={b}
                    className={`context-chip${mockBoard === b ? " active" : ""}`}
                    onClick={() => pickMockBoard(b)}
                  >
                    {EXAM_BOARDS[b as BoardKey].icon} {b}
                  </button>
                ))}
              </div>
            </div>
            <div className="mock-picker-row">
              <span className="mock-picker-label">Subjects — English is compulsory, pick 3 more</span>
              {mockEnglishPinned && (
                <div className="mock-subject-pinned" style={{ display: "flex" }}>
                  <span>📝 English Language</span>
                  <span className="lock-tag">🔒 Compulsory</span>
                </div>
              )}
              <div className="ask-context-row">
                {mockChips.length ? (
                  mockChips.map((id) => {
                    const s = subjects[id];
                    const isSelected = mockSubjects.includes(id);
                    const disabled = !isSelected && atLimit;
                    return (
                      <button
                        key={id}
                        className={`context-chip${isSelected ? " active" : ""}${disabled ? " disabled" : ""}`}
                        disabled={disabled}
                        onClick={() => toggleMockSubject(id)}
                      >
                        {s.icon} {s.name}
                        <span className="chip-add-mark">{isSelected ? "✓" : "+"}</span>
                      </button>
                    );
                  })
                ) : (
                  <span style={{ fontSize: "12.5px", color: "var(--ash)" }}>No subjects yet for this board</span>
                )}
              </div>
              <div className="passage-lock-note">
                {mockBoard && !mockSubjects.length
                  ? ""
                  : mockSubjects.length
                  ? mockReady
                    ? `All ${MOCK_SUBJECT_LIMIT} subjects selected ✓`
                    : `English is locked in — pick ${mockRemaining} more subject${mockRemaining === 1 ? "" : "s"} (${mockSubjects.length}/${MOCK_SUBJECT_LIMIT} selected)`
                  : ""}
              </div>
            </div>
            {mockReady && mockBoard && (
              <>
                <div className="mock-picker-row">
                  <span className="mock-picker-label">Exam year</span>
                  <select
                    className="year-select"
                    value={mockYear || ""}
                    onChange={(e) => setMockYear(e.target.value)}
                  >
                    {years.map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>
                <div className="mock-picker-row">
                  <span className="mock-picker-label">Mock type</span>
                  <div className="board-switch">
                    {Object.keys(MOCK_TYPES).map((key) => {
                      const t = MOCK_TYPES[key as "full" | "quick"];
                      const total = t.english + t.other * Math.max(0, mockSubjects.length - 1);
                      return (
                        <button
                          key={key}
                          className={`board-btn${mockType === key ? " active" : ""}`}
                          onClick={() => setMockType(key as "full" | "quick")}
                        >
                          {t.name} · {total} Qs
                        </button>
                      );
                    })}
                  </div>
                  <div className="mock-total-box" onClick={() => setMockTotalBoxOpen((o) => !o)}>
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
            <button className="modal-done-btn" disabled={!mockReady || !mockYear} onClick={confirmStartMock}>
              Start timed session →
            </button>
          </div>
        </div>
      )}

      {/* ---- Practice setup ---- */}
      {setupOpen && psSubject && (
        <div className="modal-overlay show" id="practiceSetupModal">
          <div className="modal-sheet">
            <button className="modal-close" onClick={() => setSetupOpen(false)}>✕</button>
            <h2>{subjects[psSubject].icon} {subjects[psSubject].name} practice</h2>
            <p style={{ fontSize: 13, color: "var(--ash)", marginBottom: 18 }}>
              {psBoard ? `${psBoard} — pick a year, duration and number of questions.` : "Pick a duration and number of questions to begin."}
            </p>
            {psBoard && (
              <div className="mock-picker-row">
                <span className="mock-picker-label">Exam year</span>
                <select
                  className="year-select"
                  value={psYear || ""}
                  onChange={(e) => setPsYear(e.target.value)}
                >
                  {examYearsFor(subjects, psSubject).map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
            )}
            <div className="mock-picker-row">
              <span className="mock-picker-label">Duration</span>
              <div className="stepper-row">
                <button className="stepper-btn" onClick={() => setPsDuration((d) => Math.min(60, Math.max(10, d - 5)))}>
                  −
                </button>
                <span className="stepper-value">{psDuration} min</span>
                <button className="stepper-btn" onClick={() => setPsDuration((d) => Math.min(60, Math.max(10, d + 5)))}>
                  +
                </button>
              </div>
            </div>
            <div className="mock-picker-row">
              <span className="mock-picker-label">Number of questions</span>
              <div className="stepper-row">
                <button className="stepper-btn" onClick={() => setPsCount((c) => Math.min(40, Math.max(5, c - 5)))}>
                  −
                </button>
                <span className="stepper-value">{psCount}</span>
                <button className="stepper-btn" onClick={() => setPsCount((c) => Math.min(40, Math.max(5, c + 5)))}>
                  +
                </button>
              </div>
            </div>
            <button className="modal-done-btn" onClick={confirmPracticeSetup}>Start practice →</button>
          </div>
        </div>
      )}
    </>
  );
}