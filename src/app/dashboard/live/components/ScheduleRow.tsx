"use client";

import type { ReactNode } from "react";
import { SCHED_ROW, SCHED_ROW_COMPLETED, SCHED_ROW_LIVE, SCHED_ROW_UPCOMING, LSR_ICON, LSR_MAIN, LSR_SUB, LSR_TIME, LSR_TITLE, type SchedState } from "./liveClasses";

export type ScheduleRowProps = {
  time?: string;
  icon: string;
  iconBg: string;
  title: string;
  sub: string;
  state?: SchedState;
  onClick?: () => void;
  trailing: ReactNode;
};

export function ScheduleRow({ time, icon, iconBg, title, sub, state, onClick, trailing }: ScheduleRowProps) {
  const rowCls =
    `${SCHED_ROW} ` +
    (state === "live"
      ? SCHED_ROW_LIVE
      : state === "completed"
        ? SCHED_ROW_COMPLETED
        : state === "upcoming"
          ? SCHED_ROW_UPCOMING
          : "cursor-default");
  return (
    <div className={rowCls} onClick={onClick}>
      {time ? <div className={LSR_TIME}>{time}</div> : null}
      <div className={LSR_ICON} style={{ background: iconBg }}>{icon}</div>
      <div className={LSR_MAIN}>
        <div className={LSR_TITLE}>{title}</div>
        <div className={LSR_SUB}>{sub}</div>
      </div>
      {trailing}
    </div>
  );
}

export function LiveStatus({ live }: { live: boolean }) {
  return (
    <span className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap text-[11.5px] font-bold ${live ? "text-thread" : "text-ash"}`}>
      {live ? (
        <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span className="inline-block h-[7px] w-[7px] shrink-0 animate-[lsblink_1.3s_infinite] rounded-full bg-thread"></span>
          Live — join →
        </span>
      ) : null}
    </span>
  );
}

export function AttendBadge({ kind }: { kind: "attended" | "missed" | "upcoming" }) {
  const tone =
    kind === "attended"
      ? "bg-thread-soft text-thread"
      : kind === "missed"
        ? "bg-coral-soft text-coral"
        : "bg-ember-soft text-ember";
  const label = kind === "attended" ? "✓ Attended" : kind === "missed" ? "✕ Missed" : "Upcoming";
  return <span className={`shrink-0 rounded-card px-2.5 py-[5px] text-fine font-bold ${tone}`}>{label}</span>;
}