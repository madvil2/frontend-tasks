import { createContext, type ReactNode, useEffect, useMemo, useReducer } from 'react'
import type { Task, TaskInput } from './task'
import { tasksReducer } from './tasksReducer'
import { loadTasks, saveTasks } from './tasksStorage'

export interface TasksContextValue {
  tasks: Task[]
  addTask: (input: TaskInput) => void
  updateTask: (task: Task) => void
  removeTask: (id: string) => void
}

export const TasksContext = createContext<TasksContextValue | null>(null)

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, dispatch] = useReducer(tasksReducer, undefined, () => loadTasks())

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  const value = useMemo<TasksContextValue>(
    () => ({
      tasks,
      addTask: (input) =>
        dispatch({
          type: 'added',
          task: { ...input, id: crypto.randomUUID(), createdAt: new Date().toISOString() },
        }),
      updateTask: (task) => dispatch({ type: 'updated', task }),
      removeTask: (id) => dispatch({ type: 'removed', id }),
    }),
    [tasks],
  )

  return <TasksContext value={value}>{children}</TasksContext>
}
