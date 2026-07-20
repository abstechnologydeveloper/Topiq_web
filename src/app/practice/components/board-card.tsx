import type { ReactNode } from 'react'
import { ChevronRight } from 'lucide-react'

interface Props {
  flag: ReactNode
  name: string
  sub: string
}

export function BoardCard({ flag, name, sub }: Props) {
  return (
    <div onClick={() => window.location.href = '/practice/session'}
      className="flex items-center gap-3.5 bg-surface-50 border border-ash-line rounded-[--radius] p-3.5 cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(20,23,43,0.08)] transition-all">
      <div className="w-[44px] h-[44px] rounded-[12px] flex items-center justify-center shrink-0 bg-paper-dim text-surface-900">
        {flag}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-bold text-[15.5px] text-surface-900">{name}</div>
        <div className="text-[12.5px] text-ash">{sub}</div>
      </div>
      <ChevronRight size={18} className="text-ash shrink-0" />
    </div>
  )
}
