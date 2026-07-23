'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { DesktopNav, MobileNav } from '@/components/navigation/sidebar-nav'
import { MobileHeader } from '@/components/navigation/mobile-header'
import { DesktopUserMenu } from '@/components/auth/user-menu'
import { ThemeToggle } from '@/components/theme/theme-toggle'

export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAuthPage = pathname === '/login' || pathname === '/signup'

  const linkCls = (href: string) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
      pathname.startsWith(href)
        ? 'bg-brand-50 text-brand-600'
        : 'text-surface-500 hover:bg-brand-50 hover:text-brand-600'
    }`

  if (isAuthPage) {
    return <>{children}</>
  }

  return (
    <>
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 w-56 bg-surface-50 border-r border-surface-200 min-h-screen">
        <div className="p-5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold text-brand-600">
            <span className="w-8 h-8 bg-brand-600 text-white rounded-lg flex items-center justify-center text-sm font-extrabold">T</span>
            Topiq
          </Link>
          <ThemeToggle />
        </div>
        <DesktopNav />
        <div className="mt-auto space-y-0.5 px-2">
          <Link href="/settings"
            className={linkCls('/settings')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
            Settings
          </Link>
          <Link href="/subscription"
            className={linkCls('/subscription')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4z"/>
            </svg>
            Upgrade
          </Link>
          <DesktopUserMenu />
        </div>
      </aside>

      <div className="lg:ml-56 flex flex-col min-w-0 min-h-screen">
        <MobileHeader />
        <main className="flex-1 px-4 py-6 lg:px-8 lg:py-8 max-w-5xl mx-auto w-full">{children}</main>
        <MobileNav />
      </div>
    </>
  )
}
