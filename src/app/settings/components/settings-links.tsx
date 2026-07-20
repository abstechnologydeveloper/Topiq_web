import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export function SettingsLinks() {
  const links = [
    { href: '/profile', label: 'Edit profile' },
    { href: '/subscription', label: 'Subscription & billing' },
  ]
  const plainLinks = ['Notifications']

  return (
    <div className="bg-surface-50 border border-ash-line rounded-[--radius] mb-4">
      {links.map((l, i) => (
        <Link key={i} href={l.href}
          className="flex items-center justify-between py-3 px-1 border-b border-ash-line cursor-pointer hover:bg-paper-dim/30 transition">
          <span className="font-semibold text-[13px] text-surface-900">{l.label}</span>
          <ChevronRight size={18} className="text-ash shrink-0" />
        </Link>
      ))}
      {plainLinks.map((l, i) => (
        <div key={i} className="flex items-center justify-between py-3 px-1 border-b border-ash-line cursor-pointer hover:bg-paper-dim/30 transition">
          <span className="font-semibold text-[13px] text-surface-900">{l}</span>
          <ChevronRight size={18} className="text-ash shrink-0" />
        </div>
      ))}
    </div>
  )
}
