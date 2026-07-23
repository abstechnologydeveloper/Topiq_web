interface Props {
  fields: [string, string][]
}

export function ProfileFields({ fields }: Props) {
  return (
    <div className="bg-surface-50 border border-ash-line rounded-[--radius] mb-4 divide-y divide-ash-line">
      {fields.map(([label, value], i) => (
        <div key={i} className="flex items-center gap-3 px-4 py-[11px]">
          <span className="flex-1 text-[13.5px] font-semibold text-ash">{label}</span>
          <span className="font-mono text-[11px] font-bold text-surface-900 text-right">{value}</span>
        </div>
      ))}
    </div>
  )
}
