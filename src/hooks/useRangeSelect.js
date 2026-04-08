import { useState } from 'react'
import { isSameDay, isInRange } from '../utils/dateHelpers'

/**
 * Manages the two-click range selection flow.
 *
 * State machine:
 *   idle            → click → start-set
 *   start-set       → click after start  → range-complete
 *   start-set       → click before start → swaps to new start
 *   range-complete  → click → resets, new start-set
 */
export function useRangeSelect() {
  const [start, setStart] = useState(null)
  const [end, setEnd] = useState(null)
  const [hovered, setHovered] = useState(null)

  function handleDayClick(date) {
    // If no start, or range is already complete → begin fresh
    if (!start || (start && end)) {
      setStart(date)
      setEnd(null)
      return
    }

    // Start exists but no end yet
    if (isSameDay(date, start)) {
      // Clicking the same day again clears it
      setStart(null)
      return
    }

    if (date < start) {
      // Clicked before start — make it the new start, push old start to end
      setEnd(start)
      setStart(date)
    } else {
      setEnd(date)
    }
  }

  function clearRange() {
    setStart(null)
    setEnd(null)
    setHovered(null)
  }

  // The "ghost" end used while hovering before the second click
  const previewEnd = start && !end ? hovered : null

  function getDayState(date) {
    const effectiveEnd = end || previewEnd
    return {
      isStart: isSameDay(date, start),
      isEnd: isSameDay(date, end),
      isInRange: isInRange(date, start, effectiveEnd),
      isPreview: !end && isInRange(date, start, previewEnd),
    }
  }

  return {
    start,
    end,
    hovered,
    setHovered,
    handleDayClick,
    clearRange,
    getDayState,
  }
}