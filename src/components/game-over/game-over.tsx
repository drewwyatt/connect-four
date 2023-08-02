'use client'
import type { FC } from 'react'
import { Token, playerNameForToken } from '~/lib/models'
import { useGameOver, useReset } from '~/lib/state'

const Heading: FC<{ winner: Token | null }> = ({ winner }) =>
  !!winner ? <h1>{playerNameForToken(winner)} Wins!</h1> : <h1>It's a Draw!</h1>

const GameOver: FC = () => {
  const [isGameOver, winner] = useGameOver()
  const reset = useReset()
  return (
    isGameOver && (
      <dialog open>
        <Heading winner={winner} />
        <button onClick={reset}>Play Again</button>
      </dialog>
    )
  )
}

export default GameOver
