import { motion } from 'framer-motion'
import { cardReveal3D } from '../../../hooks/useScrollAnimation'
import SectionTitle from '../../ui/SectionTitle'
import './Trust.css'

const VALUE_PROPS = [
  {
    icon: '🎨',
    title: 'Diseño único',
    description: 'Sin templates ni WordPress. Cada web se diseña desde cero en Figma — identidad visual propia, pensada específicamente para tu negocio y audiencia.',
    neonColor: 'cyan',
  },
  {
    icon: '⚡',
    title: 'Entrega en 2–4 semanas',
    description: 'Tu web lista y publicada en tiempo récord. Sin burocracia: comunicación directa, actualizaciones frecuentes y cumplimiento de plazos garantizado.',
    neonColor: 'purple',
  },
  {
    icon: '🛡️',
    title: 'Soporte incluido',
    description: 'No desaparezco al entregar. Soporte post-lanzamiento incluido — si algo falla después del lanzamiento, lo resuelvo sin costo extra.',
    neonColor: 'green',
  },
]

export default function Trust() {
  return (
    <section className="trust-section section-container" id="por-que-yo">
      <div className="section-wrapper">
        <SectionTitle
          eyebrow="¿Por qué elegirme?"
          title="Lo que me diferencia"
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
