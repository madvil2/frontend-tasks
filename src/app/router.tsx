import { createBrowserRouter, type RouteObject } from 'react-router'
import { CustomerAreaLayout } from '../layouts/customer-area/CustomerAreaLayout/CustomerAreaLayout'
import { HomePage } from '../pages/HomePage/HomePage'
import { NotFoundPage } from '../pages/NotFoundPage/NotFoundPage'
import { ProfilePage } from '../pages/ProfilePage/ProfilePage'
import { TasksPage } from '../pages/TasksPage/TasksPage'

export const routes: RouteObject[] = [
  { path: '/', element: <HomePage /> },
  { path: '/tasks', element: <TasksPage /> },
  {
    path: '/profile',
    element: <CustomerAreaLayout />,
    children: [{ index: true, element: <ProfilePage /> }],
  },
  { path: '*', element: <NotFoundPage /> },
]

export const router = createBrowserRouter(routes)
