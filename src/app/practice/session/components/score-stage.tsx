'use client'

import { ArrowRight } from 'lucide-react'
import { SUBJECTS, TOPICS } from '@/lib/data'
import { Eyebrow } from '@/components/ui/shared'

interface Result {
  q: { text: string; options: string[]; correctIndex: number; explanation: string; topicId: string }
  chosen: number
  correct: number
}

interface SubjectScore {
  id: string
  name: string
  icon: React.ReactNode
  score: number
  total: number
}

interface Props {
  score: number
  total: number
  results: Result[]
  onRetry: () => void
  onClose: () => void
  onPractice: (topicId: string) => void
  isMock?: boolean
  subjectScores?: SubjectScore[]
}

export function ScoreStage({ score, total, results, onRetry, onClose, onPractice, isMock, subjectScores }: Props) {
  const finalPct = total > 0 ? Math.round((score / total) * 100) : 0

  const weakResults = results.filter(r => r.chosen !== r.correct)
  const seenTopics = new Set<string>()
  const weakRows = weakResults.filter(r => {
    const topic = r.q.topicId
    if (seenTopics.has(topic)) return false
    seenTopics.add(topic)
    return true
  })

  const renderQuestions = (qs: Result[], startNum: number) => qs.map((r, i) => {
    const num = startNum + i + 1
    return (
      <div key={num} className="border border-ash-line rounded-[14px] p-3.5">
        <div className="font-bold text-[13.5px] text-surface-900 mb-2">
          <span className="text-ash font-mono mr-1">{num}.</span> {r.q.text}
        </div>
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
    )
  })

  return (
    <div className="max-w-[640px] mx-auto text-center pt-4">
      <Eyebrow className="justify-center">Session complete — full report</Eyebrow>
      <div className="font-display text-[44px] font-semibold text-surface-900 mb-1.5">{score}/{total}</div>
      <p className="text-[13.5px] text-ash mb-5 max-w-[380px] mx-auto">
        Grounded straight from your syllabus — not generic web questions.
      </p>

      {/* per-subject scores for mock exam */}
      {isMock && subjectScores && subjectScores.length > 0 && (
        <div className="text-left mb-6">
          <div className="font-mono text-[10.5px] font-bold text-ash uppercase tracking-[.05em] mb-2.5">Subjects</div>
          <div className="space-y-2">
            {subjectScores.map(s => (
              <div key={s.id}
                className="flex items-center gap-2.5 px-3.5 py-3 border border-ash-line rounded-[12px]">
                <div className="w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0 bg-paper-dim text-surface-900">
                  {s.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-bold text-[13px] text-surface-900">{s.name}</span>
                </div>
                <span className="font-mono text-[12px] font-bold text-ash shrink-0">{s.score}/{s.total}</span>
              </div>
            ))}
          </div>
        </div>
      )}

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
        {isMock && subjectScores && subjectScores.length > 0 ? (
          (() => {
            let globalNum = 0
            return subjectScores.map(subj => {
              const subjResults = results.filter(r => {
                const topic = TOPICS.find(t => t.id === r.q.topicId)
                return topic?.subjectId === subj.id
              })
              if (subjResults.length === 0) return null
              const qs = renderQuestions(subjResults, globalNum)
              globalNum += subjResults.length
              return (
                <div key={subj.id} className="mb-4">
                  <div className="flex items-center gap-3 bg-surface-50 border border-ash-line rounded-[14px] p-3.5 mb-3 text-left">
                    <div className="w-[38px] h-[38px] rounded-[10px] flex items-center justify-center shrink-0 bg-paper-dim text-surface-900">
                      {subj.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-[13.5px] text-surface-900">{subj.name}</div>
                      <div className="text-[11.5px] text-ash font-mono">{subj.score}/{subj.total} correct</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {qs}
                  </div>
                </div>
              )
            })
          })()
        ) : (
          <>
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
              {renderQuestions(results, 0)}
            </div>
          </>
        )}
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
