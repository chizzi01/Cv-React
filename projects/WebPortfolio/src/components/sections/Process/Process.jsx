import { motion } from 'framer-motion'
import { useScrollAnimation, dropIn } from '../../../hooks/useScrollAnimation'
import SectionTitle from '../../ui/SectionTitle'
import './Process.css'

const STEPS = [
  {
    number: '01',
    title: 'Nos conocemos',
    description: 'Hablamos gratis sobre tu negocio y lo que necesitás. Sin compromiso — me contás tu idea y yo te digo cómo podemos hacerla realidad.',
  },
  {
    number: '02',
    title: 'Ves el diseño',
    description: 'Antes de construir nada, ves cómo va a verse tu web. Revisamos juntos y ajustamos lo que sea hasta que te encante.',
  },
  {
    number: '03',
    title: 'Lo construimos',
    description: 'Con el diseño aprobado, tu web cobra vida. Rápida, segura y lista para aparecer en Google desde el día uno.',
  },
  {
    number: '04',
    title: 'Tu web en vivo',
    description: 'Publicamos tu sitio y te enseño a usarlo. Y si necesitás algo después del lanzamiento, estoy disponible para ayudarte.',
  },
]

export default function Process() {
  const { ref, inView } = useScrollAnimation({ threshold: 0.1 })

  return (
    <section className="process-section section-container" id="proceso">
      <div className="section-wrapper">
        <SectionTitle
          eyebrow="Así funciona"
          title="De la idea a tu web en 4 pasos"
          subtitle="Sin tecnicismos ni sorpresas. Sabés qué pasa en cada momento."
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
