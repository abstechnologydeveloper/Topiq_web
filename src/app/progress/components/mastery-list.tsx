import { SUBJECTS } from '@/lib/data'

export function MasteryList() {
  return (
    <div className="bg-surface-50 border border-ash-line rounded-[--radius]">
      {SUBJECTS.map(s => (
        <div key={s.id} className="flex items-center gap-3 py-3 px-1 border-b border-ash-line last:border-b-0">
          <div className="text-[13px] font-semibold text-surface-900 w-[104px] shrink-0 flex items-center gap-1.5">
            {s.icon} {s.name}
          </div>
          <div className="flex-1 h-[6px] rounded-full bg-ash-line overflow-hidden">
            <div className="h-full rounded-full bg-brand-600 transition-all" style={{ width: `${s.masteryScore}%` }} />
          </div>
          <div className="font-mono text-[11px] text-ash w-[30px] text-right shrink-0">{s.masteryScore}%</div>
        </div>
      ))}
    </div>
  )
}
