import type { PastPaper, Subject } from '@/lib/types'
import { Camera, FileText } from 'lucide-react'

interface Props {
  subj: Subject
  papers: PastPaper[]
}

export function PastPapersTab({ subj, papers }: Props) {
  return (
    <div>
      <div className="flex items-center gap-3 bg-coral-soft border border-ash-line rounded-[14px] p-3.5 mb-4">
        <div className="w-[44px] h-[44px] rounded-full bg-coral flex items-center justify-center shrink-0 cursor-pointer">
          <Camera size={20} className="text-white" />
        </div>
        <div>
          <div className="font-bold text-[14px]">Stuck on a past question?</div>
          <div className="text-[12.5px] text-ink-soft">Scan it in Learn — AbSTopiq grounds the answer in your syllabus</div>
        </div>
      </div>
      <div className="bg-surface-50 border border-ash-line rounded-[--radius] px-4">
        {papers.length === 0 ? (
          <p className="py-8 text-center text-ash">No past papers available yet.</p>
        ) : papers.map((p, i) => (
          <div key={i} className="flex items-center gap-3 py-3 px-1 border-b border-ash-line cursor-pointer last:border-b-0 hover:bg-paper-dim/30 transition">
            <div className="w-[34px] h-[34px] rounded-[9px] shrink-0 flex items-center justify-center" style={{ background: `${subj.colorHex}18` }}>
              <FileText size={17} style={{ color: subj.colorHex }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[14px] font-bold text-surface-900">{p.name}</div>
              <div className="text-[12px] text-ash">{p.exam} · {p.year}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
