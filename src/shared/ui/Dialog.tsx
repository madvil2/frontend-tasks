import { type ReactNode, useEffect, useRef } from 'react'
import styles from './Dialog.module.scss'

interface DialogProps {
  open: boolean
  onClose: () => void
  labelledBy: string
  describedBy?: string
  role?: 'alertdialog'
  children: ReactNode
}

/** Thin wrapper over the native <dialog>: modal, focus trap and Esc come from the browser. */
export function Dialog({ open, onClose, labelledBy, describedBy, role, children }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    else if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      className={styles.dialog}
      role={role}
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      onClose={onClose}
    >
      <div className={styles.content}>{children}</div>
    </dialog>
  )
}
