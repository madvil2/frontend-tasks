import { isTask, type Task } from './task'

export const STORAGE_KEY = 'task-manager.tasks.v1'

export function loadTasks(storage: Storage = localStorage): Task[] {
  try {
    const raw = storage.getItem(STORAGE_KEY)
    if (raw === null) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(isTask).sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  } catch {
    return []
  }
}

export function saveTasks(tasks: readonly Task[], storage: Storage = localStorage): void {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  } catch {
    // Storage unavailable (quota exceeded, private mode). In-memory state keeps working.
  }
}
