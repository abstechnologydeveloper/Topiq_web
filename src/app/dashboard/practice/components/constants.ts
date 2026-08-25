export const EYEBROW =
  "mb-1.5 block font-mono text-fine font-semibold uppercase tracking-[0.06em] text-thread";
export const PAGE_TITLE =
  "font-display mb-1 text-[25px] font-semibold tracking-[-0.01em]";
export const PAGE_SUB = "text-sub text-ash mb-[18px]";

// screen wrapper
export const SCREEN = "block animate-[fade_.25s_ease] p-0";

// mock promo card
export const MOCK_CARD =
  "relative mb-[22px] overflow-hidden rounded-[var(--radius)] bg-[linear-gradient(135deg,var(--ink),var(--ink-soft))] p-[18px] text-paper";
export const MC_EYEBROW = "font-mono text-[10px] font-bold uppercase tracking-[0.05em] opacity-70 mb-1";

// subnav / nav pills
export const SUBNAV =
  "mb-5 flex gap-1 overflow-x-auto border-b border-ash-line pb-0.5";
export const SUBNAV_BTN =
  "shrink-0 cursor-pointer whitespace-nowrap border-none bg-transparent px-3.5 py-2.5 text-body font-bold";
export const SUBNAV_BTN_ACTIVE = "text-ink [border-bottom:2px_solid_var(--thread)]";
export const SUBNAV_BTN_INACTIVE = "text-ash [border-bottom:2px_solid_transparent]";

// subject grid
export const SUBJECT_GRID = "grid grid-cols-1 gap-3 nav:grid-cols-2";

// subject card
export const SUBJECT_CARD =
  "flex cursor-pointer items-center gap-3.5 rounded-[var(--radius)] border border-ash-line bg-surface p-3.5 transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(20,23,43,.08)]";
export const SUBJECT_INFO = "min-w-0 flex-1";
export const SUBJECT_NAME = "mb-0.5 text-[15.5px] font-bold";
export const SUBJECT_META = "text-[12.5px] text-ash";

// plan-icon (reused in result-row etc.)
export const PLAN_ICON =
  "flex items-center justify-center rounded-lg bg-paper-dim text-lg";

// back-row
export const BACK_ROW =
  "mb-3.5 flex cursor-pointer items-center gap-2 text-body font-semibold text-ash";

// card (generic)
export const CARD =
  "rounded-[var(--radius)] border border-ash-line bg-surface p-4";

// board-detail
export const BOARD_DETAIL_HEADER = "flex items-center gap-3";

// modal overlay / sheet / close / done
export const MODAL_OVERLAY =
  "fixed inset-0 z-[100] flex animate-[fade_.2s_ease] items-end justify-center bg-[rgba(20,23,43,0.55)] nav:items-center";
export const MODAL_SHEET =
  "m-auto max-h-[82vh] w-full max-w-[520px] overflow-y-auto rounded-t-[20px] bg-paper px-5 pt-[22px] pb-7 nav:rounded-[20px]";
export const MODAL_CLOSE =
  "float-right h-[30px] w-[30px] cursor-pointer rounded-full border-none bg-paper-dim text-sm";
export const MODAL_DONE =
  "mt-2 cursor-pointer rounded-[22px] border-none bg-thread px-5 py-[11px] text-body font-bold text-white disabled:bg-ash-line disabled:text-ash disabled:opacity-45 disabled:cursor-not-allowed";

// picker
export const MOCK_PICKER_ROW = "mb-4";
export const MOCK_PICKER_LABEL =
  "mb-2 block font-mono text-[10.5px] font-bold uppercase tracking-[0.05em] text-ash";
export const ASK_CONTEXT_ROW =
  "mb-4 flex gap-2 overflow-x-auto pb-0.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden";
export const CONTEXT_CHIP =
  "shrink-0 cursor-pointer whitespace-nowrap rounded-card border-1_5 bg-surface px-[13px] py-[7px] text-meta font-bold";
export const CONTEXT_CHIP_ACTIVE = "border-thread bg-thread-soft text-thread";

// mock subject pinned
export const MOCK_SUBJECT_PINNED =
  "mb-2.5 flex items-center justify-between gap-2 rounded-[14px] border-1_5 border-violet bg-violet-soft px-3.5 py-2.5 text-body font-bold text-violet";

// passage lock note
export const PASSAGE_LOCK_NOTE =
  "mb-1 block font-mono text-[10px] font-bold uppercase tracking-[0.05em] text-ash";

// year select
export const YEAR_SELECT =
  "w-full cursor-pointer appearance-none rounded-xl border-1_5 border-ash-line bg-surface px-3 py-[11px] text-sub font-bold text-ink";

// board switch
export const BOARD_SWITCH =
  "mb-4 flex gap-2 overflow-x-auto pb-1";
export const BOARD_BTN =
  "shrink-0 cursor-pointer whitespace-nowrap rounded-[20px] border-1_5 border-ash-line bg-surface px-3.5 py-2 text-meta font-bold text-ash";
export const BOARD_BTN_ACTIVE = "border-thread bg-thread-soft text-thread";

// mock total box
export const MOCK_TOTAL_BOX =
  "mt-2.5 cursor-pointer rounded-xl border-1_5 border-ash-line bg-paper-dim px-3 py-2.5";

// stepper
export const STEPPER_ROW = "flex items-center justify-between";
export const STEPPER_BTN =
  "flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full border-none bg-surface text-ink";

// result row (shared)
export const RESULT_ROW =
  "flex cursor-pointer items-center gap-3 rounded-btn border border-ash-line bg-surface p-3.5 mb-2.5 transition";
export const RESULT_ICON =
  "flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[9px] text-[15px]";
export const RESULT_MAIN = "min-w-0 flex-1";
export const RESULT_TITLE = "text-input font-bold";
export const RESULT_META = "text-label text-ash";

// ------------------- practice session ----------------
export const PS_TOPBAR =
  "mb-[18px] flex items-center gap-3";
export const PS_BACK =
  "flex cursor-pointer items-center gap-2 text-body font-semibold text-ash";
export const PS_BADGE =
  "flex items-center gap-2 rounded-lg bg-paper-dim px-3 py-1.5";
export const PS_TIMER =
  "font-bold text-meta";
export const PS_SUBMIT =
  "shrink-0 cursor-pointer rounded-[20px] border-none bg-ink px-4 py-2 text-label font-bold text-paper";

export const PS_MODE_BANNER =
  "mb-[18px] flex items-center gap-2 rounded-xl bg-ink px-3.5 py-[9px] text-label font-semibold text-paper";
export const PS_BANNER_DOT =
  "inline-block h-[7px] w-[7px] shrink-0 animate-[lsblink_1.3s_infinite] rounded-full bg-thread";

export const Q_PALETTE_TOGGLE =
  "mb-2.5 flex items-center justify-between";
export const Q_PALETTE_TRACK =
  "mx-3 h-1.5 flex-1 overflow-hidden rounded bg-ash-line";
export const Q_PALETTE_FILL =
  "h-full rounded bg-thread transition-[width] duration-300";
export const Q_PALETTE_BODY =
  "w-full flex cursor-pointer items-center justify-between gap-2 rounded-xl border-1_5 border-ash-line bg-paper-dim px-3.5 py-2.5 font-mono text-[11.5px] font-bold text-ink";

export const QCARD =
  "mb-4 rounded-[var(--radius)] border border-ash-line bg-surface p-[18px]";
export const QCARD_VIOLET = "border-violet bg-violet-soft";

export const QUESTION_TEXT =
  "mb-4 text-sub leading-[1.65] text-ink";
export const PASSAGE_TEXT =
  "mb-3 text-body leading-[1.4] font-bold text-input";
export const PASSAGE_ATTRIBUTION =
  "mb-2 font-display text-[17px] font-semibold";
export const PASSAGE_SOURCE =
  "text-[11.5px] italic text-ash";

export const QTAG =
  "mb-2 inline-block rounded-md bg-paper-dim px-2 py-0.5 font-mono text-[10.5px] font-semibold text-ash";

export const OPTION_GROUP = "mb-3 rounded-[14px] border border-ash-line p-3.5";
export const OPTION_ROW =
  "flex cursor-pointer items-center justify-between gap-2.5 px-3.5 py-3 text-body font-semibold";
export const OPTION_FEEDBACK =
  "px-3.5 pb-3.5 text-sub leading-[1.65] text-ink-soft mt-2";
export const OPTION_HEADING = "mb-1.5 text-input font-bold";

export const SCORE_SCREEN =
  "text-center px-2.5 py-[30px]";

export const SCORE_ROW =
  "flex items-center gap-2.5 border-b border-ash-line py-[9px]";
export const SCORE_BAR_TRACK =
  "h-2 flex-1 overflow-hidden rounded bg-ash-line";
export const SCORE_BAR_FILL = "h-full rounded";
export const SCORE_PCT =
  "w-10 shrink-0 text-right font-mono text-label font-bold";
export const SCORE_SUBJECT =
  "flex items-center gap-2.5 py-2";
export const SCORE_CTA =
  "ml-auto cursor-pointer whitespace-nowrap text-label font-bold text-thread";

export const REVIEW_TOPIC =
  "flex items-center gap-2.5 py-2";
export const REVIEW_TOPIC_TITLE = "text-input font-bold";
export const REVIEW_ROW =
  "flex items-center gap-2.5 border-b border-ash-line py-2";
export const REVIEW_YOUR = "text-coral font-semibold";
export const REVIEW_CORRECT = "text-thread font-semibold";
export const REVIEW_LABEL = "min-w-0 flex-1 text-body";

export const PERF_STATS = "grid grid-cols-2 gap-3 mb-6";
export const PERF_STAT = "rounded-xl bg-paper-dim p-3 text-center";
export const PERF_VALUE =
  "font-display text-input font-semibold mb-2 pb-1.5 border-b border-ash-line";