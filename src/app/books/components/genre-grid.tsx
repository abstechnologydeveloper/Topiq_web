'use client'

const genres = [
  { id: 'literature', label: 'Literature & Set Texts', count: '9,600' },
  { id: 'science', label: 'Science & Technology', count: '8,100' },
  { id: 'math', label: 'Mathematics & Further Maths', count: '6,400' },
  { id: 'social', label: 'Social Studies & Geography', count: '5,300' },
  { id: 'language', label: 'Language & Composition', count: '4,700' },
  { id: 'reference', label: 'Reference & Dictionaries', count: '3,200' },
  { id: 'religious', label: 'Religious & Moral Studies', count: '2,600' },
  { id: 'arts', label: 'Arts & Humanities', count: '2,400' },
]

interface GenreGridProps {
  onSelectGenre: (id: string) => void
  selectedGenre: string | null
}

export function GenreGrid({ onSelectGenre, selectedGenre }: GenreGridProps) {
  const btnCls = (id: string) =>
    `shrink-0 px-4 py-2.5 rounded-full border-2 font-bold text-[12.5px] cursor-pointer transition whitespace-nowrap ${
      selectedGenre === id
        ? 'bg-brand-50 border-brand-600 text-brand-600'
        : 'bg-surface-50 border-ash-line text-surface-900 hover:border-brand-600 hover:bg-brand-50 hover:text-brand-600'
    }`

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
      <button onClick={() => onSelectGenre('all')} className={btnCls('all')}>
        All Genres
      </button>
      {genres.map((g) => (
        <button key={g.id} onClick={() => onSelectGenre(g.id)} className={btnCls(g.id)}>
          {g.label}
        </button>
      ))}
    </div>
  )
}
