import styles from './DayCell.module.css'

/**
 * A single cell in the calendar grid.
 * Handles all visual states: normal, start, end, in-range, preview, today, weekend.
 */
function DayCell({ date, isStart, isEnd, isInRange, isPreview, isToday, onClick, onMouseEnter }) {
  if (!date) {
    return <div className={styles.empty} />
  }

  const isWeekend = date.getDay() === 0 || date.getDay() === 6
  const dayNum = date.getDate()

  const classNames = [
    styles.cell,
    isWeekend && styles.weekend,
    isToday && styles.today,
    isStart && styles.start,
    isEnd && styles.end,
    isInRange && !isStart && !isEnd && styles.inRange,
    isPreview && !isStart && styles.preview,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className={classNames}
      onClick={() => onClick(date)}
      onMouseEnter={() => onMouseEnter(date)}
      role="button"
      tabIndex={0}
      aria-label={date.toDateString()}
      onKeyDown={(e) => e.key === 'Enter' && onClick(date)}
    >
      <span className={styles.number}>{dayNum}</span>
    </div>
  )
}

export default DayCell