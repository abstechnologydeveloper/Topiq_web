'use client'

import Link from 'next/link'
import { SUBJECTS } from '@/lib/data'
import { Eyebrow, PageTitle } from '@/components/ui/shared'

export default function SubjectsPage() {
  return (
    <div>
      <Eyebrow>Your library</Eyebrow>
      <PageTitle title="Subjects" sub="Every subject, grounded in your syllabus — no board attached to learning." />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {SUBJECTS.map(s => (
          <Link key={s.id} href={`/subjects/${s.id}`}
            className="flex items-center gap-3.5 bg-surface-50 border border-ash-line rounded-[--radius] p-3.5 cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(20,23,43,0.08)] transition-all">
            <div className="w-[44px] h-[44px] rounded-[12px] flex items-center justify-center text-[22px] shrink-0" style={{ backgroundColor: `${s.colorHex}18` }}>
              {s.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-[15.5px] text-surface-900">{s.name}</div>
              <div className="text-[12.5px] text-ash">{s.topicCount} topics · {s.questionCount} questions</div>
            </div>
            <svg className="text-ash shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </Link>
        ))}
      </div>
    </div>
  )
}
