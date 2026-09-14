import { describe, expect, it } from 'vitest'
import { isOverdue, type Task } from './task'
import { tasksReducer } from './tasksReducer'

const task = (id: string, title = id): Task => ({
  id,
  title,
  description: '',
  status: 'todo',
  priority: 'medium',
  dueDate: null,
  createdAt: '2026-09-13T10:00:00.000Z',
})

describe('tasksReducer', () => {
  it('added prepends the task', () => {
    const state = tasksReducer([task('a')], { type: 'added', task: task('b') })
    expect(state.map((t) => t.id)).toEqual(['b', 'a'])
  })

  it('updated replaces the task with the same id', () => {
    const state = tasksReducer([task('a'), task('b')], {
      type: 'updated',
      task: task('a', 'renamed'),
    })
    expect(state[0]?.title).toBe('renamed')
    expect(state[1]?.title).toBe('b')
  })

  it('removed drops the task by id', () => {
    const state = tasksReducer([task('a'), task('b')], { type: 'removed', id: 'a' })
    expect(state.map((t) => t.id)).toEqual(['b'])
  })

  it('unknown id is a no-op', () => {
    const initial = [task('a')]
    expect(tasksReducer(initial, { type: 'removed', id: 'zzz' })).toEqual(initial)
    expect(tasksReducer(initial, { type: 'updated', task: task('zzz') })).toEqual(initial)
  })
})

describe('isOverdue', () => {
  const base = task('a')
  it('compares the due date against today and ignores done tasks', () => {
    expect(isOverdue({ ...base, dueDate: '2026-09-12' }, '2026-09-13')).toBe(true)
    expect(isOverdue({ ...base, dueDate: '2026-09-13' }, '2026-09-13')).toBe(false)
    expect(isOverdue({ ...base, dueDate: '2026-09-12', status: 'done' }, '2026-09-13')).toBe(false)
    expect(isOverdue(base, '2026-09-13')).toBe(false)
  })
})
