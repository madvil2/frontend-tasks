import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { ProfilePage } from '../../../pages/ProfilePage/ProfilePage'
import { mockMatchMedia } from '../../../test/mockMatchMedia'
import { renderWithRouter } from '../../../test/renderWithRouter'
import { CustomerAreaLayout } from './CustomerAreaLayout'

const routes = [
  {
    path: '/profile',
    element: <CustomerAreaLayout />,
    children: [{ index: true, element: <ProfilePage /> }],
  },
]
const renderLayout = () => renderWithRouter(routes, '/profile')
const toggle = () => screen.getByRole('button', { name: /menü/i })
const nav = () => screen.getByRole('navigation', { hidden: true })

describe('CustomerAreaLayout below 992px', () => {
  it('starts closed and toggles with the burger', async () => {
    const user = userEvent.setup()
    renderLayout()
    expect(toggle()).toHaveAttribute('aria-expanded', 'false')
    expect(nav()).not.toBeVisible()

    await user.click(toggle())
    expect(toggle()).toHaveAttribute('aria-expanded', 'true')
    expect(nav()).toBeVisible()
    expect(nav()).toHaveAccessibleName('Hauptmenü')
    expect(screen.getAllByRole('listitem')).toHaveLength(7)

    await user.click(toggle())
    expect(nav()).not.toBeVisible()
  })

  it('closes on Escape', async () => {
    const user = userEvent.setup()
    renderLayout()
    await user.click(toggle())
    await user.keyboard('{Escape}')
    expect(nav()).not.toBeVisible()
    expect(toggle()).toHaveAttribute('aria-expanded', 'false')
  })

  it('closes when a menu item is activated and marks the current page', async () => {
    const user = userEvent.setup()
    renderLayout()
    await user.click(toggle())
    const current = screen.getByRole('link', { name: 'Persönliche Daten' })
    expect(current).toHaveAttribute('aria-current', 'page')
    await user.click(current)
    expect(nav()).not.toBeVisible()
  })

  it('renders greeting and status', () => {
    renderLayout()
    expect(screen.getByText('John Smith')).toBeInTheDocument()
    expect(screen.getByText('Identifiziert')).toBeInTheDocument()
  })
})

describe('CustomerAreaLayout at 992px and up', () => {
  it('has no toggle and the nav is always visible', () => {
    mockMatchMedia(true)
    renderLayout()
    expect(screen.queryByRole('button', { name: /menü/i })).not.toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: 'Hauptmenü' })).toBeVisible()
  })
})
