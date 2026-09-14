import { todayISO } from '@/shared/lib/date'

export const TASK_STATUSES = ['todo', 'in_progress', 'done'] as const
export type TaskStatus = (typeof TASK_STATUSES)[number]

export const TASK_PRIORITIES = ['low', 'medium', 'high'] as const
export type TaskPriority = (typeof TASK_PRIORITIES)[number]

export const STATUS_LABELS: Record<TaskStatus, string> = {
  todo: 'To Do',
  in_progress: 'In Progress',
  done: 'Done',
}

export const PRIORITY_LABELS: Record<TaskPriority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
}

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  /** Local calendar date as YYYY-MM-DD, or null when not set. */
  dueDate: string | null
  /** ISO timestamp, newest first in the list. */
  createdAt: string
}

export type TaskInput = Omit<Task, 'id' | 'createdAt'>

export function isTaskStatus(value: unknown): value is TaskStatus {
  return (TASK_STATUSES as readonly unknown[]).includes(value)
}

export function isTaskPriority(value: unknown): value is TaskPriority {
  return (TASK_PRIORITIES as readonly unknown[]).includes(value)
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

export function isTask(value: unknown): value is Task {
  if (!isRecord(value)) return false
  return (
    typeof value.id === 'string' &&
    typeof value.title === 'string' &&
    typeof value.description === 'string' &&
    isTaskStatus(value.status) &&
    isTaskPriority(value.priority) &&
    (value.dueDate === null || typeof value.dueDate === 'string') &&
    typeof value.createdAt === 'string'
  )
}

export function isOverdue(task: Task, today: string = todayISO()): boolean {
  return task.dueDate !== null && task.status !== 'done' && task.dueDate < today
}
