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
}

export function GenreGrid({ onSelectGenre }: GenreGridProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
      <button
        onClick={() => onSelectGenre('all')}
        className="flex items-center gap-2 shrink-0 px-4 py-2.5 rounded-full border border-ash-line bg-surface-50 text-surface-900 font-bold text-[12.5px] cursor-pointer hover:border-brand-600 hover:bg-brand-50 hover:text-brand-600 transition whitespace-nowrap"
      >
        <span className="font-mono text-[10.5px] font-semibold text-ash">{genres.reduce((a, g) => a + parseInt(g.count.replace(',','')), 0).toLocaleString()}</span>
        All Genres
      </button>
      {genres.map((g) => (
        <button
          key={g.id}
          onClick={() => onSelectGenre(g.id)}
          className="flex items-center gap-2 shrink-0 px-4 py-2.5 rounded-full border border-ash-line bg-surface-50 text-surface-900 font-bold text-[12.5px] cursor-pointer hover:border-brand-600 hover:bg-brand-50 hover:text-brand-600 transition whitespace-nowrap"
        >
          <span className="font-mono text-[10.5px] font-semibold text-ash">{g.count}</span>
          {g.label}
        </button>
      ))}
    </div>
  )
}
