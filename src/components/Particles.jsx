import { useEffect, useState } from 'react'
import styles from './Particles.module.css'

const SEASONAL_PARTICLES = {
  // Winter: snow particles
  winter: {
    count: 50,
    className: 'snowflake',
    symbols: ['*', '+', 'x', '.'],
  },
  // Spring: soft petals
  spring: {
    count: 30,
    className: 'petal',
    symbols: ['.', ',', 'o', '*', '+'],
  },
  // Summer: floating sparkle shapes
  summer: {
    count: 40,
    className: 'sparkle',
    symbols: ['*', '+', '~', '.', '^', '*'],
  },
  // Autumn: gentle leaf-like shapes
  autumn: {
    count: 35,
    className: 'leaf',
    symbols: ['.', ',', '~', 'o', ';'],
  },
}

function getSeason(month) {
  if (month >= 11 || month <= 1) return 'winter' // Dec, Jan, Feb
  if (month >= 2 && month <= 4) return 'spring' // Mar, Apr, May
  if (month >= 5 && month <= 7) return 'summer' // Jun, Jul, Aug
  return 'autumn' // Sep, Oct, Nov
}

function createParticles(config) {
  return Array.from({ length: config.count }, (_, i) => ({
    id: i,
    symbol: config.symbols[Math.floor(Math.random() * config.symbols.length)],
    delay: Math.random() * 20,
    duration: 10 + Math.random() * 20,
    left: Math.random() * 100,
    size: 0.5 + Math.random() * 1.5,
  }))
}

function Particles({ month }) {
  const season = getSeason(month)
  const config = SEASONAL_PARTICLES[season]
  const [particles, setParticles] = useState(() => createParticles(config))

  useEffect(() => {
    setParticles(createParticles(config))
  }, [config])

  return (
    <div className={styles.particles}>
      {particles.map(particle => (
        <div
          key={`${season}-${particle.id}`}
          className={`${styles.particle} ${styles[config.className]}`}
          style={{
            left: `${particle.left}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
            fontSize: `${particle.size}rem`,
          }}
        >
          {particle.symbol}
        </div>
      ))}
    </div>
  )
}

export default Particles