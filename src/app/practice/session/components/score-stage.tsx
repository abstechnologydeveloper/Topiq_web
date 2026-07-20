import { GroundingChip, Eyebrow } from '@/components/ui/shared'

interface Result {
  q: { text: string; options: string[]; correctIndex: number; explanation: string }
  chosen: number
  correct: number
}

interface Props {
  score: number
  total: number
  results: Result[]
  onRetry: () => void
  onClose: () => void
}

export function ScoreStage({ score, total, results, onRetry, onClose }: Props) {
  const finalPct = total > 0 ? Math.round((score / total) * 100) : 0

  return (
    <div className="max-w-[640px] mx-auto text-center py-8">
      <Eyebrow className="justify-center">Session complete — full report</Eyebrow>
      <div className="font-display text-[44px] font-semibold text-surface-900 mb-1.5">{score}/{total}</div>
      <p className="text-[13.5px] text-ash mb-5">Grounded straight from your syllabus — not generic web questions.</p>

      <div className="text-left space-y-3 mb-6">
        {results.map((r, i) => (
          <div key={i} className="border border-ash-line rounded-[14px] p-3.5">
            <div className="font-bold text-[13.5px] text-surface-900 mb-2">{i + 1}. {r.q.text}</div>
            {r.q.options.map((opt, j) => (
              <div key={j} className={`text-[13px] px-2.5 py-2 rounded-[9px] mb-1.5 ${
                j === r.correct ? 'bg-surface-900 text-surface-50 font-bold' :
                j === r.chosen ? 'bg-paper-dim text-ash line-through' : 'bg-paper-dim'
              }`}>
                {opt}
              </div>
            ))}
            <p className="text-[13px] leading-[1.5] mt-2 text-ink-soft">{r.q.explanation}</p>
            <GroundingChip text="§ WAEC Biology — syllabus reference" />
          </div>
        ))}
      </div>

      <button onClick={onRetry} className="bg-surface-900 text-surface-50 border-none px-[18px] py-[11px] rounded-[22px] font-bold text-[13px] cursor-pointer">
        Practice again
      </button>
      <br />
      <button onClick={onClose} className="bg-none text-surface-900 underline mt-2.5 text-[13px] font-bold cursor-pointer">
        Back to Practice
      </button>
    </div>
  )
}
