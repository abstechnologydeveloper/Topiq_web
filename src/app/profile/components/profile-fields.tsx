interface Props {
  fields: [string, string][]
}

export function ProfileFields({ fields }: Props) {
  return (
    <div className="bg-surface-50 border border-ash-line rounded-[--radius] mb-4">
      {fields.map(([label, value], i) => (
        <div key={i} className="flex items-center justify-between py-3 px-1 border-b border-ash-line last:border-b-0">
          <span className="text-[13px] font-semibold text-ash">{label}</span>
          <span className="font-mono text-[11px] font-bold text-surface-900 text-right">{value}</span>
        </div>
      ))}
    </div>
  )
}
