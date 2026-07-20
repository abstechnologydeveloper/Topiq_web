import { GroundingChip, Eyebrow } from '@/components/ui/shared'
import { ArrowRight } from 'lucide-react'

interface Question {
  text: string
  options: string[]
  correctIndex: number
  explanation: string
}

interface Props {
  question: Question
  currentQ: number
  total: number
  selected: number | null
  isComplete: boolean
  subjName: string
  topicName: string
  onSelect: (idx: number) => void
  onNext: () => void
}

export function QuestionCard({ question, currentQ, total, selected, isComplete, subjName, topicName, onSelect, onNext }: Props) {
  return (
    <div className="mt-6 pt-6 border-t border-ash-line">
      <Eyebrow>Practice question</Eyebrow>
      <div className="bg-surface-50 border border-ash-line rounded-[14px] p-4 mt-3">
        <div className="font-mono text-[11px] font-semibold text-ash mb-2.5">Question {currentQ + 1} of {total}</div>
        <p className="text-[15.5px] font-semibold leading-[1.5] text-surface-900 mb-4">{question.text}</p>

        <div className="space-y-2">
          {question.options.map((opt, i) => {
            let cls = 'border-ash-line hover:border-brand-600'
            if (isComplete && i === question.correctIndex) cls = 'border-surface-900 bg-surface-900 text-surface-50'
            else if (isComplete && i === selected && i !== question.correctIndex) cls = 'border-ash-line bg-paper-dim text-ash line-through'
            else if (isComplete) cls = 'border-ash-line bg-paper-dim text-ash'
            else if (selected === i) cls = 'border-brand-600 bg-brand-50'

            return (
              <div key={i} onClick={() => onSelect(i)}
                className={`flex items-center gap-2.5 px-3.5 py-3 border-[1.5px] rounded-[12px] cursor-pointer text-[14px] font-medium transition ${cls}`}>
                <span className="w-[22px] h-[22px] rounded-full bg-paper-dim flex items-center justify-center font-mono text-[11px] font-semibold shrink-0"
                  style={isComplete && i === question.correctIndex ? { background: '#fff', color: 'var(--color-surface-900)' } : {}}>
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
              </div>
            )
          })}
        </div>

        {isComplete && (
          <div className="mt-4 bg-paper-dim rounded-[12px] p-3.5 animate-fadeIn">
            <p className="text-[13.5px] leading-[1.55] text-ink-soft">{question.explanation}</p>
            <GroundingChip text={`§ WAEC ${subjName} — ${topicName}`} />
          </div>
        )}

        {isComplete && currentQ + 1 < total && (
          <div className="mt-3.5 text-right">
            <button onClick={onNext}
              className="bg-surface-900 text-surface-50 border-none px-[18px] py-[9px] rounded-[20px] font-bold text-[12.5px] cursor-pointer flex items-center gap-1.5 ml-auto">
              Next question <ArrowRight size={12} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
