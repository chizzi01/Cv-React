import { motion } from 'framer-motion'
import { cardReveal3D } from '../../../hooks/useScrollAnimation'

export default function ServiceCard({ icon, title, description, features, neonColor, popular, index = 0 }) {
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--sx', `${((e.clientX - left) / width) * 100}%`)
    e.currentTarget.style.setProperty('--sy', `${((e.clientY - top) / height) * 100}%`)
  }

  return (
    <motion.div
      className={`service-card glass-card glass-card--${neonColor}`}
      variants={cardReveal3D}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      whileHover={{ y: -8, scale: 1.02, transition: { type: 'spring', stiffness: 280, damping: 22 } }}
      onMouseMove={handleMouseMove}
    >
      {popular && <span className="service-badge">Más elegido</span>}
      <div className={`service-icon neon-text--${neonColor}`}>{icon}</div>
      <h3 className="service-title">{title}</h3>
      <p className="service-desc">{description}</p>
      <ul className="service-features">
        {features.map((f) => (
          <li key={f} className={`service-feature neon-text--${neonColor}`}>
            <span className="feature-dot">✦</span> {f}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}
