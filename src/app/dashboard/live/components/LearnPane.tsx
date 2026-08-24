"use client";

type Section = { heading?: string; text: string };

export default function LearnPane({
  sections,
  takeaway,
}: {
  sections: Section[];
  takeaway?: string;
}) {
  return (
    <div>
      <span className="mb-1.5 block font-mono text-[11px] font-semibold uppercase tracking-[0.06em] text-thread">
        Following along with your teacher
      </span>
      <div>
        {sections.map((sec, i) => (
          <div key={i}>
            {sec.heading && <div className="mt-1 mb-2 font-display text-[16.5px] font-semibold">{sec.heading}</div>}
            <p className="mb-3.5 text-[14.5px] leading-[1.7] text-ink-soft">{sec.text}</p>
          </div>
        ))}
        {takeaway && (
          <div className="mb-4 flex items-start gap-2.5 rounded-btn bg-ink px-4 py-3.5 text-paper">
            <span className="shrink-0 text-lg">💡</span>
            <div>
              <div className="mb-[3px] font-mono text-[10px] uppercase tracking-[0.05em] text-ember-soft">Key takeaway</div>
              <div className="text-[13px] leading-[1.55]">{takeaway}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}