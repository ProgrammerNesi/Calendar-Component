import { useMemo } from 'react'
import { buildCalendarGrid, isSameDay, DAYS_OF_WEEK } from '../utils/dateHelpers'
import DayCell from './DayCell'
import styles from './CalendarGrid.module.css'

function CalendarGrid({ year, month, getDayState, onDayClick, onDayHover }) {
  const today = new Date()
  const cells = useMemo(() => buildCalendarGrid(year, month), [year, month])

  return (
    <div className={styles.grid}>
      <div className={styles.header}>
        {DAYS_OF_WEEK.map((d) => (
          <span key={d} className={`${styles.dayLabel} ${d === 'Sat' || d === 'Sun' ? styles.weekend : ''}`}>
            {d}
          </span>
        ))}
      </div>

      <div
        className={styles.cells}
        onMouseLeave={() => onDayHover(null)}
      >
        {cells.map((date, i) => {
          const { isStart, isEnd, isInRange, isPreview } = getDayState(date)
          const isToday = isSameDay(date, today)

          return (
            <DayCell
              key={i}
              date={date}
              isStart={isStart}
              isEnd={isEnd}
              isInRange={isInRange}
              isPreview={isPreview}
              isToday={isToday}
              onClick={onDayClick}
              onMouseEnter={onDayHover}
            />
          )
        })}
      </div>
    </div>
  )
}

export default CalendarGrid