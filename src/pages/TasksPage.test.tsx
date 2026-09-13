import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { renderWithRouter } from '../test/renderWithRouter'
import { TasksPage } from './TasksPage'

const routes = [{ path: '/tasks', element: <TasksPage /> }]
const renderPage = () => renderWithRouter(routes, '/tasks')

async function createTask(user: ReturnType<typeof userEvent.setup>, title: string) {
  await user.click(screen.getByRole('button', { name: 'Add task' }))
  await user.type(screen.getByLabelText('Title'), title)
  await user.click(screen.getByRole('button', { name: 'Save' }))
}

describe('TasksPage', () => {
  it('shows an empty state', () => {
    renderPage()
    expect(screen.getByText(/no tasks yet/i)).toBeInTheDocument()
  })

  it('creates a task and renders badges', async () => {
    const user = userEvent.setup()
    renderPage()
    await createTask(user, 'Buy milk')

    const item = screen.getByRole('listitem')
    expect(within(item).getByRole('heading', { name: 'Buy milk' })).toBeInTheDocument()
    expect(within(item).getByText('To Do')).toBeInTheDocument()
    expect(within(item).getByText('Medium', { exact: false })).toBeInTheDocument()
    expect(screen.queryByText(/no tasks yet/i)).not.toBeInTheDocument()
  })

  it('lists newest first', async () => {
    const user = userEvent.setup()
    renderPage()
    await createTask(user, 'First')
    await createTask(user, 'Second')
    const headings = screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent)
    expect(headings).toEqual(['Second', 'First'])
  })

  it('edits a task', async () => {
    const user = userEvent.setup()
    renderPage()
    await createTask(user, 'Buy milk')

    await user.click(screen.getByRole('button', { name: 'Edit "Buy milk"' }))
    const title = screen.getByLabelText('Title')
    await user.clear(title)
    await user.type(title, 'Buy oat milk')
    await user.selectOptions(screen.getByLabelText('Status'), 'done')
    await user.click(screen.getByRole('button', { name: 'Save' }))

    expect(screen.getByRole('heading', { name: 'Buy oat milk' })).toBeInTheDocument()
    expect(screen.getByText('Done')).toBeInTheDocument()
  })

  it('keeps tasks after remount (page refresh)', async () => {
    const user = userEvent.setup()
    const { unmount } = renderPage()
    await createTask(user, 'Persist me')
    unmount()

    renderPage()
    expect(screen.getByRole('heading', { name: 'Persist me' })).toBeInTheDocument()
  })

  it('asks for confirmation before deleting and cancel keeps the task', async () => {
    const user = userEvent.setup()
    renderPage()
    await createTask(user, 'Buy milk')

    await user.click(screen.getByRole('button', { name: 'Delete "Buy milk"' }))
    const dialog = screen.getByRole('alertdialog')
    expect(within(dialog).getByText(/delete "buy milk"\?/i)).toBeInTheDocument()

    await user.click(within(dialog).getByRole('button', { name: 'Cancel' }))
    expect(screen.getByRole('heading', { name: 'Buy milk' })).toBeInTheDocument()
  })

  it('deletes after confirmation, announces it and moves focus to Add task', async () => {
    const user = userEvent.setup()
    renderPage()
    await createTask(user, 'Buy milk')

    await user.click(screen.getByRole('button', { name: 'Delete "Buy milk"' }))
    await user.click(screen.getByRole('button', { name: 'Delete' }))

    expect(screen.queryByRole('heading', { name: 'Buy milk' })).not.toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveTextContent('Task "Buy milk" deleted')
    expect(screen.getByRole('button', { name: 'Add task' })).toHaveFocus()
    expect(screen.getByText(/no tasks yet/i)).toBeInTheDocument()
  })
})
