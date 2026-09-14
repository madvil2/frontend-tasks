import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderWithRouter } from '@/test/renderWithRouter'
import { routes } from './router'

describe('routes', () => {
  it('home page links to both tasks', () => {
    renderWithRouter(routes, '/')
    expect(screen.getByRole('link', { name: 'Open Task Manager' })).toHaveAttribute(
      'href',
      '/tasks',
    )
    expect(screen.getByRole('link', { name: 'Open customer area' })).toHaveAttribute(
      'href',
      '/profile',
    )
  })

  it('unknown path shows 404', () => {
    renderWithRouter(routes, '/nope')
    expect(screen.getByRole('heading', { name: 'Page not found' })).toBeInTheDocument()
  })
})
