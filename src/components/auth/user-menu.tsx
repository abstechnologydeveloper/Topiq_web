'use client'

import { useEffect, useState } from 'react'
import { useAuthStore } from '@/lib/auth/store'

const DEFAULT_USER = {
  initials: 'AO',
  name: 'Ayomiku Olatunji',
  grade: 'SS3 Science',
}

export function DesktopUserMenu() {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const unsub = useAuthStore.persist.onFinishHydration(() => setHydrated(true))
    if (useAuthStore.persist.hasHydrated()) setHydrated(true)
    return () => unsub()
  }, [])

  const isLoggedIn = hydrated && !!user

  const initials = isLoggedIn
    ? (user.firstName?.[0] ?? user.email[0]).toUpperCase()
    : DEFAULT_USER.initials

  const displayName = isLoggedIn
    ? user.firstName
      ? `${user.firstName} ${user.lastName}`
      : user.email.split('@')[0]
    : DEFAULT_USER.name

  const grade = isLoggedIn ? (user.grade ?? '') : DEFAULT_USER.grade

  return (
    <div className="p-3 border-t border-surface-200">
      <div className="flex items-center gap-2 px-2 py-1">
        <div className="w-8 h-8 bg-brand-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-surface-700 truncate">{displayName}</p>
          {grade && <p className="text-[10px] text-surface-400 truncate">{grade}</p>}
        </div>
        {isLoggedIn && (
          <button
            onClick={logout}
            className="shrink-0 p-1.5 text-surface-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
            title="Sign out"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}
