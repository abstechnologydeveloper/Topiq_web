'use client'

interface Genre {
  id: string
  label: string
}

interface GenreGridProps {
  genres: Genre[]
  onSelectGenre: (id: string) => void
  selectedGenre: string | null
}

export function GenreGrid({ genres, onSelectGenre, selectedGenre }: GenreGridProps) {
  const btnCls = (id: string) =>
    `shrink-0 px-4 py-2.5 rounded-full border-2 font-bold text-[12.5px] cursor-pointer transition whitespace-nowrap ${
      selectedGenre === id
        ? 'bg-brand-50 border-brand-600 text-brand-600'
        : 'bg-surface-50 border-ash-line text-surface-900 hover:border-brand-600 hover:bg-brand-50 hover:text-brand-600'
    }`

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
      <button onClick={() => onSelectGenre('all')} className={btnCls('all')}>
        All
      </button>
      {genres.map((g) => (
        <button key={g.id} onClick={() => onSelectGenre(g.id)} className={btnCls(g.id)}>
          {g.label}
        </button>
      ))}
    </div>
  )
}
