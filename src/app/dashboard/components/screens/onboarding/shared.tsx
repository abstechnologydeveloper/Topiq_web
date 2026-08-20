export const QA_INPUT =
  "w-full rounded-[10px] border-[1.5px] border-ash-line px-3.5 py-[11px] text-[14px] outline-none focus:border-thread";
export const LABEL = "mb-1.5 block text-[12px] font-bold text-ink-soft";
export const OB_FIELD = "mb-4";
export const MODE_BADGE =
  "block mx-auto mb-3.5 w-fit text-center [font-family:'IBM_Plex_Mono',monospace] text-[9.5px] font-bold uppercase tracking-[0.04em] bg-paper-dim text-ash px-[7px] py-[2px] rounded-lg ml-0.5";
export const BACK = "mb-4 flex cursor-pointer items-center gap-1.5 text-[12.5px] font-semibold text-ash";
export const FINISH_BTN =
  "mt-1.5 w-full cursor-pointer rounded-[14px] border-none bg-ink px-[13px] py-[13px] text-[14px] font-bold text-paper";

export const BackIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

export const PersonSVG = ({ size = 30 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="var(--ash)" strokeWidth="1.8">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
  </svg>
);

export const CameraBadge = () => (
  <span className="absolute -bottom-px -right-px flex h-6.5 w-6.5 items-center justify-center rounded-full border-2 border-white bg-ink">
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  </span>
);