import { useState } from 'react'
import { useRangeSelect } from '../hooks/useRangeSelect'
import { useNotes } from '../hooks/useNotes'
import { useDynamicTheme } from '../hooks/useDynamicTheme'
import CalendarHeader from './CalendarHeader'
import CalendarGrid from './CalendarGrid'
import NotesPanel from './NotesPanel'
import SpiralBar from './SpiralBar'
import Particles from './Particles'
import styles from './WallCalendar.module.css'

function WallCalendar() {
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(0) // Start from January
  const [customImage, setCustomImage] = useState(null)

  const { start, end, setHovered, handleDayClick, clearRange, getDayState } = useRangeSelect()
  const { saveNote, deleteNote, getNoteForRange, getAllNotes } = useNotes()
  useDynamicTheme(month, customImage)

  function goToPrevMonth() {
    if (month === 0) {
      setYear((y) => y - 1)
      setMonth(11)
    } else {
      setMonth((m) => m - 1)
    }
    clearRange()
  }

  function goToNextMonth() {
    if (month === 11) {
      setYear((y) => y + 1)
      setMonth(0)
    } else {
      setMonth((m) => m + 1)
    }
    clearRange()
  }

  function handleImageUpload(file) {
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file)
      setCustomImage(url)
    }
  }

  function resetToMonthlyTheme() {
    setCustomImage(null)
  }

  return (
    <div className={styles.shell}>
      <Particles month={month} />
      <SpiralBar />

      <div className={styles.body}>
        {/* Left panel: image + grid */}
        <div className={styles.left}>
          <CalendarHeader
            year={year}
            month={month}
            onPrev={goToPrevMonth}
            onNext={goToNextMonth}
            onImageUpload={handleImageUpload}
            onResetTheme={resetToMonthlyTheme}
            customImageUrl={customImage}
            hasCustomImage={!!customImage}
          />
          <div className={styles.calendar}>
            <CalendarGrid
              year={year}
              month={month}
              getDayState={getDayState}
              onDayClick={handleDayClick}
              onDayHover={setHovered}
            />
          </div>
        </div>

        {/* Right panel: notes */}
        <div className={styles.right}>
          <NotesPanel
            rangeStart={start}
            rangeEnd={end}
            getNoteForRange={getNoteForRange}
            saveNote={saveNote}
            deleteNote={deleteNote}
            allNotes={getAllNotes()}
          />
        </div>
      </div>
    </div>
  )
}

export default WallCalendar