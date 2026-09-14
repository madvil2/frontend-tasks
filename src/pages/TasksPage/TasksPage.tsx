import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import type { Task, TaskInput } from '@/features/tasks/model/task'
import { useTasksState } from '@/features/tasks/model/useTasksState'
import { DeleteTaskDialog } from '@/features/tasks/ui/DeleteTaskDialog/DeleteTaskDialog'
import { TaskCard } from '@/features/tasks/ui/TaskCard/TaskCard'
import { TaskFormDialog } from '@/features/tasks/ui/TaskFormDialog/TaskFormDialog'
import { Button } from '@/shared/ui/Button/Button'
import styles from './TasksPage.module.scss'

export function TasksPage() {
  const { tasks, addTask, updateTask, removeTask } = useTasksState()
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Task | null>(null)
  const [deleting, setDeleting] = useState<Task | null>(null)
  const [announcement, setAnnouncement] = useState('')
  const addButtonRef = useRef<HTMLButtonElement>(null)
  const focusAddAfterClose = useRef(false)

  // The Delete button that opened the dialog is gone with the task, so the browser has
  // nothing to restore focus to; move it to "Add task" once the dialog has closed.
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
      <div className={styles.container}>
        <Link to="/" className={styles.back}>
          ← Overview
        </Link>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Task Manager</h1>
            <p className={styles.count}>
              {tasks.length === 1 ? '1 task' : `${tasks.length} tasks`}
            </p>
          </div>
          <Button ref={addButtonRef} variant="primary" onClick={openCreate}>
            <span aria-hidden="true">+</span> Add task
          </Button>
        </div>

        {tasks.length === 0 ? (
          <div className={styles.empty}>
            <p className={styles.emptyTitle}>No tasks yet</p>
            <p>Use "Add task" to create the first one.</p>
          </div>
        ) : (
          <ul className={styles.list} aria-label="Tasks">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} onEdit={openEdit} onDelete={setDeleting} />
            ))}
          </ul>
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
      </div>
    </main>
  )
}
