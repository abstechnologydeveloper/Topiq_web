"use client";

import { useState } from "react";
import { CLASSES, ROSTERS, SCHOOL_PENDING_STUDENTS, SCHOOL_TEACHERS, SCHOOLS } from "../../data";
import { SUBJECTS } from "../../data/subjects";
import { BackChevron, ChevronMicro } from "./shared";
import type { SubjectData } from "./DiscoverScreen";

const SUBJECT_LOOKUP = SUBJECTS as unknown as Record<string, SubjectData>;

type TeacherRec = { name: string; classIds: string[]; email?: string; pending?: boolean };
type TeacherClass = { id: string; name: string; subject: string; board: string; students: number; avgMastery: number };
type RosterStudent = { name: string; mastery: number; pending?: boolean; email?: string; className?: string };
type PendingStudent = { name: string; email?: string; pending?: boolean; className?: string };

const clone = <T,>(x: T): T => JSON.parse(JSON.stringify(x));

function nameFromEmail(email: string) {
  const local = email.split("@")[0].replace(/[._]+/g, " ").trim();
  return (
    local
      .split(" ")
      .filter(Boolean)
      .map((w) => w[0].toUpperCase() + w.slice(1))
      .join(" ") || email
  );
}

function barColor(mastery: number) {
  return mastery >= 60 ? "var(--thread)" : mastery >= 35 ? "var(--ember)" : "var(--coral)";
}

function initials(name: string) {
  return name.split(" ").map((w) => w[0]).join("");
}

export default function SchoolAdminScreen() {
  const [saPane, setSaPane] = useState<"overview" | "teachers" | "students" | "billing">("overview");
  const [teachers, setTeachers] = useState<TeacherRec[]>(() => clone(SCHOOL_TEACHERS));
  const [classes, setClasses] = useState<TeacherClass[]>(() => clone(CLASSES));
  const [rosters, setRosters] = useState<Record<string, RosterStudent[]>>(() => clone(ROSTERS));
  const [pendingStudents, setPendingStudents] = useState<PendingStudent[]>(() => clone(SCHOOL_PENDING_STUDENTS));
  const [rosterTeacher, setRosterTeacher] = useState<string | null>(null);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteMode, setInviteMode] = useState<"teacher" | "schoolStudents">("teacher");
  const [inviteClassPicked, setInviteClassPicked] = useState<string | null>(null);
  const [inviteEmails, setInviteEmails] = useState("");
  const [inviteError, setInviteError] = useState(false);
  const [copyFlash, setCopyFlash] = useState(false);
  const [viewFlash, setViewFlash] = useState(false);

  const school = SCHOOLS["CORONA2026"];

  const teacherStats = (t: TeacherRec) => {
    const tc = t.classIds
      .map((id) => classes.find((c) => c.id === id))
      .filter((c): c is TeacherClass => !!c);
    const students = tc.reduce((n, c) => n + c.students, 0);
    const avgMastery = tc.length ? Math.round(tc.reduce((n, c) => n + c.avgMastery, 0) / tc.length) : 0;
    return { classes: tc, students, avgMastery };
  };

  const allStats = teachers.map(teacherStats);
  const totalStudents = allStats.reduce((n, st) => n + st.students, 0);
  const totalTeachers = teachers.length;
  const avgMastery = allStats.length ? Math.round(allStats.reduce((n, st) => n + st.avgMastery, 0) / allStats.length) : 0;

  const ranked = teachers
    .map((t, i) => ({ t, st: allStats[i] }))
    .sort((a, b) => a.st.avgMastery - b.st.avgMastery)
    .slice(0, 3);

  const enrolled: RosterStudent[] = [];
  classes.forEach((c) => {
    (rosters[c.id] || []).forEach((st) => enrolled.push({ ...st, className: c.name }));
  });

  const showPane = (pane: "overview" | "teachers" | "students" | "billing") => setSaPane(pane);

  const copySchoolCode = () => {
    navigator.clipboard?.writeText("CORONA2026").catch(() => {});
    setCopyFlash(true);
    window.setTimeout(() => setCopyFlash(false), 1800);
  };

  const flashView = () => {
    setViewFlash(true);
    window.setTimeout(() => setViewFlash(false), 1800);
  };

  const openInvite = (mode: "teacher" | "schoolStudents") => {
    setInviteMode(mode);
    setInviteEmails("");
    setInviteError(false);
    setInviteClassPicked(mode === "schoolStudents" ? null : null);
    setInviteOpen(true);
  };

  const confirmInvite = () => {
    const emails = [
      ...new Set(
        inviteEmails
          .split(/[\n,]/)
          .map((e) => e.trim())
          .filter((e) => e.includes("@")),
      ),
    ];
    if (!emails.length) {
      setInviteError(true);
      return;
    }
    setInviteError(false);
    if (inviteMode === "teacher") {
      setTeachers((prev) => [
        ...prev,
        ...emails.map((email) => ({ name: nameFromEmail(email), email, classIds: [], pending: true })),
      ]);
    } else {
      if (inviteClassPicked) {
        setRosters((prev) => {
          const next = { ...prev };
          const roster = (next[inviteClassPicked] || []).slice();
          emails.forEach((email) => roster.push({ name: nameFromEmail(email), email, mastery: 0, pending: true }));
          next[inviteClassPicked] = roster;
          const c = classes.find((x) => x.id === inviteClassPicked);
          if (c) setClasses((cls) => cls.map((cc) => (cc.id === inviteClassPicked ? { ...cc, students: roster.filter((s) => !s.pending).length } : cc)));
          return next;
        });
      } else {
        setPendingStudents((prev) => [...prev, ...emails.map((email) => ({ name: nameFromEmail(email), email, pending: true }))]);
      }
    }
    setInviteOpen(false);
  };

  const openTeacherRoster = (name: string) => {
    setRosterTeacher(name);
  };

  const renderRosterRows = (list: RosterStudent[], showClass: boolean) =>
    list.map((st) => (
      <div className="roster-row" key={st.name + st.email}>
        <div className="roster-avatar">{initials(st.name)}</div>
        <div className="roster-name">
          {st.name}
          {st.pending ? (
            <span style={{ fontWeight: 600, color: "var(--ash)" }}>(pending)</span>
          ) : (
            ""
          )}
        </div>
        {showClass ? (
          <div style={{ fontSize: "11.5px", color: "var(--ash)", textAlign: "right", flexShrink: 0 }}>
            {st.className || "Unassigned"}
          </div>
        ) : null}
      </div>
    ));

  return (
    <section className="screen active" id="screen-schooladmin">
      <span className="eyebrow">School Admin</span>
      <h1 className="page-title">{school.name}</h1>
      <p className="page-sub">Teachers, school-wide performance, and billing — all in one place.</p>

      <div className="subnav">
        <button className={saPane === "overview" ? "active" : ""} onClick={() => showPane("overview")}>Overview</button>
        <button className={saPane === "teachers" ? "active" : ""} onClick={() => showPane("teachers")}>Teachers</button>
        <button className={saPane === "students" ? "active" : ""} onClick={() => showPane("students")}>Students</button>
        <button className={saPane === "billing" ? "active" : ""} onClick={() => showPane("billing")}>Billing</button>
      </div>

      {saPane === "overview" && (
        <div className="ws-pane active">
          <div className="teacher-stat-row">
            <div className="stat"><div className="num">{totalStudents}</div><div className="lbl">students</div></div>
            <div className="stat"><div className="num">{totalTeachers}</div><div className="lbl">teachers</div></div>
            <div className="stat"><div className="num">{avgMastery}%</div><div className="lbl">avg. mastery</div></div>
          </div>
          <span className="eyebrow">Classes needing attention, school-wide</span>
          <div className="plan-strip">
            {ranked.map(({ t, st }) => {
              const cls = st.classes[0];
              if (!cls) return null;
              const s = SUBJECT_LOOKUP[cls.subject];
              return (
                <div
                  className="plan-item"
                  key={t.name}
                  onClick={() => {
                    showPane("teachers");
                    openTeacherRoster(t.name);
                  }}
                >
                  <div className="plan-icon" style={{ background: `var(--${s.color}-soft)` }}>{s.icon}</div>
                  <div className="plan-body">
                    <div className="plan-title">{cls.name}</div>
                    <div className="plan-meta">{t.name} · {st.students} students</div>
                  </div>
                  <div className="plan-why">{st.avgMastery}% avg</div>
                </div>
              );
            })}
          </div>
          <span className="eyebrow" style={{ marginTop: "6px" }}>Quick actions</span>
          <div className="card" style={{ padding: "4px 16px" }}>
            <div className="topic-row" onClick={() => { showPane("teachers"); openInvite("teacher"); }} style={{ cursor: "pointer" }}>
              <div className="topic-dot" style={{ background: "var(--thread)" }}></div>
              <div className="topic-title">Invite a teacher</div>
              <ChevronMicro className="chev" />
            </div>
            <div className="topic-row" onClick={() => showPane("billing")} style={{ cursor: "pointer" }}>
              <div className="topic-dot" style={{ background: "var(--ember)" }}></div>
              <div className="topic-title">Review this term&apos;s invoice</div>
              <ChevronMicro className="chev" />
            </div>
          </div>
        </div>
      )}

      {saPane === "teachers" && (
        <div className="ws-pane active">
          <div className="recommend-card">
            <div><div className="lbl">Your school code</div><div className="ttl">CORONA2026</div></div>
            <button onClick={copySchoolCode}>{copyFlash ? "Copied ✓" : "Copy"}</button>
          </div>
          <p style={{ fontSize: "12px", color: "var(--ash)", margin: "-10px 0 16px", lineHeight: 1.5 }}>
            Share this with your teachers and students — entering it during their signup links their account to your plan, free.
          </p>
          <button className="add-entry-btn" style={{ marginBottom: "12px" }} onClick={() => openInvite("teacher")}>
            + Invite a teacher by email
          </button>

          {rosterTeacher ? (() => {
            const t = teachers.find((x) => x.name === rosterTeacher);
            if (!t) return null;
            const st = teacherStats(t);
            return (
              <>
                <div className="back-row" onClick={() => setRosterTeacher(null)} style={{ cursor: "pointer" }}>
                  <BackChevron /> All teachers
                </div>
                <div className="card" style={{ padding: "6px 16px", marginBottom: "14px" }}>
                  <div className="board-detail-header" style={{ paddingTop: "10px" }}>
                    <div className="bd-icon">👤</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "15px" }}>{t.name}</div>
                      <div style={{ fontSize: "12px", color: "var(--ash)" }}>
                        {st.classes.length} class{st.classes.length === 1 ? "" : "es"} · {st.students} students
                      </div>
                    </div>
                  </div>
                </div>
                {st.classes.map((c) => (
                  <div key={c.id}>
                    <span className="eyebrow">{c.name}</span>
                    <div className="card" style={{ padding: "6px 16px", marginBottom: "14px" }}>
                      {(rosters[c.id] || []).length ? (
                        (rosters[c.id] || []).map((stu) => (
                          <div className="roster-row" key={stu.name}>
                            <div className="roster-avatar">{initials(stu.name)}</div>
                            <div className="roster-name">{stu.name}</div>
                            <div className="topic-bar-track">
                              <div className="topic-bar-fill" style={{ width: `${stu.mastery}%`, background: barColor(stu.mastery) }}></div>
                            </div>
                            <div className="topic-pct">{stu.mastery}%</div>
                          </div>
                        ))
                      ) : (
                        <p style={{ fontSize: "13px", color: "var(--ash)", padding: "14px 4px" }}>No students in this class yet.</p>
                      )}
                    </div>
                  </div>
                ))}
              </>
            );
          })() : (
            teachers.map((t) => {
              const st = teacherStats(t);
              const s = st.classes[0] ? SUBJECT_LOOKUP[st.classes[0].subject] : null;
              return (
                <div className="class-card" key={t.name} onClick={() => openTeacherRoster(t.name)} style={{ cursor: "pointer" }}>
                  <div className="class-icon" style={{ background: s ? `var(--${s.color}-soft)` : "var(--paper-dim)" }}>
                    {s ? s.icon : "⏳"}
                  </div>
                  <div className="class-info">
                    <div className="name">
                      {t.name}
                      {t.pending ? (
                        <span style={{ fontWeight: 600, color: "var(--ash)" }}>(pending)</span>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="meta">
                      {st.classes.length
                        ? st.classes.map((c) => c.name).join(", ") + " · " + st.students + " students · " + st.avgMastery + "% avg mastery"
                        : "Invited · not yet assigned a class"}
                    </div>
                  </div>
                  <ChevronMicro className="chev" />
                </div>
              );
            })
          )}
        </div>
      )}

      {saPane === "students" && (
        <div className="ws-pane active">
          <div className="recommend-card">
            <div><div className="lbl">Your school code</div><div className="ttl">CORONA2026</div></div>
            <button onClick={copySchoolCode}>{copyFlash ? "Copied ✓" : "Copy"}</button>
          </div>
          <p style={{ fontSize: "12px", color: "var(--ash)", margin: "-10px 0 16px", lineHeight: 1.5 }}>
            Invite students one at a time or paste a whole class list — each gets an email invite to join, free under your school&apos;s plan.
          </p>
          <button className="add-entry-btn" style={{ marginBottom: "12px" }} onClick={() => openInvite("schoolStudents")}>
            + Invite students by email
          </button>
          <span className="eyebrow">Enrolled ({enrolled.length})</span>
          <div className="card" style={{ padding: "4px 16px", marginBottom: "16px" }}>
            {enrolled.length ? renderRosterRows(enrolled, true) : <p style={{ fontSize: "13px", color: "var(--ash)", padding: "14px 4px" }}>No students yet.</p>}
          </div>
          <span className="eyebrow">Pending invites ({pendingStudents.length})</span>
          <div className="card" style={{ padding: "4px 16px" }}>
            {pendingStudents.length ? renderRosterRows(pendingStudents as RosterStudent[], false) : <p style={{ fontSize: "13px", color: "var(--ash)", padding: "14px 4px" }}>No pending invites.</p>}
          </div>
        </div>
      )}

      {saPane === "billing" && (
        <div className="ws-pane active">
          <div className="plan-status-card" style={{ cursor: "default" }}>
            <span className="psc-icon">🏫</span>
            <div><div className="psc-title">100+ seats plan</div><div className="psc-sub">₦500 per student, billed per term</div></div>
          </div>
          <span className="eyebrow">Seats used this term</span>
          <div className="card" style={{ padding: "16px" }}>
            <div className="mastery-row" style={{ border: "none", padding: "0 0 10px" }}>
              <div className="mastery-name" style={{ width: "auto" }}>340 / 350 seats</div>
              <div className="mastery-track"><div className="mastery-fill" style={{ width: "97%", background: "var(--thread)" }}></div></div>
            </div>
            <p style={{ fontSize: "12px", color: "var(--ash)" }}>10 seats remaining before you&apos;ll need to upgrade your seat count.</p>
          </div>
          <span className="eyebrow" style={{ marginTop: "14px" }}>Next invoice</span>
          <div className="recommend-card">
            <div><div className="lbl">Due in 18 days</div><div className="ttl">₦170,000</div></div>
            <button onClick={flashView}>{viewFlash ? "Opens invoice detail ↗" : "View"}</button>
          </div>
        </div>
      )}

      {inviteOpen && (
        <div className="modal-overlay show">
          <div className="modal-sheet">
            <button className="modal-close" onClick={() => setInviteOpen(false)} aria-label="Close">✕</button>
            <h2>{inviteMode === "teacher" ? "Invite a teacher" : "Invite students"}</h2>
            <p style={{ fontSize: "12px", color: "var(--ash)", margin: "-6px 0 16px", lineHeight: 1.5 }}>
              {inviteMode === "teacher"
                ? "One email per line, or separate with commas — each gets an email invite to join your school, free."
                : "Paste a whole class list — one email per line, or separate with commas."}
            </p>
            {inviteMode === "schoolStudents" && (
              <div className="mock-picker-row">
                <span className="mock-picker-label">Class (optional)</span>
                <div className="ask-context-row">
                  <button
                    className={`context-chip${!inviteClassPicked ? " active" : ""}`}
                    onClick={() => setInviteClassPicked(null)}
                  >
                    Unassigned
                  </button>
                  {classes.map((c) => (
                    <button
                      key={c.id}
                      className={`context-chip${inviteClassPicked === c.id ? " active" : ""}`}
                      onClick={() => setInviteClassPicked(c.id)}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="mock-picker-row">
              <span className="mock-picker-label">
                {inviteMode === "teacher" ? "Teacher email address(es)" : "Student email address(es)"}
              </span>
              <textarea
                className="qa-text-input"
                style={{ minHeight: "90px", resize: "vertical", ...(inviteError ? { borderColor: "var(--coral)" } : {}) }}
                placeholder="e.g. jane.doe@school.com, femi.k@school.com"
                value={inviteEmails}
                onChange={(e) => {
                  setInviteEmails(e.target.value);
                  if (e.target.value.trim()) setInviteError(false);
                }}
              />
            </div>
            <button className="modal-done-btn" onClick={confirmInvite}>Send invite →</button>
          </div>
        </div>
      )}
    </section>
  );
}