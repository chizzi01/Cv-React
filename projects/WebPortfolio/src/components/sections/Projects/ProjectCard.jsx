import { useRef } from 'react'
import { motion } from 'framer-motion'

function GooglePlayIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M3.18 23.76c.37.2.8.22 1.19.07L15.5 12 4.37.17C3.98.02 3.55.04 3.18.24 2.46.64 2 1.4 2 2.23v19.54c0 .83.46 1.59 1.18 1.99z" fill="#32BBFF"/>
      <path d="M20.07 10.09 17.2 8.46 13.72 12l3.48 3.54 2.87-1.63A2.27 2.27 0 0 0 21.3 12c0-.8-.47-1.54-1.23-1.91z" fill="#FFD400"/>
      <path d="M4.37.17 15.5 12 4.37 23.83c-.09-.04-.18-.09-.27-.15l-.06-.04-.86-.5A2.27 2.27 0 0 1 2 21.77V2.23C2 1.4 2.46.64 3.18.24L4.1.1z" fill="#32BBFF"/>
      <path d="m4.37 23.83 11.13-11.83-2.88-2.88L4.1 23.9l.27-.07z" fill="#00AAFF"/>
      <path d="M15.5 12 4.37.17l-.27.07 8.52 14.68z" fill="#00AAFF"/>
      <path d="m13.72 12-2.1-2.1L4.1.1 15.5 12z" fill="#43D854"/>
      <path d="m13.72 12 1.78 1.78L4.1 23.9l9.62-11.9z" fill="#00CC4A"/>
      <path d="M17.2 15.54 13.72 12l1.78 1.78 2.3 2.31-.6-.55z" fill="#E6A800"/>
    </svg>
  )
}

export default function ProjectCard({ name, type, description, image, url, storeUrl, tags, neonColor, index }) {
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
        <div className="project-actions">
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
          {storeUrl && (
            <a
              href={storeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-cta project-cta--store"
              onClick={(e) => e.stopPropagation()}
            >
              <GooglePlayIcon /> Play Store
            </a>
          )}
        </div>
      </div>

      {/* Name always visible */}
      <div className="project-footer">
        <h3 className="project-name">{name}</h3>
      </div>
    </motion.article>
  )
}
