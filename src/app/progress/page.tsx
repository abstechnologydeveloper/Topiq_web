'use client'

import { SUBJECTS, TOPICS } from '@/lib/data'
import { Eyebrow, PageTitle, StatGrid } from '@/components/ui/shared'
import Link from 'next/link'
import { Flame, ArrowLeft } from 'lucide-react'
import { Heatmap } from './components/heatmap'
import { MasteryList } from './components/mastery-list'

export default function ProgressPage() {
  const avgMastery = Math.round(SUBJECTS.reduce((a, s) => a + s.masteryScore, 0) / SUBJECTS.length)
  const totalQ = TOPICS.reduce((a, t) => a + t.questions.length, 0)

  return (
    <div>
      <Link href="/" className="flex items-center gap-2 text-ash text-[13px] font-semibold mb-3.5 w-fit">
        <ArrowLeft size={16} />
        Discover
      </Link>
      <Eyebrow>This term</Eyebrow>
      <PageTitle title="Your progress" sub="Grounded in what you've actually covered, not a guess." />

      <div className="flex items-center gap-3 bg-surface-50 border border-ash-line rounded-[14px] p-3.5 mb-5 cursor-pointer"
        onClick={() => window.location.href = '/subscription'}>
        <Flame size={22} className="text-surface-900 shrink-0" />
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
      <Heatmap />

      <Eyebrow>Mastery by subject</Eyebrow>
      <MasteryList />
    </div>
  )
}
