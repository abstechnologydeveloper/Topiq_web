'use client'

import { SUBJECTS, TOPICS } from '@/lib/data'
import { Eyebrow, PageTitle, StatGrid } from '@/components/ui/shared'
import Link from 'next/link'

export default function ProgressPage() {
  const avgMastery = Math.round(SUBJECTS.reduce((a, s) => a + s.masteryScore, 0) / SUBJECTS.length)
  const totalQ = TOPICS.reduce((a, t) => a + t.questions.length, 0)

  return (
    <div>
      <Link href="/" className="flex items-center gap-2 text-ash text-[13px] font-semibold mb-3.5 w-fit">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
        Discover
      </Link>
      <Eyebrow>This term</Eyebrow>
      <PageTitle title="Your progress" sub="Grounded in what you've actually covered, not a guess." />

      <div className="flex items-center gap-3 bg-surface-50 border border-ash-line rounded-[14px] p-3.5 mb-5 cursor-pointer"
        onClick={() => window.location.href = '/subscription'}>
        <span className="text-[22px]">🔥</span>
        <div>
          <div className="font-bold text-[13.5px] text-surface-900">Free plan</div>
          <div className="text-[11.5px] text-ash">Upgrade to Plus for unlimited Sabi AI + mock exams</div>
        </div>
      </div>

      <StatGrid stats={[
        { num: '12', lbl: 'day streak' },
        { num: totalQ.toString(), lbl: 'questions asked' },
        { num: `${avgMastery}%`, lbl: 'avg. mastery' },
      ]} />

      <Eyebrow>Study activity, last 7 days</Eyebrow>
      <div className="grid grid-cols-[88px_repeat(7,1fr)] gap-1.5 items-center mb-5">
        <div />
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
          <div key={i} className="text-[9.5px] text-ash text-center font-mono">{d}</div>
        ))}
        {['8am', '10am', '12pm', '2pm', '4pm', '6pm'].map((t, i) => (
          <>
            <div key={t} className="text-[11.5px] font-bold text-ash">{t}</div>
            {[0, 1, 2, 3, 4, 5, 6].map((d) => {
              const levels = [0, 1, 2, 1, 0, 0, 0, 1, 3, 2, 1, 0, 2, 2, 1, 0, 0, 1, 3, 2, 1, 0, 2, 2, 1, 0, 0, 1, 3, 2, 1, 0, 2, 2, 1, 0, 0, 1, 3, 2, 1, 0]
              const idx = i * 7 + d
              const lvl = levels[idx % levels.length]
              const colors = ['bg-paper-dim', 'bg-brand-50', 'bg-brand-200', 'bg-brand-600']
              return <div key={d} className={`aspect-square rounded-[5px] ${colors[lvl] || 'bg-paper-dim'}`} />
            })}
          </>
        ))}
      </div>

      <Eyebrow>Mastery by subject</Eyebrow>
      <div className="bg-surface-50 border border-ash-line rounded-[--radius]">
        {SUBJECTS.map(s => (
          <div key={s.id} className="flex items-center gap-3 py-3 px-1 border-b border-ash-line last:border-b-0">
            <div className="text-[13px] font-semibold text-surface-900 w-[104px] shrink-0">{s.icon} {s.name}</div>
            <div className="flex-1 h-[6px] rounded-full bg-ash-line overflow-hidden">
              <div className="h-full rounded-full bg-brand-600 transition-all" style={{ width: `${s.masteryScore}%` }} />
            </div>
            <div className="font-mono text-[11px] text-ash w-[30px] text-right shrink-0">{s.masteryScore}%</div>
          </div>
        ))}
      </div>
    </div>
  )
}
