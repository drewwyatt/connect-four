'use client'
import { FC, useCallback, useEffect, useRef } from 'react'
import { Token, playerNameForToken } from '~/lib/models'
import { useGameOver, useReset } from '~/lib/state'
import styles from './game-over.module.css'

const Heading: FC<{ winner: Token | null }> = ({ winner }) => (
  <h1 className={styles.heading}>
    {!!winner ? `${playerNameForToken(winner)} Wins!` : "It's a Draw!"}
  </h1>
)

const GameOver: FC = () => {
  const [isGameOver, winner] = useGameOver()
  const reset = useReset()
  const self = useRef<HTMLDialogElement | null>(null)

  const onClick = useCallback(() => {
    reset()
    self.current?.close()
  }, [reset])

  useEffect(() => {
    if (isGameOver) {
      self.current?.showModal()
    }
  }, [isGameOver])

  return (
    <dialog ref={self} className={styles.gameOver}>
      <Heading winner={winner} />
      <button className={styles.playAgain} onClick={onClick}>
        Play Again
      </button>
    </dialog>
  )
}

export default GameOver
