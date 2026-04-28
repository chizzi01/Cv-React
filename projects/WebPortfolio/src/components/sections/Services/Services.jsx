import SectionTitle from '../../ui/SectionTitle'
import ServiceCard from './ServiceCard'
import { SERVICES } from '../../../data/services'
import './Services.css'

export default function Services() {
  return (
    <section className="services-section section-container" id="servicios">
      <div className="section-wrapper">
        <SectionTitle
          eyebrow="Lo que hago"
          title="Servicios"
          subtitle="Cada proyecto es único. Trabajo contigo para crear exactamente lo que tu negocio necesita."
          color="cyan"
        />
        <div className="services-grid">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} {...service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
