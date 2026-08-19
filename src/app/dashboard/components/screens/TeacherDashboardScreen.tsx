"use client";

import { useRouter } from "next/navigation";
import { CLASSES, FREE_TEACHER_ASSIGNMENTS } from "../../data/teacher";
import { SUBJECTS } from "../../data/subjects";
import { useDashboard } from "../DashboardContext";
import { ChevronMicro } from "./shared";
import type { SubjectData } from "./DiscoverScreen";

const SUBJECT_LOOKUP = SUBJECTS as unknown as Record<string, SubjectData>;

export default function TeacherDashboardScreen() {
  const router = useRouter();
  const { teacherSchool, liveSession } = useDashboard();

  const attention = [...CLASSES].sort((a, b) => a.avgMastery - b.avgMastery);

  const quick = [
    { label: "Start a live teaching session", color: "var(--coral)", onClick: () => {} },
    { label: "Create a new assignment", color: "var(--thread)", onClick: () => router.push("/dashboard/assignments") },
    { label: "View class rosters", color: "var(--ember)", onClick: () => router.push("/dashboard/classes") },
    { label: "Prepare a lesson note", color: "var(--violet)", onClick: () => router.push("/dashboard/lesson-prep") },
  ];

  const liveCard = liveSession ? (
    (() => {
      const c = CLASSES.find((x) => x.id === liveSession.classId);
      const s = SUBJECT_LOOKUP[liveSession.subjectId];
      const topic = s ? s.topics[liveSession.topicIndex] : null;
      if (c && s && topic) {
        return (
          <div className="live-teach-card is-live">
            <span className="ltc-dot"></span>
            <div>
              <div className="ltc-title">Live · {c.name}</div>
              <div className="ltc-sub">{s.icon} {topic.t} — tap to resume</div>
            </div>
            <svg className="ltc-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>
        );
      }
    })()
  ) : null;

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

      {liveCard ?? (
        <div className="live-teach-card is-idle">
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
    </section>
  );
}