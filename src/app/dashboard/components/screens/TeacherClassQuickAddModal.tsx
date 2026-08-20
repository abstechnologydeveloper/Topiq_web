"use client";

import { useState } from "react";
import { NIGERIA_BOARDS } from "../../data";
import { SUBJECTS } from "../../data/subjects";
import { useDashboard } from "../DashboardContext";
import type { SubjectData } from "./DiscoverScreen";

const SUBJECT_LOOKUP = SUBJECTS as unknown as Record<string, SubjectData>;

export default function TeacherClassQuickAddModal() {
  const {
    teacherClassQuickAddOpen,
    setTeacherClassQuickAddOpen,
    addTeacherClass,
  } = useDashboard();
  const [name, setName] = useState("");
  const [subject, setSubject] = useState<string | null>(null);
  const [board, setBoard] = useState("WAEC");
  const [nameError, setNameError] = useState(false);

  if (!teacherClassQuickAddOpen) return null;

  const close = () => {
    setName("");
    setSubject(null);
    setBoard("WAEC");
    setNameError(false);
    setTeacherClassQuickAddOpen(false);
  };

  const confirm = () => {
    const title = name.trim();
    setNameError(!title);
    if (!title || !subject) return;
    addTeacherClass({
      id: "cls" + Date.now(),
      name: title,
      subject,
      board,
      students: 0,
      avgMastery: 0,
    });
    close();
  };

  return (
    <div className="modal-overlay show" id="createClassModal">
      <div className="modal-sheet">
        <button className="modal-close" onClick={close} aria-label="Close">✕</button>
        <h2 id="qaTitle">Create a new class</h2>
        <div className="mock-picker-row">
          <span className="mock-picker-label">Class name</span>
          <input
            type="text"
            className="qa-text-input"
            placeholder="e.g. SS1 Biology"
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
          <span className="mock-picker-label">Exam board</span>
          <div className="ask-context-row">
            {NIGERIA_BOARDS.map((b) => (
              <button
                key={b}
                className={`context-chip${board === b ? " active" : ""}`}
                onClick={() => setBoard(b)}
              >
                {b}
              </button>
            ))}
          </div>
        </div>
        <button className="modal-done-btn" onClick={confirm}>Add →</button>
      </div>
    </div>
  );
}