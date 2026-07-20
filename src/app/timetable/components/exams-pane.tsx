import { DEADLINES } from '@/lib/data'
import { Eyebrow } from '@/components/ui/shared'

export function ExamsPane() {
  return (
    <div>
      <Eyebrow>Countdown</Eyebrow>
      <div className="space-y-2">
        {DEADLINES.map((d, i) => (
          <div key={i} className="flex items-center gap-3 bg-surface-50 border border-ash-line rounded-[14px] p-3.5 cursor-pointer hover:translate-x-0.5 hover:border-brand-600 transition-all">
            <div className="w-[32px] h-[32px] rounded-[9px] flex items-center justify-center text-[14px] shrink-0 text-surface-900" style={{ background: `${d.colorHex}18` }}>
              {d.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13.5px] font-bold text-surface-900">{d.title}</div>
              <div className="text-[11.5px] text-ash">{d.date} · {d.daysLeft} days away</div>
            </div>
            <span className="font-mono text-[10px] font-semibold text-coral bg-coral-soft px-2 py-[3px] rounded-[10px] shrink-0">{d.daysLeft}d</span>
          </div>
        ))}
      </div>
    </div>
  )
}
