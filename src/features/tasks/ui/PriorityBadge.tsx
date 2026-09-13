import { PRIORITY_LABELS, type TaskPriority } from '../model/task'
import styles from './badge.module.scss'

/** "Medium" alone is ambiguous for screen readers, so the word "priority" is added visually hidden. */
export function PriorityBadge({ priority }: { priority: TaskPriority }) {
  return (
    <span className={`${styles.badge} ${styles[priority]}`}>
      {PRIORITY_LABELS[priority]}
      <span className="sr-only"> priority</span>
    </span>
  )
}
