'use client'
import type { FC } from 'react'

import Space from '~/components/space'
import { useTokens } from '~/lib/state'
import styles from './board.module.css'

const Board: FC = () => {
  const tokens = useTokens()
  return (
    <article className={styles.board}>
      {tokens.map((token, index) => (
        <Space key={[index, token].join(':')} index={index} token={token} />
      ))}
    </article>
  )
}

export default Board
