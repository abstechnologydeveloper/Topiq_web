'use client'

import { ArrowRight } from 'lucide-react'
import { SUBJECTS, TOPICS } from '@/lib/data'
import { Eyebrow } from '@/components/ui/shared'

interface Result {
  q: { text: string; options: string[]; correctIndex: number; explanation: string; topicId: string }
  chosen: number
  correct: number
}

interface Props {
  score: number
  total: number
  results: Result[]
  onRetry: () => void
  onClose: () => void
  onPractice: (topicId: string) => void
}

export function ScoreStage({ score, total, results, onRetry, onClose, onPractice }: Props) {
  const finalPct = total > 0 ? Math.round((score / total) * 100) : 0

  const weakResults = results.filter(r => r.chosen !== r.correct)
  const seenTopics = new Set<string>()
  const weakRows = weakResults.filter(r => {
    const topic = r.q.topicId
    if (seenTopics.has(topic)) return false
    seenTopics.add(topic)
    return true
  })

  return (
    <div className="max-w-[640px] mx-auto text-center pt-4">
      <Eyebrow className="justify-center">Session complete — full report</Eyebrow>
      <div className="font-display text-[44px] font-semibold text-surface-900 mb-1.5">{score}/{total}</div>
      <p className="text-[13.5px] text-ash mb-5 max-w-[380px] mx-auto">
        Grounded straight from your syllabus — not generic web questions.
      </p>

      {/* weak points */}
      {weakRows.length > 0 && (
        <div className="text-left mb-6">
          <div className="font-mono text-[10.5px] font-bold text-ash uppercase tracking-[.05em] mb-2.5">Weak points to revisit</div>
          <div className="space-y-2">
            {weakRows.map((r, i) => {
              const topic = TOPICS.find(t => t.id === r.q.topicId)
              const subj = SUBJECTS.find(s => s.id === topic?.subjectId)
              return (
                <div key={i} onClick={() => onPractice(r.q.topicId)}
                  className="flex items-center gap-2.5 px-3.5 py-3 border border-ash-line rounded-[12px] cursor-pointer hover:border-brand-600 transition">
                  {subj?.icon && (
                    <div className="w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0 bg-paper-dim text-surface-900">
                      {subj.icon}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-[13px] text-surface-900">{r.q.topicId.replace(/^(bio|chem|phys|math|eng)-/, '')}</div>
                    <div className="text-[11.5px] text-ash">{subj?.name || ''}</div>
                  </div>
                  <span className="text-[12px] font-bold text-brand-600 shrink-0 flex items-center gap-1">
                    Practice this <ArrowRight size={12} />
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* answer review */}
      <div className="text-left mb-6">
        <div className="font-mono text-[10.5px] font-bold text-ash uppercase tracking-[.05em] mb-2.5">Review every question</div>
        {(() => {
          const firstResult = results[0]
          const topic = firstResult ? TOPICS.find(t => t.id === firstResult.q.topicId) : undefined
          const subj = topic ? SUBJECTS.find(s => s.id === topic.subjectId) : undefined
          if (!subj) return null
          return (
            <div className="flex items-center gap-3 bg-surface-50 border border-ash-line rounded-[14px] p-3.5 mb-4 text-left">
              <div className="w-[38px] h-[38px] rounded-[10px] flex items-center justify-center shrink-0 bg-paper-dim text-surface-900">
                {subj.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-[13.5px] text-surface-900">{subj.name}</div>
                <div className="text-[11.5px] text-ash font-mono">{score}/{total} correct</div>
              </div>
            </div>
          )
        })()}
        <div className="space-y-3">
          {results.map((r, i) => (
            <div key={i} className="border border-ash-line rounded-[14px] p-3.5">
              <div className="font-bold text-[13.5px] text-surface-900 mb-2">{i + 1}. {r.q.text}</div>
              {r.q.options.map((opt, j) => {
                let cls = 'bg-paper-dim'
                if (j === r.correct) cls = 'bg-green-50 text-green-700 font-bold'
                else if (j === r.chosen && j !== r.correct) cls = 'bg-red-50 text-red-600 line-through'

                return (
                  <div key={j} className={`text-[13px] px-2.5 py-2 rounded-[9px] mb-1.5 ${cls}`}>
                    {String.fromCharCode(65 + j)}. {opt}
                  </div>
                )
              })}
              <p className="text-[13px] leading-[1.5] mt-2 text-ink-soft">
                <strong className={r.chosen === -1 ? '' : r.chosen === r.correct ? 'text-green-600' : 'text-red-500'}>
                  {r.chosen === -1 ? 'Not attempted.' : r.chosen === r.correct ? 'Correct.' : 'Not quite.'}
                </strong>{' '}{r.q.explanation}
              </p>
            </div>
          ))}
        </div>
      </div>

      <button onClick={onRetry} className="bg-surface-900 text-surface-50 border-none px-[18px] py-[11px] rounded-[22px] font-bold text-[13px] cursor-pointer">
        Practice again
      </button>
      <br />
      <button onClick={onClose} className="bg-none text-surface-900 underline mt-2.5 text-[13px] font-bold cursor-pointer">
        Back to assignments
      </button>
    </div>
  )
}
