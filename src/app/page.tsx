import { Board, GameOver } from '~/components'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.headline}>Connect Four</h1>
      <div className={styles.center}>
        <Board />
        <GameOver />
      </div>
    </main>
  )
}
