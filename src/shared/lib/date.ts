const pad = (n: number) => String(n).padStart(2, '0')

/** Local calendar date as YYYY-MM-DD. */
export function todayISO(now: Date = new Date()): string {
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
}

/** Parses YYYY-MM-DD as a local date. `new Date('YYYY-MM-DD')` would parse as UTC and shift a day in negative offsets. */
export function parseISODate(iso: string): Date {
  const [year = 0, month = 1, day = 1] = iso.split('-').map(Number)
  return new Date(year, month - 1, day)
}

const formatter = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})

export function formatDate(iso: string): string {
  return formatter.format(parseISODate(iso))
}

export function isOverdue(
  dueDate: string | null,
  status: string,
  today: string = todayISO(),
): boolean {
  return dueDate !== null && status !== 'done' && dueDate < today
}
