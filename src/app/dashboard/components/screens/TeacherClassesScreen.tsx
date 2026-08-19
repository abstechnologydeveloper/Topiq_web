"use client";

import { useState } from "react";
import { CLASSES, ROSTERS } from "../../data/teacher";
import { SUBJECTS } from "../../data/subjects";
import type { SubjectData } from "./DiscoverScreen";
import { BackChevron, ChevronMicro } from "./shared";

const SUBJECT_LOOKUP = SUBJECTS as unknown as Record<string, SubjectData>;

type RosterStudent = { name: string; mastery: number; pending?: boolean };

const cloneRosters = () =>
  JSON.parse(JSON.stringify(ROSTERS)) as Record<string, RosterStudent[]>;

export default function TeacherClassesScreen() {
  const [selected, setSelected] = useState<string | null>(null);
  const [rosters, setRosters] = useState<Record<string, RosterStudent[]>>(() => cloneRosters());

  const openClass = (classId: string) => setSelected(classId);
  const backToList = () => setSelected(null);

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
        <button className="add-entry-btn">+ Add student by email</button>
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