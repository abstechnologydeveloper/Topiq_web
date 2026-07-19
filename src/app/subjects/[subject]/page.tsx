'use client'

import { use, useState } from 'react'
import Link from 'next/link'
import { SUBJECTS, TOPICS, PAPERS } from '@/lib/data'
import { Eyebrow, TopicRow, RecommendCard, GroundingChip, SearchBar, Subnav } from '@/components/ui/shared'

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
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
          Subjects
        </Link>
        <span className="font-mono text-[9.5px] font-bold uppercase tracking-[.04em] bg-paper-dim text-ash px-[7px] py-[2px] rounded-[8px]">SS2</span>
      </div>

      <div className="flex items-center gap-3 mb-3.5">
        <div className="w-[44px] h-[44px] rounded-[12px] flex items-center justify-center text-[22px] shrink-0" style={{ backgroundColor: `${subj.colorHex}18` }}>
          {subj.icon}
        </div>
        <h1 className="font-display text-[25px] font-semibold tracking-[-0.01em] text-surface-900">{subj.name}</h1>
      </div>

      <SearchBar placeholder={`Search a topic in ${subj.name}…`} />

      <Subnav tabs={TABS} active={tab} onChange={(t) => { setTab(t); if (t === 'Flashcards') startFc() }} />

      {tab === 'Overview' && (
        <div>
          {topics.length > 0 && (
            <RecommendCard
              eyebrow="Recommended next"
              title={topics.find(t => t.masteryScore < 100)?.name || topics[0].name}
              cta="Start"
            />
          )}
          <div className="bg-surface-50 border border-ash-line rounded-[--radius] px-4">
            {topics.map(t => (
              <TopicRow
                key={t.id}
                name={`${subj.icon} ${t.name}`}
                pct={t.masteryScore}
                onClick={() => window.location.href = `/subjects/${slug}/${t.id}`}
              />
            ))}
          </div>
        </div>
      )}

      {tab === 'Learn' && (
        <div>
          <Eyebrow>Watch, read & understand</Eyebrow>
          <div className="space-y-2.5">
            {topics.map(t => (
              <div key={t.id}
                onClick={() => window.location.href = `/subjects/${slug}/${t.id}`}
                className="flex gap-3 bg-surface-50 border border-ash-line rounded-[14px] p-3 cursor-pointer hover:border-brand-600 hover:-translate-y-[1px] transition-all">
                <div className="w-[76px] h-[76px] rounded-[12px] shrink-0 flex items-center justify-center text-[24px] relative" style={{ background: `${subj.colorHex}18` }}>
                  {subj.icon}
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="text-[14px] font-bold text-surface-900 mb-1 leading-[1.3]">{t.name}</div>
                  <div className="text-[11.5px] text-ash flex items-center gap-2 mb-1.5">
                    <span className="font-mono font-semibold">{t.questions.length} questions</span>
                  </div>
                  <p className="text-[12.5px] text-ink-soft line-clamp-2 leading-[1.5]">{t.tutorial.split('\n')[0]}</p>
                </div>
              </div>
            ))}
          </div>

          <Eyebrow className="block mt-4">Still stuck? Ask Sabi AI right here</Eyebrow>
          <div className="flex items-center justify-between bg-paper-dim rounded-[12px] px-3.5 py-2.5 mb-3.5 text-[12px]">
            <span className="font-bold">3 questions left today (free plan)</span>
            <span className="font-mono font-bold text-brand-600 underline cursor-pointer">Get unlimited →</span>
          </div>

          <div className="flex items-center gap-1.5 border border-ash-line rounded-[26px] px-2 py-1.5">
            <button className="w-[36px] h-[36px] rounded-full bg-paper-dim flex items-center justify-center cursor-pointer shrink-0 hover:bg-ash-line transition">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
            </button>
            <button className="w-[36px] h-[36px] rounded-full bg-paper-dim flex items-center justify-center cursor-pointer shrink-0 hover:bg-ash-line transition">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0"/><path d="M12 19v3"/></svg>
            </button>
            <input type="text" placeholder={`Ask about ${subj.name}…`}
              className="flex-1 border-none outline-none text-[14px] font-sans bg-transparent text-surface-900 placeholder:text-ash px-2" />
            <button className="w-[36px] h-[36px] rounded-full bg-secondary-500 flex items-center justify-center cursor-pointer shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2.2"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4z"/></svg>
            </button>
          </div>
        </div>
      )}

      {tab === 'Flashcards' && (
        <div>
          {fcDone ? (
            <div className="text-center py-8 bg-surface-50 border border-ash-line rounded-[--radius] p-6">
              <Eyebrow className="justify-center">Deck reviewed</Eyebrow>
              <p className="text-[14px] text-ash mb-3">Cards marked "Again" will resurface sooner next session.</p>
              <button onClick={startFc} className="bg-surface-900 text-surface-50 border-none px-5 py-2.5 rounded-[20px] font-bold text-[12.5px] cursor-pointer">
                Review again
              </button>
            </div>
          ) : allCards.length > 0 && fcCards.length > 0 ? (
            <div className="flex flex-col items-center">
              <div className="w-full max-w-[420px] h-[190px] perspective-[1000px] mb-3.5 cursor-pointer"
                onClick={() => setFlipped(!flipped)}>
                <div className={`relative w-full h-full transition-transform duration-500 ${flipped ? '[transform:rotateY(180deg)]' : ''}`} style={{ transformStyle: 'preserve-3d' }}>
                  <div className="absolute inset-0 backface-hidden rounded-[16px] flex items-center justify-center text-center p-6 font-semibold text-[16px] bg-violet-soft text-surface-900 border border-violet"
                    style={{ backfaceVisibility: 'hidden' }}>
                    {allCards[fcCards[fcIdx % fcCards.length]]?.question}
                  </div>
                  <div className="absolute inset-0 backface-hidden rounded-[16px] flex items-center justify-center text-center p-6 font-medium text-[14px] leading-[1.5] bg-surface-900 text-surface-50 [transform:rotateY(180deg)]"
                    style={{ backfaceVisibility: 'hidden' }}>
                    {allCards[fcCards[fcIdx % fcCards.length]]?.answer}
                  </div>
                </div>
              </div>
              <div className="font-mono text-[12px] text-ash mb-2.5">Card {fcIdx + 1} of {allCards.length} · tap to flip</div>
              <div className="flex gap-2 w-full max-w-[420px]">
                <button onClick={() => rateCard('again')} className="flex-1 border border-ash-line bg-surface-50 rounded-[12px] py-2.5 font-bold text-[12px] text-coral cursor-pointer hover:bg-coral-soft transition">Again</button>
                <button onClick={() => rateCard('good')} className="flex-1 border border-ash-line bg-surface-50 rounded-[12px] py-2.5 font-bold text-[12px] text-secondary-500 cursor-pointer hover:bg-ember-soft transition">Good</button>
                <button onClick={() => rateCard('easy')} className="flex-1 border border-ash-line bg-surface-50 rounded-[12px] py-2.5 font-bold text-[12px] text-brand-600 cursor-pointer hover:bg-brand-50 transition">Easy</button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-ash">No flashcards for this subject yet.</div>
          )}
        </div>
      )}

      {tab === 'Past Papers' && (
        <div>
          <div className="flex items-center gap-3 bg-coral-soft border border-ash-line rounded-[14px] p-3.5 mb-4">
            <div className="w-[44px] h-[44px] rounded-full bg-coral flex items-center justify-center shrink-0 cursor-pointer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
            </div>
            <div>
              <div className="font-bold text-[14px]">Stuck on a past question?</div>
              <div className="text-[12.5px] text-ink-soft">Scan it in Learn — AbSTopiq grounds the answer in your syllabus</div>
            </div>
          </div>
          <div className="bg-surface-50 border border-ash-line rounded-[--radius] px-4">
            {papers.length === 0 ? (
              <p className="py-8 text-center text-ash">No past papers available yet.</p>
            ) : papers.map((p, i) => (
              <div key={i} className="flex items-center gap-3 py-3 px-1 border-b border-ash-line cursor-pointer last:border-b-0 hover:bg-paper-dim/30 transition">
                <div className="w-[34px] h-[34px] rounded-[9px] shrink-0 flex items-center justify-center" style={{ background: `${subj.colorHex}18` }}>
                  <svg className="w-[17px] h-[17px]" viewBox="0 0 24 24" fill="none" stroke={subj.colorHex} strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] font-bold text-surface-900">{p.name}</div>
                  <div className="text-[12px] text-ash">{p.exam} · {p.year}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
