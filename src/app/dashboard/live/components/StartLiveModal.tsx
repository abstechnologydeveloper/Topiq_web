"use client";

import { CLASSES } from "../../data/teacher";
import { SUBJECTS } from "../../data/subjects";
import { useDashboard } from "../../components/DashboardContext";
import type { SubjectData } from "../../components/screens/DiscoverScreen";

const SUBJECT_LOOKUP = SUBJECTS as unknown as Record<string, SubjectData>;

const PICK_ROW = "mb-4 flex max-h-[220px] flex-col gap-2 overflow-y-auto";
const PICK_ITEM =
  "flex cursor-pointer items-center gap-2.5 rounded-tile border-1_5 px-3 py-2.5 text-body font-semibold";
const PICKER_LABEL =
  "mb-2 block font-mono text-[10.5px] font-bold uppercase tracking-[0.05em] text-ash";

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
    <div className="fixed inset-0 z-100 flex animate-[fade_.2s_ease] items-end justify-center bg-[rgba(20,23,43,0.55)] nav:items-center">
      <div className="mx-auto max-h-[82vh] w-full max-w-130 overflow-y-auto rounded-t-[20px] bg-paper px-5 pt-5.5 pb-7 nav:rounded-[20px]">
        <button className="float-right h-7.5 w-7.5 cursor-pointer rounded-full border-none bg-paper-dim text-sm" onClick={closeLiveTeach} aria-label="Close">✕</button>
        <h2 className="clear-both mb-2.5 font-display text-[20px] font-semibold">Start a live session</h2>
        <p className="mb-4 text-body text-ash">
          Pick a class and a topic — every student in that class sees it appear live on their Home,
          and can join you in Learn → Practice → Interactive.
        </p>
        <div>
          <span className={PICKER_LABEL}>Class</span>
          <div className={PICK_ROW}>
            {CLASSES.map((c) => {
              const s = SUBJECT_LOOKUP[c.subject];
              return (
                <div
                  key={c.id}
                  className={`${PICK_ITEM} ${liveTeachClassId === c.id ? "border-thread bg-thread-soft" : "border-ash-line hover:border-thread"}`}
                  onClick={() => selectLiveClass(c.id)}
                >
                  <span>{s.icon}</span>
                  <span>{c.name}</span>
                  <span className="ml-auto text-[11.5px] font-medium text-ash">{c.students} students</span>
                </div>
              );
            })}
          </div>
        </div>
        {liveClass && liveSubject && (
          <div>
            <span className={PICKER_LABEL}>Topic</span>
            <div className={PICK_ROW}>
              {liveSubject.topics.map((t, i) => (
                <div
                  key={i}
                  className={`${PICK_ITEM} ${liveTeachTopicIdx === i ? "border-thread bg-thread-soft" : "border-ash-line hover:border-thread"}`}
                  onClick={() => selectLiveTopic(i)}
                >
                  <span className="h-[9px] w-[9px] shrink-0 rounded-full" style={{ background: `var(--${t.status})` }}></span>
                  <span>{t.t}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        <button
          className="mt-2 cursor-pointer rounded-[22px] border-none bg-thread px-5 py-[11px] text-body font-bold text-white disabled:bg-ash-line disabled:text-ash disabled:opacity-45 disabled:cursor-not-allowed"
          onClick={confirmStart}
          disabled={!confirmReady}
        >
          {confirmLabel}
        </button>
      </div>
    </div>
  );
}