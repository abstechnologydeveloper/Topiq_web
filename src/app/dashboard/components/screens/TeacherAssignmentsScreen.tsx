"use client";

import { CLASSES } from "../../data/teacher";
import { SUBJECTS } from "../../data/subjects";
import { useDashboard } from "../DashboardContext";
import type { SubjectData } from "./DiscoverScreen";

const SUBJECT_LOOKUP = SUBJECTS as unknown as Record<string, SubjectData>;

export default function TeacherAssignmentsScreen() {
  const { teacherAssignments, setAssignmentQuickAddOpen } = useDashboard();
  return (
    <section className="screen active" id="screen-teacherassign">
      <span className="eyebrow">Set work, track completion</span>
      <h1 className="page-title">Assignments</h1>
      <p className="page-sub">
        Assign a topic or practice set to a class and watch completion update live.
      </p>
      {teacherAssignments.map((a) => {
        const c = CLASSES.find((x) => x.id === a.classId);
        const s = SUBJECT_LOOKUP[a.subject];
        return (
          <div className="assign-card" key={a.id}>
            <div className="assign-top">
              <div className="assign-title">{a.title}</div>
              <div className="assign-due">{a.due}</div>
            </div>
            <div className="assign-track">
              <div className="assign-fill" style={{ width: `${a.complete}%` }}></div>
            </div>
            <div className="assign-meta">
              {s.icon} {c ? c.name : ""} · {a.complete}% complete
            </div>
          </div>
        );
      })}
      <button className="add-entry-btn" onClick={() => setAssignmentQuickAddOpen(true)}>
        + New assignment
      </button>
    </section>
  );
}