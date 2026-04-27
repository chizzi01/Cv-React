import { motion } from 'framer-motion'
import { useScrollAnimation, staggerContainer } from '../../../hooks/useScrollAnimation'
import SectionTitle from '../../ui/SectionTitle'
import ServiceCard from './ServiceCard'
import { SERVICES } from '../../../data/services'
import './Services.css'

export default function Services() {
  const { ref, inView } = useScrollAnimation({ threshold: 0.1 })

  return (
    <section className="services-section section-container" id="servicios">
      <div className="section-wrapper">
        <SectionTitle
          eyebrow="Lo que hago"
          title="Servicios"
          subtitle="Cada proyecto es único. Trabajo contigo para crear exactamente lo que tu negocio necesita."
          color="cyan"
        />
        <motion.div
          ref={ref}
          className="services-grid"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
