import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { TasksProvider } from './TasksProvider'
import { STORAGE_KEY } from './tasksStorage'
import { useTasks } from './useTasks'

function Consumer() {
  const { tasks, addTask, removeTask } = useTasks()
  return (
    <div>
      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            {t.title}
            <button type="button" onClick={() => removeTask(t.id)}>
              remove {t.title}
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() =>
          addTask({ title: 'New', description: '', status: 'todo', priority: 'low', dueDate: null })
        }
      >
        add
      </button>
    </div>
  )
}

const renderApp = () =>
  render(
    <TasksProvider>
      <Consumer />
    </TasksProvider>,
  )

describe('TasksProvider', () => {
  it('adds tasks with generated id and persists them', async () => {
    const user = userEvent.setup()
    renderApp()
    await user.click(screen.getByRole('button', { name: 'add' }))
    expect(screen.getByText('New')).toBeInTheDocument()
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
    expect(stored).toHaveLength(1)
    expect(typeof stored[0].id).toBe('string')
  })

  it('hydrates from storage and removes tasks', async () => {
    const user = userEvent.setup()
    const { unmount } = renderApp()
    await user.click(screen.getByRole('button', { name: 'add' }))
    unmount()

    renderApp()
    expect(screen.getByText('New')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'remove New' }))
    expect(screen.queryByText('New')).not.toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')).toEqual([])
  })

  describe('useTasks throws outside the provider', () => {
    let errorSpy: ReturnType<typeof vi.spyOn>

    beforeEach(() => {
      errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    })

    afterEach(() => {
      errorSpy.mockRestore()
    })

    it('throws', () => {
      expect(() => render(<Consumer />)).toThrow(/TasksProvider/)
    })
  })
})
