import { useRef, useState } from 'react'
import { Link } from 'react-router'
import {
  type Task,
  TaskFormDialog,
  type TaskInput,
  TaskList,
  TasksProvider,
  useTasks,
} from '../features/tasks'
import { Button } from '../shared/ui/Button'
import styles from './TasksPage.module.scss'

export function TasksPage() {
  return (
    <TasksProvider>
      <TasksView />
    </TasksProvider>
  )
}

function TasksView() {
  const { tasks, addTask, updateTask } = useTasks()
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Task | null>(null)
  const addButtonRef = useRef<HTMLButtonElement>(null)

  function openCreate() {
    setEditing(null)
    setFormOpen(true)
  }

  function openEdit(task: Task) {
    setEditing(task)
    setFormOpen(true)
  }

  function handleSubmit(input: TaskInput) {
    if (editing) updateTask({ ...editing, ...input })
    else addTask(input)
    setFormOpen(false)
  }

  return (
    <main className={styles.page}>
      <Link to="/" className={styles.back}>
        ← Overview
      </Link>
      <div className={styles.header}>
        <h1 className={styles.title}>Task Manager</h1>
        <Button ref={addButtonRef} variant="primary" onClick={openCreate}>
          Add task
        </Button>
      </div>

      {tasks.length === 0 ? (
        <p className={styles.empty}>No tasks yet. Use “Add task” to create the first one.</p>
      ) : (
        <TaskList tasks={tasks} onEdit={openEdit} onDelete={() => {}} />
      )}

      <TaskFormDialog
        open={formOpen}
        task={editing}
        onSubmit={handleSubmit}
        onClose={() => setFormOpen(false)}
      />
    </main>
  )
}
