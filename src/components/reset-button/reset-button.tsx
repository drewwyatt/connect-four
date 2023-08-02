import type { FC, ReactNode } from 'react'
import { useReset } from '~/lib/state'
import { classNames } from '~/lib/utils'
import styles from './reset-button.module.css'

type Props = {
  className?: string | null | undefined
  children?: ReactNode
}

const ResetButton: FC<Props> = ({ className, children }) => {
  const reset = useReset()

  return (
    <button className={classNames(styles.button, className)} onClick={reset}>
      {children ?? 'Restart Game'}
    </button>
  )
}

export default ResetButton
