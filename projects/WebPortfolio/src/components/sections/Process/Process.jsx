import { motion } from 'framer-motion'
import { useScrollAnimation, dropIn } from '../../../hooks/useScrollAnimation'
import SectionTitle from '../../ui/SectionTitle'
import './Process.css'

const STEPS = [
  {
    number: '01',
    title: 'Consulta',
    description: 'Hablamos sobre tu proyecto, tus objetivos y el público al que querés llegar.',
  },
  {
    number: '02',
    title: 'Diseño',
    description: 'Creo el diseño visual en Figma. Revisamos juntos hasta que sea exactamente lo que querés.',
  },
  {
    number: '03',
    title: 'Desarrollo',
    description: 'Escribo el código con las mejores prácticas: rápido, seguro y mantenible.',
  },
  {
    number: '04',
    title: 'Entrega',
    description: 'Publicamos tu web. Te explico todo y quedo disponible para soporte post-lanzamiento.',
  },
]

export default function Process() {
  const { ref, inView } = useScrollAnimation({ threshold: 0.1 })

  return (
    <section className="process-section section-container" id="proceso">
      <div className="section-wrapper">
        <SectionTitle
          eyebrow="Cómo trabajo"
          title="El proceso"
          subtitle="Metodología clara y transparente en cada etapa del proyecto."
          color="pink"
          center
        />
        <div ref={ref} className={`process-steps${inView ? ' line-visible' : ''}`}>
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              className="process-step"
              variants={dropIn}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.35 }}
            >
              <div className="process-number-wrapper">
                <span className="process-number">{step.number}</span>
              </div>
              <h3 className="process-step-title">{step.title}</h3>
              <p className="process-step-desc">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
