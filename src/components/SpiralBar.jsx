import styles from './SpiralBar.module.css'

// The little binding dots at the top of the wall calendar
function SpiralBar() {
  return (
    <div className={styles.bar} aria-hidden="true">
      {Array.from({ length: 14 }).map((_, i) => (
        <div key={i} className={styles.ring} />
      ))}
    </div>
  )
}

export default SpiralBar