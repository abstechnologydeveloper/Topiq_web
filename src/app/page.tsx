'use client'

import Link from 'next/link'
import { SUBJECTS, TOPICS } from '@/lib/data'
import { Eyebrow, PromoBanner, PromoteCard } from '@/components/ui/shared'

export default function Home() {
  const user = { name: 'Chidinma', grade: 'SS2' }
  const weak = TOPICS.filter(t => t.masteryScore < 60).sort((a, b) => a.masteryScore - b.masteryScore).slice(0, 4)
  const topWeak = weak[0]
  const subj = topWeak ? SUBJECTS.find(s => s.id === topWeak.subjectId) : null

  return (
    <div>
      <div className="mb-4">
        <div className="font-display text-[20px] font-semibold text-surface-900">Good afternoon, {user.name} 👋</div>
        <div className="text-[13px] text-ash mt-0.5">{user.grade} · <strong>47 days</strong> to WAEC</div>
      </div>

      <div className="search-wrap mb-4">
        <div className="flex items-center gap-2.5 bg-surface-50 border border-ash-line rounded-[26px] px-4 py-3">
          <svg className="text-ash shrink-0" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>
          </svg>
          <input type="text" placeholder="Search any topic, e.g. osmosis…"
            className="flex-1 border-none outline-none text-[14.5px] font-sans bg-transparent text-surface-900 placeholder:text-ash" />
          <span className="text-base shrink-0">✨</span>
        </div>
      </div>

      <Eyebrow>Today's plan</Eyebrow>

      {subj && topWeak && (
        <Link href={`/subjects/${subj.id}`}
          className="block rounded-[--radius] border border-ash-line bg-surface-50 p-4 mb-4 hover:border-brand-600 transition cursor-pointer">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-[11px] font-semibold text-ash uppercase tracking-wide">Up next · {subj.name}</div>
              <div className="font-display text-[17px] font-semibold text-surface-900 mt-0.5">{subj.icon} {topWeak.name}</div>
            </div>
            <div className="text-[13px] font-bold text-ash">{topWeak.masteryScore}%</div>
          </div>
          <div className="h-[6px] rounded-full bg-ash-line overflow-hidden">
            <div className="h-full rounded-full bg-brand-600 transition-all" style={{ width: `${topWeak.masteryScore}%` }} />
          </div>
        </Link>
      )}

      <div className="grid grid-cols-3 gap-2.5 mb-5">
        <Link href="/timetable" className="rounded-[14px] border border-ash-line bg-surface-50 p-3 text-center hover:border-brand-600 transition cursor-pointer">
          <div className="text-[22px]">📅</div>
          <div className="text-[12.5px] font-bold text-surface-900 mt-1">Timetable</div>
          <div className="text-[10.5px] text-ash">3 sessions today</div>
        </Link>
        <Link href="/challenges" className="rounded-[14px] border border-ash-line bg-surface-50 p-3 text-center hover:border-brand-600 transition cursor-pointer">
          <div className="text-[22px]">🏆</div>
          <div className="text-[12.5px] font-bold text-surface-900 mt-1">Challenges</div>
          <div className="text-[10.5px] text-ash">4 to try</div>
        </Link>
        <Link href="/assignments" className="rounded-[14px] border border-ash-line bg-surface-50 p-3 text-center hover:border-brand-600 transition cursor-pointer">
          <div className="text-[22px]">📋</div>
          <div className="text-[12.5px] font-bold text-surface-900 mt-1">Assignments</div>
          <div className="text-[10.5px] text-ash">Sent by teachers</div>
        </Link>
      </div>

      <div className="flex items-baseline justify-between mb-2.5">
        <Eyebrow className="mb-0">Your subjects</Eyebrow>
        <Link href="/subjects" className="text-[12px] font-bold text-brand-600">See all →</Link>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-0.5 no-scrollbar mb-4">
        {SUBJECTS.map(s => (
          <Link key={s.id} href={`/subjects/${s.id}`}
            className="shrink-0 text-[12.5px] font-semibold px-3 py-1.5 rounded-full border border-ash-line bg-surface-50 text-surface-700 hover:border-brand-600 transition whitespace-nowrap">
            {s.icon} {s.name}
          </Link>
        ))}
      </div>

      <PromoBanner
        icon="🎓"
        title="WAEC registration closes in 6 weeks"
        sub="Get the Exam-Ready Pass — unlimited Sabi AI + mock exams through results day"
        onClick={() => window.location.href = '/subscription'}
      />

      <PromoteCard
        icon="✏️"
        title="Practice"
        sub="Sharpen any topic, any board"
        onClick={() => window.location.href = '/practice'}
      />
    </div>
  )
}
