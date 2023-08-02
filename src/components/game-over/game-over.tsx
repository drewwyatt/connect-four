'use client'
import { FC, useEffect, useRef } from 'react'
import { Token, playerNameForToken } from '~/lib/models'
import { useGameOver } from '~/lib/state'
import ResetButton from '~/components/reset-button'

import styles from './game-over.module.css'

const Heading: FC<{ winner: Token | null }> = ({ winner }) => (
  <h1 className={styles.heading}>
    {!!winner ? `${playerNameForToken(winner)} Wins!` : "It's a Draw!"}
  </h1>
)

const GameOver: FC = () => {
  const [isGameOver, winner] = useGameOver()
  const self = useRef<HTMLDialogElement | null>(null)

  useEffect(() => {
    if (isGameOver) {
      self.current?.showModal()
    } else {
      self.current?.close()
    }
  }, [isGameOver])

  return (
    <dialog ref={self} className={styles.gameOver}>
      <Heading winner={winner} />
      <ResetButton className={styles.playAgain}>Play Again</ResetButton>
    </dialog>
  )
}

export default GameOver
