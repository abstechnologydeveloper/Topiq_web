'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eyebrow, PageTitle } from '@/components/ui/shared'
import { useAuthStore } from '@/lib/auth/store'
import { ArrowLeft } from 'lucide-react'
import { ProfileFields } from './components/profile-fields'
import { ProfileActions } from './components/profile-actions'

export default function ProfilePage() {
  const user = useAuthStore(s => s.user)
  const [editing, setEditing] = useState(false)

  const initials = user
    ? (user.firstName?.[0] ?? user.email[0]).toUpperCase()
    : 'AO'

  const displayName = user
    ? user.firstName ? `${user.firstName} ${user.lastName}` : user.email.split('@')[0]
    : 'Ayomiku Olatunji'

  const username = user?.firstName?.toLowerCase() ?? 'ayomiku_o'
  const grade = user?.grade ?? 'SS3 Science'

  const fields: [string, string][] = [
    ['First name', user?.firstName ?? 'Ayomiku'],
    ['Last name', user?.lastName ?? 'Olatunji'],
    ['Age', user?.age?.toString() ?? '16'],
    ['Grade level', grade],
    ['Gender', 'Female'],
    ['Class of study', 'Science'],
    ['School', 'Corona Secondary School'],
  ]

  return (
    <div>
      <Link href="/progress" className="flex items-center gap-2 text-ash text-[13px] font-semibold mb-3.5 w-fit">
        <ArrowLeft size={16} />
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

      <ProfileFields fields={fields} />
      <ProfileActions onEdit={() => setEditing(!editing)} />
    </div>
  )
}
