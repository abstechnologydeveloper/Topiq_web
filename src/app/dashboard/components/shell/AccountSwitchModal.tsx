"use client";

import { Checkmark } from "./ShellIcons";

const LINKED_ACCOUNTS = [
  { mode: "student", icon: "🎓", label: "Chidinma Okafor", role: "Student" },
  { mode: "teacher", icon: "🧑‍🏫", label: "Mrs. F. Adeyemi", role: "Teacher" },
  { mode: "school", icon: "🏫", label: "Corona Secondary School", role: "School Admin" },
] as const;

export type LinkedAccountMode = (typeof LINKED_ACCOUNTS)[number]["mode"];

export default function AccountSwitchModal({
  appMode,
  onClose,
  onSwitch,
  onAddAnother,
}: {
  appMode: string;
  onClose: () => void;
  onSwitch: (mode: LinkedAccountMode) => void;
  onAddAnother: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[100] flex animate-[fade_.2s_ease] items-end justify-center bg-[rgba(20,23,43,0.55)]"
      id="accountSwitchModal"
    >
      <div className="m-auto max-h-[82vh] w-full max-w-[520px] overflow-y-auto rounded-t-[20px] bg-paper px-5 pt-[22px] pb-7">
        <button
          className="float-right h-[30px] w-[30px] cursor-pointer rounded-full border-none bg-paper-dim text-sm"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>
        <h2 className="clear-both mb-2.5 font-display text-[20px] font-semibold">Switch account</h2>
        <p className="-mt-1.5 mb-4 text-[12px] leading-[1.5] text-ash">
          Jump between your linked AbSTopiq accounts.
        </p>
        <div id="accountSwitchList">
          {LINKED_ACCOUNTS.map((a) => (
            <div
              key={a.mode}
              className="flex cursor-pointer items-center gap-3 border-b border-ash-line px-1 py-[11px] last:border-b-0"
              onClick={() => onSwitch(a.mode)}
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-paper-dim text-label font-bold">
                {a.icon}
              </div>
              <div className="flex-1 text-sub font-semibold">
                {a.label}
                <div className="text-[11px] font-semibold text-ash">
                  {a.role}
                  {a.mode === appMode ? " · current" : ""}
                </div>
              </div>
              {a.mode === appMode ? <Checkmark /> : null}
            </div>
          ))}
        </div>
        <button
          className="mt-2.5 w-full cursor-pointer rounded-btn border-[1.5px] border-dashed border-ash-line bg-transparent p-3 text-[13px] font-bold text-ash hover:border-thread hover:text-thread"
          onClick={onAddAnother}
        >
          + Add another account
        </button>
      </div>
    </div>
  );
}