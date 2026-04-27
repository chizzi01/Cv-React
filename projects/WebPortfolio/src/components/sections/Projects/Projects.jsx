import SectionTitle from '../../ui/SectionTitle'
import ProjectCard from './ProjectCard'
import { PROJECTS } from '../../../data/projects'
import './Projects.css'

export default function Projects() {
  return (
    <section className="projects-section section-container" id="proyectos">
      <div className="section-wrapper">
        <SectionTitle
          eyebrow="Mi trabajo"
          title="Proyectos"
          subtitle="Sitios reales, para clientes reales. Cada uno diseñado a medida y optimizado para resultados."
          color="purple"
        />
        <div className="projects-bento">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} {...project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
