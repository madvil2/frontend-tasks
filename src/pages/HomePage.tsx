import { Link } from 'react-router'
import styles from './HomePage.module.scss'

const tasks = [
  {
    to: '/tasks',
    title: 'Task Manager',
    text: 'Create, edit and delete tasks with status, priority and due date. Data persists in localStorage.',
    link: 'Open Task Manager',
  },
  {
    to: '/profile',
    title: 'Responsive customer area',
    text: 'Navigation menu and personal data page that adapt across five breakpoints, built from the Vexcash mockups.',
    link: 'Open customer area',
  },
]

export function HomePage() {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Frontend tasks</h1>
      <p className={styles.lead}>Two take-home tasks in one React app. Pick one:</p>
      <div className={styles.cards}>
        {tasks.map((task) => (
          <article key={task.to} className={styles.card}>
            <h2 className={styles.cardTitle}>{task.title}</h2>
            <p className={styles.cardText}>{task.text}</p>
            <Link to={task.to} className={styles.cardLink}>
              {task.link}
            </Link>
          </article>
        ))}
      </div>
    </main>
  )
}
