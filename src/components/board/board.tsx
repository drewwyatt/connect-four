'use client'
import range from 'lodash/range'
import type { FC } from 'react'

import Space from '~/components/space'
import { BOARD_HEIGHT, BOARD_WIDTH } from '~/constants'
import Caption from './caption'
import styles from './board.module.css'

const spaces = range(BOARD_HEIGHT * BOARD_WIDTH)

const Board: FC = () => {
  return (
    <figure>
      <Caption />
      <article className={styles.board}>
        {spaces.map(index => (
          <Space key={index} index={index} />
        ))}
      </article>
    </figure>
  )
}

export default Board
