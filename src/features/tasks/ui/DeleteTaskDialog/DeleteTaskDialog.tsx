import { useId } from 'react'
import type { Task } from '@/features/tasks/model/task'
import { Button } from '@/shared/ui/Button/Button'
import { Dialog } from '@/shared/ui/Dialog/Dialog'
import styles from './DeleteTaskDialog.module.scss'

interface DeleteTaskDialogProps {
  /** null = closed */
  task: Task | null
  onConfirm: () => void
  onClose: () => void
}

export function DeleteTaskDialog({ task, onConfirm, onClose }: DeleteTaskDialogProps) {
  const headingId = useId()
  const textId = useId()
  return (
    <Dialog
      open={task !== null}
      onClose={onClose}
      labelledBy={headingId}
      describedBy={textId}
      role="alertdialog"
    >
      {task && (
        <>
          <h2 id={headingId} className={styles.heading}>
            Delete task
          </h2>
          <p id={textId} className={styles.text}>
            Delete "{task.title}"? This cannot be undone.
          </p>
          <div className={styles.actions}>
            {/* Cancel comes first so the dialog's initial focus lands on it, not on Delete. */}
            <Button onClick={onClose}>Cancel</Button>
            <Button variant="danger" onClick={onConfirm}>
              Delete
            </Button>
          </div>
        </>
      )}
    </Dialog>
  )
}
