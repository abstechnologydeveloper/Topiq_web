"use client";

import { CLASSES } from "../../data/teacher";
import { SUBJECTS } from "../../data/subjects";
import { useDashboard } from "../../components/DashboardContext";
import type { SubjectData } from "../../components/screens/DiscoverScreen";

const SUBJECT_LOOKUP = SUBJECTS as unknown as Record<string, SubjectData>;

export default function StartLiveModal() {
  const {
    liveTeachOpen,
    liveTeachClassId,
    liveTeachTopicIdx,
    closeLiveTeach,
    selectLiveClass,
    selectLiveTopic,
    startLiveSession,
  } = useDashboard();

  if (!liveTeachOpen) return null;

  const liveClass = liveTeachClassId ? CLASSES.find((c) => c.id === liveTeachClassId) : undefined;
  const liveSubject = liveClass ? SUBJECT_LOOKUP[liveClass.subject] : undefined;
  const confirmReady = liveTeachClassId !== null && liveTeachTopicIdx !== null;
  const confirmLabel = confirmReady
    ? "Go live →"
    : liveTeachClassId
      ? "Pick a topic"
      : "Pick a class and topic first";

  const confirmStart = () => {
    if (!liveClass || !liveSubject || liveTeachTopicIdx === null) return;
    startLiveSession({
      classId: liveClass.id,
      subjectId: liveClass.subject,
      topicIndex: liveTeachTopicIdx,
    });
  };

  return (
    <div className="modal-overlay show" id="liveTeachModal">
      <div className="modal-sheet">
        <button className="modal-close" onClick={closeLiveTeach} aria-label="Close">✕</button>
        <h2 id="liveTeachModalTitle">Start a live session</h2>
        <p style={{ fontSize: "13px", color: "var(--ash)", marginBottom: "16px" }}>
          Pick a class and a topic — every student in that class sees it appear live on their Home,
          and can join you in Learn → Practice → Interactive.
        </p>
        <div className="mock-picker-row">
          <span className="mock-picker-label">Class</span>
          <div className="class-pick-row" id="liveClassPicker">
            {CLASSES.map((c) => {
              const s = SUBJECT_LOOKUP[c.subject];
              return (
                <div
                  key={c.id}
                  className={`pick-item${liveTeachClassId === c.id ? " selected" : ""}`}
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
                  className={`pick-item${liveTeachTopicIdx === i ? " selected" : ""}`}
                  onClick={() => selectLiveTopic(i)}
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
          onClick={confirmStart}
          disabled={!confirmReady}
        >
          {confirmLabel}
        </button>
      </div>
    </div>
  );
}