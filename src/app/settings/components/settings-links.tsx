import { ChevronRight } from 'lucide-react'

interface Props {
  onNotifications: () => void
}

export function SettingsLinks({ onNotifications }: Props) {
  const links = [
    { href: '/profile', label: 'Edit profile' },
    { href: '/subscription', label: 'Subscription & billing' },
  ]

  return (
    <div className="bg-surface-50 border border-ash-line rounded-[--radius] mb-4">
      {links.map((l, i) => (
        <a key={i} href={l.href}
          className="flex items-center justify-between py-3 px-1 border-b border-ash-line cursor-pointer hover:bg-paper-dim/30 transition no-underline">
          <span className="font-semibold text-[13px] text-surface-900">{l.label}</span>
          <ChevronRight size={18} className="text-ash shrink-0" />
        </a>
      ))}
      <div onClick={onNotifications}
        className="flex items-center justify-between py-3 px-1 cursor-pointer hover:bg-paper-dim/30 transition">
        <span className="font-semibold text-[13px] text-surface-900">Notifications</span>
        <ChevronRight size={18} className="text-ash shrink-0" />
      </div>
    </div>
  )
}
