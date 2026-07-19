'use client'

import Link from 'next/link'
import { SUBJECTS } from '@/lib/data'
import { Eyebrow, PageTitle, SearchBar } from '@/components/ui/shared'

export default function BooksPage() {
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
      <div className="flex gap-2 mb-4">
        <button className="flex items-center gap-2 flex-1 px-3 py-2.5 rounded-[14px] bg-brand-50 border border-brand-600 text-brand-600 font-bold text-[12.5px] cursor-pointer">
          <span className="text-base">📗</span>
          <span className="flex-1">Textbooks</span>
          <span className="font-mono text-[10.5px]">42.3k</span>
        </button>
        <button className="flex items-center gap-2 flex-1 px-3 py-2.5 rounded-[14px] bg-surface-50 border border-ash-line text-ash font-bold text-[12.5px] cursor-pointer hover:border-brand-600 transition">
          <span className="text-base">📝</span>
          <span className="flex-1">Past questions</span>
          <span className="font-mono text-[10.5px]">31.8k</span>
        </button>
      </div>

      <Eyebrow>Browse by genre</Eyebrow>
      <div className="grid grid-cols-2 gap-2.5">
        {['📗 Sciences', '📘 Humanities', '📐 Mathematics', '🌍 Geography', '📜 History', '💬 Languages', '💻 Computer Science', '🎨 Arts'].map((g, i) => (
          <div key={i} className="flex items-center gap-2.5 bg-surface-50 border border-ash-line rounded-[12px] p-3 cursor-pointer hover:border-brand-600 transition">
            <span className="font-semibold text-[13px] text-surface-900">{g}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
