"use client";

type PollQ = { text: string; options: string[]; correct: number };
type Classmate = { name: string };

export default function InteractivePoll({
  pollQ,
  answered,
  pcts,
  latestPick,
  responses,
  total,
  classmates,
  onAnswer,
}: {
  pollQ: PollQ | null;
  answered: boolean;
  pcts: number[];
  latestPick: number;
  responses: number;
  total: number;
  classmates: Classmate[];
  onAnswer: (i: number) => void;
}) {
  return (
    <div>
      <span className="mb-1.5 block font-mono text-fine font-semibold uppercase tracking-[0.06em] text-thread">
        Answer live, together
      </span>
      <div className="mb-3.5 rounded-card border border-ash-line bg-surface p-4">
        <div className="flex items-center gap-1.5">
          <span className="m-0 block font-mono text-fine font-semibold uppercase tracking-[0.06em] text-thread">
            Question from your teacher
          </span>
        </div>
        {pollQ ? (
          <>
            <div className="my-2 mb-3.5 text-[15px] font-bold">{pollQ.text}</div>
            <div>
              {pollQ.options.map((opt, i) => {
                const pct = answered ? pcts[i] : 0;
                const isCorrect = answered && i === pollQ.correct;
                const isWrong = answered && i === latestPick && i !== pollQ.correct;
                return (
                  <div
                    key={i}
                    className={`relative flex cursor-pointer items-center gap-2.5 overflow-hidden rounded-tile border-1_5 py-2.5 px-3 mb-2 text-body font-semibold ${isCorrect ? "border-thread" : isWrong ? "border-coral" : "border-ash-line"}`}
                    onClick={() => onAnswer(i)}
                  >
                    <div
                      className={`absolute inset-0 z-0 transition-[width] duration-[400ms] ${isWrong ? "bg-coral-soft" : "bg-thread-soft"}`}
                      style={answered ? { width: `${pct}%` } : undefined}
                    ></div>
                    <span className="relative z-[1]">{opt}</span>
                    <span className="relative z-[1] ml-auto font-bold text-ash">{answered ? pct + "%" : ""}</span>
                  </div>
                );
              })}
            </div>
            <div className="font-mono text-[11.5px] text-ash">{responses} of {total} students answered</div>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {classmates.slice(0, 7).map((st, i) => (
                <span className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-thread-soft text-[10.5px] font-bold text-thread" key={i}>
                  {st.name.split(" ").map((w) => w[0]).join("")}
                </span>
              ))}
            </div>
          </>
        ) : (
          <div className="my-2 mb-3.5 text-[15px] font-bold">No interactive questions for this subject yet.</div>
        )}
      </div>
    </div>
  );
}