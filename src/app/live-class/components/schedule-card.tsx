import { ChevronRight } from 'lucide-react'

export interface ScheduleItem {
  time: string
  subject: string
  topic: string
  status: 'completed' | 'live' | 'upcoming'
  slug: string
}

export function ScheduleCard({ s, onJoin }: { s: ScheduleItem; onJoin: (s: ScheduleItem) => void }) {
  return (
    <div
      onClick={() => s.status === 'live' && onJoin(s)}
      className={`flex items-center gap-3 bg-surface-50 border rounded-[14px] p-3.5 transition ${
        s.status === 'live'
          ? 'border-brand-600 bg-brand-50 cursor-pointer hover:-translate-y-0.5'
          : s.status === 'completed'
          ? 'border-ash-line opacity-50'
          : 'border-ash-line cursor-default'
      }`}
    >
      <div className="font-mono font-bold text-[12.5px] text-ash w-11.5 shrink-0">
        {s.time.split(' – ')[0]}
      </div>
      <div className="w-9.5 h-9.5 rounded-[10px] bg-paper-dim flex items-center justify-center text-[17px] shrink-0">
        {s.subject === 'Biology' && '🧬'}
        {s.subject === 'Chemistry' && '⚗️'}
        {s.subject === 'Physics' && '⚡'}
        {s.subject === 'Mathematics' && '📐'}
        {s.subject === 'English' && '📖'}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-bold text-[13.5px] text-surface-900">{s.topic}</div>
        <div className="text-[11.5px] text-ash">{s.subject} · SS2</div>
      </div>
      <div className="flex items-center gap-1.5">
        {s.status === 'live' && (
          <span className="flex items-center gap-1.5 font-bold text-[11.5px] text-brand-600">
            <span className="w-1.75 h-1.75 rounded-full bg-brand-600 animate-pulse" />
            Live
          </span>
        )}
        {s.status === 'completed' && <span className="font-bold text-[11.5px] text-ash">Completed</span>}
        {s.status === 'upcoming' && <span className="font-bold text-[11.5px] text-ash">{s.time.split(' – ')[1]}</span>}
        {s.status === 'live' && <ChevronRight size={16} className="text-brand-600" />}
      </div>
    </div>
  )
}
