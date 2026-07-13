'use client'

import { useAuthStore } from '@/lib/auth/store'
import Link from 'next/link'

export function AuthButton() {
  const { user, logout } = useAuthStore()

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm text-surface-600">{user.firstName || user.email.split('@')[0]}</span>
        <button onClick={logout} className="text-sm font-medium text-brand-600 hover:underline">
          Sign out
        </button>
      </div>
    )
  }

  return (
    <Link href="/login" className="text-sm font-medium text-brand-600 hover:underline">
      Sign in
    </Link>
  )
}