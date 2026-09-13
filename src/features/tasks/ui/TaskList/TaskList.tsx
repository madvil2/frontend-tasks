import type { Task } from '../../model/task'
import { TaskCard } from '../TaskCard/TaskCard'
import styles from './TaskList.module.scss'

interface TaskListProps {
  tasks: Task[]
  onEdit: (task: Task) => void
  onDelete: (task: Task) => void
}

export function TaskList({ tasks, onEdit, onDelete }: TaskListProps) {
  return (
    <ul className={styles.list} aria-label="Tasks">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </ul>
  )
}
