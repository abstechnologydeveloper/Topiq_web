"use client";

type QaClass = { id: string; name: string };

const PICKER_LABEL =
  "mb-2 block font-mono text-[10.5px] font-bold uppercase tracking-[0.05em] text-ash";

export default function QaModal({
  qaTime,
  qaTimeError,
  onTimeChange,
  classes,
  qaClass,
  onSelectClass,
  onClose,
  onConfirm,
}: {
  qaTime: string;
  qaTimeError: boolean;
  onTimeChange: (v: string) => void;
  classes: QaClass[];
  qaClass: string | null;
  onSelectClass: (id: string) => void;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[100] flex animate-[fade_.2s_ease] items-end justify-center bg-[rgba(20,23,43,0.55)]">
      <div className="m-auto max-h-[82vh] w-full max-w-[520px] overflow-y-auto rounded-t-[20px] bg-paper px-5 pt-[22px] pb-7">
        <button className="float-right h-[30px] w-[30px] cursor-pointer rounded-full border-none bg-paper-dim text-sm" onClick={onClose} aria-label="Close">✕</button>
        <h2 className="clear-both mb-2.5 font-display text-[20px] font-semibold">Add a class to today's schedule</h2>
        <div className="mb-4">
          <span className={PICKER_LABEL}>What time?</span>
          <input
            type="text"
            placeholder="e.g. 2:30"
            value={qaTime}
            onChange={(e) => onTimeChange(e.target.value)}
            className={`w-full rounded-input border-1_5 bg-transparent px-3.5 py-[11px] font-sans text-input outline-none ${qaTimeError ? "border-coral" : "border-ash-line"} focus:border-thread`}
          />
        </div>
        <div className="mb-4">
          <span className={PICKER_LABEL}>Class</span>
          <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
            {classes.map((c) => (
              <button
                key={c.id}
                className={`shrink-0 cursor-pointer whitespace-nowrap rounded-card border-1_5 bg-surface px-[13px] py-[7px] text-[12.5px] font-bold ${qaClass === c.id ? "border-thread bg-thread-soft text-thread" : "border-ash-line text-ash"}`}
                onClick={() => onSelectClass(c.id)}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
        <button className="mt-2 cursor-pointer rounded-[22px] border-none bg-thread px-5 py-[11px] text-[13px] font-bold text-white" onClick={onConfirm}>Add →</button>
      </div>
    </div>
  );
}