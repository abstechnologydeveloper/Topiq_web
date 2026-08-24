"use client";

export default function LiveTopbar({
  label,
  title,
  sub,
  isTeacher,
  onEnd,
}: {
  label: string;
  title: string;
  sub: string;
  isTeacher: boolean;
  onEnd: () => void;
}) {
  return (
    <div className="mb-3.5 flex items-center gap-2.5 rounded-card bg-[linear-gradient(120deg,var(--coral),#C23350)] px-4 py-3.5 text-white">
      <span className="h-[9px] w-[9px] shrink-0 animate-[lsblink_1.3s_infinite] rounded-full bg-surface"></span>
      <div>
        <div className="font-mono text-[10px] font-bold uppercase tracking-[0.04em] text-[#FFD9E0]">{label}</div>
        <div className="text-[14.5px] font-bold">{title}</div>
        <div className="text-[11.5px] opacity-90">{sub}</div>
      </div>
      <button
        className={`ml-auto shrink-0 cursor-pointer rounded-card border-none bg-surface px-3.5 py-2 text-label font-bold text-coral ${isTeacher ? "inline-block" : "hidden"}`}
        onClick={onEnd}
      >
        End session
      </button>
    </div>
  );
}