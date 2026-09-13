import { Link } from 'react-router'
import styles from './NotFoundPage.module.scss'

export function NotFoundPage() {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Page not found</h1>
      <p>
        <Link to="/">Back to overview</Link>
      </p>
    </main>
  )
}
