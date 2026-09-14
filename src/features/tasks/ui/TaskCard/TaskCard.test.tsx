import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { Task } from '../../model/task'
import { TaskCard } from './TaskCard'

const task: Task = {
  id: '1',
  title: 'Renew passport',
  description: '',
  status: 'todo',
  priority: 'high',
  dueDate: '2000-01-01',
  createdAt: '2026-09-13T10:00:00.000Z',
}

const renderCard = (overrides: Partial<Task>) =>
  render(
    <ul>
      <TaskCard task={{ ...task, ...overrides }} onEdit={() => {}} onDelete={() => {}} />
    </ul>,
  )

describe('TaskCard', () => {
  it('marks a past due date as overdue', () => {
    renderCard({})
    expect(screen.getByText(/overdue/i)).toBeInTheDocument()
    expect(screen.getByText('1 Jan 2000')).toBeInTheDocument()
  })

  it('does not mark done tasks or tasks without a due date', () => {
    renderCard({ status: 'done' })
    expect(screen.queryByText(/overdue/i)).not.toBeInTheDocument()

    renderCard({ dueDate: null })
    expect(screen.getByText('No due date')).toBeInTheDocument()
  })
})
