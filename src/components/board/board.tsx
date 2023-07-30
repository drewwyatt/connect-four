import type { FC } from 'react'
import range from 'lodash/range'

import Space from '~/components/space'
import { BOARD_WIDTH, BOARD_HEIGHT } from '~/constants'
import { Token } from '~/lib/models'
import styles from './board.module.css'

const indexToToken = (index: number) =>
  index % 3 === 1 ? Token.playerOne : index % 3 === 2 ? Token.playerTwo : null

const Board: FC = () => {
  const numberOfSlots = BOARD_WIDTH * BOARD_HEIGHT
  return (
    <article className={styles.board}>
      {range(numberOfSlots).map(i => (
        <Space key={i} token={indexToToken(i)} />
      ))}
    </article>
  )
}

export default Board
