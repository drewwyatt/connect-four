import type { FC } from 'react'

import { Token, playerNameForToken } from '~/lib/models'
import { useCurrentTurn } from '~/lib/state'
import styles from './board.module.css'

const Caption: FC = () => {
  const turn = useCurrentTurn()
  const player = playerNameForToken(turn)

  return (
    <figcaption className={styles.caption}>
      <strong>
        <u>{player}</u>
      </strong>
      's Turn
    </figcaption>
  )
}

export default Caption
