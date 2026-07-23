'use client'

import { Book } from 'lucide-react'
import { SUBJECTS } from '@/lib/data'

interface BookLibraryListProps {
  bookType: 'books' | 'textbooks'
  genreId: string
}

const BOOKS_DATA: Record<string, { title: string; author: string }[]> = {
  all: [
    { title: 'Atomic Habits', author: 'James Clear' },
    { title: 'The 7 Habits of Highly Effective People', author: 'Stephen Covey' },
    { title: 'Think and Grow Rich', author: 'Napoleon Hill' },
    { title: 'The Psychology of Money', author: 'Morgan Housel' },
    { title: 'Rich Dad Poor Dad', author: 'Robert Kiyosaki' },
    { title: 'The Intelligent Investor', author: 'Benjamin Graham' },
    { title: 'Zero to One', author: 'Peter Thiel' },
    { title: 'The Lean Startup', author: 'Eric Ries' },
    { title: 'Good to Great', author: 'Jim Collins' },
    { title: 'Sapiens', author: 'Yuval Noah Harari' },
    { title: 'A People\'s History', author: 'Howard Zinn' },
    { title: 'The Diary of a Young Girl', author: 'Anne Frank' },
    { title: 'The Alchemist', author: 'Paulo Coelho' },
    { title: 'Things Fall Apart', author: 'Chinua Achebe' },
    { title: 'Half of a Yellow Sun', author: 'Chimamanda Adichie' },
    { title: 'Why We Sleep', author: 'Matthew Walker' },
    { title: 'How Not to Die', author: 'Michael Greger' },
    { title: 'The Purpose Driven Life', author: 'Rick Warren' },
    { title: 'Mere Christianity', author: 'C.S. Lewis' },
    { title: 'The Pragmatic Programmer', author: 'Andrew Hunt' },
    { title: 'Clean Code', author: 'Robert Martin' },
    { title: 'Designing Data-Intensive Applications', author: 'Martin Kleppmann' },
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
    { title: "A People's History", author: 'Howard Zinn' },
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

const BOOK_COLORS = [
  'bg-amber-50 text-amber-600',
  'bg-sky-50 text-sky-600',
  'bg-rose-50 text-rose-600',
  'bg-emerald-50 text-emerald-600',
  'bg-indigo-50 text-indigo-600',
  'bg-teal-50 text-teal-600',
  'bg-orange-50 text-orange-600',
  'bg-pink-50 text-pink-600',
]

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
      <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory no-scrollbar">
        {books.map((b, i) => (
          <div key={i} className="snap-start shrink-0 w-[130px]">
            <div className="h-[170px] flex items-center justify-center bg-surface-50 border border-ash-line rounded-[14px] cursor-pointer hover:border-brand-600 transition">
              <div className={`w-[72px] h-[72px] rounded-2xl flex items-center justify-center ${BOOK_COLORS[i % BOOK_COLORS.length]}`}>
                <Book size={32} />
              </div>
            </div>
            <div className="mt-2 text-center">
              <div className="font-bold text-[12.5px] text-surface-900 leading-tight">{b.title}</div>
            </div>
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
    <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory no-scrollbar">
      {items.map((s, i) => (
        <div key={s.id} className="snap-start shrink-0 w-[130px]">
          <div className="h-[170px] flex items-center justify-center bg-surface-50 border border-ash-line rounded-[14px] cursor-pointer hover:border-brand-600 transition">
            <div
              className="w-[72px] h-[72px] rounded-2xl flex items-center justify-center text-3xl"
              style={{ backgroundColor: s.colorHex + '20', color: s.colorHex }}
            >
              {s.icon}
            </div>
          </div>
          <div className="mt-2 text-center">
            <div className="font-bold text-[12.5px] text-surface-900 leading-tight">{s.name}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
