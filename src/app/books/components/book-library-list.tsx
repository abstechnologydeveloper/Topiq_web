'use client'

import { ChevronRight } from 'lucide-react'
import { SUBJECTS } from '@/lib/data'

interface BookLibraryListProps {
  bookType: 'textbooks' | 'pastquestions'
  genreId: string
}

const GENRE_LABELS: Record<string, string> = {
  all: 'All Genres',
  literature: 'Literature & Set Texts',
  science: 'Science & Technology',
  math: 'Mathematics & Further Maths',
  social: 'Social Studies & Geography',
  language: 'Language & Composition',
  reference: 'Reference & Dictionaries',
  religious: 'Religious & Moral Studies',
  arts: 'Arts & Humanities',
}

export function BookLibraryList({ bookType, genreId }: BookLibraryListProps) {
  const label = GENRE_LABELS[genreId] || 'Books'

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-[15px] text-surface-900">{label}</h3>
        <span className="text-[11px] text-ash font-mono">
          {SUBJECTS.length} {bookType === 'textbooks' ? 'subjects' : 'subjects'}
        </span>
      </div>
      <div className="space-y-2.5">
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
              <div className="text-[11px] text-ash">
                {s.topicCount} {bookType === 'textbooks' ? 'textbooks' : 'question banks'}
              </div>
            </div>
            <span className="inline-block text-[10px] font-semibold font-mono px-2 py-0.5 rounded bg-brand-50 text-brand-600">
              {bookType === 'textbooks' ? 'Textbook' : 'Past Q'}
            </span>
            <ChevronRight size={16} className="text-ash shrink-0" />
          </div>
        ))}
      </div>
    </div>
  )
}
