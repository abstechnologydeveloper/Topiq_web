import type { Metadata } from 'next'
import Link from 'next/link'
import { AuthButton } from '@/components/auth/auth-button'
import { DesktopUserMenu } from '@/components/auth/user-menu'
import { ThemeProvider } from '@/components/theme/theme-provider'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import { DesktopNav, MobileNav } from '@/components/navigation/sidebar-nav'
import './globals.css'

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
      <body className="font-sans min-h-screen bg-surface-50" suppressHydrationWarning>
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
          <div className="mt-auto">
            <div className="px-3 py-2 flex items-center justify-end">
              <ThemeToggle />
            </div>
            <DesktopUserMenu />
          </div>
        </aside>

        {/* Main */}
        <div className="lg:ml-56 flex flex-col min-w-0 min-h-screen">
          <header className="lg:hidden sticky top-0 z-50 border-b bg-surface-50/95 backdrop-blur">
            <div className="flex h-14 items-center justify-between px-4">
              <Link href="/" className="text-lg font-bold text-brand-600">Topiq</Link>
              <div className="flex items-center gap-1">
                <ThemeToggle />
                <AuthButton />
              </div>
            </div>
          </header>
          <main className="flex-1 px-4 py-6 lg:px-8 lg:py-8 max-w-5xl mx-auto w-full">{children}</main>

          <MobileNav />
        </div>
        </ThemeProvider>
      </body>
    </html>
  )
}