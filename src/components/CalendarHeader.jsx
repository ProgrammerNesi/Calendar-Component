import { useRef } from 'react'
import { MONTH_NAMES } from '../utils/dateHelpers'
import { MONTH_IMAGES } from '../constants/monthImages'
import styles from './CalendarHeader.module.css'

function CalendarHeader({ year, month, onPrev, onNext, onImageUpload, onResetTheme, customImageUrl, hasCustomImage }) {
  const fileInputRef = useRef(null)
  const image = MONTH_IMAGES[month]
  const image = MONTH_IMAGES[month]
  const handleFileSelect = (event) => {
    const file = event.target.files[0]
    if (file) {
      onImageUpload(file)
    }
    event.target.value = ''
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className={styles.header}>
      <div
        className={styles.hero}
        style={{ backgroundImage: `url(${customImageUrl || image.url})` }}
      >
        <div className={styles.overlay} />

        <div className={styles.badge}>
          <span className={styles.year}>{year}</span>
          <span className={styles.month}>{MONTH_NAMES[month]}</span>
        </div>

        <div className={styles.nav}>
          <button
            className={styles.navBtn}
            onClick={onPrev}
            aria-label="Previous month"
          >
            ←
          </button>
          <button
            className={styles.navBtn}
            onClick={onNext}
            aria-label="Next month"
          >
            →
          </button>
        </div>

        <div className={styles.imageControls}>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
          <button
            className={styles.uploadBtn}
            onClick={handleUploadClick}
            title="Upload custom image to change theme"
          >
            Add Image
          </button>
          {hasCustomImage && (
            <button
              className={styles.resetBtn}
              onClick={onResetTheme}
              title="Reset to monthly theme"
            >
              ↺ Reset
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default CalendarHeader