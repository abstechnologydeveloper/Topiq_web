'use client'

import { LayoutGrid, BookOpen, FlaskConical, Ruler, Globe, ScrollText, Book, Monitor, Palette } from 'lucide-react'

const genres = [
  { id: 'literature', icon: <BookOpen size={18} />, label: 'Literature & Set Texts', count: '9,600', color: 'bg-green-50 text-green-600' },
  { id: 'science', icon: <FlaskConical size={18} />, label: 'Science & Technology', count: '8,100', color: 'bg-orange-50 text-orange-600' },
  { id: 'math', icon: <Ruler size={18} />, label: 'Mathematics & Further Maths', count: '6,400', color: 'bg-purple-50 text-purple-600' },
  { id: 'social', icon: <Globe size={18} />, label: 'Social Studies & Geography', count: '5,300', color: 'bg-red-50 text-red-600' },
  { id: 'language', icon: <ScrollText size={18} />, label: 'Language & Composition', count: '4,700', color: 'bg-green-50 text-green-600' },
  { id: 'reference', icon: <Book size={18} />, label: 'Reference & Dictionaries', count: '3,200', color: 'bg-orange-50 text-orange-600' },
  { id: 'religious', icon: <Monitor size={18} />, label: 'Religious & Moral Studies', count: '2,600', color: 'bg-purple-50 text-purple-600' },
  { id: 'arts', icon: <Palette size={18} />, label: 'Arts & Humanities', count: '2,400', color: 'bg-red-50 text-red-600' },
]

interface GenreGridProps {
  onSelectGenre: (id: string) => void
}

export function GenreGrid({ onSelectGenre }: GenreGridProps) {
  return (
    <div className="flex gap-2.5 overflow-x-auto pb-1 snap-x snap-mandatory no-scrollbar md:grid md:grid-cols-2 md:overflow-visible">
      <div
        onClick={() => onSelectGenre('all')}
        className="snap-start shrink-0 w-[160px] md:w-auto flex flex-col gap-2.5 bg-surface-50 border border-ash-line rounded-[14px] p-3.5 cursor-pointer hover:border-brand-600 transition"
      >
        <span className="w-[38px] h-[38px] rounded-[10px] flex items-center justify-center bg-brand-50 text-brand-600 text-lg">
          <LayoutGrid size={18} />
        </span>
        <div>
          <div className="font-bold text-[13px] text-surface-900 leading-tight">All Genres</div>
          <div className="text-[11px] text-ash mt-0.5">{genres.reduce((a, g) => a + parseInt(g.count.replace(',','')), 0).toLocaleString()} titles</div>
        </div>
      </div>
      {genres.map((g) => (
        <div
          key={g.id}
          onClick={() => onSelectGenre(g.id)}
          className="snap-start shrink-0 w-[160px] md:w-auto flex flex-col gap-2.5 bg-surface-50 border border-ash-line rounded-[14px] p-3.5 cursor-pointer hover:border-brand-600 transition"
        >
          <span className={`w-[38px] h-[38px] rounded-[10px] flex items-center justify-center ${g.color} text-lg`}>
            {g.icon}
          </span>
          <div>
            <div className="font-bold text-[13px] text-surface-900 leading-tight">{g.label}</div>
            <div className="text-[11px] text-ash mt-0.5">{g.count} titles</div>
          </div>
        </div>
      ))}
    </div>
  )
}
