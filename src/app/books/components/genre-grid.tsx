import { BookOpen, Book, Ruler, Globe, ScrollText, MessageSquare, Monitor, Palette } from 'lucide-react'

const genres = [
  { icon: <BookOpen size={16} />, label: 'Sciences' },
  { icon: <Book size={16} />, label: 'Humanities' },
  { icon: <Ruler size={16} />, label: 'Mathematics' },
  { icon: <Globe size={16} />, label: 'Geography' },
  { icon: <ScrollText size={16} />, label: 'History' },
  { icon: <MessageSquare size={16} />, label: 'Languages' },
  { icon: <Monitor size={16} />, label: 'Computer Science' },
  { icon: <Palette size={16} />, label: 'Arts' },
]

export function GenreGrid() {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {genres.map((g, i) => (
        <div key={i} className="flex items-center gap-2.5 bg-surface-50 border border-ash-line rounded-[12px] p-3 cursor-pointer hover:border-brand-600 transition">
          <span className="text-surface-900">{g.icon}</span>
          <span className="font-semibold text-[13px] text-surface-900">{g.label}</span>
        </div>
      ))}
    </div>
  )
}
