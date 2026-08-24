"use client";

import type { ReactNode } from "react";
import { LIVE_CLASS_LOG } from "../../data";
import { AttendBadge, type ScheduleRowProps } from "./ScheduleRow";
import type { SchedState } from "./liveClasses";
import type { SubjectData } from "../../components/screens/DiscoverScreen";

type RowCtx = {
  liveSession: { classId: string; subjectId: string } | null;
  subjects: Record<string, SubjectData>;
  studentGrade: string;
};

const statusSpan = (live: boolean, label: ReactNode) => (
  <span className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap text-[11.5px] font-bold ${live ? "text-thread" : "text-ash"}`}>
    {label}
  </span>
);

const liveDot = () => (
  <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
    <span className="inline-block h-[7px] w-[7px] shrink-0 animate-[lsblink_1.3s_infinite] rounded-full bg-thread"></span>
    Live
  </span>
);

export function buildTeacherRows(
  schedule: { time: string; classId: string }[],
  classes: { id: string; name: string; subject: string; students: number; board: string }[],
  ctx: RowCtx,
  openSession: () => void,
  startLiveForClass: (id: string) => void,
): ScheduleRowProps[] {
  return schedule
    .map((item): ScheduleRowProps | null => {
      const c = classes.find((x) => x.id === item.classId);
      if (!c) return null;
      const s = ctx.subjects[c.subject];
      if (!s) return null;
      const isLive = ctx.liveSession !== null && ctx.liveSession.classId === c.id;
      return {
        time: item.time,
        icon: s.icon,
        iconBg: `var(--${s.color}-soft)`,
        title: c.name,
        sub: `${c.students} students · ${c.board}`,
        state: isLive ? "live" : "upcoming",
        onClick: isLive ? openSession : () => startLiveForClass(c.id),
        trailing: statusSpan(
          isLive,
          isLive ? (
            <>
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <span className="inline-block h-[7px] w-[7px] shrink-0 animate-[lsblink_1.3s_infinite] rounded-full bg-thread"></span>
                Live — manage →
              </span>
            </>
          ) : (
            "Start →"
          ),
        ),
      };
    })
    .filter((r): r is ScheduleRowProps => r !== null);
}

export function buildTodayRows(
  timetable: { time: string; subj: string }[],
  ctx: RowCtx,
  liveIdx: number,
  openSession: () => void,
): ScheduleRowProps[] {
  return timetable
    .map((p, i): ScheduleRowProps | null => {
      const s = ctx.subjects[p.subj];
      if (!s) return null;
      const isLive = i === liveIdx;
      const status: SchedState = isLive ? "live" : liveIdx >= 0 && i < liveIdx ? "completed" : "upcoming";
      return {
        time: p.time,
        icon: s.icon,
        iconBg: `var(--${s.color}-soft)`,
        title: s.name,
        sub: `${ctx.studentGrade} · with your teacher`,
        state: status,
        onClick: isLive ? openSession : undefined,
        trailing: statusSpan(
          isLive,
          isLive ? (
            <>
              {liveDot()} — join →
            </>
          ) : status === "completed" ? (
            "Completed"
          ) : (
            "Upcoming"
          ),
        ),
      };
    })
    .filter((r): r is ScheduleRowProps => r !== null);
}

export function buildLogRows(hubPane: string, ctx: RowCtx): ScheduleRowProps[] {
  return LIVE_CLASS_LOG.filter((c) => c.status === hubPane)
    .map((c): ScheduleRowProps | null => {
      const s = ctx.subjects[c.subject];
      if (!s) return null;
      const kind = c.status as "attended" | "missed" | "upcoming";
      return {
        icon: s.icon,
        iconBg: `var(--${s.color}-soft)`,
        title: s.name,
        sub: `${c.instructor} · ${c.day}, ${c.time}`,
        trailing:
          kind === "attended" ? (
            <AttendBadge kind="attended" />
          ) : kind === "missed" ? (
            <AttendBadge kind="missed" />
          ) : (
            <AttendBadge kind="upcoming" />
          ),
      };
    })
    .filter((r): r is ScheduleRowProps => r !== null);
}