import type { ReactNode } from 'react'
import { BoardCard } from './board-card'

interface Board {
  flag: ReactNode
  name: string
  sub: string
}

interface Props {
  boards: Board[]
}

export function BoardGrid({ boards }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {boards.map(b => (
        <BoardCard key={b.name} {...b} />
      ))}
    </div>
  )
}
