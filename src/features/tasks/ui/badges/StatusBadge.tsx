import { STATUS_LABELS, type TaskStatus } from '../../model/task'
import styles from './badge.module.scss'

export function StatusBadge({ status }: { status: TaskStatus }) {
  return <span className={`${styles.badge} ${styles[status]}`}>{STATUS_LABELS[status]}</span>
}
