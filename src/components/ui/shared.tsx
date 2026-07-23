'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronRight, Sparkles, ArrowLeft, Search, Crosshair } from 'lucide-react'
import type { ReactNode } from 'react'
import { TOPICS, SUBJECTS } from '@/lib/data'

export function Eyebrow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span className={`font-mono text-[11px] font-semibold tracking-[0.06em] uppercase text-brand-600 block mb-1.5 ${className}`}>
      {children}
    </span>
  )
}

export function PageTitle({ title, sub }: { title: ReactNode; sub?: string }) {
  return (
    <div className="mb-4">
      <h1 className="font-display text-[25px] font-semibold tracking-[-0.01em] text-surface-900">{title}</h1>
      {sub && <p className="text-[13.5px] text-ash mt-1">{sub}</p>}
    </div>
  )
}

export function BackRow({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex items-center gap-2 text-ash text-[13px] font-semibold mb-3.5 cursor-pointer hover:text-surface-700 transition">
      <ArrowLeft size={16} />
      {label}
    </button>
  )
}

export function Chevron() {
  return <ChevronRight size={18} className="text-ash shrink-0" />
}

export function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-surface-50 border border-ash-line rounded-[--radius] p-4 ${className}`}>
      {children}
    </div>
  )
}

export function Subnav({ tabs, active, onChange }: { tabs: string[]; active: string; onChange: (tab: string) => void }) {
  return (
    <div className="flex gap-1 overflow-x-auto border-b border-ash-line mb-4.5 pb-px no-scrollbar">
      {tabs.map(t => (
        <button key={t} onClick={() => onChange(t)}
          className={`shrink-0 bg-none border-none px-3.5 py-2.5 text-[13px] font-bold cursor-pointer whitespace-nowrap border-b-2 transition ${
            active === t ? 'text-surface-900 border-b-brand-600' : 'text-ash border-b-transparent hover:text-surface-700'
          }`}>
          {t}
        </button>
      ))}
    </div>
  )
}

export function ChipRow({ chips }: { chips: { label: string; active?: boolean; onClick?: () => void }[] }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-0.5 no-scrollbar">
      {chips.map((c, i) => (
        <button key={i} onClick={c.onClick}
          className={`shrink-0 text-[12.5px] font-semibold px-3 py-1.5 rounded-full border transition whitespace-nowrap ${
            c.active
              ? 'bg-brand-50 border-brand-600 text-brand-600'
              : 'bg-surface-50 border-ash-line text-surface-700 hover:border-brand-600'
          }`}>
          {c.label}
        </button>
      ))}
    </div>
  )
}

export function SearchBar({ placeholder = 'Search…', value, onChange }: { placeholder?: string; value?: string; onChange?: (v: string) => void }) {
  return (
    <div className="flex items-center gap-2.5 bg-surface-50 border border-ash-line rounded-[26px] px-4 py-3 mb-3.5">
      <Search size={17} className="text-ash shrink-0" />
      <input type="text" placeholder={placeholder} value={value} onChange={e => onChange?.(e.target.value)}
        className="flex-1 border-none outline-none text-[14.5px] font-sans bg-transparent text-surface-900 placeholder:text-ash" />
    </div>
  )
}

export function StatGrid({ stats }: { stats: { num: string; lbl: string }[] }) {
  return (
    <div className="grid grid-cols-3 gap-2.5 mb-5">
      {stats.map((s, i) => (
        <div key={i} className="bg-surface-50 border border-ash-line rounded-[14px] p-3.5 text-center">
          <div className="font-display text-[22px] font-semibold text-surface-900">{s.num}</div>
          <div className="text-[11px] text-ash mt-0.5">{s.lbl}</div>
        </div>
      ))}
    </div>
  )
}

export function ResultRow({ icon, title, meta, onClick }: { icon: React.ReactNode; title: string; meta: string; onClick?: () => void }) {
  return (
    <div onClick={onClick} className="flex items-center gap-3 py-3 px-1 border-b border-ash-line cursor-pointer last:border-b-0 hover:bg-paper-dim/50 transition">
      <div className="w-[34px] h-[34px] rounded-[9px] flex items-center justify-center shrink-0 text-[15px]" style={{ background: 'var(--color-paper-dim, #F7F5FC)' }}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[14px] font-bold text-surface-900">{title}</div>
        <div className="text-[12px] text-ash">{meta}</div>
      </div>
    </div>
  )
}

export function TopicRow({ name, pct, color = 'var(--color-brand-600)', onClick }: { name: ReactNode; pct: number; color?: string; onClick?: () => void }) {
  return (
    <div onClick={onClick} className="flex items-center gap-3 py-3.5 px-1 border-b border-ash-line cursor-pointer last:border-b-0 hover:bg-paper-dim/30 transition">
      <div className="w-[9px] h-[9px] rounded-full shrink-0" style={{ background: color }} />
      <div className="flex-1 text-[14.5px] font-semibold text-surface-900">{name}</div>
      <div className="w-[60px] h-[5px] rounded-full bg-ash-line overflow-hidden shrink-0">
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
      </div>
      <div className="font-mono text-[11px] text-ash w-[30px] text-right shrink-0">{pct}%</div>
    </div>
  )
}

export function RecommendCard({ eyebrow, title, cta, onClick }: { eyebrow: string; title: string; cta: string; onClick?: () => void }) {
  return (
    <div className="flex items-center gap-3.5 bg-surface-900 text-surface-50 rounded-[--radius] p-4 mb-4.5">
      <div className="flex-1 min-w-0">
        <div className="font-mono text-[10.5px] text-ember-soft tracking-[.05em] uppercase mb-1">{eyebrow}</div>
        <div className="font-display text-[17px] font-semibold">{title}</div>
      </div>
      <button onClick={onClick} className="shrink-0 bg-secondary-500 text-surface-900 border-none px-4 py-2 rounded-[20px] font-bold text-[12.5px] cursor-pointer">
        {cta}
      </button>
    </div>
  )
}

export function UsageChip({ label, link, low = false }: { label: string; link?: ReactNode; low?: boolean }) {
  return (
    <div className={`flex items-center justify-between px-3.5 py-2.5 rounded-[12px] text-[12px] mb-3.5 ${low ? 'bg-coral-soft' : 'bg-paper-dim'}`}>
      <span className="font-bold">{label}</span>
      {link && <span className="font-mono font-bold text-brand-600 underline cursor-pointer flex items-center gap-1">{link}</span>}
    </div>
  )
}

export function PromoBanner({ icon, title, sub, onClick }: { icon: ReactNode; title: string; sub: string; onClick?: () => void }) {
  return (
    <div onClick={onClick} className="flex items-center gap-3 bg-gradient-to-r from-[#FFEDB8] to-ember-soft dark:from-[#3A2E10] dark:to-[#2A2210] border border-secondary-500 rounded-[16px] p-3.5 mb-5 cursor-pointer">
      <span className="text-[22px] shrink-0 text-surface-900">{icon}</span>
      <div className="flex-1 min-w-0">
        <div className="font-bold text-[13.5px] text-surface-900 dark:text-white">{title}</div>
        <div className="text-[11.5px] text-ink-soft dark:text-ash/80">{sub}</div>
      </div>
      <Chevron />
    </div>
  )
}

export function GroundingChip({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2 mt-2.5 pt-2.5 border-t border-dashed border-ash-line">
      <Crosshair size={14} className="shrink-0 mt-0.5 text-brand-600" />
      <span className="font-mono text-[11px] font-semibold text-brand-600 bg-brand-50 px-[9px] py-[4px] rounded-[20px] leading-[1.5]">{text}</span>
    </div>
  )
}

export function Toggle({ labels, active, onChange }: { labels: string[]; active: string; onChange: (l: string) => void }) {
  return (
    <div className="flex gap-2 mb-4">
      {labels.map(l => (
        <button key={l} onClick={() => onChange(l)}
          className={`px-3 py-2 rounded-[14px] text-[12.5px] font-bold transition cursor-pointer ${
            active === l
              ? 'bg-brand-50 border-brand-600 text-brand-600 border'
              : 'bg-surface-50 border-ash-line text-ash border'
          }`}>
          {l}
        </button>
      ))}
    </div>
  )
}

export function HomeSearch() {
  const [query, setQuery] = useState('')
  const [show, setShow] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const results = query.trim()
    ? TOPICS.filter(t => t.name.toLowerCase().includes(query.trim().toLowerCase()))
        .map(t => ({ topic: t, subject: SUBJECTS.find(s => s.id === t.subjectId)! }))
        .filter(r => r.subject)
    : []

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setShow(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div className="search-wrap relative mb-[22px]" ref={ref}>
      <div className="flex items-center gap-2.5 bg-paper-dim border border-ash-line rounded-[16px] px-3.5 py-3">
        <Search size={17} className="text-ash shrink-0" />
        <input type="text" placeholder="Search any topic, e.g. osmosis…"
          className="flex-1 border-none outline-none text-[14px] font-sans bg-transparent text-surface-900 placeholder:text-ash"
          value={query}
          onChange={e => { setQuery(e.target.value); setShow(true) }}
          onFocus={e => { if (e.target.value.trim()) setShow(true) }} />
        <span className="w-6 h-6 rounded-[8px] bg-brand-50 flex items-center justify-center shrink-0">
          <Sparkles size={14} className="text-brand-600" />
        </span>
      </div>

      {show && query.trim() && (
        <div className="absolute top-[calc(100%-6px)] left-0 right-0 z-15 bg-surface-50 border border-ash-line rounded-[16px] py-1 max-h-[340px] overflow-y-auto no-scrollbar shadow-[0_16px_36px_rgba(0,0,0,0.10)]">
          {results.length > 0 ? results.map(r => (
            <div key={r.topic.id} onClick={() => { router.push(`/subjects/${r.subject.id}`); setShow(false) }}
              className="flex items-center gap-3 py-3 px-4 cursor-pointer border-b border-ash-line last:border-b-0 hover:bg-paper-dim/50 transition">
              <div className="w-[34px] h-[34px] rounded-[9px] bg-paper-dim flex items-center justify-center shrink-0 text-[15px]">
                {r.subject.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[14px] font-bold text-surface-900">{r.topic.name}</div>
                <div className="text-[12px] text-ash">{r.subject.name}</div>
              </div>
              <ChevronRight size={18} className="text-ash shrink-0" />
            </div>
          )) : (
            <p className="px-4 py-3.5 text-ash text-[13px]">No matches — try another topic or subject.</p>
          )}
        </div>
      )}
    </div>
  )
}

export function PromoteCard({ icon, title, sub, onClick }: { icon: ReactNode; title: string; sub: string; onClick?: () => void }) {
  return (
    <div onClick={onClick} className="flex items-center gap-3 rounded-[14px] border border-ash-line p-4 mb-4 bg-surface-50 cursor-pointer hover:border-brand-600 transition">
      <span className="text-[22px] shrink-0 text-surface-900">{icon}</span>
      <div className="flex-1 min-w-0">
        <div className="font-bold text-[14.5px] text-surface-900">{title}</div>
        <div className="text-[12px] text-ink-soft">{sub}</div>
      </div>
      <Chevron />
    </div>
  )
}
