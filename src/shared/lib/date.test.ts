import { describe, expect, it } from 'vitest'
import { formatDate, isOverdue, parseISODate, todayISO } from './date'

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
    expect(formatDate('2026-03-01')).toMatch(/^1 Mar\w* 2026$/)
  })

  it('isOverdue compares against today and ignores done tasks', () => {
    expect(isOverdue('2026-09-12', 'todo', '2026-09-13')).toBe(true)
    expect(isOverdue('2026-09-13', 'todo', '2026-09-13')).toBe(false)
    expect(isOverdue('2026-09-12', 'done', '2026-09-13')).toBe(false)
    expect(isOverdue(null, 'todo', '2026-09-13')).toBe(false)
  })
})
