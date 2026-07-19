'use client'

import Link from 'next/link'
import { DEADLINES } from '@/lib/data'
import { Eyebrow, PageTitle } from '@/components/ui/shared'

export default function AssignmentsPage() {
  const assignments = [
    { icon: '🧬', title: 'Biology: Cell Structure', subject: 'Biology', due: '12 Jun 2026', status: 'pending', teacher: 'Mrs. Adeyemi' },
    { icon: '⚗️', title: 'Chemistry: Periodic Table', subject: 'Chemistry', due: '15 Jun 2026', status: 'done', teacher: 'Mr. Okonkwo' },
    { icon: '📐', title: 'Mathematics: Algebra', subject: 'Mathematics', due: '18 Jun 2026', status: 'pending', teacher: 'Mr. Bello' },
  ]

  return (
    <div>
      <Link href="/" className="flex items-center gap-2 text-ash text-[13px] font-semibold mb-3.5 w-fit">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
        Discover
      </Link>
      <Eyebrow>From your teachers</Eyebrow>
      <PageTitle title="Assignments" sub="Work your teachers have set for your classes — do it here and it feeds straight back to them." />

      <div className="space-y-3">
        {assignments.map((a, i) => (
          <div key={i} className="flex items-center gap-3 bg-surface-50 border border-ash-line rounded-[14px] p-3.5 cursor-pointer hover:border-brand-600 transition">
            <div className="w-[38px] h-[38px] rounded-[10px] flex items-center justify-center text-[17px] shrink-0 bg-paper-dim">{a.icon}</div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-[13.5px] text-surface-900">{a.title}</div>
              <div className="text-[11.5px] text-ash">{a.teacher} · Due {a.due}</div>
            </div>
            <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-[20px] ${
              a.status === 'done' ? 'bg-surface-900 text-surface-50' : 'bg-paper-dim text-ash'
            }`}>
              {a.status === 'done' ? '✓ Done' : 'Pending'}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
