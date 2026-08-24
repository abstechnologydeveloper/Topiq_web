"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CLASSES } from "../../data/teacher";
import { SUBJECTS } from "../../data/subjects";
import { useDashboard } from "../DashboardContext";
import type { SubjectData } from "./DiscoverScreen";

const SUBJECT_LOOKUP = SUBJECTS as unknown as Record<string, SubjectData>;
const DUE_OPTIONS = ["Today", "Tomorrow", "This week"];

export default function AssignmentQuickAddModal() {
  const router = useRouter();
  const {
    assignmentQuickAddOpen,
    setAssignmentQuickAddOpen,
    addTeacherAssignment,
  } = useDashboard();
  const [name, setName] = useState("");
  const [subject, setSubject] = useState<string | null>(null);
  const [cls, setCls] = useState<string | null>(null);
  const [due, setDue] = useState("This week");
  const [nameError, setNameError] = useState(false);

  if (!assignmentQuickAddOpen) return null;

  const close = () => {
    setName("");
    setSubject(null);
    setCls(null);
    setDue("This week");
    setNameError(false);
    setAssignmentQuickAddOpen(false);
  };

  const confirm = () => {
    const title = name.trim();
    setNameError(!title);
    if (!title || !subject || !cls) return;
    const ok = addTeacherAssignment({
      id: Date.now(),
      title,
      classId: cls,
      subject,
      due: "This week",
      complete: 0,
    });
    close();
    if (!ok) router.push("/dashboard/upgrade");
  };

  const chip = (active: boolean, label: string, onClick: () => void) => (
    <button className={`context-chip${active ? " active" : ""}`} onClick={onClick}>
      {label}
    </button>
  );

  return (
    <div className="modal-overlay show" id="quickAddModal">
      <div className="modal-sheet">
        <button className="modal-close" onClick={close} aria-label="Close">✕</button>
        <h2 id="qaTitle">New assignment</h2>
        <div className="mock-picker-row">
          <span className="mock-picker-label">Assignment title</span>
          <input
            type="text"
            className="qa-text-input"
            placeholder="e.g. Respiration practice set"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (e.target.value.trim()) setNameError(false);
            }}
            style={nameError ? { borderColor: "var(--coral)" } : undefined}
          />
        </div>
        <div className="mock-picker-row">
          <span className="mock-picker-label">Subject</span>
          <div className="ask-context-row">
            {Object.keys(SUBJECT_LOOKUP).map((id) => {
              const s = SUBJECT_LOOKUP[id];
              return (
                <button
                  key={id}
                  className={`context-chip${subject === id ? " active" : ""}`}
                  onClick={() => setSubject(id)}
                >
                  {s.icon} {s.name}
                </button>
              );
            })}
          </div>
        </div>
        <div className="mock-picker-row">
          <span className="mock-picker-label">Class</span>
          <div className="ask-context-row">
            {CLASSES.map((c) => chip(cls === c.id, c.name, () => setCls(c.id)))}
          </div>
        </div>
        <div className="mock-picker-row">
          <span className="mock-picker-label">Due</span>
          <div className="ask-context-row">
            {DUE_OPTIONS.map((d) => chip(due === d, d, () => setDue(d)))}
          </div>
        </div>
        <button className="modal-done-btn" onClick={confirm}>Add →</button>
      </div>
    </div>
  );
}