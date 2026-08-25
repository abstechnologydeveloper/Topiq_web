"use client";

import { PS_TOPBAR, PS_BACK, PS_BADGE, PS_TIMER, PS_SUBMIT } from "./constants";

export default function SessionTopbar({
  psTag,
  paperSuffix,
  yearSuffix,
  timeLeftLabel,
  onExit,
  onSubmit,
  submitLabel,
  hasAnswered,
}: {
  psTag: string;
  paperSuffix: string;
  yearSuffix: string;
  timeLeftLabel: string;
  onExit: () => void;
  onSubmit: () => void;
  submitLabel: string;
  hasAnswered: boolean;
}) {
  return (
    <div className={PS_TOPBAR}>
      <div className={`${PS_BACK} !mb-0`} onClick={onExit}>← Exit</div>
      <div className={`${PS_BADGE} ml-auto`}>
        <span className={PS_TIMER}>{timeLeftLabel}</span>
        <span className="h-4 w-px bg-ash-line" />
        <span className={PS_TIMER}>{psTag}{paperSuffix}{yearSuffix}</span>
      </div>
      <button className={PS_SUBMIT} onClick={onSubmit} disabled={!hasAnswered}>
        {submitLabel}
      </button>
    </div>
  );
}