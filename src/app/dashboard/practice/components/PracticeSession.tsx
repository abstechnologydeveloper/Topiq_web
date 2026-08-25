"use client";

import { useEffect, useRef, useState } from "react";
import { cloneQuestions, countForMockSubject, formatDuration, fmtClock, matchTopicForQuestion, type PQuestion, type SessionCfg } from "./practiceTypes";
import type { SubjectData } from "../../components/screens/DiscoverScreen";
import { useDashboard } from "../../components/DashboardContext";
import SessionTopbar from "./SessionTopbar";
import SessionBanner from "./SessionBanner";
import QuestionPalette from "./QuestionPalette";
import QuestionCard from "./QuestionCard";
import ScoreScreen from "./ScoreScreen";
import ReviewTab from "./ReviewTab";
import { SCREEN } from "./constants";

type Props = { cfg: SessionCfg; subjects: Record<string, SubjectData>; openSubject: (id: string, pane?: string) => void; onExit: () => void };
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
  const [currentSubjectState, setCurrentSubjectState] = useState(mockMode ? ordered[0] : cfg.subjectId);
  const currentSubject = currentSubjectState;
  const s = subjects[currentSubject];
  const paperPos = ordered.indexOf(currentSubject);
  const paperSuffix = ordered.length > 1 ? ` · Paper ${paperPos + 1} of ${ordered.length}` : "";
  const yearSuffix = mockMode ? (cfg.year ? ` · ${cfg.year}` : "") : cfg.year ? ` · ${cfg.year}` : "";
  const psTag = mockMode ? `Mock exam · ${cfg.board}${yearSuffix}${paperSuffix}` : cfg.board ? `Practice · ${cfg.board}${yearSuffix}` : `Practice${yearSuffix}`;
  const totalSeconds = mockMode ? cfg.totalMinutes * 60 : cfg.duration * 60;
  const isAnsweredCount = questions.filter((q) => q._answered).length;
  const sessionScore = questions.filter((q) => q._answered && q._wasCorrect).length;
  const mockQty = (id: string) => (cfg.mode === "mock" ? countForMockSubject(subjects, id, cfg.mockType) : cfg.count);

  const finishRef = useRef<() => void>(() => {});
  finishRef.current = () => {
    if (mockMode) setMockSessionData((d) => ({ ...d, [currentSubject]: { questions, index, passageDone: d[currentSubject] ? d[currentSubject].passageDone : true } }));
    setShowScore(true); setTimerActive(false);
  };

  useEffect(() => { if (!timerActive) return; const id = window.setInterval(() => setLeftSeconds((prev) => (prev <= 1 ? 0 : prev - 1)), 1000); return () => window.clearInterval(id); }, [timerActive]);
  useEffect(() => { if (timerActive && leftSeconds <= 0) finishRef.current(); }, [timerActive, leftSeconds]);

  const ensureQuestions = (id: string) => {
    const saved = mockMode ? mockSessionData[id] : undefined;
    if (saved?.questions) { setQuestions(saved.questions); setIndex(Math.min(saved.index || 0, saved.questions.length - 1)); }
    else { const qs = cloneQuestions(subjects, id, mockMode ? cfg.year : cfg.year, mockQty(id)); setQuestions(qs); setIndex(0); if (mockMode) setMockSessionData((d) => ({ ...d, [id]: { questions: qs, index: 0, passageDone: false } })); }
  };
  const startTimer = () => { setLeftSeconds(totalSeconds); setStartMs(Date.now()); setTimerActive(true); };
  useEffect(() => {
    if (mockMode) { setCurrentSubjectState(ordered[0]); const f = subjects[ordered[0]]; setPassagePending(!!f.passage); if (f.passage) ensureQuestions(ordered[0]); startTimer(); }
    else { const hp = !!subjects[cfg.subjectId].passage; ensureQuestions(cfg.subjectId); setPassagePending(hp); if (!hp) startTimer(); }
  }, []);

  const saveMockProgress = (id: string, idx: number, qs: PQuestion[]) => setMockSessionData((d) => ({ ...d, [id]: { questions: qs, index: idx, passageDone: d[id] ? d[id].passageDone : !passagePending } }));
  const answerOption = (i: number) => {
    const q = questions[index]; if (q._answered) return;
    const ok = i === q.correct; const next = questions.slice();
    next[index] = { ...q, _answered: true, _wasCorrect: ok, _selectedIndex: i };
    setQuestions(next); registerChallengeProgress(ok);
    if (mockMode) setMockSessionData((d) => ({ ...d, [currentSubject]: { questions: next, index, passageDone: d[currentSubject] ? d[currentSubject].passageDone : !passagePending } }));
  };
  const continuePastPassage = () => { setPassagePending(false); if (!mockMode) startTimer(); };
  const prevQuestion = () => { if (index > 0) { const ni = index - 1; setIndex(ni); if (mockMode) saveMockProgress(currentSubject, ni, questions); } };
  const answeredFor = (id: string) => { const d = mockSessionData[id]; return d?.questions ? d.questions.filter((q) => q._answered).length : 0; };
  const totalFor = (id: string) => mockQty(id);
  const nextIncomplete = (): string | null => { const pos = ordered.indexOf(currentSubject); const seq = ordered.slice(pos + 1).concat(ordered.slice(0, pos + 1)); return seq.find((id) => id !== currentSubject && answeredFor(id) < totalFor(id)) || null; };
  const loadSubject = (id: string) => { if (id === currentSubject) return; if (mockMode) saveMockProgress(currentSubject, index, questions); setCurrentSubjectState(id); const saved = mockSessionData[id]; const pd = saved ? saved.passageDone : false; setQPaletteOpen(true); ensureQuestions(id); setPassagePending(!!subjects[id].passage && !pd); };
  const nextQuestion = () => {
    if (index < questions.length - 1) { setIndex(index + 1); if (mockMode) saveMockProgress(currentSubject, index + 1, questions); }
    else if (mockMode) { saveMockProgress(currentSubject, index, questions); const n = nextIncomplete(); if (n) loadSubject(n); else finishRef.current(); }
    else finishRef.current();
  };
  const submitPracticeSession = () => { if (mockMode) { saveMockProgress(currentSubject, index, questions); const n = nextIncomplete(); if (n) loadSubject(n); else finishRef.current(); } else finishRef.current(); };
  const isLastSubject = !mockMode || !nextIncomplete();
  const submitLabel = isLastSubject ? "Submit" : "Submit subject →";
  const fillPct = showScore ? 100 : questions.length ? (index / questions.length) * 100 : 0;
  const hasAnswered = isAnsweredCount > 0;
  const timeLabel = `${fmtClock(leftSeconds)}`;
  const restartPractice = () => { if (mockMode) { onExit(); return; } setShowScore(false); setQPaletteOpen(true); setPassagePending(!!subjects[cfg.subjectId].passage); ensureQuestions(cfg.subjectId); setIndex(0); if (!subjects[cfg.subjectId].passage) startTimer(); };
  const toggleReviewCard = (id: string) => setReviewOpen((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  // report
  const buildReport = () => {
    if (mockMode) {
      let c = 0, t = 0; ordered.forEach((id) => { t += totalFor(id); const d = mockSessionData[id]; if (d?.questions) c += d.questions.filter((q) => q._answered && q._wasCorrect).length; });
      const pct = t ? Math.round((c / t) * 100) : 0; const timeSpent = formatDuration(Math.max(0, totalSeconds - leftSeconds) * 1000);
      const perSubject = ordered.map((id) => { const total = totalFor(id); const d = mockSessionData[id]; const correct = d?.questions ? d.questions.filter((q) => q._answered && q._wasCorrect).length : 0; return { id, icon: subjects[id].icon, name: subjects[id].name, score: correct, total, pct: total ? Math.round((correct / total) * 100) : 0 }; });
      return { score: c, total: t, pct, perSubject, weakTopics: [] as { subject: string; icon: string; label: string; pct: number }[] };
    }
    const totalQ = questions.length, correct = sessionScore, answered = isAnsweredCount, pct = totalQ ? Math.round((correct / totalQ) * 100) : 0;
    return { score: correct, total: totalQ, pct, perSubject: [{ id: cfg.subjectId, icon: s.icon, name: s.name, score: correct, total: totalQ, pct }], weakTopics: questions.filter((q) => !q._answered || !q._wasCorrect).slice(0, 5).map((q) => ({ subject: currentSubject, icon: s.icon, label: q.text.slice(0, 40) + "...", pct: 0 })) };
  };

  const report = buildReport();
  const curQ = questions[index];
  const optionState = curQ ? { selected: new Set(curQ._answered ? [curQ._selectedIndex!] : []), show: !!curQ._answered, correct: new Set([curQ.correct]), answered: !!(curQ._answered && curQ._wasCorrect) } : { selected: new Set<number>(), show: false, correct: new Set<number>(), answered: false };

  if (showScore) {
    return (
      <section className={SCREEN}>
        <ScoreScreen score={report.score} total={report.total} pct={report.pct} perSubject={report.perSubject} weakTopics={report.weakTopics} reviewOpen={reviewOpen} onToggleReview={toggleReviewCard}
          onPracticeAgain={restartPractice} onStudyTopic={(id) => openSubject(id, "learn")} onExit={onExit} />
        {report.perSubject.filter((sub) => reviewOpen.has(sub.id)).map((sub) => (
          <ReviewTab key={sub.id} subjectId={sub.id} icon={sub.icon} name={sub.name}
            rows={(mockSessionData[sub.id]?.questions || questions).filter((q: PQuestion) => q._answered).map((q: PQuestion) => ({
              q: q.text.slice(0, 60), your: q._wasCorrect ? q.options[q.correct] : q.options[q._selectedIndex!], correct: q.options[q.correct], isCorrect: !!q._wasCorrect,
            }))} />
        ))}
      </section>
    );
  }

  return (
    <section className={SCREEN}>
      <SessionTopbar psTag={psTag} paperSuffix={paperSuffix} yearSuffix={yearSuffix} timeLeftLabel={timeLabel} onExit={onExit} onSubmit={submitPracticeSession} submitLabel={submitLabel} hasAnswered={hasAnswered} />
      <SessionBanner mockMode={mockMode} mockType={mockMode ? (cfg as any).mockType : undefined} mockSubjectCount={mockMode ? ordered.length : undefined} totalQuestions={mockMode ? questions.length : undefined} currentSubjectLabel={mockMode ? `${s.icon} ${s.name}` : undefined} adaptiveInfo={!mockMode ? `Adaptive session · ${fillPct.toFixed(0)}% complete` : undefined} />
      {!showScore && (
        <>
          <QuestionPalette total={questions.length} answered={isAnsweredCount} current={index} expanded={qPaletteOpen} onToggle={() => setQPaletteOpen((o) => !o)} onJump={(i) => { setIndex(i); if (mockMode) saveMockProgress(currentSubject, i, questions); }} timerLabel={timeLabel} />
          {curQ ? (
            <QuestionCard question={curQ} index={index} passagePending={passagePending} optionState={optionState} onSelect={(i: number) => { if (i === -1) continuePastPassage(); else answerOption(i); }} />
          ) : null}
          <div className="mb-4 flex gap-2.5">
            <button className="flex-1 cursor-pointer rounded-[20px] border-1_5 border-ash-line bg-surface px-4 py-2 text-label font-bold text-ink" onClick={prevQuestion} disabled={index === 0}>← Previous</button>
            <button className="flex-1 cursor-pointer rounded-[20px] border-none bg-thread px-4 py-2 text-label font-bold text-white" onClick={nextQuestion}>{index < questions.length - 1 ? "Next →" : isLastSubject ? "Finish →" : "Next subject →"}</button>
          </div>
        </>
      )}
    </section>
  );
}