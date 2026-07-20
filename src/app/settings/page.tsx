'use client'

import Link from 'next/link'
import { Eyebrow, PageTitle } from '@/components/ui/shared'
import { useAuthStore } from '@/lib/auth/store'
import { ArrowLeft, LogOut } from 'lucide-react'
import { SettingsLinks } from './components/settings-links'
import { LegalLinks } from './components/legal-links'

export default function SettingsPage() {
  const logout = useAuthStore(s => s.logout)

  return (
    <div>
      <Link href="/profile" className="flex items-center gap-2 text-ash text-[13px] font-semibold mb-3.5 w-fit">
        <ArrowLeft size={16} />
        Profile
      </Link>
      <Eyebrow>Manage your account</Eyebrow>
      <PageTitle title="Settings" sub="Account, legal and support — everything else lives here." />

      <SettingsLinks />
      <Eyebrow>Legal &amp; support</Eyebrow>
      <LegalLinks />

      <button onClick={logout}
        className="w-full border border-solid border-[#E4453A] text-[#E4453A] rounded-[14px] py-3 font-bold text-[13px] cursor-pointer bg-none hover:bg-red-50 transition flex items-center justify-center gap-2">
        <LogOut size={16} /> Log out
      </button>
    </div>
  )
}
