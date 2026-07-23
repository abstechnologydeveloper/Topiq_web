'use client'

import Link from 'next/link'
import { SUBJECTS } from '@/lib/data'
import { Eyebrow, PageTitle } from '@/components/ui/shared'
import { ChevronRight } from 'lucide-react'

const GRADE_LEVEL = 'SS2'

function ProgressCircle({ score, colorHex }: { score: number; colorHex: string }) {
  const r = 18
  const circ = 2 * Math.PI * r
  const offset = circ - (score / 100) * circ
  return (
    <div className="relative w-[44px] h-[44px] shrink-0">
      <svg viewBox="0 0 44 44" className="w-full h-full -rotate-90">
        <circle cx="22" cy="22" r={r} fill="none" stroke={`${colorHex}30`} strokeWidth="4" />
        <circle cx="22" cy="22" r={r} fill="none" stroke={colorHex} strokeWidth="4" strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[10.5px] font-bold text-surface-900">{score}%</span>
    </div>
  )
}

export default function SubjectsPage() {
  return (
    <div>
      <Eyebrow>Your library</Eyebrow>
      <PageTitle title="Subjects" sub="Every subject, grounded in your syllabus — no board attached to learning." />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {SUBJECTS.map(s => (
          <Link key={s.id} href={`/subjects/${s.id}`}
            className="flex items-center gap-3.5 bg-surface-50 border border-ash-line rounded-[--radius] p-3.5 cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(20,23,43,0.08)] transition-all">
            <ProgressCircle score={s.masteryScore} colorHex={s.colorHex} />
            <div className="flex-1 min-w-0">
              <div className="font-bold text-[15.5px] text-surface-900 flex items-center gap-1.5">{s.icon} {s.name}</div>
              <div className="text-[12.5px] text-ash">{s.topicCount} topics · {GRADE_LEVEL}</div>
            </div>
            <ChevronRight size={18} className="text-ash shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  )
}
