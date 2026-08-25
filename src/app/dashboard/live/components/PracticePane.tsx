"use client";

export default function PracticePane({ onPractice }: { onPractice: () => void }) {
  return (
    <div>
      <span className="mb-1.5 block font-mono text-fine font-semibold uppercase tracking-[0.06em] text-thread">
        Try it yourself
      </span>
      <div className="rounded-[18px] border border-ash-line bg-surface p-4">
        <p className="mb-3 text-body text-ink-soft">
          Practise the topic your teacher is covering right now — your results feed straight back into this class's mastery.
        </p>
        <button
          onClick={onPractice}
          className="cursor-pointer rounded-[20px] border-none bg-ink px-5 py-2.5 text-meta font-bold text-paper"
        >
          Practise this topic →
        </button>
      </div>
    </div>
  );
}