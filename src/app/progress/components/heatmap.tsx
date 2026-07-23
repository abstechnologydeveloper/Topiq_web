export function Heatmap() {
  const levels = [0, 1, 2, 1, 0, 0, 0, 1, 3, 2, 1, 0, 2, 2, 1, 0, 0, 1, 3, 2, 1, 0, 2, 2, 1, 0, 0, 1, 3, 2, 1, 0, 2, 2, 1, 0, 0, 1, 3, 2, 1, 0]
  const colors = ['bg-paper-dim', 'bg-brand-50', 'bg-brand-200', 'bg-brand-600']
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  const hours = ['8am', '10am', '12pm', '2pm', '4pm', '6pm']

  return (
    <>
      <div className="grid grid-cols-[88px_repeat(7,1fr)] gap-1.5 items-center mb-5">
        <div />
        {days.map((d, i) => (
          <div key={i} className="text-[9.5px] text-ash text-center font-mono">{d}</div>
        ))}
        {hours.map((t, i) => (
          <div key={t} className="contents">
            <div className="text-[11.5px] font-bold text-ash">{t}</div>
            {[0, 1, 2, 3, 4, 5, 6].map((d) => {
              const idx = i * 7 + d
              const lvl = levels[idx % levels.length]
              return <div key={d} className={`aspect-square rounded-[5px] ${colors[lvl] || 'bg-paper-dim'}`} />
            })}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 mb-5 px-1">
        <span className="text-[11px] font-semibold text-ash">Less</span>
        {colors.map((c, i) => (
          <div key={i} className={`w-3.5 h-3.5 rounded-[4px] ${c}`} />
        ))}
        <span className="text-[11px] font-semibold text-ash">More</span>
      </div>
    </>
  )
}
