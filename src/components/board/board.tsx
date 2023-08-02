'use client'
import range from 'lodash/range'
import type { FC } from 'react'

import ResetButton from '~/components/reset-button'
import Space from '~/components/space'
import { BOARD_HEIGHT, BOARD_WIDTH } from '~/constants'
import { useGameOver } from '~/lib/state'
import Caption from './caption'
import styles from './board.module.css'

const spaces = range(BOARD_HEIGHT * BOARD_WIDTH)

const Board: FC = () => {
  const [isGameOver] = useGameOver()
  return (
    <figure className={styles.game}>
      <Caption />
      <article className={styles.board}>
        <fieldset className={styles.spaces} disabled={isGameOver}>
          {spaces.map(index => (
            <Space key={index} index={index} />
          ))}
        </fieldset>
      </article>
      <ResetButton>{isGameOver ? 'Play Again' : null}</ResetButton>
    </figure>
  )
}

export default Board
