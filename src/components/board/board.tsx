import type { FC } from 'react'
import range from 'lodash/range'

import Space from '~/components/space'
import styles from './board.module.css'

const Board: FC = () => {
  const numberOfSlots = 7 * 6
  return (
    <article className={styles.board}>
      {range(numberOfSlots).map(i => (
        <Space key={i} index={i} />
      ))}
    </article>
  )
}

export default Board
