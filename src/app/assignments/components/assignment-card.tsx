import type { ReactNode } from 'react'
import { Check } from 'lucide-react'

interface Props {
  icon: ReactNode
  title: string
  teacher: string
  due: string
  status: 'pending' | 'done'
}

export function AssignmentCard({ icon, title, teacher, due, status }: Props) {
  return (
    <div className="flex items-center gap-3 bg-surface-50 border border-ash-line rounded-[14px] p-3.5 cursor-pointer hover:border-brand-600 transition">
      <div className="w-9.5 h-9.5 rounded-[10px] flex items-center justify-center shrink-0 bg-paper-dim text-surface-900">{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="font-bold text-[13.5px] text-surface-900">{title}</div>
        <div className="text-[11.5px] text-ash">{teacher} · Due {due}</div>
      </div>
      <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-[20px] ${
        status === 'done' ? 'bg-surface-900 text-surface-50' : 'bg-paper-dim text-ash'
      }`}>
        {status === 'done' ? <><Check size={11} className="inline" /> Done</> : 'Pending'}
      </span>
    </div>
  )
}
