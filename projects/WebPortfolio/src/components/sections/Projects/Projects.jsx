import { useState, useRef, useCallback } from 'react'
import SectionTitle from '../../ui/SectionTitle'
import ProjectCard from './ProjectCard'
import { PROJECTS } from '../../../data/projects'
import './Projects.css'

export default function Projects() {
  const trackRef = useRef()
  const [activeIdx, setActiveIdx] = useState(0)

  const handleScroll = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const idx = Math.round(el.scrollLeft / el.clientWidth)
    setActiveIdx(idx)
  }, [])

  const goTo = (i) => {
    trackRef.current?.scrollTo({ left: i * trackRef.current.clientWidth, behavior: 'smooth' })
  }

  return (
    <section className="projects-section section-container" id="proyectos">
      <div className="section-wrapper">
        <SectionTitle
          eyebrow="Resultados reales"
          title="Proyectos"
          subtitle="Sitios que ya están online, generando resultados para negocios reales. Cada uno diseñado a medida."
          color="purple"
        />
        <div className="projects-bento" ref={trackRef} onScroll={handleScroll}>
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} {...project} index={i} />
          ))}
        </div>
        <div className="projects-dots">
          {PROJECTS.map((_, i) => (
            <button
              key={i}
              className={`projects-dot${i === activeIdx ? ' active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Proyecto ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
