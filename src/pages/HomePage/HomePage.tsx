import { Link } from 'react-router'
import styles from './HomePage.module.scss'

export function HomePage() {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Frontend tasks</h1>
      <p className={styles.lead}>Two take-home tasks in one React app. Pick one:</p>
      <div className={styles.cards}>
        <article className={styles.card}>
          <h2 className={styles.cardTitle}>Task Manager</h2>
          <p className={styles.cardText}>
            Create, edit and delete tasks with status, priority and due date. Data persists in
            localStorage.
          </p>
          <Link to="/tasks" className={styles.cardLink}>
            Open Task Manager
          </Link>
        </article>
        <article className={styles.card}>
          <h2 className={styles.cardTitle}>Responsive customer area</h2>
          <p className={styles.cardText}>
            Navigation menu and personal data page that adapt across five breakpoints, built from
            the Vexcash mockups.
          </p>
          <Link to="/profile" className={styles.cardLink}>
            Open customer area
          </Link>
        </article>
      </div>
    </main>
  )
}
