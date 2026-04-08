import { useState, useEffect } from 'react'
import { toNoteKey } from '../utils/dateHelpers'

const STORAGE_KEY = 'wall-calendar-notes'

export function useNotes() {
  const [notes, setNotes] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : {}
    } catch {
      return {}
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
  }, [notes])

  function saveNote(start, end, text) {
    const key = toNoteKey(start, end)
    if (!key) return
    setNotes((prev) => ({
      ...prev,
      [key]: text,
    }))
  }

  function deleteNote(start, end) {
    const key = toNoteKey(start, end)
    if (!key) return
    setNotes((prev) => {
      const next = { ...prev }
      delete next[key]
      return next
    })
  }

  function getNoteForRange(start, end) {
    const key = toNoteKey(start, end)
    return key ? (notes[key] ?? '') : ''
  }

  // Returns all saved notes as an array, sorted newest first
  function getAllNotes() {
    return Object.entries(notes)
      .map(([key, text]) => {
        const [startStr, endStr] = key.split('__')
        return {
          key,
          start: new Date(startStr),
          end: new Date(endStr),
          text,
        }
      })
      .sort((a, b) => b.start - a.start)
  }

  return { saveNote, deleteNote, getNoteForRange, getAllNotes }
}