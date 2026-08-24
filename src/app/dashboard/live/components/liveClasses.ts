export const EYEBROW =
  "mb-1.5 block font-mono text-[11px] font-semibold uppercase tracking-[0.06em] text-thread";
export const PAGE_TITLE = "font-display mb-1 text-[25px] font-semibold tracking-[-0.01em]";
export const PAGE_SUB = "text-sub text-ash mb-[18px]";
export const SUBNAV_BTN =
  "shrink-0 cursor-pointer whitespace-nowrap border-none bg-transparent px-3.5 py-2.5 text-[13px] font-bold";
export const SUBNAV =
  "mb-[18px] flex gap-1 overflow-x-auto border-b border-ash-line pb-0.5";

export const SCHED_ROW =
  "flex items-center gap-3 rounded-btn border border-ash-line bg-surface p-3.5 mb-2.5";
export const SCHED_ROW_LIVE = "border-thread bg-thread-soft cursor-pointer";
export const SCHED_ROW_UPCOMING = "cursor-pointer";
export const SCHED_ROW_COMPLETED = "opacity-50 cursor-default";
export const LSR_TIME = "w-[46px] shrink-0 font-mono text-[12.5px] font-bold text-ash";
export const LSR_ICON =
  "flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[10px] text-[17px]";
export const LSR_MAIN = "min-w-0 flex-1";
export const LSR_TITLE = "text-sub font-bold";
export const LSR_SUB = "mt-px text-[11.5px] text-ash";
export const LSR_STATUS =
  "flex shrink-0 items-center gap-1.5 whitespace-nowrap text-[11.5px] font-bold";
export const DOTPULSE =
  "inline-block h-[7px] w-[7px] shrink-0 animate-[lsblink_1.3s_infinite] rounded-full bg-thread";

export type SchedState = "live" | "upcoming" | "completed";