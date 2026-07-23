'use client'

import { useState } from 'react'
import { Eyebrow, PageTitle, SearchBar } from '@/components/ui/shared'
import { BrowseTypeButtons } from './components/browse-type-buttons'
import { GenreGrid } from './components/genre-grid'
import { BookLibraryList } from './components/book-library-list'

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

export default function BooksPage() {
  const [bookType, setBookType] = useState<'textbooks' | 'pastquestions'>('textbooks')
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null)

  return (
    <div>
      <Eyebrow>100,000+ resources</Eyebrow>
      <PageTitle title="Books" sub="Textbooks and past questions — all syllabus-matched, all in one place." />

      <div className="bg-surface-50 border border-ash-line rounded-[--radius] p-4 mb-5">
        <div className="font-display text-[26px] font-bold text-surface-900">100,000+</div>
        <div className="text-[12.5px] text-ash opacity-85">textbooks &amp; past questions across every subject</div>
      </div>

      <SearchBar placeholder="Search titles, topics or authors…" />

      <Eyebrow>Browse by type</Eyebrow>
      <BrowseTypeButtons bookType={bookType} onSelect={setBookType} />

      <Eyebrow>Browse by genre</Eyebrow>
      <GenreGrid onSelectGenre={(id) => setSelectedGenre(id)} selectedGenre={selectedGenre} />

      {selectedGenre && (
        <div className="border-t border-ash-line pt-4 mt-4">
          <h2 className="font-bold text-[15px] text-surface-900 mb-3">{GENRE_LABELS[selectedGenre]}</h2>
          <BookLibraryList bookType={bookType} genreId={selectedGenre} />
        </div>
      )}
    </div>
  )
}
