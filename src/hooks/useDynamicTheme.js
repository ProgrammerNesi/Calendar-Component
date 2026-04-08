import { useEffect } from 'react'
import { MONTH_IMAGES } from '../constants/monthImages'
import { extractImageColors, applyDynamicTheme } from '../utils/imageUtils'

/**
 * Hook that dynamically extracts colors from the current month's image or custom image
 * and applies them as CSS variables
 * @param {number} month - Current month (0-11)
 * @param {string} customImageUrl - Optional custom image URL to use instead of monthly image
 */
export function useDynamicTheme(month, customImageUrl) {
  useEffect(() => {
    const imageUrl = customImageUrl || MONTH_IMAGES[month]?.url
    if (!imageUrl) return

    extractImageColors(imageUrl)
      .then((colors) => {
        applyDynamicTheme(colors)
      })
      .catch((err) => {
        console.error('Failed to extract colors:', err)
      })
  }, [month, customImageUrl])
}
