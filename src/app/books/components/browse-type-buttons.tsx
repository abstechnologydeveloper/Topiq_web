import { BookOpen, FileText } from 'lucide-react'

export function BrowseTypeButtons() {
  return (
    <div className="flex gap-2 mb-4">
      <button className="flex items-center gap-2 flex-1 px-3 py-2.5 rounded-[14px] bg-brand-50 border border-brand-600 text-brand-600 font-bold text-[12.5px] cursor-pointer">
        <BookOpen size={16} />
        <span className="flex-1">Textbooks</span>
        <span className="font-mono text-[10.5px]">42.3k</span>
      </button>
      <button className="flex items-center gap-2 flex-1 px-3 py-2.5 rounded-[14px] bg-surface-50 border border-ash-line text-ash font-bold text-[12.5px] cursor-pointer hover:border-brand-600 transition">
        <FileText size={16} />
        <span className="flex-1">Past questions</span>
        <span className="font-mono text-[10.5px]">31.8k</span>
      </button>
    </div>
  )
}
