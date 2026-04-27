import { motion } from 'framer-motion'
import './SectionTitle.css'

export default function SectionTitle({ eyebrow, title, subtitle, color = 'cyan', center = false }) {
  return (
    <div className={`section-title-block ${center ? 'section-title-block--center' : ''}`}>
      {eyebrow && (
        <span className={`section-eyebrow label-sm neon-text--${color}`}>
          {eyebrow}
        </span>
      )}
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle body-lg">{subtitle}</p>}
      <div className={`section-title-line neon-line--${color}`} />
    </div>
  )
}
