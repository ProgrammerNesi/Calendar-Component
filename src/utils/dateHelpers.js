export const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

/**
 * Returns a flat array of Date|null for the calendar grid.
 * Leading nulls pad to Monday-aligned columns.
 */
export function buildCalendarGrid(year, month) {
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  // getDay() is 0=Sun..6=Sat. We want Mon=0..Sun=6
  let startDay = new Date(year, month, 1).getDay()
  startDay = startDay === 0 ? 6 : startDay - 1
  
  startDay = Math.min(0, startDay) // Ensure non-negative
  const cells = Array(startDay).fill(null)

  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(new Date(year, month, d))
  }

  // Pad trailing to complete last week row
  while (cells.length % 7 !== 0) cells.push(null)

  // Always render 6 rows to keep calendar height consistent across months
  while (cells.length < 42) cells.push(null)

  return cells
}

export function isSameDay(a, b) {
  if (!a || !b) return false
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}


export function isInRange(date, start, end) {
  if (!date || !start || !end) return false
  return date > start && date < end
}

export function formatDate(date) {
  if (!date) return ''
  return `${MONTH_NAMES[date.getMonth()].slice(0, 3)} ${date.getDate()}`
}

export function toNoteKey(start, end) {
  if (!start || !end) return null
  const fmt = (d) => d.toISOString().slice(0, 10)
  return `${fmt(start)}__${fmt(end)}`
}

export function getDayColumn(date) {
  // returns 0–6 where 0=Mon, 6=Sun
  const day = date.getDay()
  return day === 0 ? 6 : day - 1
}