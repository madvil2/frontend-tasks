import { describe, expect, it, vi } from 'vitest'
import type { Task } from './task'
import { loadTasks, STORAGE_KEY, saveTasks } from './tasksStorage'

const task: Task = {
  id: '1',
  title: 'Buy milk',
  description: '',
  status: 'todo',
  priority: 'low',
  dueDate: null,
  createdAt: '2026-09-13T10:00:00.000Z',
}

describe('tasksStorage', () => {
  it('round-trips tasks', () => {
    saveTasks([task])
    expect(loadTasks()).toEqual([task])
  })

  it('returns [] for missing, invalid JSON, or non-array values', () => {
    expect(loadTasks()).toEqual([])
    localStorage.setItem(STORAGE_KEY, '{not json')
    expect(loadTasks()).toEqual([])
    localStorage.setItem(STORAGE_KEY, '{"a":1}')
    expect(loadTasks()).toEqual([])
  })

  it('drops invalid items and keeps valid ones', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([task, { id: 'x', status: 'nope' }]))
    expect(loadTasks()).toEqual([task])
  })

  it('sorts newest first', () => {
    const older = { ...task, id: '2', createdAt: '2026-01-01T00:00:00.000Z' }
    localStorage.setItem(STORAGE_KEY, JSON.stringify([older, task]))
    expect(loadTasks().map((t) => t.id)).toEqual(['1', '2'])
  })

  it('does not throw when storage is unavailable', () => {
    const broken = {
      getItem: vi.fn(() => {
        throw new Error('blocked')
      }),
      setItem: vi.fn(() => {
        throw new Error('quota')
      }),
    } as unknown as Storage
    expect(loadTasks(broken)).toEqual([])
    expect(() => saveTasks([task], broken)).not.toThrow()
  })
})
