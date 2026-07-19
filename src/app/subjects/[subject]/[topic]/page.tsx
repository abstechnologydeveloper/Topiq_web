'use client'

import { use, useState } from 'react'
import Link from 'next/link'
import { SUBJECTS, TOPICS } from '@/lib/data'
import { Eyebrow, GroundingChip } from '@/components/ui/shared'

export default function TopicPage({ params }: { params: Promise<{ subject: string; topic: string }> }) {
  const { subject: slug, topic: topicSlug } = use(params)
  const subj = SUBJECTS.find(s => s.id === slug)
  const topic = TOPICS.find(t => t.id === topicSlug)

  if (!subj || !topic) return <div className="text-center py-20 text-ash">Topic not found</div>

  const [currentQ, setCurrentQ] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [showExplain, setShowExplain] = useState(false)
  const [readingProgress, setReadingProgress] = useState(0)

  const q = topic.questions[currentQ]
  const isComplete = selected !== null

  const handleSelect = (idx: number) => {
    if (isComplete) return
    setSelected(idx)
    setShowExplain(true)
  }

  const nextQ = () => {
    if (currentQ + 1 < topic.questions.length) {
      setCurrentQ(i => i + 1)
      setSelected(null)
      setShowExplain(false)
    }
  }

  return (
    <div>
      <div className="sticky top-0 bg-surface-50 z-10 pt-2 pb-0">
        <div className="flex items-center gap-3 mb-3">
          <Link href={`/subjects/${slug}`}
            className="w-[34px] h-[34px] rounded-full bg-paper-dim flex items-center justify-center cursor-pointer shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
          </Link>
          <div className="flex-1 min-w-0">
            <Eyebrow className="mb-0">{subj.name}</Eyebrow>
            <h2 className="font-display text-[18px] font-semibold leading-[1.25] text-surface-900">{topic.name}</h2>
          </div>
        </div>
        <div className="h-[3px] bg-ash-line">
          <div className="h-full bg-brand-600 transition-all" style={{ width: `${readingProgress}%` }} />
        </div>
      </div>

      <div className="mt-4 space-y-4 max-w-[640px] mx-auto">
        <div className="bg-paper-dim rounded-[14px] p-4 flex items-center justify-center">
          <span className="text-[32px]">{subj.icon}</span>
        </div>

        <p className="text-[14.5px] leading-[1.7] text-ink-soft">{topic.tutorial.split('\n')[0]}</p>

        {topic.tutorial.split('\n').slice(1).map((line, i) => {
          if (line.startsWith('•') || line.startsWith('-')) {
            return <li key={i} className="text-[14px] text-ink-soft ml-4 leading-[1.6]">{line.replace(/^[•-]\s*/, '')}</li>
          }
          if (line.trim()) {
            return <p key={i} className="text-[14.5px] leading-[1.7] text-ink-soft">{line}</p>
          }
          return null
        })}

        {topic.tutorial.split('\n').length > 2 && (
          <GroundingChip text={`WAEC ${subj.name} — ${topic.name}`} />
        )}

        <div className="mt-6 pt-6 border-t border-ash-line">
          <Eyebrow>Practice question</Eyebrow>
          <div className="bg-surface-50 border border-ash-line rounded-[14px] p-4 mt-3">
            <div className="font-mono text-[11px] font-semibold text-ash mb-2.5">Question {currentQ + 1} of {topic.questions.length}</div>
            <p className="text-[15.5px] font-semibold leading-[1.5] text-surface-900 mb-4">{q.text}</p>

            <div className="space-y-2">
              {q.options.map((opt, i) => {
                let cls = 'border-ash-line hover:border-brand-600'
                if (isComplete && i === q.correctIndex) cls = 'border-surface-900 bg-surface-900 text-surface-50'
                else if (isComplete && i === selected && i !== q.correctIndex) cls = 'border-ash-line bg-paper-dim text-ash line-through'
                else if (isComplete) cls = 'border-ash-line bg-paper-dim text-ash'
                else if (selected === i) cls = 'border-brand-600 bg-brand-50'

                return (
                  <div key={i} onClick={() => handleSelect(i)}
                    className={`flex items-center gap-2.5 px-3.5 py-3 border-[1.5px] rounded-[12px] cursor-pointer text-[14px] font-medium transition ${cls}`}>
                    <span className="w-[22px] h-[22px] rounded-full bg-paper-dim flex items-center justify-center font-mono text-[11px] font-semibold shrink-0"
                      style={isComplete && i === q.correctIndex ? { background: '#fff', color: 'var(--color-surface-900)' } : {}}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                  </div>
                )
              })}
            </div>

            {showExplain && (
              <div className="mt-4 bg-paper-dim rounded-[12px] p-3.5 animate-fadeIn">
                <p className="text-[13.5px] leading-[1.55] text-ink-soft">{q.explanation}</p>
                <GroundingChip text={`§ WAEC ${subj.name} — ${topic.name}`} />
              </div>
            )}

            {isComplete && currentQ + 1 < topic.questions.length && (
              <div className="mt-3.5 text-right">
                <button onClick={nextQ}
                  className="bg-surface-900 text-surface-50 border-none px-[18px] py-[9px] rounded-[20px] font-bold text-[12.5px] cursor-pointer">
                  Next question →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
