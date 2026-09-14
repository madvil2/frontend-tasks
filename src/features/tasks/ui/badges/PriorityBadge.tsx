import { PRIORITY_LABELS, type TaskPriority } from '@/features/tasks/model/task'
import styles from './badge.module.scss'

/** "Medium" alone is ambiguous for screen readers. */
export function PriorityBadge({ priority }: { priority: TaskPriority }) {
  return (
    <span className={`${styles.chip} ${styles[priority]}`}>
      {PRIORITY_LABELS[priority]}
      <span className="sr-only"> priority</span>
    </span>
  )
}
