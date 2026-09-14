import { describe, expect, it } from 'vitest'
import { formatDate, parseISODate, todayISO } from './date'

describe('date helpers', () => {
  it('todayISO formats a local date', () => {
    expect(todayISO(new Date(2026, 0, 5))).toBe('2026-01-05')
  })

  it('parseISODate returns a local date, not UTC midnight', () => {
    const d = parseISODate('2026-03-01')
    expect(d.getFullYear()).toBe(2026)
    expect(d.getMonth()).toBe(2)
    expect(d.getDate()).toBe(1)
  })

  it('formatDate renders day, short month, year', () => {
    expect(formatDate('2026-03-01')).toBe('1 Mar 2026')
  })
})
