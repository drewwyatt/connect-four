import type { FC } from 'react'

import { Token } from '~/lib/models'
import { useDrop, useTokenForSpace } from '~/lib/state'
import { classNames } from '~/lib/utils'
import styles from './space.module.css'

type Props = {
  index: number
}

const tokenToClassName = (token: Token | null) => {
  switch (token) {
    case Token.playerOne:
      return styles.playerOne
    case Token.playerTwo:
      return styles.playerTwo
  }

  return null
}

const Space: FC<Props> = ({ index }) => {
  const [token, colIsFull] = useTokenForSpace(index)
  const drop = useDrop(index)

  return (
    <input
      type="checkbox"
      className={classNames(styles.space, tokenToClassName(token))}
      checked={!!token}
      disabled={colIsFull}
      onChange={() => drop(Token.playerOne)}
    />
  )
}

export default Space
