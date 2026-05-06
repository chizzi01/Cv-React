import { motion } from 'framer-motion'
import { cardReveal3D } from '../../../hooks/useScrollAnimation'
import SectionTitle from '../../ui/SectionTitle'
import './Trust.css'

const VALUE_PROPS = [
  {
    icon: '🎨',
    title: 'Tu marca, no una plantilla',
    description: 'Cada sitio se diseña desde cero, pensado específicamente para tu negocio. Sin webs genéricas — tu presencia online va a verse diferente a la competencia desde el primer día.',
    neonColor: 'cyan',
  },
  {
    icon: '⚡',
    title: 'Online en menos de un mes',
    description: 'Tu web lista en 2 a 4 semanas, no en 3 meses. Trato directo, sin reuniones interminables — sabés qué pasa en cada momento y la fecha de entrega se cumple.',
    neonColor: 'purple',
  },
  {
    icon: '🛡️',
    title: 'Soporte cuando lo necesitás',
    description: 'Cuando tu web está lista, yo sigo ahí. Si algo falla o querés cambiar algo después del lanzamiento, lo resolvemos. Sin cobros adicionales ni excusas.',
    neonColor: 'green',
  },
]

export default function Trust() {
  return (
    <section className="trust-section section-container" id="por-que-yo">
      <div className="section-wrapper">
        <SectionTitle
          eyebrow="¿Por qué trabajar conmigo?"
          title="Tu web, sin complicaciones"
          color="cyan"
          center
        />
        <div className="trust-grid">
          {VALUE_PROPS.map((vp, i) => (
            <motion.div
              key={vp.title}
              className={`trust-card glass-card glass-card--${vp.neonColor}`}
              variants={cardReveal3D}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.25 }}
            >
              <div className="trust-icon">{vp.icon}</div>
              <h3 className="trust-title">{vp.title}</h3>
              <p className="trust-desc">{vp.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
