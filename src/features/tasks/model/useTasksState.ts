import { useEffect, useReducer } from 'react'
import type { Task, TaskInput } from './task'
import { tasksReducer } from './tasksReducer'
import { loadTasks, saveTasks } from './tasksStorage'

/** Task list state, hydrated from localStorage and written back on every change. */
export function useTasksState() {
  const [tasks, dispatch] = useReducer(tasksReducer, undefined, loadTasks)

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  return {
    tasks,
    addTask: (input: TaskInput) =>
      dispatch({
        type: 'added',
        task: { ...input, id: crypto.randomUUID(), createdAt: new Date().toISOString() },
      }),
    updateTask: (task: Task) => dispatch({ type: 'updated', task }),
    removeTask: (id: string) => dispatch({ type: 'removed', id }),
  }
}
