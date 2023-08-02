'use client'
import type { FC } from 'react'
import { playerNameForToken } from '~/lib/models'
import { useWinningSpaces } from '~/lib/state'

const GameOver: FC = () => {
  const [winner] = useWinningSpaces()
  return (
    winner && (
      <dialog open>
        <p>{playerNameForToken(winner)}</p>
      </dialog>
    )
  )
}

export default GameOver
