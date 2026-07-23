'use client'

import { Book } from 'lucide-react'
import { SUBJECTS } from '@/lib/data'
import { useRouter } from 'next/navigation'
import type { ReactNode } from 'react'

interface BookLibraryListProps {
  bookType: 'books' | 'textbooks'
  genreId: string
  search?: string
}

const BOOK_GENRE_ORDER = ['self-dev', 'finance', 'business', 'history', 'fiction', 'health', 'religion', 'tech']

const BOOK_GENRE_LABELS: Record<string, string> = {
  'self-dev': 'Self-Development & Motivation',
  finance: 'Finance & Investment',
  business: 'Business & Entrepreneurship',
  history: 'History & Biography',
  fiction: 'Fiction & Literature',
  health: 'Health & Wellness',
  religion: 'Religion & Spirituality',
  tech: 'Technology & Computing',
}

const BOOKS_DATA: Record<string, { title: string; author: string }[]> = {
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

const TEXTBOOK_GENRE_ORDER = ['literature', 'science', 'math', 'social', 'language', 'reference', 'religious', 'arts']

const TEXTBOOK_GENRE_LABELS: Record<string, string> = {
  literature: 'Literature & Set Texts',
  science: 'Science & Technology',
  math: 'Mathematics & Further Maths',
  social: 'Social Studies & Geography',
  language: 'Language & Composition',
  reference: 'Reference & Dictionaries',
  religious: 'Religious & Moral Studies',
  arts: 'Arts & Humanities',
}

const TEXTBOOK_SUBJECTS: Record<string, string[]> = {
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

const BOOK_SPOTLIGHT: Record<string, { title: string; author: string }[]> = {
  all: [
    { title: 'Atomic Habits', author: 'James Clear' },
    { title: 'Sapiens', author: 'Yuval Noah Harari' },
    { title: 'Zero to One', author: 'Peter Thiel' },
    { title: 'The Alchemist', author: 'Paulo Coelho' },
  ],
  'self-dev': [
    { title: 'Atomic Habits', author: 'James Clear' },
    { title: 'The 7 Habits of Highly Effective People', author: 'Stephen Covey' },
  ],
  finance: [
    { title: 'Rich Dad Poor Dad', author: 'Robert Kiyosaki' },
    { title: 'The Psychology of Money', author: 'Morgan Housel' },
  ],
  business: [
    { title: 'Zero to One', author: 'Peter Thiel' },
    { title: 'The Lean Startup', author: 'Eric Ries' },
  ],
  history: [
    { title: 'Sapiens', author: 'Yuval Noah Harari' },
  ],
  fiction: [
    { title: 'The Alchemist', author: 'Paulo Coelho' },
  ],
}

const TEXTBOOK_SPOTLIGHT: Record<string, string[]> = {
  all: ['biology', 'chemistry', 'mathematics'],
  science: ['biology', 'chemistry'],
  math: ['mathematics'],
  literature: ['english'],
}

function BookItem({ icon, title, colorCls, hexColor }: { icon: ReactNode; title: string; colorCls?: string; hexColor?: string }) {
  return (
    <div className="snap-start shrink-0 w-[130px]">
      <div className="h-[170px] flex items-center justify-center bg-surface-50 border border-ash-line rounded-[14px] cursor-pointer hover:border-brand-600 transition">
        <div
          className={`w-[72px] h-[72px] rounded-2xl flex items-center justify-center ${colorCls || ''}`}
          style={hexColor && !colorCls ? { backgroundColor: hexColor + '20', color: hexColor } : {}}
        >
          {icon}
        </div>
      </div>
      <div className="mt-2 text-center">
        <div className="font-bold text-[12.5px] text-surface-900 leading-tight">{title}</div>
      </div>
    </div>
  )
}

function SwipeRow({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory no-scrollbar">
      {children}
    </div>
  )
}

export function SpotlightSection({ bookType, genreId, search = '' }: { bookType: 'books' | 'textbooks'; genreId: string; search?: string }) {
  if (bookType === 'books') {
    const spotlight = (BOOK_SPOTLIGHT[genreId] || BOOK_SPOTLIGHT['all']).filter(b =>
      b.title.toLowerCase().includes(search.toLowerCase())
    )
    if (!spotlight || spotlight.length === 0) {
      return (
        <div className="text-center py-6 text-ash text-[13px]">
          {search ? 'No spotlight results match your search.' : 'There is no spotlight available for the selected genre.'}
        </div>
      )
    }
    return (
      <div className="mb-2">
        <h3 className="font-bold text-[15px] text-surface-900 mb-3">Spotlight</h3>
        <SwipeRow>
          {spotlight.map((b, i) => (
            <BookItem
              key={i}
              icon={<Book size={32} />}
              title={b.title}
              colorCls={BOOK_COLORS[i % BOOK_COLORS.length]}
            />
          ))}
        </SwipeRow>
      </div>
    )
  }

  return null
}

export function BookLibraryList({ bookType, genreId, search = '' }: BookLibraryListProps) {
  const router = useRouter()

  if (bookType === 'books') {
    if (genreId === 'all') {
      return (
        <div>
          {BOOK_GENRE_ORDER.map((gid) => {
            const books = (BOOKS_DATA[gid] || []).filter(b =>
              b.title.toLowerCase().includes(search.toLowerCase())
            )
            if (books.length === 0) return null
            return (
              <div key={gid} className="mb-5">
                <h3 className="font-bold text-[14px] text-ash mb-3">{BOOK_GENRE_LABELS[gid]}</h3>
                <SwipeRow>
                  {books.map((b, i) => (
                    <BookItem
                      key={i}
                      icon={<Book size={32} />}
                      title={b.title}
                      colorCls={BOOK_COLORS[i % BOOK_COLORS.length]}
                    />
                  ))}
                </SwipeRow>
              </div>
            )
          })}
        </div>
      )
    }

    const books = (BOOKS_DATA[genreId] || []).filter(b =>
      b.title.toLowerCase().includes(search.toLowerCase())
    )
    if (books.length === 0) {
      return (
        <div className="text-center py-10 text-ash text-[13px]">
          {search ? 'No books match your search in this genre.' : 'No books available in this genre yet.'}
        </div>
      )
    }

    return (
      <SwipeRow>
        {books.map((b, i) => (
          <BookItem
            key={i}
            icon={<Book size={32} />}
            title={b.title}
            colorCls={BOOK_COLORS[i % BOOK_COLORS.length]}
          />
        ))}
      </SwipeRow>
    )
  }

  const q = search.toLowerCase()

  if (genreId === 'all') {
    const items = SUBJECTS.filter(s => s.name.toLowerCase().includes(q))
    if (items.length === 0) {
      return (
        <div className="text-center py-10 text-ash text-[13px]">
          {search ? 'No subjects match your search.' : 'No textbooks available.'}
        </div>
      )
    }
    return (
      <div>
        <h2 className="font-bold text-[15px] text-surface-900 mb-3">Subjects</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {items.map((s) => (
            <div key={s.id} onClick={() => router.push('/subjects/' + s.id)}>
              <div className="aspect-square flex items-center justify-center bg-surface-50 border border-ash-line rounded-[14px] cursor-pointer hover:border-brand-600 transition">
                <div
                  className="w-[52px] h-[52px] rounded-xl flex items-center justify-center text-xl"
                  style={{ backgroundColor: s.colorHex + '20', color: s.colorHex }}
                >
                  {s.icon}
                </div>
              </div>
              <div className="mt-2 text-left">
                <div className="font-bold text-[12.5px] text-surface-900 leading-tight">{s.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const subjectIds = TEXTBOOK_SUBJECTS[genreId] || []
  const items = SUBJECTS.filter((s) => subjectIds.includes(s.id) && s.name.toLowerCase().includes(q))

  if (items.length === 0) {
    return (
      <div className="text-center py-10 text-ash text-[13px]">
        No textbooks available in this genre yet.
      </div>
    )
  }

  return (
    <div>
      <h2 className="font-bold text-[15px] text-surface-900 mb-3">Subjects</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {items.map((s) => (
          <div key={s.id} onClick={() => router.push('/subjects/' + s.id)}>
            <div className="aspect-square flex items-center justify-center bg-surface-50 border border-ash-line rounded-[14px] cursor-pointer hover:border-brand-600 transition">
              <div
                className="w-[52px] h-[52px] rounded-xl flex items-center justify-center text-xl"
                style={{ backgroundColor: s.colorHex + '20', color: s.colorHex }}
              >
                {s.icon}
              </div>
            </div>
            <div className="mt-2 text-left">
              <div className="font-bold text-[12.5px] text-surface-900 leading-tight">{s.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
