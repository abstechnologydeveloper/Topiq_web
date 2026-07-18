'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const DESKTOP_LINKS = [
  { href: '/', label: 'Discover', icon: 'M16.24 7.76L14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76z' },
  { href: '/subjects', label: 'Subjects', icon: 'M4 19.5A2.5 2.5 0 016.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2' },
  { href: '/ask', label: 'Ask AI', icon: 'M3 11h18a2 2 0 012 2v6a2 2 0 01-2 2H3 M12 5v4' },
  { href: '/practice', label: 'Practice', icon: 'M9 12l2 2 4-4' },
  { href: '/timetable', label: 'Plan', icon: 'M3 4h18v18H3z M3 10h18 M16 2v4 M8 2v4' },
]

const MOBILE_LINKS = [
  { href: '/', label: 'Home', icon: '🏠' },
  { href: '/subjects', label: 'Subjects', icon: '📚' },
  { href: '/ask', label: 'Ask AI', icon: '🤖' },
  { href: '/practice', label: 'Practice', icon: '✅' },
  { href: '/timetable', label: 'Plan', icon: '📅' },
]

function isActive(href: string, pathname: string) {
  if (href === '/') return pathname === '/'
  return pathname.startsWith(href)
}

export function DesktopNav() {
  const pathname = usePathname()

  return (
    <nav className="flex-1 px-2 space-y-0.5">
      {DESKTOP_LINKS.map(({ href, label, icon }) => {
        const active = isActive(href, pathname)
        return (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
              active
                ? 'bg-brand-50 text-brand-600'
                : 'text-surface-500 hover:bg-brand-50 hover:text-brand-600'
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" opacity="0" /><path d={icon} />
            </svg>
            {label}
          </Link>
        )
      })}
    </nav>
  )
}

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="lg:hidden sticky bottom-0 bg-white border-t z-50 flex">
      {MOBILE_LINKS.map(({ href, label, icon }) => {
        const active = isActive(href, pathname)
        return (
          <Link
            key={href}
            href={href}
            className={`flex-1 flex flex-col items-center gap-0.5 py-2 text-[10px] font-medium transition ${
              active ? 'text-brand-600' : 'text-surface-400 hover:text-brand-600'
            }`}
          >
            <span className="text-base">{icon}</span>
            {label}
          </Link>
        )
      })}/
    </nav>
  )
}
