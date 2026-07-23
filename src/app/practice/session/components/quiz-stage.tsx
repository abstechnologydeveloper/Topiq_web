'use client'

import { useState } from 'react'
import { Clock, X, ArrowLeft, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react'

interface Question {
  text: string
  options: string[]
  correctIndex: number
  explanation: string
  topicId: string
}

interface Props {
  subjectName: string
  subjectIcon: React.ReactNode
  tag: string
  questions: Question[]
  qIndex: number
  total: number
  answeredMap: Record<number, number>
  secondsLeft: number
  onAnswer: (idx: number) => void
  onNext: () => void
  onPrev: () => void
  onJump: (i: number) => void
  onSubmit: () => void
  onClose: () => void
}

export function QuizStage({
  subjectName, subjectIcon, tag, questions, qIndex, total,
  answeredMap, secondsLeft, onAnswer, onNext, onPrev, onJump, onSubmit, onClose,
}: Props) {
  const pct = total > 0 ? (qIndex / total) * 100 : 0
  const mins = Math.floor(secondsLeft / 60)
  const secs = secondsLeft % 60
  const timerStr = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  const isLast = qIndex + 1 >= total
  const chosen = answeredMap[qIndex] ?? null
  const isAnswered = chosen !== null
  const answeredCount = Object.keys(answeredMap).length
  const [showGrid, setShowGrid] = useState(true)

  const q = questions[qIndex]
  if (!q) return null

  return (
    <div className="max-w-[640px] mx-auto">
      {/* top bar */}
      <div className="flex items-center gap-3 mb-4">
        <button onClick={onClose} className="w-[34px] h-[34px] rounded-full bg-paper-dim flex items-center justify-center cursor-pointer shrink-0">
          <X size={16} />
        </button>
        <div className="flex-1 min-w-0">
          <div className="font-mono text-[10.5px] font-bold text-coral uppercase tracking-[.05em]">{tag}</div>
          <div className="font-display text-[16px] font-semibold text-surface-900 flex items-center gap-1.5">{subjectIcon} {subjectName}</div>
        </div>
        <button onClick={onSubmit}
          className="h-[36px] rounded-[22px] bg-surface-900 text-surface-50 font-bold text-[12px] px-4 flex items-center gap-1.5 cursor-pointer shrink-0 hover:opacity-85 transition">
          Submit
        </button>
      </div>

      {/* mode banner */}
      <div className="bg-surface-900 text-surface-50 rounded-[12px] px-3.5 py-2.5 mb-4 flex items-center gap-2 text-[12px] font-semibold">
        <span className="w-[7px] h-[7px] rounded-full bg-coral shrink-0 animate-pulse" />
        Practice mode — answers aren't graded into your lesson progress
      </div>

      {/* session head: Question / progress bar / score / timer */}
      <div className="flex items-center justify-between mb-2.5">
        <span className="font-mono text-[10.5px] font-bold text-coral uppercase tracking-[.05em] shrink-0">Question</span>
        <div className="flex-1 h-[6px] rounded-full bg-ash-line mx-3 overflow-hidden">
          <div className="h-full rounded-full bg-brand-600 transition-all" style={{ width: `${pct}%` }} />
        </div>
        <span className="font-mono text-[12px] font-bold text-ash shrink-0 mr-2">
          {Object.keys(answeredMap).length}/{total}
        </span>
        <span className="font-mono text-[12px] font-bold text-coral shrink-0 flex items-center gap-1">
          <Clock size={13} /> {timerStr}
        </span>
      </div>

      {/* question number grid */}
      <div className="mb-4">
        <button onClick={() => setShowGrid(v => !v)}
          className="flex items-center gap-1.5 text-[11px] font-bold text-ash bg-none border-none cursor-pointer mb-2 hover:text-surface-900 transition w-full">
          <span>Questions : {answeredCount}/{total}</span>
          <span className="flex items-center gap-1 ml-auto text-ash/70">
            {showGrid ? <>tap to close <ChevronUp size={13} /></> : <>tap to jump to a question <ChevronDown size={13} /></>}
          </span>
        </button>
        {showGrid && (
          <div className="flex flex-wrap gap-1.5">
            {questions.map((_, i) => {
              const isCurrent = i === qIndex
              const hasAnswer = answeredMap[i] !== undefined

              let cls = 'bg-paper-dim text-ash border-ash-line'
              if (isCurrent && !hasAnswer) cls = 'bg-brand-600 text-white border-brand-600'
              else if (isCurrent && hasAnswer) cls = 'bg-green-500 text-white border-green-500'
              else if (hasAnswer) cls = 'bg-green-50 text-green-600 border-green-500'

              return (
                <button key={i} onClick={() => onJump(i)}
                  className={`w-[34px] h-[34px] rounded-full flex items-center justify-center font-mono text-[11px] font-bold cursor-pointer border transition ${cls}`}>
                  {i + 1}
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* question card */}
      <div className="bg-surface-50 border border-ash-line rounded-[--radius] p-4 mb-4">
        <span className="font-mono text-[11px] font-semibold text-ash mb-2.5 block">
          {q.topicId.replace(/^(bio|chem|phys|math|eng)-/, '')}
        </span>
        <p className="text-[15.5px] font-semibold leading-[1.5] text-surface-900 mb-4">{q.text}</p>
        <div className="space-y-2">
          {q.options.map((opt, i) => {
            let cls = 'border-ash-line hover:border-brand-600'
            if (chosen === i) cls = 'border-brand-600 bg-brand-50'

            return (
              <div key={i} onClick={() => { if (!isAnswered) onAnswer(i) }}
                className={`flex items-center gap-2.5 px-3.5 py-3 border-[1.5px] rounded-[12px] cursor-pointer text-[14px] font-medium transition ${cls}`}>
                <span className={`w-[26px] h-[26px] rounded-full flex items-center justify-center font-mono text-[12px] font-semibold leading-none shrink-0 ${chosen === i ? 'bg-brand-600 text-white' : 'bg-paper-dim'}`}>
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
              </div>
            )
          })}
        </div>

        {/* navigation buttons — always visible */}
        <div className="flex items-center justify-between mt-4">
          <button onClick={onPrev}
            disabled={qIndex === 0}
            className="flex items-center gap-1.5 text-[12px] font-bold text-brand-600 bg-none border-none cursor-pointer disabled:opacity-30 disabled:cursor-default hover:text-brand-700 transition">
            <ArrowLeft size={13} /> Previous
          </button>
          <button onClick={isLast ? onSubmit : onNext}
            className="bg-surface-900 text-surface-50 border-none px-[18px] py-[9px] rounded-[22px] font-bold text-[12.5px] cursor-pointer flex items-center gap-1.5 hover:opacity-85 transition">
            {isLast ? <>Submit <ArrowRight size={12} /></> : <>Next question <ArrowRight size={12} /></>}
          </button>
        </div>
      </div>
    </div>
  )
}
