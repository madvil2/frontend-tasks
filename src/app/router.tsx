import { createBrowserRouter, type RouteObject } from 'react-router'
import { HomePage } from '../pages/HomePage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { TasksPage } from '../pages/TasksPage'

export const routes: RouteObject[] = [
  { path: '/', element: <HomePage /> },
  { path: '/tasks', element: <TasksPage /> },
  { path: '*', element: <NotFoundPage /> },
]

export const router = createBrowserRouter(routes)
