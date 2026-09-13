import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ProfilePage } from './ProfilePage'

describe('ProfilePage', () => {
  it('renders three sections with all rows', () => {
    render(<ProfilePage />)
    const headings = screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent)
    expect(headings).toEqual(['Persönliche Daten', 'Familiäre Angaben', 'Beschäftigungsdaten'])
    expect(screen.getAllByRole('term')).toHaveLength(13)

    const personal = screen.getByRole('region', { name: 'Persönliche Daten' })
    expect(within(personal).getByText('Anrede')).toBeInTheDocument()
    expect(within(personal).getByText('Herr')).toBeInTheDocument()
    expect(screen.getByText('2380,00 EUR')).toBeInTheDocument()
  })
})
