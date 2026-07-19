'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eyebrow, PageTitle } from '@/components/ui/shared'
import { useAuthStore } from '@/lib/auth/store'

export default function ProfilePage() {
  const user = useAuthStore(s => s.user)
  const logout = useAuthStore(s => s.logout)
  const [editing, setEditing] = useState(false)

  const initials = user
    ? (user.firstName?.[0] ?? user.email[0]).toUpperCase()
    : 'AO'

  const displayName = user
    ? user.firstName ? `${user.firstName} ${user.lastName}` : user.email.split('@')[0]
    : 'Ayomiku Olatunji'

  const username = user?.firstName?.toLowerCase() ?? 'ayomiku_o'
  const grade = user?.grade ?? 'SS3 Science'

  return (
    <div>
      <Link href="/progress" className="flex items-center gap-2 text-ash text-[13px] font-semibold mb-3.5 w-fit">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
        Progress
      </Link>
      <Eyebrow>Your account</Eyebrow>
      <PageTitle title="Profile" sub="The basics we use to personalise AbSTopiq for you." />

      <div className="flex items-center gap-3.5 mb-4">
        <div className="w-[56px] h-[56px] rounded-full bg-brand-600 text-surface-50 flex items-center justify-center text-lg font-bold shrink-0">
          {initials}
        </div>
        <div>
          <div className="font-bold text-[15px] text-surface-900">{displayName}</div>
          <div className="text-[13px] text-ash">@{username}</div>
        </div>
      </div>

      <div className="bg-surface-50 border border-ash-line rounded-[--radius] mb-4">
        {[
          ['First name', user?.firstName ?? 'Ayomiku'],
          ['Last name', user?.lastName ?? 'Olatunji'],
          ['Age', user?.age?.toString() ?? '16'],
          ['Grade level', grade],
          ['Gender', 'Female'],
          ['Class of study', 'Science'],
          ['School', 'Corona Secondary School'],
        ].map(([label, value], i) => (
          <div key={i} className="flex items-center justify-between py-3 px-1 border-b border-ash-line last:border-b-0">
            <span className="text-[13px] font-semibold text-ash">{label}</span>
            <span className="font-mono text-[11px] font-bold text-surface-900 text-right">{value}</span>
          </div>
        ))}
      </div>

      <button onClick={() => setEditing(!editing)}
        className="w-full bg-none border border-dashed border-ash-line text-ash rounded-[14px] py-3 font-bold text-[13px] cursor-pointer mb-2.5 hover:border-brand-600 hover:text-brand-600 transition">
        ✎ Edit profile
      </button>
      <button onClick={() => window.location.href = '/settings'}
        className="w-full bg-none border border-dashed border-ash-line text-ash rounded-[14px] py-3 font-bold text-[13px] cursor-pointer hover:border-brand-600 hover:text-brand-600 transition">
        ⚙ Settings
      </button>
    </div>
  )
}
