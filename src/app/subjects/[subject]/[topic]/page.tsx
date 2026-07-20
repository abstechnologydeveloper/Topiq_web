'use client'

import { use, useState } from 'react'
import Link from 'next/link'
import { SUBJECTS, TOPICS } from '@/lib/data'
import { Eyebrow } from '@/components/ui/shared'
import { ArrowLeft } from 'lucide-react'
import { TutorialContent } from './components/tutorial-content'
import { QuestionCard } from './components/question-card'

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
            <ArrowLeft size={16} />
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

      <TutorialContent subj={subj} tutorial={topic.tutorial} topicName={topic.name} />

      {q && (
        <QuestionCard
          question={q}
          currentQ={currentQ}
          total={topic.questions.length}
          selected={selected}
          isComplete={isComplete}
          subjName={subj.name}
          topicName={topic.name}
          onSelect={handleSelect}
          onNext={nextQ}
        />
      )}
    </div>
  )
}
