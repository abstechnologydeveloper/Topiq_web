'use client'

import { ChevronRight } from 'lucide-react'
import { SUBJECTS } from '@/lib/data'

interface BookLibraryListProps {
  bookType: 'textbooks' | 'pastquestions'
  genreId: string
}

export function BookLibraryList({ bookType, genreId }: BookLibraryListProps) {
  return (
    <div className="space-y-2.5 mt-4">
      {SUBJECTS.map((s) => (
        <div
          key={s.id}
          className="flex items-center gap-3 bg-surface-50 border border-ash-line rounded-[14px] p-3 cursor-pointer hover:border-brand-600 transition"
        >
          <span
            className="w-[36px] h-[36px] rounded-[10px] flex items-center justify-center text-base shrink-0"
            style={{ backgroundColor: s.colorHex + '20', color: s.colorHex }}
          >
            {s.icon}
          </span>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-[13.5px] text-surface-900">{s.name}</div>
            <div className="text-[11px] text-ash">{s.topicCount} {bookType === 'textbooks' ? 'textbooks' : 'question banks'}</div>
          </div>
          <ChevronRight size={18} className="text-ash shrink-0" />
        </div>
      ))}
    </div>
  )
}
