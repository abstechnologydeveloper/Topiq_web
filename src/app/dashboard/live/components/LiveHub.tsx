"use client";

import { ScheduleRow, type ScheduleRowProps } from "./ScheduleRow";

export default function LiveHub({
  title,
  sub,
  isTeacher,
  hubPane,
  panes,
  onPane,
  todayRows,
  logRows,
  emptyText,
  onAddClass,
}: {
  title: string;
  sub: string;
  isTeacher: boolean;
  hubPane: string;
  panes: readonly string[];
  onPane: (name: string) => void;
  todayRows: ScheduleRowProps[];
  logRows: ScheduleRowProps[];
  emptyText?: string;
  onAddClass: () => void;
}) {
  return (
    <div>
      <span className="mb-1.5 block font-mono text-fine font-semibold uppercase tracking-[0.06em] text-thread">Live Class</span>
      <h1 className="font-display mb-1 text-[25px] font-semibold tracking-[-0.01em]">{title}</h1>
      <p className="text-sub text-ash mb-[18px]">{sub}</p>
      {isTeacher ? (
        <>
          <div>{todayRows.map((r, i) => <ScheduleRow key={i} {...r} />)}</div>
          <button
            className="mt-2.5 w-full cursor-pointer rounded-btn border-[1.5px] border-dashed border-ash-line bg-transparent p-3 text-body font-bold text-ash hover:border-thread hover:text-thread"
            onClick={onAddClass}
          >
            + Add a class to today
          </button>
        </>
      ) : (
        <>
          <div className="mb-[18px] flex gap-1 overflow-x-auto border-b border-ash-line pb-0.5">
            {panes.map((name) => (
              <button
                key={name}
                className={`shrink-0 cursor-pointer whitespace-nowrap border-none bg-transparent px-3.5 py-2.5 text-body font-bold ${hubPane === name ? "text-ink [border-bottom:2px_solid_var(--thread)]" : "text-ash [border-bottom:2px_solid_transparent]"}`}
                data-lshubpane={name}
                onClick={() => onPane(name)}
              >
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </button>
            ))}
          </div>
          <div>
            {hubPane === "today"
              ? todayRows.map((r, i) => <ScheduleRow key={i} {...r} />)
              : logRows.length
                ? logRows.map((r, i) => <ScheduleRow key={i} {...r} />)
                : <p className="px-1 py-4 text-body text-ash">{emptyText}</p>}
          </div>
        </>
      )}
    </div>
  );
}