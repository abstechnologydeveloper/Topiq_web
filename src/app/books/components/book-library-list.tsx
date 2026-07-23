'use client'

import { ChevronRight } from 'lucide-react'
import { SUBJECTS } from '@/lib/data'

interface BookLibraryListProps {
  bookType: 'textbooks' | 'pastquestions'
  genreId: string
}

const GENRE_SUBJECTS: Record<string, string[]> = {
  all: ['biology', 'chemistry', 'physics', 'mathematics', 'english'],
  literature: ['english'],
  science: ['biology', 'chemistry', 'physics'],
  math: ['mathematics'],
  social: [],
  language: ['english'],
  reference: [],
  religious: [],
  arts: [],
}

export function BookLibraryList({ bookType, genreId }: BookLibraryListProps) {
  const subjectIds = GENRE_SUBJECTS[genreId] || []
  const items = genreId === 'all' ? SUBJECTS : SUBJECTS.filter((s) => subjectIds.includes(s.id))

  if (items.length === 0) {
    return (
      <div className="text-center py-10 text-ash text-[13px]">
        No {bookType === 'textbooks' ? 'textbooks' : 'question banks'} available in this genre yet.
      </div>
    )
  }

  return (
    <div className="space-y-2.5">
      {items.map((s) => (
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
