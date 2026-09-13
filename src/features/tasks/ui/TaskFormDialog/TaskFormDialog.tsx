import { type FormEvent, useId, useRef, useState } from 'react'
import { Button } from '../../../../shared/ui/Button/Button'
import { Dialog } from '../../../../shared/ui/Dialog/Dialog'
import {
  isTaskPriority,
  isTaskStatus,
  PRIORITY_LABELS,
  STATUS_LABELS,
  TASK_PRIORITIES,
  TASK_STATUSES,
  type Task,
  type TaskInput,
} from '../../model/task'
import styles from './TaskFormDialog.module.scss'

interface TaskFormDialogProps {
  open: boolean
  /** null = create mode */
  task: Task | null
  onSubmit: (input: TaskInput) => void
  onClose: () => void
}

export function TaskFormDialog({ open, task, onSubmit, onClose }: TaskFormDialogProps) {
  const headingId = useId()
  return (
    <Dialog open={open} onClose={onClose} labelledBy={headingId}>
      <h2 id={headingId} className={styles.heading}>
        {task ? 'Edit task' : 'New task'}
      </h2>
      {open && (
        <TaskForm key={task?.id ?? 'new'} task={task} onSubmit={onSubmit} onCancel={onClose} />
      )}
    </Dialog>
  )
}

interface TaskFormProps {
  task: Task | null
  onSubmit: (input: TaskInput) => void
  onCancel: () => void
}

/** Uncontrolled form; remounted per task via `key` so defaults reset between create and edit. */
function TaskForm({ task, onSubmit, onCancel }: TaskFormProps) {
  const id = useId()
  const titleRef = useRef<HTMLInputElement>(null)
  const [titleError, setTitleError] = useState<string | null>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const title = String(data.get('title') ?? '').trim()
    if (title === '') {
      setTitleError('Title is required.')
      titleRef.current?.focus()
      return
    }
    const status = data.get('status')
    const priority = data.get('priority')
    const dueDate = String(data.get('dueDate') ?? '')
    onSubmit({
      title,
      description: String(data.get('description') ?? '').trim(),
      status: isTaskStatus(status) ? status : 'todo',
      priority: isTaskPriority(priority) ? priority : 'medium',
      dueDate: dueDate === '' ? null : dueDate,
    })
  }

  const titleErrorId = `${id}-title-error`

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.field}>
        <label className={styles.label} htmlFor={`${id}-title`}>
          Title
        </label>
        <input
          ref={titleRef}
          id={`${id}-title`}
          name="title"
          className={styles.control}
          defaultValue={task?.title ?? ''}
          required
          aria-invalid={titleError !== null}
          aria-describedby={titleError ? titleErrorId : undefined}
          onChange={() => setTitleError(null)}
        />
        {titleError && (
          <p id={titleErrorId} className={styles.error}>
            {titleError}
          </p>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor={`${id}-description`}>
          Description
        </label>
        <textarea
          id={`${id}-description`}
          name="description"
          className={styles.control}
          rows={3}
          defaultValue={task?.description ?? ''}
        />
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor={`${id}-status`}>
            Status
          </label>
          <select
            id={`${id}-status`}
            name="status"
            className={styles.control}
            defaultValue={task?.status ?? 'todo'}
          >
            {TASK_STATUSES.map((status) => (
              <option key={status} value={status}>
                {STATUS_LABELS[status]}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor={`${id}-due`}>
            Due date
          </label>
          <input
            id={`${id}-due`}
            name="dueDate"
            type="date"
            className={styles.control}
            defaultValue={task?.dueDate ?? ''}
          />
        </div>
      </div>

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Priority</legend>
        <div className={styles.radios}>
          {TASK_PRIORITIES.map((priority) => (
            <label key={priority} className={styles.radio}>
              <input
                type="radio"
                name="priority"
                value={priority}
                defaultChecked={(task?.priority ?? 'medium') === priority}
              />
              {PRIORITY_LABELS[priority]}
            </label>
          ))}
        </div>
      </fieldset>

      <div className={styles.actions}>
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="primary">
          Save
        </Button>
      </div>
    </form>
  )
}
