import { SUBJECTS } from '@/lib/data'
import { ChevronRight } from 'lucide-react'

export function SubjectCardList() {
  return (
    <div>
      <p className="text-[13.5px] text-ash mb-4 -mt-1">Normal practice questions, no specific exam board — just topic-level revision.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {SUBJECTS.map(s => (
          <div key={s.id} onClick={() => window.location.href = '/practice/session'}
            className="flex items-center gap-3.5 bg-surface-50 border border-ash-line rounded-[--radius] p-3.5 cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(20,23,43,0.08)] transition-all">
            <div className="w-[44px] h-[44px] rounded-[12px] flex items-center justify-center shrink-0" style={{ backgroundColor: `${s.colorHex}18` }}>
              <span className="text-surface-900">{s.icon}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-[15.5px] text-surface-900">{s.name}</div>
              <div className="text-[12.5px] text-ash">{s.questionCount} questions</div>
            </div>
            <ChevronRight size={18} className="text-ash shrink-0" />
          </div>
        ))}
      </div>
    </div>
  )
}
