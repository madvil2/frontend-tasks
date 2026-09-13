import { render } from '@testing-library/react'
import { createMemoryRouter, type RouteObject, RouterProvider } from 'react-router'

export function renderWithRouter(routes: RouteObject[], path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] })
  return render(<RouterProvider router={router} />)
}
