import type { FC } from 'react'

import { Token } from '~/lib/models'
import { useCurrentTurn } from '~/lib/state'
import styles from './board.module.css'

const Caption: FC = () => {
  const turn = useCurrentTurn()
  const player = turn === Token.playerOne ? 'Player One' : 'Player Two'

  return <figcaption className={styles.caption}>{`${player}'s Turn`}</figcaption>
}

export default Caption
