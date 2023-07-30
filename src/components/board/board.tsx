'use client'
import range from 'lodash/range'
import type { FC } from 'react'

import Space from '~/components/space'
import { BOARD_HEIGHT, BOARD_WIDTH } from '~/constants'
import { useCurrentTurn } from '~/lib/state'
import styles from './board.module.css'
import { Token } from '~/lib/models'

const spaces = range(BOARD_HEIGHT * BOARD_WIDTH)

const Board: FC = () => {
  const turn = useCurrentTurn()
  const player = turn === Token.playerOne ? 'Player One' : 'Player Two'

  return (
    <figure>
      <figcaption className={styles.caption}>{`${player}'s Turn`}</figcaption>
      <article className={styles.board}>
        {spaces.map(index => (
          <Space key={index} index={index} />
        ))}
      </article>
    </figure>
  )
}

export default Board
