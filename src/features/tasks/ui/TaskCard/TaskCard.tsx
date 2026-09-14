import { isOverdue, type Task } from '@/features/tasks/model/task'
import { PriorityBadge } from '@/features/tasks/ui/badges/PriorityBadge'
import { StatusBadge } from '@/features/tasks/ui/badges/StatusBadge'
import { formatDate } from '@/shared/lib/date'
import { Button } from '@/shared/ui/Button/Button'
import styles from './TaskCard.module.scss'

interface TaskCardProps {
  task: Task
  onEdit: (task: Task) => void
  onDelete: (task: Task) => void
}

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const overdue = isOverdue(task)
  return (
    <li className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>{task.title}</h2>
        <div className={styles.badges}>
          <StatusBadge status={task.status} />
          <PriorityBadge priority={task.priority} />
        </div>
      </div>
      {task.description !== '' && <p className={styles.description}>{task.description}</p>}
      <div className={styles.footer}>
        <p className={styles.due}>
          {task.dueDate ? (
            <>
              Due <time dateTime={task.dueDate}>{formatDate(task.dueDate)}</time>
              {overdue && <span className={styles.overdue}> · Overdue</span>}
            </>
          ) : (
            'No due date'
          )}
        </p>
        <div className={styles.actions}>
          <Button variant="ghost" onClick={() => onEdit(task)} aria-label={`Edit "${task.title}"`}>
            Edit
          </Button>
          <Button
            variant="ghost"
            onClick={() => onDelete(task)}
            aria-label={`Delete "${task.title}"`}
          >
            Delete
          </Button>
        </div>
      </div>
    </li>
  )
}
