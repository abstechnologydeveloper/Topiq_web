'use client'

import { BookOpen, FileText } from 'lucide-react'

interface BrowseTypeButtonsProps {
  bookType: 'textbooks' | 'pastquestions'
  onSelect: (type: 'textbooks' | 'pastquestions') => void
}

export function BrowseTypeButtons({ bookType, onSelect }: BrowseTypeButtonsProps) {
  return (
    <div className="flex gap-2 flex-1">
      <button
        onClick={() => onSelect('textbooks')}
        className={`flex flex-col items-center gap-1 flex-1 px-3 py-3 rounded-[14px] border-2 font-bold text-[12.5px] cursor-pointer transition ${
          bookType === 'textbooks'
            ? 'bg-brand-50 border-brand-600 text-brand-600'
            : 'bg-surface-50 border-ash-line text-ash hover:border-brand-600'
        }`}
      >
        <BookOpen size={18} />
        <span>Textbooks</span>
        <span className="font-mono text-[10.5px] font-semibold">42.3k</span>
      </button>
      <button
        onClick={() => onSelect('pastquestions')}
        className={`flex flex-col items-center gap-1 flex-1 px-3 py-3 rounded-[14px] border-2 font-bold text-[12.5px] cursor-pointer transition ${
          bookType === 'pastquestions'
            ? 'bg-brand-50 border-brand-600 text-brand-600'
            : 'bg-surface-50 border-ash-line text-ash hover:border-brand-600'
        }`}
      >
        <FileText size={18} />
        <span>Past questions</span>
        <span className="font-mono text-[10.5px] font-semibold">31.8k</span>
      </button>
    </div>
  )
}
