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
    <div className="flex gap-2.5 overflow-x-auto pb-1 snap-x snap-mandatory no-scrollbar md:grid md:grid-cols-2 md:overflow-visible">
      <div
        onClick={() => onSelectGenre('all')}
        className="snap-start shrink-0 w-[160px] md:w-auto border border-ash-line rounded-[--radius] p-4 cursor-pointer hover:border-brand-600 transition"
      >
        <div className="font-mono text-[10.5px] font-bold text-brand-600 uppercase tracking-[.04em] mb-1">
          {genres.reduce((a, g) => a + parseInt(g.count.replace(',','')), 0).toLocaleString()} titles
        </div>
        <h3 className="font-display text-[17px] font-semibold text-surface-900">All Genres</h3>
      </div>
      {genres.map((g) => (
        <div
          key={g.id}
          onClick={() => onSelectGenre(g.id)}
          className="snap-start shrink-0 w-[160px] md:w-auto border border-ash-line rounded-[--radius] p-4 cursor-pointer hover:border-brand-600 transition"
        >
          <div className="font-mono text-[10.5px] font-bold text-brand-600 uppercase tracking-[.04em] mb-1">
            {g.count} titles
          </div>
          <h3 className="font-display text-[17px] font-semibold text-surface-900">{g.label}</h3>
        </div>
      ))}
    </div>
  )
}
