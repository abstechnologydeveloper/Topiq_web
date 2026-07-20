import type { Metadata } from 'next'
import { Fraunces } from 'next/font/google'
import { ThemeProvider } from '@/components/theme/theme-provider'
import Shell from '@/components/layout/shell'
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              var theme = localStorage.getItem('topiq-theme');
              if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark');
              }
            })()
          `
        }} />
      </head>
      <body className={`${fraunces.variable} font-sans min-h-screen bg-surface-50`} suppressHydrationWarning>
        <ThemeProvider>
          <Shell>{children}</Shell>
        </ThemeProvider>
      </body>
    </html>
  )
}