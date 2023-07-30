import type { FC } from 'react'
import { classNames } from '~/lib/utils'
import styles from './space.module.css'

type Props = {
  index: number
}

const indexToClassName = (index: number) =>
  index % 3 === 1 ? styles.player1 : index % 3 === 2 ? styles.player2 : null

const Space: FC<Props> = ({ index }) => {
  return (
    <input
      type="checkbox"
      className={classNames(styles.space, indexToClassName(index))}
      checked={[1, 2].includes(index % 3)}
    />
  )
}

export default Space
