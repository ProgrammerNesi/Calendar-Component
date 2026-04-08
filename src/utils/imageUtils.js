/**
 * Extracts dominant colors from an image URL
 * @param {string} imageUrl - The URL of the image to analyze
 * @returns {Promise<{primary: string, secondary: string, accent: string}>} - Color palette
 */
export function extractImageColors(imageUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data

      // Simple color extraction: get average color and most saturated color
      let totalR = 0, totalG = 0, totalB = 0, count = 0
      let maxSaturation = 0
      let vibrantColor = { r: 0, g: 0, b: 0 }

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]
        const a = data[i + 3]

        if (a > 128) { // Only consider opaque pixels
          totalR += r
          totalG += g
          totalB += b
          count++

          // Calculate saturation (simple HSL approximation)
          const max = Math.max(r, g, b)
          const min = Math.min(r, g, b)
          const saturation = max === 0 ? 0 : (max - min) / max

          if (saturation > maxSaturation) {
            maxSaturation = saturation
            vibrantColor = { r, g, b }
          }
        }
      }

      if (count === 0) {
        reject(new Error('No valid pixels found'))
        return
      }

      const avgR = Math.round(totalR / count)
      const avgG = Math.round(totalG / count)
      const avgB = Math.round(totalB / count)

      // Create complementary colors
      const primary = `rgb(${avgR}, ${avgG}, ${avgB})`
      const secondary = `rgb(${Math.min(255, avgR + 30)}, ${Math.min(255, avgG + 30)}, ${Math.min(255, avgB + 30)})`
      const accent = `rgb(${vibrantColor.r}, ${vibrantColor.g}, ${vibrantColor.b})`

      resolve({ primary, secondary, accent })
    }
    img.onerror = reject
    img.src = imageUrl
  })
}

/**
 * Applies dynamic colors to CSS variables
 * @param {Object} colors - The color palette
 */
export function applyDynamicTheme(colors) {
  const root = document.documentElement.style

  // Set primary theme colors based on image
  root.setProperty('--accent', colors.accent)
  root.setProperty('--accent-dark', darkenColor(colors.accent, 0.3))
  root.setProperty('--surface-card', lightenColor(colors.primary, 0.1))
  root.setProperty('--surface', lightenColor(colors.primary, 0.9))
  root.setProperty('--border-color', lightenColor(colors.primary, 0.7))
  root.setProperty('--range-bg', lightenColor(colors.accent, 0.8))
  root.setProperty('--range-preview-bg', lightenColor(colors.accent, 0.9))
  root.setProperty('--hover-bg', lightenColor(colors.primary, 0.8))
  root.setProperty('--text-primary', getContrastingTextColor(colors.primary))
  root.setProperty('--text-secondary', lightenColor(getContrastingTextColor(colors.primary), 0.7))
}

/**
 * Darkens a color by a factor
 * @param {string} color - RGB color string
 * @param {number} factor - Darkening factor (0-1)
 * @returns {string} Darkened color
 */
function darkenColor(color, factor) {
  const rgb = color.match(/\d+/g).map(Number)
  return `rgb(${rgb.map(c => Math.max(0, Math.round(c * (1 - factor)))).join(', ')})`
}

/**
 * Lightens a color by a factor
 * @param {string} color - RGB color string
 * @param {number} factor - Lightening factor (0-1)
 * @returns {string} Lightened color
 */
function lightenColor(color, factor) {
  const rgb = color.match(/\d+/g).map(Number)
  return `rgb(${rgb.map(c => Math.min(255, Math.round(c + (255 - c) * factor))).join(', ')})`
}

/**
 * Gets a contrasting text color (black or white) based on background
 * @param {string} bgColor - Background color
 * @returns {string} Contrasting text color
 */
function getContrastingTextColor(bgColor) {
  const rgb = bgColor.match(/\d+/g).map(Number)
  const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000
  return brightness > 128 ? '#1a1a2e' : '#e8e8f0'
}