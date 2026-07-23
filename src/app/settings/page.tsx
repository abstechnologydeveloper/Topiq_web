'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eyebrow, PageTitle } from '@/components/ui/shared'
import { useAuthStore } from '@/lib/auth/store'
import { ArrowLeft, LogOut, X } from 'lucide-react'
import { SettingsLinks } from './components/settings-links'
import { LegalLinks } from './components/legal-links'

interface ToggleProps {
  label: string
  desc: string
  on: boolean
  onChange: (v: boolean) => void
}

function ToggleRow({ label, desc, on, onChange }: ToggleProps) {
  return (
    <div className="flex items-center gap-3 py-[11px] px-1 border-b border-ash-line last:border-b-0">
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-semibold text-surface-900">{label}</div>
        <div className="text-[11.5px] text-ash">{desc}</div>
      </div>
      <div onClick={() => onChange(!on)}
        className={`relative w-[32px] h-[18px] rounded-[10px] cursor-pointer shrink-0 transition-colors ${on ? 'bg-brand-600' : 'bg-ash-line'}`}>
        <div className={`absolute top-[2px] w-[14px] h-[14px] rounded-full bg-white shadow transition-transform ${on ? 'left-[16px]' : 'left-[2px]'}`} />
      </div>
    </div>
  )
}

const NOTIFICATION_ITEMS = [
  { key: 'pushPractice', label: 'Practice reminders', desc: 'Daily nudges to keep your streak going' },
  { key: 'pushAssignment', label: 'Assignment deadlines', desc: 'When a teacher sets or extends an assignment' },
  { key: 'pushLive', label: 'Live classes', desc: 'When a class you follow goes live' },
  { key: 'emailDigest', label: 'Weekly email digest', desc: 'A Sunday summary of your progress and top weak points' },
  { key: 'emailPromo', label: 'Product & offers', desc: 'New features, tips and promo offers' },
]

export default function SettingsPage() {
  const logout = useAuthStore(s => s.logout)
  const [showNotifs, setShowNotifs] = useState(false)
  const [notifPrefs, setNotifPrefs] = useState<Record<string, boolean>>({
    pushPractice: true,
    pushAssignment: true,
    pushLive: false,
    emailDigest: true,
    emailPromo: false,
  })

  const setPref = (key: string, val: boolean) =>
    setNotifPrefs(p => ({ ...p, [key]: val }))

  return (
    <div>
      <Link href="/profile" className="flex items-center gap-2 text-ash text-[13px] font-semibold mb-3.5 w-fit">
        <ArrowLeft size={16} />
        Profile
      </Link>
      <Eyebrow>Manage your account</Eyebrow>
      <PageTitle title="Settings" sub="Account, legal and support — everything else lives here." />

      <SettingsLinks onNotifications={() => setShowNotifs(true)} />
      <Eyebrow>Legal &amp; support</Eyebrow>
      <LegalLinks />

      <button onClick={logout}
        className="w-full border border-solid border-[#E4453A] text-[#E4453A] rounded-[14px] py-3 font-bold text-[13px] cursor-pointer bg-none hover:bg-red-50 transition flex items-center justify-center gap-2">
        <LogOut size={16} /> Log out
      </button>

      {/* notifications modal */}
      {showNotifs && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40">
          <div className="w-full sm:max-w-[420px] bg-surface-50 rounded-[20px] sm:rounded-[20px] p-5 sm:p-6 animate-in slide-in-from-bottom-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-surface-900">Notifications</h2>
              <button onClick={() => setShowNotifs(false)} className="w-8 h-8 rounded-full flex items-center justify-center bg-paper-dim text-ash cursor-pointer">
                <X size={15} />
              </button>
            </div>
            <p className="text-[13px] text-ash mb-4">Choose what you want to be notified about — push to your device, email, or both.</p>
            <div className="divide-y divide-ash-line mb-5">
              {NOTIFICATION_ITEMS.map(item => (
                <ToggleRow key={item.key}
                  label={item.label}
                  desc={item.desc}
                  on={notifPrefs[item.key]}
                  onChange={v => setPref(item.key, v)} />
              ))}
            </div>
            <button onClick={() => setShowNotifs(false)}
              className="w-full py-[11px] px-5 rounded-[22px] bg-surface-900 text-surface-50 font-bold text-[13px] cursor-pointer border-none hover:opacity-85 transition">
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
