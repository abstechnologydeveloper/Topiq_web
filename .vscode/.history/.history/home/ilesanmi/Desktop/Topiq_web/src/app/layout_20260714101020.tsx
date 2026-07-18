import type { Metadata } from 'next'
import Link from 'next/link'
import { AuthButton } from '@/components/auth/auth-button'
import './globals.css'

export const metadata: Metadata = {
  title: 'Topiq — Master Any Subject',
  description: 'Browse any subject. Master any topic. Practise with thousands of real questions.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans min-h-screen bg-surface-50 flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex flex-col w-56 flex-shrink-0 bg-white border-r border-surface-200 min-h-screen">
          <div className="p-5">
            <Link href="/" className="flex items-center gap-2 text-lg font-bold text-brand-600">
              <span className="w-8 h-8 bg-brand-600 text-white rounded-lg flex items-center justify-center text-sm font-extrabold">T</span>
              Topiq
            </Link>
          </div>
          <nav className="flex-1 px-2 space-y-0.5">
            {[
              { href: '/', label: 'Discover', icon: 'M16.24 7.76L14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76z' },
              { href: '/subjects', label: 'Subjects', icon: 'M4 19.5A2.5 2.5 0 016.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5' },
              { href: '/ask', label: 'Ask AI', icon: 'M3 11h18a2 2 0 012 2v6a2 2 0 01-2 2H3 M12 5v4' },
              { href: '/practice', label: 'Practice', icon: 'M9 12l2 2 4-4' },
              { href: '/timetable', label: 'Plan', icon: 'M3 4h18v18H3z M3 10h18 M16 2v4 M8 2v4' },
            ].map(({ href, label, icon }) => (
              <Link key={href} href={href} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-surface-500 hover:bg-brand-50 hover:text-brand-600 transition">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" opacity="0" /><path d={icon} />
                </svg>
                {label}
              </Link>
            ))}
          </nav>
          <div className="p-3 border-t border-surface-200">
            <div className="flex items-center gap-2 px-2 py-1">
              <div className="w-8 h-8 bg-brand-600 text-white rounded-full flex items-center justify-center text-xs font-bold">AO</div>
              <div>
                <p className="text-sm font-medium text-surface-700">Ayomiku Olatunji</p>
                <p className="text-[10px] text-surface-400">SS3 Science</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 flex flex-col min-w-0">
          <header className="lg:hidden sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
            <div className="flex h-14 items-center justify-between px-4">
              <Link href="/" className="text-lg font-bold text-brand-600">Topiq</Link>
              <AuthButton />
            </div>
          </header>
          <main className="flex-1 px-4 py-6 lg:px-8 lg:py-8 max-w-5xl mx-auto w-full">{children}</main>

          {/* Mobile bottom nav */}
          <nav className="lg:hidden sticky bottom-0 bg-white border-t z-50 flex">
            {[
              { href: '/', label: 'Home', icon: '🏠' },
              { href: '/subjects', label: 'Subjects', icon: '📚' },
              { href: '/ask', label: 'Ask AI', icon: '🤖' },
              { href: '/practice', label: 'Practice', icon: '✅' },
              { href: '/timetable', label: 'Plan', icon: '📅' },
            ].map(({ href, label, icon }) => (
              <Link key={href} href={href} className="flex-1 flex flex-col items-center gap-0.5 py-2 text-[10px] font-medium text-surface-400 hover:text-brand-600">
                <span className="text-base">{icon}</span>
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </body>
    </html>
  )
}