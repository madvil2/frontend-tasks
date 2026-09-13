import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import {
  DeleteTaskDialog,
  type Task,
  TaskFormDialog,
  type TaskInput,
  TaskList,
  TasksProvider,
  useTasks,
} from '../../features/tasks'
import { Button } from '../../shared/ui/Button/Button'
import styles from './TasksPage.module.scss'

export function TasksPage() {
  return (
    <TasksProvider>
      <TasksView />
    </TasksProvider>
  )
}

function TasksView() {
  const { tasks, addTask, updateTask, removeTask } = useTasks()
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Task | null>(null)
  const [deleting, setDeleting] = useState<Task | null>(null)
  const [announcement, setAnnouncement] = useState('')
  const addButtonRef = useRef<HTMLButtonElement>(null)
  const focusAddAfterClose = useRef(false)

  useEffect(() => {
    if (deleting === null && focusAddAfterClose.current) {
      focusAddAfterClose.current = false
      addButtonRef.current?.focus()
    }
  }, [deleting])

  function confirmDelete() {
    if (!deleting) return
    removeTask(deleting.id)
    // Include the title so a second deletion changes the text and is announced again.
    setAnnouncement(`Task "${deleting.title}" deleted`)
    focusAddAfterClose.current = true
    setDeleting(null)
  }

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
        <TaskList tasks={tasks} onEdit={openEdit} onDelete={setDeleting} />
      )}

      <TaskFormDialog
        open={formOpen}
        task={editing}
        onSubmit={handleSubmit}
        onClose={() => setFormOpen(false)}
      />
      <DeleteTaskDialog
        task={deleting}
        onConfirm={confirmDelete}
        onClose={() => setDeleting(null)}
      />
      <p className="sr-only" role="status">
        {announcement}
      </p>
    </main>
  )
}
