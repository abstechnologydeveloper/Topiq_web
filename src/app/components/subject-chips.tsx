'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SUBJECTS, TOPICS } from '@/lib/data'
import { useAuthStore } from '@/lib/auth/store'
import { ChevronRight, Clock } from 'lucide-react'

export function SubjectChips() {
  const [active, setActive] = useState<string>(SUBJECTS[0]?.id || 'biology')
  const router = useRouter()
  const grade = useAuthStore(s => s.user?.grade || 'SS2')

  const activeSubject = active ? SUBJECTS.find(s => s.id === active) : null
  const topics = activeSubject
    ? TOPICS.filter(t => t.subjectId === activeSubject.id).slice(0, 5)
    : []

  const masteryColor = (score: number) =>
    score >= 60 ? 'var(--color-brand-600, #7C3AED)' : score >= 35 ? 'var(--color-secondary-500, #F4B400)' : 'var(--color-coral, #E5484D)'

  return (
    <div className="mb-4">
      <div className="flex gap-2.5 overflow-x-auto pb-1 no-scrollbar">
        {SUBJECTS.map(s => {
          const isActive = active === s.id
          return (
            <div key={s.id} onClick={() => setActive(s.id)}
              className={`shrink-0 flex flex-col items-center gap-1.5 min-w-[76px] px-2.5 py-3 border-[1.5px] rounded-[16px] cursor-pointer transition ${
                isActive ? 'border-brand-600 bg-brand-50' : 'border-ash-line bg-surface-50 hover:border-brand-600'
              }`}>
              <div className="w-[34px] h-[34px] rounded-[11px] bg-paper-dim flex items-center justify-center text-[16px]">
                {s.icon}
              </div>
              <div className={`text-[11.5px] font-bold whitespace-nowrap ${isActive ? 'text-brand-600' : 'text-ink-soft'}`}>
                {s.name.split(' ')[0]}
              </div>
              <div className="font-mono text-[11.5px] font-bold" style={{ color: masteryColor(s.masteryScore) }}>
                {s.masteryScore}%
              </div>
            </div>
          )
        })}
      </div>

      {activeSubject && topics.length > 0 && (
        <div className="mt-2.5">
          {topics.map((t, i) => {
            const mins = 12 + ((i * 7 + t.masteryScore) % 14)
            const barColor = t.masteryScore >= 60 ? 'var(--color-brand-600, #7C3AED)' : t.masteryScore >= 35 ? 'var(--color-secondary-500, #F4B400)' : 'var(--color-ash-line, #E7E3F2)'
            return (
              <div key={t.id} onClick={() => router.push(`/subjects/${activeSubject.id}/${t.id}`)}
                className="flex items-center gap-3 bg-surface-50 border border-ash-line rounded-[14px] px-3.5 py-3 mb-2.5 cursor-pointer hover:border-brand-600 transition">
                <div className="w-[36px] h-[36px] rounded-[10px] bg-paper-dim flex items-center justify-center text-[16px] shrink-0">
                  {activeSubject.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-[13.5px] text-surface-900">{t.name}</div>
                  <div className="text-[11px] text-ash">{grade} · {activeSubject.topicCount} sections</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[10.5px] text-ash mb-1.5 flex items-center justify-end gap-1"><Clock size={10} /> {mins} min</div>
                  <div className="w-[64px] h-[4px] rounded-full bg-ash-line overflow-hidden ml-auto">
                    <div className="h-full rounded-full transition-all" style={{ width: `${t.masteryScore}%`, background: barColor }} />
                  </div>
                </div>
              </div>
            )
          })}
          <div onClick={() => router.push(`/subjects/${activeSubject.id}`)}
            className="block text-center text-[12.5px] font-bold text-brand-600 py-1 cursor-pointer">
            View all {activeSubject.name} topics <ChevronRight size={12} className="inline" />
          </div>
        </div>
      )}
    </div>
  )
}
