'use client'

import { useState, useEffect } from 'react'
import { SUBJECTS } from '@/lib/data'
import { TIMETABLE_SLOTS, WEEKDAYS } from '@/lib/data'
import { Dna, FlaskConical, Zap, Ruler, BookOpen, X } from 'lucide-react'

interface Props {
  day: string
  onDayChange: (day: string) => void
}

interface UserSlot {
  id: number
  day: string
  time: string
  subjectId: string
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const DAY_ABBR = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

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

function loadSlots(): UserSlot[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem('topiq-timetable-slots')
    return raw ? JSON.parse(raw) : []
  } catch { return [] }
}

export function TimetablePane({ day, onDayChange }: Props) {
  const [userSlots, setUserSlots] = useState<UserSlot[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [time, setTime] = useState('')
  const [subj, setSubj] = useState('')
  const [selDay, setSelDay] = useState(day.substring(0, 3))

  useEffect(() => { setUserSlots(loadSlots()) }, [])

  const saveSlots = (slots: UserSlot[]) => {
    setUserSlots(slots)
    localStorage.setItem('topiq-timetable-slots', JSON.stringify(slots))
  }

  const dayAbbr = day.substring(0, 3)
  const defaultSlots = TIMETABLE_SLOTS.filter(s => WEEKDAYS[s.weekday] === dayAbbr)
  const extraSlots = userSlots.filter(s => s.day === dayAbbr)
  const allSlots = [...defaultSlots, ...extraSlots].sort((a, b) => {
    const tA = 'time' in a ? (a as UserSlot).time : (a as typeof TIMETABLE_SLOTS[0]).time
    const tB = 'time' in b ? (b as UserSlot).time : (b as typeof TIMETABLE_SLOTS[0]).time
    return tA.localeCompare(tB, undefined, { numeric: true })
  })

  const handleAdd = () => {
    if (!time.trim() || !subj) return
    const newSlot: UserSlot = { id: Date.now(), day: selDay, time: time.trim(), subjectId: subj }
    saveSlots([...userSlots, newSlot])
    const fullDay = DAYS.find(d => d.substring(0, 3) === selDay)
    if (fullDay) onDayChange(fullDay)
    setTime('')
    setSubj('')
    setModalOpen(false)
  }

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

      <div className="bg-surface-50 border border-ash-line rounded-[14px]">
        {allSlots.length === 0 ? (
          <p className="text-center py-8 text-ash text-[14px]">No classes scheduled for {day}</p>
        ) : allSlots.map((slot, i) => {
          const isUser = 'id' in slot
          const s = slot as UserSlot
          const d = slot as typeof TIMETABLE_SLOTS[0]
          const subject = SUBJECTS.find(sj => sj.id === (isUser ? s.subjectId : d.subjectId))
          return (
            <div key={isUser ? s.id : i} className="flex items-center gap-3 py-3.5 px-4 border-b border-ash-line last:border-b-0">
              <div className="w-[34px] h-[34px] rounded-[9px] flex items-center justify-center shrink-0 bg-paper-dim text-surface-900">
                {subject?.icon || <BookOpen size={15} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[14px] font-bold text-surface-900">{isUser ? subject?.name || 'Unknown' : d.title}</div>
                <div className="text-[12px] text-ash">{isUser ? s.time : d.time}</div>
              </div>
              {!isUser && (
                <span className={`font-mono text-[10.5px] font-semibold px-2 py-1 rounded-[8px] ${tagColors[d.tag] || 'bg-paper-dim text-ash'}`}>
                  {d.tag}
                </span>
              )}
              {isUser && (
                <span className="font-mono text-[10.5px] font-semibold px-2 py-1 rounded-[8px] bg-paper-dim text-ash">You</span>
              )}
            </div>
          )
        })}
      </div>

      <button onClick={() => { setSelDay(day.substring(0, 3)); setModalOpen(true) }}
        className="w-full bg-none border border-dashed border-ash-line text-ash rounded-[14px] py-3 font-bold text-[13px] cursor-pointer mt-2.5 hover:border-brand-600 hover:text-brand-600 transition">
        + Add a class
      </button>

      {modalOpen && (
        <div className="fixed inset-0 bg-[rgba(20,23,43,0.55)] z-100 flex items-end justify-center lg:items-center"
          onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false) }}>
          <div className="bg-surface-50 w-full max-w-[520px] max-h-[82vh] overflow-y-auto rounded-[20px_20px_0_0] lg:rounded-[20px] p-5 mx-auto">
            <button onClick={() => setModalOpen(false)}
              className="float-right bg-paper-dim border-none w-[30px] h-[30px] rounded-full cursor-pointer text-sm flex items-center justify-center text-surface-500 hover:text-surface-700">
              <X size={14} />
            </button>
            <h2 className="font-display text-[20px] font-semibold text-surface-900 mb-2.5 clear-both">Add a class</h2>

            <div className="mb-4">
              <span className="font-mono text-[10.5px] font-bold text-ash uppercase tracking-[.05em] block mb-2">What time?</span>
              <input type="text" value={time} onChange={e => setTime(e.target.value)}
                placeholder="e.g. 2:30"
                className="w-full px-3.5 py-[11px] border-[1.5px] border-ash-line rounded-[10px] text-[14px] font-sans outline-none focus:border-brand-600 bg-transparent text-surface-900 placeholder:text-ash" />
            </div>

            <div className="mb-4">
              <span className="font-mono text-[10.5px] font-bold text-ash uppercase tracking-[.05em] block mb-2">Subject</span>
              <div className="flex gap-2 flex-wrap">
                {SUBJECTS.map(s => (
                  <button key={s.id} onClick={() => setSubj(s.id)}
                    className={`shrink-0 inline-flex items-center gap-1 text-[12.5px] font-bold px-3 py-1.5 rounded-[16px] border-[1.5px] cursor-pointer whitespace-nowrap transition ${
                      subj === s.id ? 'bg-brand-50 border-brand-600 text-brand-600' : 'bg-surface-50 border-ash-line text-ash hover:border-brand-600'
                    }`}>
                    {s.icon} {s.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <span className="font-mono text-[10.5px] font-bold text-ash uppercase tracking-[.05em] block mb-2">Day</span>
              <div className="flex gap-2 flex-wrap">
                {DAY_ABBR.map(d => (
                  <button key={d} onClick={() => setSelDay(d)}
                    className={`shrink-0 font-mono text-[11px] font-semibold px-3 py-1.5 rounded-[14px] border-[1.5px] cursor-pointer transition ${
                      selDay === d ? 'bg-brand-50 border-brand-600 text-brand-600' : 'bg-surface-50 border-ash-line text-ash hover:border-brand-600'
                    }`}>
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={handleAdd} disabled={!time.trim() || !subj}
              className="bg-brand-600 text-surface-50 border-none px-5 py-[11px] rounded-[22px] font-bold text-[13px] cursor-pointer mt-2 disabled:bg-ash-line disabled:text-ash disabled:cursor-not-allowed">
              Add Class →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
