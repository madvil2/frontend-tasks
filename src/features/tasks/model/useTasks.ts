import { useContext } from 'react'
import { TasksContext, type TasksContextValue } from './TasksProvider'

export function useTasks(): TasksContextValue {
  const context = useContext(TasksContext)
  if (context === null) throw new Error('useTasks must be used inside <TasksProvider>')
  return context
}
