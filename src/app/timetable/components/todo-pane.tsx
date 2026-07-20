import { DEADLINES } from '@/lib/data'
import { ArrowRight } from 'lucide-react'

export function TodoPane() {
  return (
    <div>
      <div className="flex items-center gap-3.5 bg-surface-900 text-surface-50 rounded-[--radius] p-4 mb-4">
        <div className="flex-1 min-w-0">
          <div className="font-mono text-[10.5px] text-ember-soft tracking-[.05em] uppercase mb-1">Due today</div>
          <div className="font-display text-[17px] font-semibold">2 tasks left</div>
        </div>
        <button className="shrink-0 bg-secondary-500 text-surface-900 border-none px-4 py-2 rounded-[20px] font-bold text-[12.5px] cursor-pointer">
          + Add task
        </button>
      </div>
      <div className="bg-surface-50 border border-ash-line rounded-[--radius]">
        {DEADLINES.slice(0, 2).map((d, i) => (
          <div key={i} className="flex items-center gap-3 py-3.5 px-1 border-b border-ash-line last:border-b-0">
            <div className="w-[34px] h-[34px] rounded-[9px] flex items-center justify-center shrink-0 bg-paper-dim text-surface-900">{d.icon}</div>
            <div className="flex-1 min-w-0">
              <div className="text-[14px] font-bold text-surface-900">{d.title}</div>
              <div className="text-[12px] text-ash">Due {d.date} · {d.daysLeft}d left</div>
            </div>
            <span className="font-mono text-[10.5px] font-bold text-brand-600 cursor-pointer flex items-center gap-1">Start <ArrowRight size={10} /></span>
          </div>
        ))}
      </div>
    </div>
  )
}
