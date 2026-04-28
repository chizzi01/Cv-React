import { motion } from 'framer-motion'
import {
  titleBlockContainer, eyebrowReveal, titleClip, subtitleReveal, lineReveal,
} from '../../hooks/useScrollAnimation'
import './SectionTitle.css'

export default function SectionTitle({ eyebrow, title, subtitle, color = 'cyan', center = false }) {
  return (
    <motion.div
      className={`section-title-block ${center ? 'section-title-block--center' : ''}`}
      variants={titleBlockContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.4 }}
    >
      {eyebrow && (
        <motion.span
          className={`section-eyebrow label-sm neon-text--${color}`}
          variants={eyebrowReveal}
        >
          {eyebrow}
        </motion.span>
      )}
      <div className="section-title-clip">
        <motion.h2 className="section-title" variants={titleClip}>
          {title}
        </motion.h2>
      </div>
      {subtitle && (
        <motion.p className="section-subtitle body-lg" variants={subtitleReveal}>
          {subtitle}
        </motion.p>
      )}
      <motion.div
        className={`section-title-line neon-line--${color}`}
        variants={lineReveal}
      />
    </motion.div>
  )
}
