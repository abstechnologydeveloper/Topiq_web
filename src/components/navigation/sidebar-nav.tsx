'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuthStore } from '@/lib/auth/store'

const DESKTOP_PRIMARY = [
  { href: '/', label: 'Discover', icon: 'M21 21l-4.3-4.3 M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14z' },
  { href: '/subjects', label: 'Subjects', icon: 'M4 5a2 2 0 0 1 2-2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5z M14 3v6h6' },
  { href: '/practice', label: 'Practice', icon: 'M9 11l3 3L22 4 M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11' },
  { href: '/assignments', label: 'Assignments', icon: 'M5 3h14v18H5z M9 7h6 M9 11h6 M9 15h4' },
  { href: '/live-class', label: 'Live Class', icon: 'M12 9.8a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4z M8.5 8.5a5 5 0 0 0 0 7 M15.5 8.5a5 5 0 0 0 0 7 M5.2 5.2a10 10 0 0 0 0 13.6 M18.8 5.2a10 10 0 0 0 0 13.6' },
  { href: '/ask', label: 'Sabi AI', icon: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' },
  { href: '/timetable', label: 'Plan', icon: 'M3 4h18v18H3z M3 10h18 M16 2v4 M8 2v4' },
  { href: '/progress', label: 'Progress', icon: 'M3 3v18h18 M7 15l4-6 4 4 5-8' },
]

const DESKTOP_SECONDARY = [
  { href: '/challenges', label: 'Challenges', icon: 'M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4z' },
  { href: '/books', label: 'Books', icon: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z' },
  { href: '/competitions', label: 'Competitions', icon: 'M8 21h8 M12 17v4 M7 4h10v5a5 5 0 0 1-10 0V4z M7 6H4a1 1 0 0 0-1 1 4 4 0 0 0 4 4 M17 6h3a1 1 0 0 1 1 1 4 4 0 0 1-4 4' },
]

const TABBAR_LINKS = [
  { href: '/', label: 'Discover', icon: 'M21 21l-4.3-4.3 M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14z' },
  { href: '/subjects', label: 'Subjects', icon: 'M4 5a2 2 0 0 1 2-2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5z M14 3v6h6' },
  { href: '/practice', label: 'Practice', icon: 'M9 11l3 3L22 4 M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11' },
  { href: '/live-class', label: 'Live Class', icon: 'M12 9.8a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4z M8.5 8.5a5 5 0 0 0 0 7 M15.5 8.5a5 5 0 0 0 0 7 M5.2 5.2a10 10 0 0 0 0 13.6 M18.8 5.2a10 10 0 0 0 0 13.6' },
  { href: '/ask', label: 'Sabi AI', icon: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' },
  { href: '/timetable', label: 'Plan', icon: 'M3 4h18v18H3z M3 10h18 M16 2v4 M8 2v4' },
]

const DRAWER_LINKS = [
  { href: '/', label: 'Discover', icon: 'M21 21l-4.3-4.3 M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14z' },
  { href: '/subjects', label: 'Subjects', icon: 'M4 5a2 2 0 0 1 2-2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5z M14 3v6h6' },
  { href: '/practice', label: 'Practice', icon: 'M9 11l3 3L22 4 M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11' },
  { href: '/assignments', label: 'Assignments', icon: 'M5 3h14v18H5z M9 7h6 M9 11h6 M9 15h4' },
  { href: '/live-class', label: 'Live Class', icon: 'M12 9.8a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4z M8.5 8.5a5 5 0 0 0 0 7 M15.5 8.5a5 5 0 0 0 0 7 M5.2 5.2a10 10 0 0 0 0 13.6 M18.8 5.2a10 10 0 0 0 0 13.6' },
  { href: '/ask', label: 'Sabi AI', icon: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' },
  { href: '/timetable', label: 'Plan', icon: 'M3 4h18v18H3z M3 10h18 M16 2v4 M8 2v4' },
  { href: '/progress', label: 'Progress', icon: 'M3 3v18h18 M7 15l4-6 4 4 5-8' },
  { href: '/books', label: 'Books', icon: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z' },
]

const DRAWER_BOTTOM_LINKS = [
  { href: '/challenges', label: 'Challenges', icon: 'M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4z' },
  { href: '/competitions', label: 'Competitions', icon: 'M8 21h8 M12 17v4 M7 4h10v5a5 5 0 0 1-10 0V4z M7 6H4a1 1 0 0 0-1 1 4 4 0 0 0 4 4 M17 6h3a1 1 0 0 1 1 1 4 4 0 0 1-4 4' },
]

function isActive(href: string, pathname: string) {
  if (href === '/') return pathname === '/'
  return pathname.startsWith(href)
}

export function DesktopNav() {
  const pathname = usePathname()

  const linkCls = (href: string) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
      isActive(href, pathname)
        ? 'bg-brand-50 text-brand-600'
        : 'text-surface-500 hover:bg-brand-50 hover:text-brand-600'
    }`

  return (
    <nav className="flex-1 px-2 space-y-0.5">
      {DESKTOP_PRIMARY.map(({ href, label, icon }) => (
        <Link key={href} href={href} className={linkCls(href)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d={icon} />
          </svg>
          {label}
        </Link>
      ))}

      <div className="h-px bg-ash-line my-2.5 mx-1" />

      {DESKTOP_SECONDARY.map(({ href, label, icon }) => (
        <Link key={href} href={href} className={linkCls(href)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d={icon} />
          </svg>
          {label}
          {href === '/books' && <span className="ml-auto font-mono text-[10px] font-bold text-ash bg-ash-line px-1.5 py-0.5 rounded">100k</span>}
        </Link>
      ))}
    </nav>
  )
}

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="lg:hidden sticky bottom-0 bg-surface-50 border-t border-ash-line z-50 flex px-1.5 pb-[calc(8px+env(safe-area-inset-bottom))] pt-2">
      {TABBAR_LINKS.map(({ href, label, icon }) => {
        const active = isActive(href, pathname)
        return (
          <Link
            key={href}
            href={href}
            className={`flex-1 flex flex-col items-center gap-1 py-1 px-0.5 text-[11px] font-semibold rounded-[10px] transition ${
              active ? 'text-surface-900' : 'text-ash hover:text-surface-700'
            }`}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d={icon} />
            </svg>
            {label}
          </Link>
        )
      })}
    </nav>
  )
}

export function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname()
  const user = useAuthStore(s => s.user)

  const initials = user
    ? (user.firstName?.[0] ?? user.email[0]).toUpperCase()
    : 'AO'
  const displayName = user
    ? user.firstName ? `${user.firstName} ${user.lastName}` : user.email.split('@')[0]
    : 'Ayomiku Olatunji'

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-[rgba(20,23,43,0.55)] z-200 lg:hidden animate-fadeIn"
          onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
          <div className="absolute top-0 left-0 bottom-0 w-[78%] max-w-[300px] bg-surface-50 flex flex-col shadow-[8px_0_30px_rgba(0,0,0,0.25)] p-4">
            <div className="flex items-center justify-between mb-4">
              <Link href="/" className="flex items-center gap-2" onClick={onClose}>
                <span className="w-[34px] h-[34px] rounded-lg bg-brand-600 text-white flex items-center justify-center text-sm font-extrabold">T</span>
                <span className="font-display text-[20px] font-semibold text-surface-900">Topiq</span>
              </Link>
              <button onClick={onClose} className="w-[32px] h-[32px] rounded-full bg-paper-dim flex items-center justify-center cursor-pointer">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-0.5 no-scrollbar">
              {DRAWER_LINKS.map(({ href, label, icon }) => {
                const active = isActive(href, pathname)
                return (
                  <Link key={href} href={href} onClick={onClose}
                    className={`flex items-center gap-3 px-3 py-[11px] rounded-[12px] text-[14.5px] font-semibold w-full transition ${
                      active ? 'bg-brand-50 text-brand-600' : 'text-surface-700 hover:bg-brand-50'
                    }`}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d={icon} />
                    </svg>
                    {label}
                  </Link>
                )
              })}

              <div className="h-px bg-ash-line my-2.5 mx-1" />

              {DRAWER_BOTTOM_LINKS.map(({ href, label, icon }) => {
                const active = isActive(href, pathname)
                return (
                  <Link key={href} href={href} onClick={onClose}
                    className={`flex items-center gap-3 px-3 py-[11px] rounded-[12px] text-[14.5px] font-semibold w-full transition ${
                      active ? 'bg-brand-50 text-brand-600' : 'text-surface-700 hover:bg-brand-50'
                    }`}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d={icon} />
                    </svg>
                    {label}
                  </Link>
                )
              })}

              <div className="h-px bg-ash-line my-2.5 mx-1" />

              <Link href="/profile" onClick={onClose}
                className="flex items-center gap-2.5 px-2.5 py-[9px] rounded-[12px] hover:bg-paper-dim transition cursor-pointer">
                <div className="w-[32px] h-[32px] rounded-full bg-brand-600 text-surface-50 flex items-center justify-center text-xs font-bold shrink-0">
                  {initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-[13.5px] text-surface-900 truncate">{displayName}</div>
                  <div className="text-[11px] text-ash">View profile</div>
                </div>
              </Link>

              <Link href="/settings" onClick={onClose}
                className="flex items-center gap-3 px-3 py-[11px] rounded-[12px] text-[14.5px] font-semibold w-full text-surface-700 hover:bg-brand-50 transition">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                Settings
              </Link>

              <Link href="/subscription" onClick={onClose}
                className="flex items-center gap-3 px-3 py-[11px] rounded-[12px] text-[14.5px] font-semibold w-full bg-brand-600 text-surface-50 hover:opacity-90 transition mt-1">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4z"/></svg>
                Upgrade
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
