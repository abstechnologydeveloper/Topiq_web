'use client'

import { use, useState } from 'react'
import Link from 'next/link'
import { SUBJECTS, TOPICS, PAPERS } from '@/lib/data'
import { Eyebrow, SearchBar, Subnav } from '@/components/ui/shared'
import { ArrowLeft } from 'lucide-react'
import { OverviewTab } from './components/overview-tab'
import { LearnTab } from './components/learn-tab'
import { FlashcardsTab } from './components/flashcards-tab'
import { PastPapersTab } from './components/past-papers-tab'

const TABS = ['Overview', 'Learn', 'Flashcards', 'Past Papers']

export default function SubjectPage({ params }: { params: Promise<{ subject: string }> }) {
  const { subject: slug } = use(params)
  const subj = SUBJECTS.find(s => s.id === slug)
  const [tab, setTab] = useState('Overview')

  const [fcIdx, setFcIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [fcCards, setFcCards] = useState<number[]>([])
  const [fcDone, setFcDone] = useState(false)

  if (!subj) return <div className="text-center py-20 text-ash">Subject not found</div>

  const topics = TOPICS.filter(t => t.subjectId === slug)
  const allCards = topics.flatMap(t => t.flashcards)
  const papers = PAPERS[slug] || []

  const startFc = () => {
    setFcIdx(0)
    setFlipped(false)
    setFcDone(false)
    setFcCards(allCards.map((_, i) => i))
  }

  const rateCard = (rating: string) => {
    if (fcCards.length === 0) return
    const ci = fcCards[fcIdx % fcCards.length]
    const next = [...fcCards]
    if (rating !== 'again') next.splice(next.indexOf(ci), 1)
    setFcCards(next)
    setFlipped(false)
    setFcIdx(prev => prev + 1)
    if (next.length === 0) setFcDone(true)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3.5">
        <Link href="/subjects" className="flex items-center gap-2 text-ash text-[13px] font-semibold">
          <ArrowLeft size={16} />
          Subjects
        </Link>
        <span className="font-mono text-[9.5px] font-bold uppercase tracking-[.04em] bg-paper-dim text-ash px-[7px] py-[2px] rounded-[8px]">SS2</span>
      </div>

      <div className="flex items-center gap-3 mb-3.5">
        <div className="w-[44px] h-[44px] rounded-[12px] flex items-center justify-center shrink-0" style={{ backgroundColor: `${subj.colorHex}18` }}>
          <span className="text-surface-900">{subj.icon}</span>
        </div>
        <h1 className="font-display text-[25px] font-semibold tracking-[-0.01em] text-surface-900">{subj.name}</h1>
      </div>

      <SearchBar placeholder={`Search a topic in ${subj.name}…`} />

      <Subnav tabs={TABS} active={tab} onChange={(t) => { setTab(t); if (t === 'Flashcards') startFc() }} />

      {tab === 'Overview' && <OverviewTab subj={subj} slug={slug} topics={topics} />}
      {tab === 'Learn' && <LearnTab subj={subj} slug={slug} topics={topics} />}
      {tab === 'Flashcards' && (
        <FlashcardsTab
          flipped={flipped}
          fcIdx={fcIdx}
          fcCards={fcCards}
          fcDone={fcDone}
          allCards={allCards}
          onFlip={() => setFlipped(!flipped)}
          onRate={rateCard}
          onRestart={startFc}
        />
      )}
      {tab === 'Past Papers' && <PastPapersTab subj={subj} papers={papers} />}
    </div>
  )
}
