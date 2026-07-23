'use client'

import type { ReactNode } from 'react'
import { Check, ArrowRight } from 'lucide-react'

interface Props {
  icon: ReactNode
  title: string
  className: string
  subject: string
  dueLabel: string
  status: 'pending' | 'done'
  onStart: () => void
}

export function AssignmentCard({ icon, title, className, subject, dueLabel, status, onStart }: Props) {
  const dueColor =
    dueLabel === 'Today' ? 'text-coral' :
    dueLabel === 'Tomorrow' ? 'text-secondary-600' :
    'text-ash'

  return (
    <div className="bg-surface-50 border border-ash-line rounded-[14px] p-3.5">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9.5 h-9.5 rounded-[10px] flex items-center justify-center shrink-0 bg-paper-dim text-surface-900">{icon}</div>
          <div className="font-bold text-[13.5px] text-surface-900 truncate">{title}</div>
        </div>
        <div className={`font-mono text-[10.5px] font-bold shrink-0 ml-2 ${dueColor}`}>{dueLabel}</div>
      </div>
      <div className="text-[11.5px] text-ash mb-2.5 pl-[47px]">{className} · set by your teacher</div>
      <div className="flex items-center justify-between pl-[47px]">
        <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-[20px] ${
          status === 'done' ? 'bg-surface-900 text-surface-50' : 'bg-paper-dim text-ash'
        }`}>
          {status === 'done' ? <><Check size={11} /> Submitted</> : 'Pending'}
        </span>
        <button onClick={onStart}
          className="text-[12px] font-bold text-brand-600 bg-none border-none cursor-pointer flex items-center gap-1 hover:text-brand-700 transition">
          {status === 'done' ? 'Review again' : 'Start'} <ArrowRight size={13} />
        </button>
      </div>
    </div>
  )
}
