"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CLASSES, ROSTERS } from "../../data/teacher";
import { SUBJECTS } from "../../data/subjects";
import type { SubjectData } from "./DiscoverScreen";
import { BackChevron, ChevronMicro } from "./shared";

const SUBJECT_LOOKUP = SUBJECTS as unknown as Record<string, SubjectData>;

type RosterStudent = { name: string; mastery: number; pending?: boolean; email?: string };

const cloneRosters = () =>
  JSON.parse(JSON.stringify(ROSTERS)) as Record<string, RosterStudent[]>;

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

export default function TeacherClassesScreen({ initialClassId }: { initialClassId?: string | null }) {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(initialClassId ?? null);
  const [rosters, setRosters] = useState<Record<string, RosterStudent[]>>(() => cloneRosters());
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteEmails, setInviteEmails] = useState("");
  const [inviteError, setInviteError] = useState(false);

  useEffect(() => {
    setSelected(initialClassId ?? null);
  }, [initialClassId]);

  const openClass = (classId: string) => setSelected(classId);
  const backToList = () => {
    setSelected(null);
    if (router.replace) router.replace("/dashboard/classes");
  };

  const openInvite = () => {
    setInviteEmails("");
    setInviteError(false);
    setInviteOpen(true);
  };

  const closeInvite = () => setInviteOpen(false);

  const confirmInvite = () => {
    const emails = [
      ...new Set(
        inviteEmails
          .split(/[\n,]/)
          .map((e) => e.trim())
          .filter((e) => e.includes("@")),
      ),
    ];
    if (!emails.length || !selected) {
      setInviteError(true);
      return;
    }
    setInviteError(false);
    setRosters((prev) => {
      const next = { ...prev };
      const roster = (next[selected] || []).slice();
      emails.forEach((email) =>
        roster.push({ name: nameFromEmail(email), email, mastery: 0, pending: true }),
      );
      next[selected] = roster;
      return next;
    });
    setInviteOpen(false);
  };

  const removeStudent = (classId: string, index: number) => {
    setRosters((prev) => {
      const next = { ...prev };
      const roster = (next[classId] || []).slice();
      roster.splice(index, 1);
      next[classId] = roster;
      return next;
    });
  };

  if (selected) {
    const c = CLASSES.find((x) => x.id === selected);
    const roster = rosters[selected] || [];
    return (
      <section className="screen active" id="screen-teacherclasses">
        <div className="back-row" onClick={backToList}>
          <BackChevron /> All classes
        </div>
        <div className="card" style={{ padding: "6px 16px", marginBottom: "14px" }}>
          {roster.length ? (
            roster.map((st, i) => (
              <div className="roster-row" key={i}>
                <div className="roster-avatar">
                  {st.name.split(" ").map((w) => w[0]).join("")}
                </div>
                <div className="roster-name">
                  {st.name}
                  {st.pending ? (
                    <span style={{ fontWeight: 600, color: "var(--ash)" }}>(pending)</span>
                  ) : (
                    ""
                  )}
                </div>
                {st.pending ? null : (
                  <>
                    <div className="topic-bar-track">
                      <div
                        className="topic-bar-fill"
                        style={{
                          width: `${st.mastery}%`,
                          background:
                            st.mastery >= 60
                              ? "var(--thread)"
                              : st.mastery >= 35
                                ? "var(--ember)"
                                : "var(--coral)",
                        }}
                      ></div>
                    </div>
                    <div className="topic-pct">{st.mastery}%</div>
                  </>
                )}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--ash)"
                  strokeWidth="2"
                  style={{ cursor: "pointer", marginLeft: "8px", flexShrink: 0 }}
                  onClick={() => removeStudent(selected, i)}
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </div>
            ))
          ) : (
            <p style={{ fontSize: "13px", color: "var(--ash)", padding: "14px 4px" }}>
              No students in this class yet.
            </p>
          )}
        </div>
        <button className="add-entry-btn" onClick={openInvite}>+ Add student by email</button>
        {inviteOpen && (
          <div className="modal-overlay show" id="inviteModal">
            <div className="modal-sheet">
              <button className="modal-close" onClick={closeInvite} aria-label="Close">✕</button>
              <h2 id="invTitle">Add students to {c ? c.name : "class"}</h2>
              <p style={{ fontSize: "12px", color: "var(--ash)", margin: "-6px 0 16px", lineHeight: 1.5 }} id="invSub">
                One email per line, or separate with commas.
              </p>
              <div className="mock-picker-row">
                <span className="mock-picker-label" id="invLabel">Student email address(es)</span>
                <textarea
                  id="invEmails"
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
              {inviteError && (
                <p style={{ fontSize: "12px", color: "var(--coral)", margin: "-6px 0 10px" }}>
                  Enter at least one valid email address.
                </p>
              )}
              <button className="modal-done-btn" onClick={confirmInvite}>Send invite →</button>
            </div>
          </div>
        )}
      </section>
    );
  }

  return (
    <section className="screen active" id="screen-teacherclasses">
      <span className="eyebrow">Your classes</span>
      <h1 className="page-title">Classes</h1>
      <p className="page-sub">Tap a class to see individual student mastery.</p>
      {CLASSES.map((c) => {
          const s = SUBJECT_LOOKUP[c.subject];
          return (
            <div className="class-card" key={c.id} onClick={() => openClass(c.id)} style={{ cursor: "pointer" }}>
              <div className="class-icon" style={{ background: `var(--${s.color}-soft)` }}>
                {s.icon}
              </div>
              <div className="class-info">
                <div className="name">{c.name}</div>
                <div className="meta">
                  {c.board} · {c.students} students · {c.avgMastery}% avg mastery
                </div>
              </div>
              <ChevronMicro className="chev" />
            </div>
          );
        })}
      <button className="add-entry-btn">+ New class</button>
    </section>
  );
}