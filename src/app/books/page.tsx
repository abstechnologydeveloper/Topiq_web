'use client'

import { useState } from 'react'
import { Eyebrow, PageTitle, SearchBar } from '@/components/ui/shared'
import { BrowseTypeButtons } from './components/browse-type-buttons'
import { GenreGrid } from './components/genre-grid'
import { BookLibraryList, SpotlightSection } from './components/book-library-list'

const BOOK_GENRES = [
  { id: 'self-dev', label: 'Self-Development & Motivation' },
  { id: 'finance', label: 'Finance & Investment' },
  { id: 'business', label: 'Business & Entrepreneurship' },
  { id: 'history', label: 'History & Biography' },
  { id: 'fiction', label: 'Fiction & Literature' },
  { id: 'health', label: 'Health & Wellness' },
  { id: 'religion', label: 'Religion & Spirituality' },
  { id: 'tech', label: 'Technology & Computing' },
]

const TEXTBOOK_GENRES = [
  { id: 'literature', label: 'Literature & Set Texts' },
  { id: 'science', label: 'Science & Technology' },
  { id: 'math', label: 'Mathematics & Further Maths' },
  { id: 'social', label: 'Social Studies & Geography' },
  { id: 'language', label: 'Language & Composition' },
  { id: 'reference', label: 'Reference & Dictionaries' },
  { id: 'religious', label: 'Religious & Moral Studies' },
  { id: 'arts', label: 'Arts & Humanities' },
]

const GENRE_LABELS: Record<string, string> = {
  all: 'All',
  'self-dev': 'Self-Development & Motivation',
  finance: 'Finance & Investment',
  business: 'Business & Entrepreneurship',
  history: 'History & Biography',
  fiction: 'Fiction & Literature',
  health: 'Health & Wellness',
  religion: 'Religion & Spirituality',
  tech: 'Technology & Computing',
  literature: 'Literature & Set Texts',
  science: 'Science & Technology',
  math: 'Mathematics & Further Maths',
  social: 'Social Studies & Geography',
  language: 'Language & Composition',
  reference: 'Reference & Dictionaries',
  religious: 'Religious & Moral Studies',
  arts: 'Arts & Humanities',
}

export default function BooksPage() {
  const [bookType, setBookType] = useState<'books' | 'textbooks'>('books')
  const [selectedGenre, setSelectedGenre] = useState<string>('all')
  const [search, setSearch] = useState('')

  const genres = bookType === 'books' ? BOOK_GENRES : TEXTBOOK_GENRES

  return (
    <div>
      <Eyebrow>100,000+ resources</Eyebrow>
      <PageTitle title="Books" sub="Textbooks and past questions — all syllabus-matched, all in one place." />

      <div className="bg-surface-50 border border-ash-line rounded-[--radius] p-4 mb-5">
        <div className="font-display text-[26px] font-bold text-surface-900">100,000+</div>
        <div className="text-[12.5px] text-ash opacity-85">textbooks &amp; past questions across every subject</div>
      </div>

      <SearchBar placeholder="Search titles, topics or authors…" value={search} onChange={setSearch} />

      <Eyebrow>Browse by type</Eyebrow>
      <BrowseTypeButtons bookType={bookType} onSelect={(t) => { setBookType(t); setSelectedGenre('all') }} />

      <Eyebrow>Browse by genre</Eyebrow>
      <GenreGrid genres={genres} onSelectGenre={(id) => setSelectedGenre(id)} selectedGenre={selectedGenre} />

      <div className="border-t border-ash-line pt-4 mt-4">
        {bookType === 'books' && <SpotlightSection bookType={bookType} genreId={selectedGenre} search={search} />}

        {selectedGenre !== 'all' && bookType === 'books' && <h2 className="font-bold text-[15px] text-surface-900 mb-3 mt-5">{GENRE_LABELS[selectedGenre]}</h2>}
        <BookLibraryList bookType={bookType} genreId={selectedGenre} search={search} />
      </div>
    </div>
  )
}
