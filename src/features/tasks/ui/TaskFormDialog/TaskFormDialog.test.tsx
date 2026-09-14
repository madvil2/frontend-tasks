import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import type { Task } from '../../model/task'
import { TaskFormDialog } from './TaskFormDialog'

const existing: Task = {
  id: '1',
  title: 'Buy milk',
  description: 'Two litres',
  status: 'in_progress',
  priority: 'high',
  dueDate: '2026-09-20',
  createdAt: '2026-09-13T10:00:00.000Z',
}

describe('TaskFormDialog', () => {
  it('rejects a whitespace-only title and does not submit', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<TaskFormDialog open task={null} onSubmit={onSubmit} onClose={() => {}} />)

    await user.type(screen.getByLabelText('Title'), '   ')
    await user.click(screen.getByRole('button', { name: 'Save' }))

    expect(onSubmit).not.toHaveBeenCalled()
    expect(screen.getByText('Title is required.')).toBeInTheDocument()
    expect(screen.getByLabelText('Title')).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByLabelText('Title')).toHaveFocus()
  })

  it('submits a new task with trimmed fields and defaults', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<TaskFormDialog open task={null} onSubmit={onSubmit} onClose={() => {}} />)

    await user.type(screen.getByLabelText('Title'), '  Walk dog  ')
    await user.click(screen.getByRole('button', { name: 'Save' }))

    expect(onSubmit).toHaveBeenCalledWith({
      title: 'Walk dog',
      description: '',
      status: 'todo',
      priority: 'medium',
      dueDate: null,
    })
  })

  it('submits every field', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<TaskFormDialog open task={null} onSubmit={onSubmit} onClose={() => {}} />)

    await user.type(screen.getByLabelText('Title'), 'Plan trip')
    await user.type(screen.getByLabelText('Description'), 'Book hotel')
    await user.selectOptions(screen.getByLabelText('Status'), 'done')
    await user.click(screen.getByLabelText('High'))
    fireEvent.change(screen.getByLabelText('Due date'), { target: { value: '2026-10-01' } })
    await user.click(screen.getByRole('button', { name: 'Save' }))

    expect(onSubmit).toHaveBeenCalledWith({
      title: 'Plan trip',
      description: 'Book hotel',
      status: 'done',
      priority: 'high',
      dueDate: '2026-10-01',
    })
  })

  it('prefills fields in edit mode', () => {
    render(<TaskFormDialog open task={existing} onSubmit={() => {}} onClose={() => {}} />)

    expect(screen.getByRole('heading', { name: 'Edit task' })).toBeInTheDocument()
    expect(screen.getByLabelText('Title')).toHaveValue('Buy milk')
    expect(screen.getByLabelText('Description')).toHaveValue('Two litres')
    expect(screen.getByLabelText('Status')).toHaveValue('in_progress')
    expect(screen.getByLabelText('High')).toBeChecked()
    expect(screen.getByLabelText('Due date')).toHaveValue('2026-09-20')
  })

  it('clears the title error once the user types', async () => {
    const user = userEvent.setup()
    render(<TaskFormDialog open task={null} onSubmit={() => {}} onClose={() => {}} />)

    await user.click(screen.getByRole('button', { name: 'Save' }))
    expect(screen.getByText('Title is required.')).toBeInTheDocument()

    await user.type(screen.getByLabelText('Title'), 'B')
    expect(screen.queryByText('Title is required.')).not.toBeInTheDocument()
    expect(screen.getByLabelText('Title')).toHaveAttribute('aria-invalid', 'false')
  })
})
