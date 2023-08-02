import type { FC } from 'react'

import { playerNameForToken } from '~/lib/models'
import { useCurrentTurn, useGameOver } from '~/lib/state'
import styles from './board.module.css'

const PlayerTurn: FC<{ name: string }> = ({ name }) => (
  <>
    <strong>
      <u>{name}</u>
    </strong>
    's Turn
  </>
)

const Caption: FC = () => {
  const turn = useCurrentTurn()
  const [isGameOver] = useGameOver()
  const player = playerNameForToken(turn)

  return (
    <figcaption className={styles.caption}>
      {isGameOver ? 'Game Over' : <PlayerTurn name={player} />}
    </figcaption>
  )
}

export default Caption
