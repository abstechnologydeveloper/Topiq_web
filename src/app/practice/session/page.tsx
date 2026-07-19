'use client'

import { useState } from 'react'
import { SUBJECTS, TOPICS } from '@/lib/data'
import { Eyebrow, GroundingChip } from '@/components/ui/shared'
import { useRouter } from 'next/navigation'

export default function PracticeSessionPage() {
  const router = useRouter()
  const [stage, setStage] = useState<'select' | 'quiz' | 'score'>('select')
  const [questions, setQuestions] = useState<any[]>([])
  const [qIndex, setQIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [chosen, setChosen] = useState<number | null>(null)
  const [results, setResults] = useState<{ q: any; chosen: number; correct: number }[]>([])

  const startSession = (subjectId?: string) => {
    let qs = TOPICS.flatMap(t => t.questions)
    if (subjectId) qs = qs.filter(q => TOPICS.find(t => t.id === q.topicId)?.subjectId === subjectId)
    qs = qs.sort(() => Math.random() - 0.5).slice(0, 5)
    setQuestions(qs)
    setQIndex(0)
    setScore(0)
    setChosen(null)
    setResults([])
    setStage('quiz')
  }

  const answer = (idx: number) => {
    if (chosen !== null) return
    setChosen(idx)
    const correct = idx === questions[qIndex].correctIndex
    if (correct) setScore(s => s + 1)
    setResults(prev => [...prev, { q: questions[qIndex], chosen: idx, correct: questions[qIndex].correctIndex }])
  }

  const next = () => {
    if (qIndex + 1 >= questions.length) setStage('score')
    else { setQIndex(i => i + 1); setChosen(null) }
  }

  const exit = () => router.push('/practice')

  if (stage === 'select') {
    return (
      <div className="max-w-[640px] mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={exit} className="w-[34px] h-[34px] rounded-full bg-paper-dim flex items-center justify-center cursor-pointer shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
          <div className="flex-1 min-w-0">
            <div className="font-mono text-[10.5px] font-bold text-coral uppercase tracking-[.05em]">Practice</div>
            <div className="font-display text-[16px] font-semibold text-surface-900">Pick a subject</div>
          </div>
        </div>
        <div className="bg-surface-900 text-surface-50 rounded-[12px] px-3.5 py-2.5 mb-4 flex items-center gap-2 text-[12px] font-semibold">
          <span className="w-[7px] h-[7px] rounded-full bg-coral shrink-0" />
          Practice mode — answers aren't graded into your lesson progress
        </div>

        {SUBJECTS.map(s => (
          <div key={s.id} onClick={() => startSession(s.id)}
            className="flex items-center gap-3 bg-surface-50 border border-ash-line rounded-[14px] p-3.5 mb-2.5 cursor-pointer hover:translate-x-0.5 hover:border-brand-600 transition-all">
            <div className="w-[32px] h-[32px] rounded-[9px] flex items-center justify-center text-[14px] shrink-0" style={{ background: `${s.colorHex}18` }}>
              {s.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13.5px] font-bold text-surface-900">{s.name}</div>
              <div className="text-[11.5px] text-ash">{s.questionCount} practice questions</div>
            </div>
            <span className="font-mono text-[10px] font-semibold text-coral bg-coral-soft px-2 py-[3px] rounded-[10px] shrink-0">{s.masteryScore}%</span>
          </div>
        ))}
      </div>
    )
  }

  const q = questions[qIndex]
  const pct = questions.length > 0 ? ((qIndex) / questions.length) * 100 : 0

  if (stage === 'score') {
    const finalPct = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0
    return (
      <div className="max-w-[640px] mx-auto text-center py-8">
        <Eyebrow className="justify-center">Session complete — full report</Eyebrow>
        <div className="font-display text-[44px] font-semibold text-surface-900 mb-1.5">{score}/{questions.length}</div>
        <p className="text-[13.5px] text-ash mb-5">Grounded straight from your syllabus — not generic web questions.</p>

        <div className="text-left space-y-3 mb-6">
          {results.map((r, i) => (
            <div key={i} className="border border-ash-line rounded-[14px] p-3.5">
              <div className="font-bold text-[13.5px] text-surface-900 mb-2">{i + 1}. {r.q.text}</div>
              {r.q.options.map((opt: string, j: number) => (
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

        <button onClick={() => startSession()} className="bg-surface-900 text-surface-50 border-none px-[18px] py-[11px] rounded-[22px] font-bold text-[13px] cursor-pointer">
          Practice again
        </button>
        <br />
        <button onClick={exit} className="bg-none text-surface-900 underline mt-2.5 text-[13px] font-bold cursor-pointer">
          Back to Practice
        </button>
      </div>
    )
  }

  if (!q) return null

  return (
    <div className="max-w-[640px] mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={exit} className="w-[34px] h-[34px] rounded-full bg-paper-dim flex items-center justify-center cursor-pointer shrink-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
        <div className="flex-1 min-w-0">
          <div className="font-mono text-[10.5px] font-bold text-coral uppercase tracking-[.05em]">Practice · WAEC</div>
          <div className="font-display text-[16px] font-semibold text-surface-900">🧬 Biology</div>
        </div>
      </div>
      <div className="bg-surface-900 text-surface-50 rounded-[12px] px-3.5 py-2.5 mb-4 flex items-center gap-2 text-[12px] font-semibold">
        <span className="w-[7px] h-[7px] rounded-full bg-coral shrink-0 animate-pulse" />
        Practice mode — answers aren't graded into your lesson progress
      </div>

      <div className="flex items-center justify-between mb-2.5">
        <Eyebrow className="mb-0">Question</Eyebrow>
        <div className="flex-1 h-[6px] rounded-full bg-ash-line mx-3 overflow-hidden">
          <div className="h-full rounded-full bg-brand-600 transition-all" style={{ width: `${pct}%` }} />
        </div>
        <span className="font-mono text-[12px] font-bold text-ash shrink-0">{score}/{qIndex + (chosen !== null ? 1 : 0)}</span>
      </div>

      <div className="bg-surface-50 border border-ash-line rounded-[--radius] p-4 mb-4">
        <span className="font-mono text-[11px] font-semibold text-ash mb-2.5 block">{q.topicId.replace('bio-', '').replace('chem-', '').replace('phys-', '').replace('math-', '')}</span>
        <p className="text-[15.5px] font-semibold leading-[1.5] text-surface-900 mb-4">{q.text}</p>
        <div className="space-y-2">
          {q.options.map((opt: string, i: number) => {
            let cls = 'border-ash-line hover:border-brand-600'
            if (chosen !== null && i === q.correctIndex) cls = 'border-surface-900 bg-surface-900 text-surface-50'
            else if (chosen !== null && i === chosen && i !== q.correctIndex) cls = 'border-ash-line bg-paper-dim text-ash line-through'
            else if (chosen === i) cls = 'border-brand-600 bg-brand-50'

            return (
              <div key={i} onClick={() => answer(i)}
                className={`flex items-center gap-2.5 px-3.5 py-3 border-[1.5px] rounded-[12px] cursor-pointer text-[14px] font-medium transition ${cls}`}>
                <span className={`w-[22px] h-[22px] rounded-full flex items-center justify-center font-mono text-[11px] font-semibold shrink-0 ${
                  chosen !== null && i === q.correctIndex ? 'bg-white text-surface-900' : 'bg-paper-dim'
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
            <p className="text-[13.5px] leading-[1.55] text-ink-soft">{q.explanation}</p>
            <GroundingChip text="§ WAEC Biology — syllabus reference" />
            <div className="text-right mt-3">
              <button onClick={next}
                className="bg-surface-900 text-surface-50 border-none px-[18px] py-[9px] rounded-[20px] font-bold text-[12.5px] cursor-pointer">
                {qIndex + 1 >= questions.length ? 'See score →' : 'Next question →'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
