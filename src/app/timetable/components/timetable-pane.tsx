import { Dna, FlaskConical, Zap, Ruler, BookOpen } from 'lucide-react'
import { TIMETABLE_SLOTS, WEEKDAYS } from '@/lib/data'

interface Props {
  day: string
  onDayChange: (day: string) => void
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

const tagColors: Record<string, string> = {
  Study: 'bg-brand-50 text-brand-600',
  Practice: 'bg-coral-soft text-coral',
  Tutorial: 'bg-violet-soft text-violet',
  CBT: 'bg-ember-soft text-secondary-600',
  Flashcards: 'bg-paper-dim text-ash',
}

const subjectIcon = (id: string) => {
  switch (id) {
    case 'biology': return <Dna size={15} />
    case 'chemistry': return <FlaskConical size={15} />
    case 'physics': return <Zap size={15} />
    case 'mathematics': return <Ruler size={15} />
    default: return <BookOpen size={15} />
  }
}

export function TimetablePane({ day, onDayChange }: Props) {
  const slotsForDay = TIMETABLE_SLOTS.filter(s => WEEKDAYS[s.weekday] === day.substring(0, 3))

  return (
    <div>
      <div className="flex gap-1.5 overflow-x-auto pb-1 mb-4 no-scrollbar">
        {DAYS.map(d => (
          <button key={d} onClick={() => onDayChange(d)}
            className={`shrink-0 font-mono text-[11px] font-semibold px-2.5 py-1.5 rounded-[14px] border cursor-pointer transition ${
              day === d ? 'bg-brand-50 border-brand-600 text-brand-600' : 'bg-surface-50 border-ash-line text-ash hover:border-brand-600'
            }`}>
            {d.substring(0, 3)}
          </button>
        ))}
      </div>
      <div className="bg-surface-50 border border-ash-line rounded-[--radius]">
        {slotsForDay.length === 0 ? (
          <p className="text-center py-8 text-ash text-[14px]">No classes scheduled for {day}</p>
        ) : slotsForDay.map((slot, i) => (
          <div key={i} className="flex items-center gap-3 py-3.5 px-1 border-b border-ash-line last:border-b-0">
            <div className="w-[34px] h-[34px] rounded-[9px] flex items-center justify-center shrink-0 bg-paper-dim text-surface-900">
              {subjectIcon(slot.subjectId)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[14px] font-bold text-surface-900">{slot.title}</div>
              <div className="text-[12px] text-ash">{slot.time}</div>
            </div>
            <span className={`font-mono text-[10.5px] font-semibold px-2 py-1 rounded-[8px] ${tagColors[slot.tag] || 'bg-paper-dim text-ash'}`}>
              {slot.tag}
            </span>
          </div>
        ))}
      </div>
      <button className="w-full bg-none border border-dashed border-ash-line text-ash rounded-[14px] py-3 font-bold text-[13px] cursor-pointer mt-2.5 hover:border-brand-600 hover:text-brand-600 transition">
        + Add a class
      </button>
    </div>
  )
}
