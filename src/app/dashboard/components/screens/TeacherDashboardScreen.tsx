"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CLASSES, FREE_TEACHER_ASSIGNMENTS } from "../../data/teacher";
import { SUBJECTS } from "../../data/subjects";
import { useDashboard } from "../DashboardContext";
import { ChevronMicro } from "./shared";
import type { SubjectData } from "./DiscoverScreen";

const SUBJECT_LOOKUP = SUBJECTS as unknown as Record<string, SubjectData>;

export default function TeacherDashboardScreen() {
  const router = useRouter();
  const { teacherSchool, liveSession, startLiveSession, joinLiveSession } = useDashboard();
  const [liveTeachOpen, setLiveTeachOpen] = useState(false);
  const [liveClassId, setLiveClassId] = useState<string | null>(null);
  const [liveTopicIdx, setLiveTopicIdx] = useState<number | null>(null);

  const liveClass = liveClassId ? CLASSES.find((x) => x.id === liveClassId) : undefined;
  const liveSubject = liveClass ? SUBJECT_LOOKUP[liveClass.subject] : undefined;
  const confirmReady = liveClassId !== null && liveTopicIdx !== null;
  const confirmLabel = confirmReady
    ? "Go live →"
    : liveClassId
      ? "Pick a topic"
      : "Pick a class and topic first";

  const openTeacherLive = () => {
    if (liveSession) {
      joinLiveSession();
      return;
    }
    setLiveClassId(null);
    setLiveTopicIdx(null);
    setLiveTeachOpen(true);
  };

  const closeTeacherLive = () => setLiveTeachOpen(false);

  const selectLiveClass = (id: string) => {
    setLiveClassId(id);
    setLiveTopicIdx(null);
  };

  const confirmStartLive = () => {
    if (!liveClass || !liveSubject || liveTopicIdx === null) return;
    startLiveSession({
      classId: liveClass.id,
      subjectId: liveClass.subject,
      topicIndex: liveTopicIdx,
    });
  };

  const attention = [...CLASSES].sort((a, b) => a.avgMastery - b.avgMastery);

  const quick = [
    { label: "Start a live teaching session", color: "var(--coral)", onClick: openTeacherLive },
    { label: "Create a new assignment", color: "var(--thread)", onClick: () => router.push("/dashboard/assignments") },
    { label: "View class rosters", color: "var(--ember)", onClick: () => router.push("/dashboard/classes") },
    { label: "Prepare a lesson note", color: "var(--violet)", onClick: () => router.push("/dashboard/lesson-prep") },
  ];

  const liveCardData = liveSession
    ? (() => {
        const c = CLASSES.find((x) => x.id === liveSession.classId);
        const s = SUBJECT_LOOKUP[liveSession.subjectId];
        const topic = s ? s.topics[liveSession.topicIndex] : null;
        if (c && s && topic) return { c, s, topic };
        return null;
      })()
    : null;

  return (
    <section className="screen active" id="screen-teacherdash">
      <span className="eyebrow">Mrs. Adeyemi · SS2/SS3</span>
      <h1 className="page-title">Good afternoon 👋</h1>
      <p className="page-sub">A snapshot of your classes today.</p>

      <div className="plan-status-card">
        {teacherSchool ? (
          <>
            <span className="psc-icon">🏫</span>
            <div>
              <div className="psc-title">Covered by {teacherSchool.name}</div>
              <div className="psc-sub">
                Unlimited classes, assignments &amp; Sabi AI — free, via your school
              </div>
            </div>
          </>
        ) : (
          <>
            <span className="psc-icon">🔓</span>
            <div>
              <div className="psc-title">Free plan</div>
              <div className="psc-sub">
                {FREE_TEACHER_ASSIGNMENTS}/{FREE_TEACHER_ASSIGNMENTS} assignments left this term ·
                Upgrade for unlimited
              </div>
            </div>
          </>
        )}
      </div>

      {liveCardData ? (
        <div className="live-teach-card is-live" onClick={openTeacherLive}>
          <span className="ltc-dot"></span>
          <div>
            <div className="ltc-title">Live · {liveCardData.c.name}</div>
            <div className="ltc-sub">{liveCardData.s.icon} {liveCardData.topic.t} — tap to resume</div>
          </div>
          <svg className="ltc-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
      ) : (
        <div className="live-teach-card is-idle" onClick={openTeacherLive}>
          <span className="ltc-icon">📡</span>
          <div>
            <div className="ltc-title">Start a live teaching session</div>
            <div className="ltc-sub">Students follow along live and answer together</div>
          </div>
          <svg className="ltc-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
      )}

      <div className="teacher-stat-row">
        <div className="stat"><div className="num">92</div><div className="lbl">students</div></div>
        <div className="stat"><div className="num">59%</div><div className="lbl">avg. mastery</div></div>
        <div className="stat"><div className="num">3</div><div className="lbl">assignments due</div></div>
      </div>

      <span className="eyebrow">Classes needing attention</span>
      <div className="plan-strip">
        {attention.map((c) => {
          const s = SUBJECT_LOOKUP[c.subject];
          return (
            <div className="plan-item" key={c.id}>
              <div className="plan-icon" style={{ background: `var(--${s.color}-soft)` }}>
                {s.icon}
              </div>
              <div className="plan-body">
                <div className="plan-title">{c.name}</div>
                <div className="plan-meta">{c.students} students · {c.board}</div>
              </div>
              <div className="plan-why">{c.avgMastery}% avg</div>
            </div>
          );
        })}
      </div>

      <span className="eyebrow" style={{ marginTop: "6px" }}>Quick actions</span>
      <div className="card" style={{ padding: "4px 16px" }}>
        {quick.map((q) => (
          <div className="topic-row" key={q.label} onClick={q.onClick}>
            <div className="topic-dot" style={{ background: q.color }}></div>
            <div className="topic-title">{q.label}</div>
            <ChevronMicro className="chev" />
          </div>
        ))}
      </div>

      {liveTeachOpen && (
        <div className="modal-overlay show" id="liveTeachModal">
          <div className="modal-sheet">
            <button className="modal-close" onClick={closeTeacherLive} aria-label="Close">✕</button>
            <h2 id="liveTeachModalTitle">Start a live session</h2>
            <p style={{ fontSize: "13px", color: "var(--ash)", marginBottom: "16px" }}>
              Pick a class and a topic — every student in that class sees it appear live on their
              Home, and can join you in Learn → Practice → Interactive.
            </p>
            <div className="mock-picker-row">
              <span className="mock-picker-label">Class</span>
              <div className="class-pick-row" id="liveClassPicker">
                {CLASSES.map((c) => {
                  const s = SUBJECT_LOOKUP[c.subject];
                  return (
                    <div
                      key={c.id}
                      className={`pick-item${liveClassId === c.id ? " selected" : ""}`}
                      onClick={() => selectLiveClass(c.id)}
                    >
                      <span>{s.icon}</span>
                      <span>{c.name}</span>
                      <span className="pi-meta">{c.students} students</span>
                    </div>
                  );
                })}
              </div>
            </div>
            {liveClass && liveSubject && (
              <div className="mock-picker-row" id="liveTopicPickerWrap">
                <span className="mock-picker-label">Topic</span>
                <div className="topic-pick-row" id="liveTopicPicker">
                  {liveSubject.topics.map((t, i) => (
                    <div
                      key={i}
                      className={`pick-item${liveTopicIdx === i ? " selected" : ""}`}
                      onClick={() => setLiveTopicIdx(i)}
                    >
                      <span className="topic-dot" style={{ background: `var(--${t.status})` }}></span>
                      <span>{t.t}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <button
              className="modal-done-btn"
              id="liveTeachConfirmBtn"
              onClick={confirmStartLive}
              disabled={!confirmReady}
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}