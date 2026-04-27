import { useRef } from 'react'
import { motion } from 'framer-motion'

export default function ProjectCard({ name, type, description, image, url, tags, neonColor, index }) {
  const cardRef = useRef()

  const handleMouseMove = (e) => {
    const { left, top, width, height } = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - left) / width  - 0.5) * 10
    const y = ((e.clientY - top)  / height - 0.5) * -10
    cardRef.current.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg)`
  }

  const handleMouseLeave = () => {
    cardRef.current.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)'
  }

  return (
    <motion.article
      ref={cardRef}
      className={`project-card project-card--${neonColor}`}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.75, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Full-bleed background image */}
      <div className="project-bg" style={{ backgroundImage: `url(${image})` }} />

      {/* Permanent dark gradient at bottom so name is always readable */}
      <div className="project-gradient" />

      {/* Type badge */}
      <span className="project-type-badge label-sm">{type}</span>

      {/* Index number watermark */}
      <span className="project-index-num">0{index + 1}</span>

      {/* Hover content overlay */}
      <div className="project-overlay">
        <p className="project-desc">{description}</p>
        <div className="project-tags">
          {tags.map((tag) => (
            <span key={tag} className="project-tag">{tag}</span>
          ))}
        </div>
        <a
          href={url}
          {...(url.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className="project-cta"
          onClick={(e) => e.stopPropagation()}
        >
          Ver proyecto
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
            <path d="M2.5 7.5h10M9 3.5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>

      {/* Name always visible */}
      <div className="project-footer">
        <h3 className="project-name">{name}</h3>
      </div>
    </motion.article>
  )
}
