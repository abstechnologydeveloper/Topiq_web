'use client'

import { Book, BookOpen } from 'lucide-react'

interface BrowseTypeButtonsProps {
  bookType: 'books' | 'textbooks'
  onSelect: (type: 'books' | 'textbooks') => void
}

export function BrowseTypeButtons({ bookType, onSelect }: BrowseTypeButtonsProps) {
  return (
    <div className="flex gap-2 mb-4">
      <button
        onClick={() => onSelect('books')}
        className={`flex items-center gap-2 flex-1 px-3 py-2.5 rounded-[14px] border-2 font-bold text-[12.5px] cursor-pointer transition ${
          bookType === 'books'
            ? 'bg-brand-50 border-brand-600 text-brand-600'
            : 'bg-surface-50 border-ash-line text-ash hover:border-brand-600'
        }`}
      >
        <Book size={16} />
        <span className="flex-1">Books</span>
      </button>
      <button
        onClick={() => onSelect('textbooks')}
        className={`flex items-center gap-2 flex-1 px-3 py-2.5 rounded-[14px] border-2 font-bold text-[12.5px] cursor-pointer transition ${
          bookType === 'textbooks'
            ? 'bg-brand-50 border-brand-600 text-brand-600'
            : 'bg-surface-50 border-ash-line text-ash hover:border-brand-600'
        }`}
      >
        <BookOpen size={16} />
        <span className="flex-1">Textbooks</span>
      </button>
    </div>
  )
}
