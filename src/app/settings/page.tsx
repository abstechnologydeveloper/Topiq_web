'use client'

import Link from 'next/link'
import { Eyebrow, PageTitle } from '@/components/ui/shared'
import { useAuthStore } from '@/lib/auth/store'

export default function SettingsPage() {
  const logout = useAuthStore(s => s.logout)

  return (
    <div>
      <Link href="/profile" className="flex items-center gap-2 text-ash text-[13px] font-semibold mb-3.5 w-fit">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
        Profile
      </Link>
      <Eyebrow>Manage your account</Eyebrow>
      <PageTitle title="Settings" sub="Account, legal and support — everything else lives here." />

      <div className="bg-surface-50 border border-ash-line rounded-[--radius] mb-4">
        <Link href="/profile" className="flex items-center justify-between py-3 px-1 border-b border-ash-line cursor-pointer hover:bg-paper-dim/30 transition">
          <span className="font-semibold text-[13px] text-surface-900">Edit profile</span>
          <svg className="text-ash shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
        </Link>
        <Link href="/subscription" className="flex items-center justify-between py-3 px-1 border-b border-ash-line cursor-pointer hover:bg-paper-dim/30 transition">
          <span className="font-semibold text-[13px] text-surface-900">Subscription &amp; billing</span>
          <svg className="text-ash shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
        </Link>
        <div className="flex items-center justify-between py-3 px-1 border-b border-ash-line cursor-pointer hover:bg-paper-dim/30 transition">
          <span className="font-semibold text-[13px] text-surface-900">Notifications</span>
          <svg className="text-ash shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
        </div>
      </div>

      <Eyebrow>Legal &amp; support</Eyebrow>
      <div className="bg-surface-50 border border-ash-line rounded-[--radius] mb-4">
        <Link href="/settings/help" className="flex items-center justify-between py-3 px-1 border-b border-ash-line cursor-pointer hover:bg-paper-dim/30 transition">
          <span className="font-semibold text-[13px] text-surface-900">Help &amp; support</span>
          <svg className="text-ash shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
        </Link>
        <Link href="/settings/privacy" className="flex items-center justify-between py-3 px-1 border-b border-ash-line cursor-pointer hover:bg-paper-dim/30 transition">
          <span className="font-semibold text-[13px] text-surface-900">Privacy policy</span>
          <svg className="text-ash shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
        </Link>
        <Link href="/settings/terms" className="flex items-center justify-between py-3 px-1 border-b border-ash-line cursor-pointer hover:bg-paper-dim/30 transition">
          <span className="font-semibold text-[13px] text-surface-900">Terms of service</span>
          <svg className="text-ash shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
        </Link>
        <div className="flex items-center justify-between py-3 px-1">
          <span className="font-semibold text-[13px] text-ash">App version</span>
          <span className="text-[13px] text-ash">v2.5</span>
        </div>
      </div>

      <button onClick={logout}
        className="w-full border border-solid border-[#E4453A] text-[#E4453A] rounded-[14px] py-3 font-bold text-[13px] cursor-pointer bg-none hover:bg-red-50 transition">
        🚪 Log out
      </button>
    </div>
  )
}
