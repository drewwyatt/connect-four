import type { FC } from 'react'
import { Token } from '~/lib/models'
import { classNames } from '~/lib/utils'
import styles from './space.module.css'

type Props = {
  token: Token | null
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

const Space: FC<Props> = ({ token }) => {
  return (
    <input
      type="checkbox"
      className={classNames(styles.space, tokenToClassName(token))}
      checked={!!token}
    />
  )
}

export default Space
