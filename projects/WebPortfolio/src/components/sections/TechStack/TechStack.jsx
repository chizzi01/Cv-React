import { motion } from 'framer-motion'
import { useScrollAnimation, staggerContainer, fadeUp } from '../../../hooks/useScrollAnimation'
import SectionTitle from '../../ui/SectionTitle'
import { TECH_STACK } from '../../../data/techStack'
import './TechStack.css'

export default function TechStack() {
  const { ref, inView } = useScrollAnimation({ threshold: 0.1 })

  return (
    <section className="techstack-section section-container" id="tecnologias">
      <div className="section-wrapper">
        <SectionTitle
          eyebrow="Herramientas"
          title="Tech Stack"
          subtitle="Las tecnologías que uso para construir productos digitales de alto rendimiento."
          color="green"
          center
        />
        <motion.div
          ref={ref}
          className="techstack-grid"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {TECH_STACK.map((tech) => (
            <motion.div
              key={tech.id}
              className={`tech-icon-wrapper tech-icon-wrapper--${tech.neonColor}`}
              variants={fadeUp}
            >
              <img
                src={tech.src}
                alt={tech.label}
                className="tech-icon-img"
                loading="lazy"
              />
              <span className="tech-icon-label">{tech.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
