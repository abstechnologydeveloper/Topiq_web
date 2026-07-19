'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AuthButton } from '@/components/auth/auth-button'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import { MobileDrawer } from '@/components/navigation/sidebar-nav'

export function MobileHeader() {
  const [drawerOpen, setDrawerOpen] = useState(false)

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
            <Link href="/" className="flex items-center gap-2">
              <span className="w-[34px] h-[34px] rounded-lg bg-brand-600 text-white flex items-center justify-center text-sm font-extrabold">T</span>
              <span className="font-display text-[18px] font-semibold text-surface-900">Topiq</span>
            </Link>
          </div>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <AuthButton />
          </div>
        </div>
      </header>
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}
