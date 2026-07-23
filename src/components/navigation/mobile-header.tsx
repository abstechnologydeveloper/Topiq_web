'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Flame } from 'lucide-react'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import { MobileDrawer } from '@/components/navigation/sidebar-nav'
import { useAuthStore } from '@/lib/auth/store'
import { STATS } from '@/lib/data'

export function MobileHeader() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [switchOpen, setSwitchOpen] = useState(false)
  const user = useAuthStore(s => s.user)

  const displayName = user
    ? user.firstName ? `${user.firstName} ${user.lastName}` : user.email.split('@')[0]
    : 'Ayomiku Olatunji'
  const initials = user
    ? (user.firstName?.[0] ?? user.email[0]).toUpperCase()
    : 'AO'
  const grade = user?.grade || 'SS2'

  return (
    <>
      <header className="lg:hidden sticky top-0 z-50 border-b border-ash-line bg-surface-50/95 backdrop-blur">
        <div className="flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <button onClick={() => setDrawerOpen(true)}
              className="w-[32px] h-[32px] rounded-[9px] bg-paper-dim flex items-center justify-center cursor-pointer shrink-0 text-surface-700">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12h18M3 6h18M3 18h18"/>
              </svg>
            </button>
            <Link href="/" className="flex items-center gap-0.5">
              <img src="/icon-192.png" alt="Topiq" className="w-[38px] h-[38px] object-contain" />
              <button onClick={(e) => { e.preventDefault(); setSwitchOpen(true) }}
                className="flex items-center justify-center w-6 h-6 rounded-[8px] border-none bg-none text-ash cursor-pointer shrink-0 hover:bg-paper-dim hover:text-surface-700 transition"
                title="Switch account">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
              </button>
            </Link>
          </div>
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-1.5 bg-ember-soft px-2.5 py-1.5 rounded-[20px] font-mono text-[12px] font-bold text-surface-800 cursor-pointer">
              <Flame size={14} className="text-secondary-500" /> {STATS.streak}-day streak
            </div>
          </div>
        </div>
      </header>
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} onSwitchOpen={() => { setDrawerOpen(false); setSwitchOpen(true) }} />

      {switchOpen && (
        <div className="fixed inset-0 bg-[rgba(20,23,43,0.55)] z-300 flex items-start justify-center pt-[70px] px-4"
          onClick={(e) => { if (e.target === e.currentTarget) setSwitchOpen(false) }}>
          <div className="w-full max-w-[340px] max-h-[70vh] bg-surface-50 rounded-[20px] p-5 overflow-y-auto mx-auto animate-fadeIn">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-[20px] font-semibold text-surface-900">Switch account</h2>
              <button onClick={() => setSwitchOpen(false)}
                className="bg-paper-dim border-none w-[30px] h-[30px] rounded-full cursor-pointer text-sm flex items-center justify-center text-surface-500 hover:text-surface-700 shrink-0">
                ✕
              </button>
            </div>
            <p className="text-[12px] text-ash mb-4 leading-[1.5]">Jump between your linked AbSTopiq accounts.</p>

            <div className="flex items-center gap-3 py-2.5 px-1 border-b border-ash-line">
              <div className="w-[32px] h-[32px] rounded-full bg-brand-600 text-surface-50 flex items-center justify-center text-xs font-bold shrink-0">
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13.5px] font-semibold text-surface-900">{displayName}</div>
                <div className="text-[11px] text-ash font-semibold">{grade} · current</div>
              </div>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand-600, #7C3AED)" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
            </div>

            <button className="w-full bg-none border border-dashed border-ash-line text-ash rounded-[14px] py-3 font-bold text-[13px] cursor-pointer mt-2.5 hover:border-brand-600 hover:text-brand-600 transition">
              + Add another account
            </button>

            <div className="h-px bg-ash-line my-4" />

            <div className="flex items-center justify-between px-1">
              <span className="text-[13px] font-semibold text-surface-700">Appearance</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
