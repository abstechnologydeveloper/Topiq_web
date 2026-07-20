import { Dna, ArrowRight, X } from 'lucide-react'
import { GroundingChip } from '@/components/ui/shared'

interface Question {
  text: string
  options: string[]
  correctIndex: number
  explanation: string
  topicId: string
}

interface Props {
  question: Question
  qIndex: number
  total: number
  score: number
  chosen: number | null
  onAnswer: (idx: number) => void
  onNext: () => void
  onClose: () => void
}

export function QuizStage({ question, qIndex, total, score, chosen, onAnswer, onNext, onClose }: Props) {
  const pct = total > 0 ? (qIndex / total) * 100 : 0

  return (
    <div className="max-w-[640px] mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={onClose} className="w-[34px] h-[34px] rounded-full bg-paper-dim flex items-center justify-center cursor-pointer shrink-0">
          <X size={16} />
        </button>
        <div className="flex-1 min-w-0">
          <div className="font-mono text-[10.5px] font-bold text-coral uppercase tracking-[.05em]">Practice · WAEC</div>
          <div className="font-display text-[16px] font-semibold text-surface-900 flex items-center gap-1.5"><Dna size={16} /> Biology</div>
        </div>
      </div>
      <div className="bg-surface-900 text-surface-50 rounded-[12px] px-3.5 py-2.5 mb-4 flex items-center gap-2 text-[12px] font-semibold">
        <span className="w-[7px] h-[7px] rounded-full bg-coral shrink-0 animate-pulse" />
        Practice mode — answers aren't graded into your lesson progress
      </div>

      <div className="flex items-center justify-between mb-2.5">
        <div className="font-mono text-[10.5px] font-bold text-coral uppercase tracking-[.05em]">Question</div>
        <div className="flex-1 h-[6px] rounded-full bg-ash-line mx-3 overflow-hidden">
          <div className="h-full rounded-full bg-brand-600 transition-all" style={{ width: `${pct}%` }} />
        </div>
        <span className="font-mono text-[12px] font-bold text-ash shrink-0">{score}/{qIndex + (chosen !== null ? 1 : 0)}</span>
      </div>

      <div className="bg-surface-50 border border-ash-line rounded-[--radius] p-4 mb-4">
        <span className="font-mono text-[11px] font-semibold text-ash mb-2.5 block">
          {question.topicId.replace('bio-', '').replace('chem-', '').replace('phys-', '').replace('math-', '')}
        </span>
        <p className="text-[15.5px] font-semibold leading-[1.5] text-surface-900 mb-4">{question.text}</p>
        <div className="space-y-2">
          {question.options.map((opt, i) => {
            let cls = 'border-ash-line hover:border-brand-600'
            if (chosen !== null && i === question.correctIndex) cls = 'border-surface-900 bg-surface-900 text-surface-50'
            else if (chosen !== null && i === chosen && i !== question.correctIndex) cls = 'border-ash-line bg-paper-dim text-ash line-through'
            else if (chosen === i) cls = 'border-brand-600 bg-brand-50'

            return (
              <div key={i} onClick={() => onAnswer(i)}
                className={`flex items-center gap-2.5 px-3.5 py-3 border-[1.5px] rounded-[12px] cursor-pointer text-[14px] font-medium transition ${cls}`}>
                <span className={`w-[22px] h-[22px] rounded-full flex items-center justify-center font-mono text-[11px] font-semibold shrink-0 ${
                  chosen !== null && i === question.correctIndex ? 'bg-white text-surface-900' : 'bg-paper-dim'
                }`}>
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
              </div>
            )
          })}
        </div>

        {chosen !== null && (
          <div className="mt-4 bg-paper-dim rounded-[12px] p-3.5 animate-fadeIn">
            <p className="text-[13.5px] leading-[1.55] text-ink-soft">{question.explanation}</p>
            <GroundingChip text="§ WAEC Biology — syllabus reference" />
            <div className="text-right mt-3">
              <button onClick={onNext}
                className="bg-surface-900 text-surface-50 border-none px-[18px] py-[9px] rounded-[20px] font-bold text-[12.5px] cursor-pointer flex items-center gap-1.5 ml-auto">
                {qIndex + 1 >= total ? <>See score <ArrowRight size={12} /></> : <>Next question <ArrowRight size={12} /></>}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
