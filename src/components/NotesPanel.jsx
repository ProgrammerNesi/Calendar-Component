import { useState, useEffect } from 'react'
import { formatDate } from '../utils/dateHelpers'
import styles from './NotesPanel.module.css'

function NotesPanel({ rangeStart, rangeEnd, getNoteForRange, saveNote, deleteNote, allNotes }) {
  const [draft, setDraft] = useState('')
  const [saved, setSaved] = useState(false)

  const hasRange = rangeStart && rangeEnd
  const rangeLabel = hasRange
    ? `${formatDate(rangeStart)} → ${formatDate(rangeEnd)}`
    : null

  // Sync textarea when the selected range changes
  useEffect(() => {
    if (hasRange) {
      setDraft(getNoteForRange(rangeStart, rangeEnd))
    } else {
      setDraft('')
    }
    setSaved(false)
  }, [rangeStart, rangeEnd]) // eslint-disable-line

  function handleSave() {
    if (!hasRange || !draft.trim()) return
    saveNote(rangeStart, rangeEnd, draft.trim())
    setSaved(true)
  }

  function handleDelete(note) {
    deleteNote(note.start, note.end)
    if (rangeStart && rangeEnd &&
      note.start.toDateString() === rangeStart.toDateString() &&
      note.end.toDateString() === rangeEnd.toDateString()
    ) {
      setDraft('')
    }
  }

  return (
    <div className={styles.panel}>
      <div className={styles.inputArea}>
        <p className={styles.sectionTitle}>Notes</p>

        {hasRange ? (
          <span className={styles.rangeBadge}>{rangeLabel}</span>
        ) : (
          <p className={styles.hint}>Select a date range to add a note</p>
        )}

        <textarea
          className={styles.textarea}
          value={draft}
          onChange={(e) => {
            setDraft(e.target.value)
            setSaved(false)
          }}
          placeholder={hasRange ? 'Write a note for this range...' : ''}
          disabled={!hasRange}
          rows={4}
        />

        {hasRange && (
          <button
            className={`${styles.saveBtn} ${saved ? styles.savedBtn : ''}`}
            onClick={handleSave}
            disabled={!draft.trim()}
          >
            {saved ? '✓ Saved' : 'Save note'}
          </button>
        )}
      </div>

      {allNotes.length > 0 && (
        <div className={styles.savedList}>
          <p className={styles.sectionTitle}>Saved</p>
          <ul className={styles.notesList}>
            {allNotes.map((note) => (
              <li key={note.key} className={styles.noteItem}>
                <div className={styles.noteHeader}>
                  <span className={styles.noteRange}>
                    {formatDate(note.start)} → {formatDate(note.end)}
                  </span>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDelete(note)}
                    aria-label="Delete note"
                  >
                    ×
                  </button>
                </div>
                <p className={styles.noteText}>{note.text}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default NotesPanel