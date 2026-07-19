import type { Metadata } from 'next'
import Link from 'next/link'
import { Fraunces } from 'next/font/google'
import { DesktopUserMenu } from '@/components/auth/user-menu'
import { ThemeProvider } from '@/components/theme/theme-provider'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import { DesktopNav, MobileNav } from '@/components/navigation/sidebar-nav'
import { MobileHeader } from '@/components/navigation/mobile-header'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-fraunces',
})

export const metadata: Metadata = {
  title: 'Topiq — Master Any Subject',
  description: 'Browse any subject. Master any topic. Practise with thousands of real questions.',
  icons: {
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} font-sans min-h-screen bg-surface-50`} suppressHydrationWarning>
        <ThemeProvider>
          {/* Desktop Sidebar - fixed */}
        <aside className="hidden lg:flex flex-col fixed left-0 top-0 w-56 bg-surface-50 border-r border-surface-200 min-h-screen">
          <div className="p-5">
            <Link href="/" className="flex items-center gap-2 text-lg font-bold text-brand-600">
              <span className="w-8 h-8 bg-brand-600 text-white rounded-lg flex items-center justify-center text-sm font-extrabold">T</span>
              Topiq
            </Link>
          </div>
          <DesktopNav />
          <div className="mt-auto space-y-0.5 px-2">
            <Link href="/settings"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-surface-500 hover:bg-brand-50 hover:text-brand-600 transition">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
              Settings
            </Link>
            <Link href="/subscription"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-surface-500 hover:bg-brand-50 hover:text-brand-600 transition">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4z"/>
              </svg>
              Upgrade
            </Link>
            <div className="flex items-center justify-end px-3 py-1">
              <ThemeToggle />
            </div>
            <DesktopUserMenu />
          </div>
        </aside>

        {/* Main */}
        <div className="lg:ml-56 flex flex-col min-w-0 min-h-screen">
          <MobileHeader />
          <main className="flex-1 px-4 py-6 lg:px-8 lg:py-8 max-w-5xl mx-auto w-full">{children}</main>

          <MobileNav />
        </div>
        </ThemeProvider>
      </body>
    </html>
  )
}