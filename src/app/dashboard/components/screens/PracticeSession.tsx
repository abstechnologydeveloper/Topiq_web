"use client";

import { useEffect, useRef, useState } from "react";
import {
  cloneQuestions,
  countForMockSubject,
  formatDuration,
  fmtClock,
  matchTopicForQuestion,
  type PQuestion,
  type SessionCfg,
} from "./practiceTypes";
import type { SubjectData } from "./DiscoverScreen";
import { useDashboard } from "../DashboardContext";

type Props = {
  cfg: SessionCfg;
  subjects: Record<string, SubjectData>;
  openSubject: (id: string, pane?: string) => void;
  onExit: () => void;
};

type MockEntry = { questions: PQuestion[]; index: number; passageDone: boolean };

export default function PracticeSession({ cfg, subjects, openSubject, onExit }: Props) {
  const { registerChallengeProgress } = useDashboard();
  const mockMode = cfg.mode === "mock";
  const ordered = mockMode ? cfg.ordered : [cfg.subjectId];

  const [questions, setQuestions] = useState<PQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [qPaletteOpen, setQPaletteOpen] = useState(true);
  const [passagePending, setPassagePending] = useState(false);
  const [leftSeconds, setLeftSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [startMs, setStartMs] = useState<number | null>(null);
  const [showScore, setShowScore] = useState(false);
  const [mockSessionData, setMockSessionData] = useState<Record<string, MockEntry>>({});
  const [reviewOpen, setReviewOpen] = useState<Set<string>>(new Set());
  const [currentSubjectState, setCurrentSubjectState] = useState<string>(
    mockMode ? ordered[0] : cfg.subjectId,
  );

  const currentSubject = mockMode ? currentSubjectState : cfg.subjectId;

  const s = subjects[currentSubject];
  const paperPos = ordered.indexOf(currentSubject);
  const paperSuffix = ordered.length > 1 ? ` · Paper ${paperPos + 1} of ${ordered.length}` : "";
  const yearSuffix = mockMode ? (cfg.year ? ` · ${cfg.year}` : "") : cfg.year ? ` · ${cfg.year}` : "";
  const psTag = mockMode
    ? `Mock exam · ${cfg.board}${yearSuffix}${paperSuffix}`
    : cfg.board
    ? `Practice · ${cfg.board}${yearSuffix}`
    : `Practice${yearSuffix}`;

  const totalSeconds = mockMode ? cfg.totalMinutes * 60 : cfg.duration * 60;
  const isPassageStage = !showScore && passagePending;

  const mockQty = (id: string) => (cfg.mode === "mock" ? countForMockSubject(subjects, id, cfg.mockType) : cfg.count);
  const isAnsweredCount = questions.filter((q) => q._answered).length;
  const sessionScore = questions.filter((q) => q._answered && q._wasCorrect).length;

  const finishRef = useRef<() => void>(() => {});
  finishRef.current = () => {
    if (mockMode) {
      setMockSessionData((d) => ({
        ...d,
        [currentSubject]: {
          questions,
          index,
          passageDone: d[currentSubject] ? d[currentSubject].passageDone : true,
        },
      }));
    }
    setShowScore(true);
    setTimerActive(false);
  };

  // countdown
  useEffect(() => {
    if (!timerActive) return;
    const id = window.setInterval(() => {
      setLeftSeconds((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, [timerActive]);

  useEffect(() => {
    if (timerActive && leftSeconds <= 0) finishRef.current();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerActive, leftSeconds]);

  const ensureQuestions = (id: string) => {
    const saved = mockMode ? mockSessionData[id] : undefined;
    if (saved && saved.questions) {
      setQuestions(saved.questions);
      setIndex(Math.min(saved.index || 0, saved.questions.length - 1));
    } else {
      const qs = cloneQuestions(subjects, id, mockMode ? cfg.year : cfg.year, mockQty(id));
      setQuestions(qs);
      setIndex(0);
      if (mockMode) {
        setMockSessionData((d) => ({ ...d, [id]: { questions: qs, index: 0, passageDone: false } }));
      }
    }
  };

  const startTimer = () => {
    setLeftSeconds(totalSeconds);
    setStartMs(Date.now());
    setTimerActive(true);
  };

  // init
  useEffect(() => {
    if (mockMode) {
      setCurrentSubjectState(ordered[0]);
      const first = subjects[ordered[0]];
      setPassagePending(!!first.passage);
      if (first.passage) {
        ensureQuestions(ordered[0]);
      }
      startTimer();
    } else {
      const hasPassage = !!subjects[cfg.subjectId].passage;
      ensureQuestions(cfg.subjectId);
      setPassagePending(hasPassage);
      if (!hasPassage) startTimer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveMockProgress = (id: string, idx: number, qs: PQuestion[]) => {
    setMockSessionData((d) => ({
      ...d,
      [id]: { questions: qs, index: idx, passageDone: d[id] ? d[id].passageDone : !passagePending },
    }));
  };

  const answerOption = (optIndex: number) => {
    const cur = questions;
    const q = cur[index];
    if (q._answered) return;
    const isCorrect = optIndex === q.correct;
    const next = cur.slice();
    next[index] = { ...q, _answered: true, _wasCorrect: isCorrect, _selectedIndex: optIndex };
    setQuestions(next);
    registerChallengeProgress(isCorrect);
    if (mockMode) {
      setMockSessionData((d) => ({
        ...d,
        [currentSubject]: {
          questions: next,
          index,
          passageDone: d[currentSubject] ? d[currentSubject].passageDone : !passagePending,
        },
      }));
    }
  };

  const continuePastPassage = () => {
    setPassagePending(false);
    if (mockMode) {
      const qs = mockSessionData[currentSubject]?.questions || questions;
      setMockSessionData((d) => ({
        ...d,
        [currentSubject]: { questions: qs, index, passageDone: true },
      }));
    } else {
      startTimer();
    }
  };

  const prevQuestion = () => {
    if (index > 0) {
      const ni = index - 1;
      setIndex(ni);
      if (mockMode) saveMockProgress(currentSubject, ni, questions);
    }
  };

  const answeredFor = (id: string) => {
    const d = mockSessionData[id];
    return d && d.questions ? d.questions.filter((q) => q._answered).length : 0;
  };
  const totalFor = (id: string) => mockQty(id);

  const nextIncomplete = (): string | null => {
    const pos = ordered.indexOf(currentSubject);
    const seq = ordered.slice(pos + 1).concat(ordered.slice(0, pos + 1));
    return seq.find((id) => {
      if (id === currentSubject) return false;
      const st = answeredFor(id);
      return st < totalFor(id);
    }) || null;
  };

  const loadSubject = (id: string) => {
    if (id === currentSubject) return;
    if (mockMode) saveMockProgress(currentSubject, index, questions);
    setCurrentSubjectState(id);
    const saved = mockSessionData[id];
    const pd = saved ? saved.passageDone : false;
    setQPaletteOpen(true);
    ensureQuestions(id);
    setPassagePending(!!subjects[id].passage && !pd);
  };

  const nextQuestion = () => {
    if (index < questions.length - 1) {
      setIndex(index + 1);
      if (mockMode) saveMockProgress(currentSubject, index + 1, questions);
    } else if (mockMode) {
      saveMockProgress(currentSubject, index, questions);
      const next = nextIncomplete();
      if (next) loadSubject(next);
      else finishRef.current();
    } else {
      finishRef.current();
    }
  };

  const submitPracticeSession = () => {
    if (mockMode) {
      saveMockProgress(currentSubject, index, questions);
      const next = nextIncomplete();
      if (next) loadSubject(next);
      else finishRef.current();
    } else {
      finishRef.current();
    }
  };

  const isLastSubject = !mockMode || !nextIncomplete();
  const submitLabel = !mockMode || isLastSubject ? "Submit" : "Submit subject →";

  const scoreLabel = isPassageStage ? "Passage" : `Question ${index + 1}/${questions.length}`;
  const fillPct = showScore ? 100 : isPassageStage ? 0 : questions.length ? (index / questions.length) * 100 : 0;
  const timerHidden = !showScore && mockMode === false && !!subjects[currentSubject].passage && passagePending;

  const restartPractice = () => {
    if (mockMode) {
      onExit();
      return;
    }
    setShowScore(false);
    setQPaletteOpen(true);
    setPassagePending(!!subjects[cfg.subjectId].passage);
    ensureQuestions(cfg.subjectId);
    setIndex(0);
    if (!subjects[cfg.subjectId].passage) startTimer();
  };

  // ---------- report ----------
  const buildSingleReport = () => {
    const total = questions.length;
    const correct = sessionScore;
    const answered = isAnsweredCount;
    const incorrect = answered - correct;
    const pct = total ? Math.round((correct / total) * 100) : 0;
    const timeSpent = startMs ? formatDuration(Date.now() - startMs) : "—";
    // by topic
    const byTopic: Record<string, { c: number; t: number }> = {};
    questions.forEach((q) => {
      const ti = matchTopicForQuestion(subjects, currentSubject, q);
      const label = ti >= 0 ? subjects[currentSubject].topics[ti].t : "General";
      byTopic[label] = byTopic[label] || { c: 0, t: 0 };
      byTopic[label].t++;
      if (q._answered && q._wasCorrect) byTopic[label].c++;
    });
    const topicRows = Object.keys(byTopic)
      .map((label) => ({ label, p: Math.round((byTopic[label].c / byTopic[label].t) * 100), c: byTopic[label].c, t: byTopic[label].t }))
      .sort((a, b) => b.p - a.p);
    const strengths = topicRows.filter((r) => r.p >= 70).slice(0, 3);
    const weak = questions.filter((q) => !q._answered || !q._wasCorrect);
    return { total, correct, incorrect, skipped: total - answered, pct, timeSpent, topicRows, strengths, weak };
  };

  const buildMockReport = () => {
    let totalCorrect = 0;
    let totalQ = 0;
    ordered.forEach((id) => {
      totalQ += totalFor(id);
      const d = mockSessionData[id];
      if (d && d.questions) totalCorrect += d.questions.filter((q) => q._answered && q._wasCorrect).length;
    });
    const pct = totalQ ? Math.round((totalCorrect / totalQ) * 100) : 0;
    const timeSpent = formatDuration(Math.max(0, totalSeconds - leftSeconds) * 1000);
    const bySubject = ordered
      .map((id) => {
        const d = mockSessionData[id];
        const total = totalFor(id);
        const correct = d && d.questions ? d.questions.filter((q) => q._answered && q._wasCorrect).length : 0;
        const p = total ? Math.round((correct / total) * 100) : 0;
        return { id, label: subjects[id].icon + " " + subjects[id].name, p };
      })
      .sort((a, b) => b.p - a.p);
    return { totalCorrect, totalQ, pct, timeSpent, bySubject };
  };

  const toggleReviewCard = (id: string) => {
    setReviewOpen((prev) => {
      const n = new Set(prev);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  };

  return (
    <section className="screen active" id="screen-practicesession">
      <div className="practice-session-shell">
        <div className="ps-topbar">
          <button className="ps-exit" onClick={onExit} aria-label="Exit practice">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <div className="ps-subject">
            <div className="tag">{psTag}</div>
            <div className="name">
              {s.icon} {s.name}
            </div>
          </div>
          <button className="ps-submit-btn" onClick={submitPracticeSession}>
            {submitLabel}
          </button>
        </div>
        <div className="ps-mode-banner">
          <span className="dotpulse"></span>
          {mockMode
            ? `Timed mock exam — ${cfg.totalMinutes} minutes total across ${ordered.length} subject${ordered.length === 1 ? "" : "s"}, graded instantly`
            : "Practice mode — answers aren't graded into your lesson progress"}
        </div>
        <div className="mock-subject-switch" style={{ display: mockMode && !showScore ? "flex" : "none" }}>
          {ordered.map((id) => {
            const t = totalFor(id);
            const a = answeredFor(id);
            const isDone = t > 0 && a >= t;
            return (
              <button
                key={id}
                type="button"
                className={`mss-box${id === currentSubject ? " active" : ""}${isDone ? " done" : ""}`}
                onClick={() => loadSubject(id)}
              >
                <span className="mss-name">{subjects[id].icon} {subjects[id].name}</span>
                <span className="mss-count">{a}/{t}{isDone ? " ✓" : ""}</span>
              </button>
            );
          })}
        </div>

        <div className="session-head">
          <span className="eyebrow" style={{ margin: 0 }}>Question</span>
          <div className="session-track">
            <div className="session-fill" style={{ width: `${fillPct}%` }}></div>
          </div>
          <span className="session-score">{scoreLabel}</span>
          <span className="session-timer" style={{ display: timerHidden ? "none" : "inline" }}>
            ⏱ {fmtClock(leftSeconds)}
          </span>
        </div>

        <div className="q-palette" style={{ display: !showScore && !passagePending && questions.length ? "block" : "none" }}>
          <button type="button" className="q-palette-toggle" onClick={() => setQPaletteOpen((o) => !o)}>
            <span>
              Questions · {isAnsweredCount}/{questions.length} answered — tap to {qPaletteOpen ? "close" : "jump to a question"}
            </span>
            <svg className={`q-palette-chev open`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
          <div className="q-palette-body" style={{ display: qPaletteOpen ? "flex" : "none" }}>
            {questions.map((q, i) => (
              <button
                key={i}
                type="button"
                className={`q-pill${i === index ? " active" : ""}${q._answered ? " answered" : ""}`}
                onClick={() => setIndex(i)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Passage card */}
        {!showScore && isPassageStage && s.passage ? (
          <div className="qcard passage-card">
            <span className="qtag">Read first · required</span>
            <h3 className="passage-title">{(s.passage as { title: string }).title}</h3>
            <div className="passage-body">
              {(s.passage as { body: string[] }).body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="grounding">
              <svg className="thread-mark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v20M2 12h20" />
              </svg>
              <span className="chip">{(s.passage as { ref: string }).ref}</span>
            </div>
            <button
              onClick={continuePastPassage}
              style={{ marginTop: 16, width: "100%", background: "var(--ink)", color: "var(--paper)", border: "none", padding: "12px 18px", borderRadius: 20, fontWeight: 700, fontSize: 13, cursor: "pointer" }}
            >
              I&apos;ve read the passage — start questions →
            </button>
          </div>
        ) : !showScore ? (
          <div className="qcard">
            <span className="qtag">{questions[index] ? questions[index].tag : ""}</span>
            <p className="qtext">{questions[index] ? questions[index].text : ""}</p>
            <div>
              {questions[index]
                ? questions[index].options.map((opt, i) => {
                    const q = questions[index];
                    const selected = q._answered && i === q._selectedIndex;
                    return (
                      <div
                        key={i}
                        className={`option${selected ? " selected" : ""}`}
                        onClick={() => answerOption(i)}
                        style={q._answered ? { pointerEvents: "none" } : undefined}
                      >
                        <div className="letter">{String.fromCharCode(65 + i)}</div>
                        {opt}
                      </div>
                    );
                  })
                : null}
            </div>
            <div id="nextRow" style={{ marginTop: 14, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
              <button
                onClick={prevQuestion}
                disabled={index === 0}
                style={{
                  background: "none",
                  color: "var(--ink)",
                  border: "1.5px solid var(--ash-line)",
                  padding: "9px 16px",
                  borderRadius: 20,
                  fontWeight: 700,
                  fontSize: "12.5px",
                  cursor: index === 0 ? "default" : "pointer",
                  opacity: index === 0 ? 0.4 : 1,
                }}
              >
                ← Previous
              </button>
              <button
                onClick={nextQuestion}
                style={{ background: "var(--ink)", color: "var(--paper)", border: "none", padding: "9px 18px", borderRadius: 20, fontWeight: 700, fontSize: "12.5px", cursor: "pointer" }}
              >
                {index === questions.length - 1 ? "Submit →" : "Next question →"}
              </button>
            </div>
          </div>
        ) : null}

        {/* Score card */}
        {showScore ? renderScoreCard() : null}
      </div>
    </section>
  );

  function renderScoreCard() {
    if (mockMode) {
      const rep = buildMockReport();
      const strengths = rep.bySubject.filter((r) => r.p >= 70).slice(0, 3);
      // weak points
      const seenMil = new Set<string>();
      const weakRows: { subj: string; label: string }[] = [];
      ordered.forEach((id) => {
        const d = mockSessionData[id];
        if (!d || !d.questions) return;
        d.questions
          .filter((q) => !q._answered || !q._wasCorrect)
          .forEach((q) => {
            const ti = matchTopicForQuestion(subjects, id, q);
            const label = ti >= 0 ? subjects[id].topics[ti].t : q.ref || "General revision";
            const key = id + "::" + label;
            if (seenMil.has(key)) return;
            seenMil.add(key);
            weakRows.push({ subj: id, label });
          });
      });
      return (
        <div className="qcard score-screen">
          <div className="eyebrow" style={{ justifyContent: "center" }}>Session complete — full report</div>
          <div className="big">
            {rep.totalCorrect}/{rep.totalQ}
          </div>
          <p style={{ color: "var(--ash)", fontSize: "13.5px" }}>
            Grounded straight from your syllabus — not generic web questions.
          </p>
          <div className="perf-stat-grid">
            <div className="perf-stat"><div className="ps-val">{rep.pct}%</div><div className="ps-label">Overall score</div></div>
            <div className="perf-stat"><div className="ps-val">{rep.timeSpent}</div><div className="ps-label">Time spent</div></div>
            <div className="perf-stat"><div className="ps-val" style={{ color: "var(--thread)" }}>{rep.totalCorrect}</div><div className="ps-label">Correct answers</div></div>
            <div className="perf-stat"><div className="ps-val" style={{ color: "var(--coral)" }}>{rep.totalQ - rep.totalCorrect}</div><div className="ps-label">Incorrect / skipped</div></div>
          </div>
          <div style={{ textAlign: "left", marginTop: 18 }}>
            <div className="eyebrow">Performance by subject</div>
            {rep.bySubject.map((r) => (
              <div key={r.id} className="subj-perf-row">
                <span style={{ fontSize: 13, minWidth: 110 }}>{r.label}</span>
                <div className="subj-perf-bar-track">
                  <div
                    className="subj-perf-bar-fill"
                    style={{ width: `${r.p}%`, background: r.p >= 70 ? "var(--thread)" : r.p >= 40 ? "var(--ember)" : "var(--coral)" }}
                  ></div>
                </div>
                <span className="subj-perf-pct">{r.p}%</span>
              </div>
            ))}
          </div>
          {strengths.length ? (
            <div style={{ textAlign: "left", marginTop: 18 }}>
              <div className="eyebrow">Strengths</div>
              {strengths.map((r) => (
                <div key={r.id} className="strength-row">💪 <strong>{r.label}</strong> — {r.p}% correct</div>
              ))}
            </div>
          ) : null}
          <div style={{ textAlign: "left", marginTop: 20 }}>
            {weakRows.length ? <div className="eyebrow">Weak points to revisit</div> : null}
            {weakRows.length ? (
              weakRows.map((w, i) => (
                <div key={i} className="weak-point-row" onClick={() => openSubject(w.subj, "overview")}>
                  <span className="wpr-title">{subjects[w.subj].icon} {w.label}</span>
                  <span className="wpr-cta">Study this →</span>
                </div>
              ))
            ) : (
              <p style={{ fontSize: 13, color: "var(--ash)", textAlign: "center" }}>No weak points this round — clean sweep! 🎉</p>
            )}
          </div>
          <div style={{ textAlign: "left", marginTop: 22 }}>
            <div className="eyebrow">Review every question</div>
            {ordered.map((id) => {
              const d = mockSessionData[id];
              if (!d || !d.questions) return null;
              return (
                <div key={id}>
                  <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, fontWeight: 700, color: "var(--thread)", textTransform: "uppercase", letterSpacing: ".05em", margin: "18px 0 8px" }}>
                    {subjects[id].icon} {subjects[id].name}
                  </div>
                  {d.questions.map((q, qi) => (
                        <div key={qi} className="review-card">
                          <div className="review-qtext">{qi + 1}. {q.text}</div>
                          <div className="review-options">
                            {q.options.map((opt, oi) => {
                              let cls = "";
                              if (oi === q.correct) cls = "correct";
                              else if (oi === q._selectedIndex) cls = "wrong";
                              return (
                                <div key={oi} className={`review-option ${cls}`}>
                                  {String.fromCharCode(65 + oi)}. {opt}
                                </div>
                              );
                            })}
                          </div>
                          <div className="review-explain">
                            <strong>{!q._answered ? "Not attempted." : q._wasCorrect ? "Correct." : "Not quite."}</strong> {q.explain}
                          </div>
                          <span className="review-tag">{q.ref}</span>
                        </div>
                      ))}
                </div>
              );
            })}
          </div>
          <button style={{ display: "none" }}>Next paper →</button>
          <button onClick={onExit}>Back to Practice</button>
        </div>
      );
    }

    // single plain practice report
    const rep = buildSingleReport();
    const groups: Record<string, { q: PQuestion; i: number }[]> = {};
    const order: string[] = [];
    questions.forEach((q, i) => {
      const ti = matchTopicForQuestion(subjects, currentSubject, q);
      const label = ti >= 0 ? subjects[currentSubject].topics[ti].t : q.ref || "General revision";
      groups[label] = groups[label] || [];
      groups[label].push({ q, i });
      if (order.indexOf(label) === -1) order.push(label);
    });
    return (
      <div className="qcard score-screen">
        <div className="eyebrow" style={{ justifyContent: "center" }}>Session complete — full report</div>
        <div className="big">{rep.correct}/{rep.total}</div>
        <p style={{ color: "var(--ash)", fontSize: "13.5px" }}>
          Grounded straight from your syllabus — not generic web questions.
        </p>
        <div className="perf-stat-grid">
          <div className="perf-stat"><div className="ps-val">{rep.pct}%</div><div className="ps-label">Overall score</div></div>
          <div className="perf-stat"><div className="ps-val">{rep.timeSpent}</div><div className="ps-label">Time spent</div></div>
          <div className="perf-stat"><div className="ps-val" style={{ color: "var(--thread)" }}>{rep.correct}</div><div className="ps-label">Correct answers</div></div>
          <div className="perf-stat"><div className="ps-val" style={{ color: "var(--coral)" }}>{rep.incorrect + rep.skipped}</div><div className="ps-label">Incorrect / skipped</div></div>
        </div>
        <div style={{ textAlign: "left", marginTop: 18 }}>
          <div className="eyebrow">Performance by topic</div>
          {rep.topicRows.map((r, i) => (
            <div key={i} className="subj-perf-row">
              <span style={{ fontSize: 13, minWidth: 110 }}>{r.label}</span>
              <div className="subj-perf-bar-track">
                <div
                  className="subj-perf-bar-fill"
                  style={{ width: `${r.p}%`, background: r.p >= 70 ? "var(--thread)" : r.p >= 40 ? "var(--ember)" : "var(--coral)" }}
                ></div>
              </div>
              <span className="subj-perf-pct">{r.p}%</span>
            </div>
          ))}
        </div>
        {rep.strengths.length ? (
          <div style={{ textAlign: "left", marginTop: 18 }}>
            <div className="eyebrow">Strengths</div>
            {rep.strengths.map((r, i) => (
              <div key={i} className="strength-row">💪 <strong>{r.label}</strong> — {r.p}% correct</div>
            ))}
          </div>
        ) : null}
        <div style={{ textAlign: "left", marginTop: 20 }}>
          <div className="eyebrow">Weak points to revisit</div>
          {rep.weak.length ? (
            rep.weak.map((q, i) => {
              const ti = matchTopicForQuestion(subjects, currentSubject, q);
              const label = ti >= 0 ? subjects[currentSubject].topics[ti].t : q.ref || "General revision";
              return (
                <div key={i} className="weak-point-row" onClick={() => (ti >= 0 ? openSubject(currentSubject, "overview") : onExit())}>
                  <span className="wpr-title">{label}</span>
                  <span className="wpr-cta">Study this →</span>
                </div>
              );
            })
          ) : (
            <p style={{ fontSize: 13, color: "var(--ash)", textAlign: "center" }}>No weak points this round — clean sweep! 🎉</p>
          )}
        </div>
        <div style={{ textAlign: "left", marginTop: 22 }}>
          <div className="eyebrow">Review every question, by topic</div>
          {order.map((label) => {
            const items = groups[label];
            const correctCount = items.filter(({ q }) => q._answered && q._wasCorrect).length;
            return (
              <div key={label} className="review-topic-group">
                <div className="review-topic-header">{label} <span>{correctCount}/{items.length}</span></div>
                {items.map(({ q, i }) => {
                  const cardId = `rc${currentSubject}-${i}`;
                  const open = reviewOpen.has(cardId);
                  const icon = !q._answered ? "⬜" : q._wasCorrect ? "✅" : "❌";
                  return (
                    <div key={i} className={`review-card-collapsed${open ? " open" : ""}`}>
                      <div className="review-card-toggle" onClick={() => toggleReviewCard(cardId)}>
                        <span>{icon} {i + 1}. {q.text}</span>
                        <svg className="chev" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M9 18l6-6-6-6" />
                        </svg>
                      </div>
                      <div className="review-card-body">
                        <div className="review-options">
                          {q.options.map((opt, oi) => {
                            let cls = "";
                            if (oi === q.correct) cls = "correct";
                            else if (oi === q._selectedIndex) cls = "wrong";
                            return (
                              <div key={oi} className={`review-option ${cls}`}>
                                {String.fromCharCode(65 + oi)}. {opt}
                              </div>
                            );
                          })}
                        </div>
                        <div className="review-explain">
                          <strong>{!q._answered ? "Not attempted." : q._wasCorrect ? "Correct." : "Not quite."}</strong> {q.explain}
                        </div>
                        <span className="review-tag">{q.ref}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <button onClick={restartPractice}>Practice again</button>
        <button onClick={onExit} style={{ background: "none", color: "var(--ink)", textDecoration: "underline", marginTop: 10 }}>
          Back to Practice
        </button>
      </div>
    );
  }
}