'use client'

import { useState } from 'react'
import { Eyebrow, PageTitle, SearchBar } from '@/components/ui/shared'
import { BrowseTypeButtons } from './components/browse-type-buttons'
import { GenreGrid } from './components/genre-grid'
import { BookLibraryList } from './components/book-library-list'

export default function BooksPage() {
  const [bookType, setBookType] = useState<'textbooks' | 'pastquestions'>('textbooks')
  const [selectedGenre, setSelectedGenre] = useState<string>('all')

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

      <BookLibraryList bookType={bookType} genreId={selectedGenre} />
    </div>
  )
}
