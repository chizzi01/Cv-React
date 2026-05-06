import { motion } from 'framer-motion'
import { scaleIn } from '../../../hooks/useScrollAnimation'
import SectionTitle from '../../ui/SectionTitle'
import { TECH_STACK } from '../../../data/techStack'
import './TechStack.css'

export default function TechStack() {
  return (
    <section className="techstack-section section-container" id="tecnologias">
      <div className="section-wrapper">
        <SectionTitle
          eyebrow="Tecnología profesional"
          title="Construido para durar"
          subtitle="Uso las mismas herramientas que emplean las empresas líderes del mundo. Tu web no es un experimento — es una inversión."
          color="green"
          center
        />
        <div className="techstack-grid">
          {TECH_STACK.map((tech, i) => (
            <motion.div
              key={tech.id}
              className={`tech-icon-wrapper tech-icon-wrapper--${tech.neonColor}`}
              variants={scaleIn}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.4 }}
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
        </div>
      </div>
    </section>
  )
}
