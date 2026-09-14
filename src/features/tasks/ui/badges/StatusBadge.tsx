import { STATUS_LABELS, type TaskStatus } from '@/features/tasks/model/task'
import styles from './badge.module.scss'

export function StatusBadge({ status }: { status: TaskStatus }) {
  return (
    <span className={`${styles.status} ${styles[status]}`}>
      <span className={styles.dot} aria-hidden="true" />
      {STATUS_LABELS[status]}
    </span>
  )
}
