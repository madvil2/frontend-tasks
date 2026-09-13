import type { Task } from './task'

export type TasksAction =
  | { type: 'added'; task: Task }
  | { type: 'updated'; task: Task }
  | { type: 'removed'; id: string }

export function tasksReducer(state: Task[], action: TasksAction): Task[] {
  switch (action.type) {
    case 'added':
      return [action.task, ...state]
    case 'updated':
      return state.map((task) => (task.id === action.task.id ? action.task : task))
    case 'removed':
      return state.filter((task) => task.id !== action.id)
  }
}
