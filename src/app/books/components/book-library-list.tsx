'use client'

import { ChevronRight } from 'lucide-react'
import { SUBJECTS } from '@/lib/data'

interface BookLibraryListProps {
  bookType: 'books' | 'textbooks'
  genreId: string
}

const BOOKS_DATA: Record<string, { title: string; author: string }[]> = {
  all: [
    { title: 'Atomic Habits', author: 'James Clear' },
    { title: 'The Psychology of Money', author: 'Morgan Housel' },
    { title: 'Zero to One', author: 'Peter Thiel' },
    { title: 'Sapiens', author: 'Yuval Noah Harari' },
    { title: 'The Alchemist', author: 'Paulo Coelho' },
  ],
  'self-dev': [
    { title: 'Atomic Habits', author: 'James Clear' },
    { title: 'The 7 Habits of Highly Effective People', author: 'Stephen Covey' },
    { title: 'Think and Grow Rich', author: 'Napoleon Hill' },
  ],
  finance: [
    { title: 'The Psychology of Money', author: 'Morgan Housel' },
    { title: 'Rich Dad Poor Dad', author: 'Robert Kiyosaki' },
    { title: 'The Intelligent Investor', author: 'Benjamin Graham' },
  ],
  business: [
    { title: 'Zero to One', author: 'Peter Thiel' },
    { title: 'The Lean Startup', author: 'Eric Ries' },
    { title: 'Good to Great', author: 'Jim Collins' },
  ],
  history: [
    { title: 'Sapiens', author: 'Yuval Noah Harari' },
    { title: 'A People\'s History', author: 'Howard Zinn' },
    { title: 'The Diary of a Young Girl', author: 'Anne Frank' },
  ],
  fiction: [
    { title: 'The Alchemist', author: 'Paulo Coelho' },
    { title: 'Things Fall Apart', author: 'Chinua Achebe' },
    { title: 'Half of a Yellow Sun', author: 'Chimamanda Adichie' },
  ],
  health: [
    { title: 'Why We Sleep', author: 'Matthew Walker' },
    { title: 'How Not to Die', author: 'Michael Greger' },
  ],
  religion: [
    { title: 'The Purpose Driven Life', author: 'Rick Warren' },
    { title: 'Mere Christianity', author: 'C.S. Lewis' },
  ],
  tech: [
    { title: 'The Pragmatic Programmer', author: 'Andrew Hunt' },
    { title: 'Clean Code', author: 'Robert Martin' },
    { title: 'Designing Data-Intensive Applications', author: 'Martin Kleppmann' },
  ],
}

const TEXTBOOK_SUBJECTS: Record<string, string[]> = {
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
  if (bookType === 'books') {
    const books = BOOKS_DATA[genreId] || []

    if (books.length === 0) {
      return (
        <div className="text-center py-10 text-ash text-[13px]">
          No books available in this genre yet.
        </div>
      )
    }

    return (
      <div className="space-y-2.5">
        {books.map((b, i) => (
          <div
            key={i}
            className="flex items-center gap-3 bg-surface-50 border border-ash-line rounded-[14px] p-3 cursor-pointer hover:border-brand-600 transition"
          >
            <span className="w-[36px] h-[36px] rounded-[10px] flex items-center justify-center text-sm font-bold text-brand-600 bg-brand-50 shrink-0">
              {b.title.charAt(0)}
            </span>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-[13.5px] text-surface-900">{b.title}</div>
              <div className="text-[11px] text-ash">{b.author}</div>
            </div>
            <ChevronRight size={18} className="text-ash shrink-0" />
          </div>
        ))}
      </div>
    )
  }

  const subjectIds = TEXTBOOK_SUBJECTS[genreId] || []
  const items = genreId === 'all' ? SUBJECTS : SUBJECTS.filter((s) => subjectIds.includes(s.id))

  if (items.length === 0) {
    return (
      <div className="text-center py-10 text-ash text-[13px]">
        No textbooks available in this genre yet.
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
            <div className="text-[11px] text-ash">{s.topicCount} textbooks</div>
          </div>
          <ChevronRight size={18} className="text-ash shrink-0" />
        </div>
      ))}
    </div>
  )
}
