import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import NeonButton from '../../ui/NeonButton'
import './Hero.css'

function CountUp({ to, prefix = '', suffix = '' }) {
  const [val, setVal] = useState(0)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 })
  useEffect(() => {
    if (!inView) return
    let startTime = null
    const duration = 1400
    const easeOut = (t) => 1 - Math.pow(1 - t, 3)
    const step = (ts) => {
      if (!startTime) startTime = ts
      const p = Math.min((ts - startTime) / duration, 1)
      setVal(Math.round(easeOut(p) * to))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, to])
  return <span ref={ref}>{prefix}{val}{suffix}</span>
}

const statsVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.9 } },
}
const statItem = {
  hidden:  { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export default function HeroContent() {
  return (
    <div className="hero-content">
      <div className="hero-text-col">
        <motion.span
          className="hero-eyebrow label-sm"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="hero-eyebrow-dot" />
          Desarrollo Web Personalizado &nbsp;·&nbsp; Buenos Aires
        </motion.span>

        <div style={{ overflow: 'hidden' }}>
          <motion.h1
            className="hero-title display-xl"
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.28, ease: [0.76, 0, 0.24, 1] }}
          >
            Webs que convierten
            <br />
            <span className="hero-title-neon">visitantes en clientes</span>
          </motion.h1>
        </div>

        <motion.p
          className="hero-subtitle body-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          Sin una web que convierte, cada visita es una oportunidad perdida.
          Diseño y desarrollo sitios únicos, rápidos y de alto impacto — landing pages, e-commerce y apps web a medida.
        </motion.p>

        <motion.div
          className="hero-ctas"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <NeonButton href="#proyectos" variant="solid" color="cyan">
            Ver mis trabajos
          </NeonButton>
          <NeonButton href="#contacto" variant="ghost" color="cyan">
            Contame tu proyecto
          </NeonButton>
        </motion.div>

        <motion.div
          className="hero-stats"
          variants={statsVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="hero-stat" variants={statItem}>
            <span className="hero-stat-value"><span><CountUp to={7} suffix="+" /></span></span>
            <span className="hero-stat-label">Proyectos entregados</span>
          </motion.div>
          <motion.div className="hero-stat" variants={statItem}>
            <span className="hero-stat-value"><span><CountUp to={3} suffix="+" /></span></span>
            <span className="hero-stat-label">Años de experiencia</span>
          </motion.div>
          <motion.div className="hero-stat" variants={statItem}>
            <span className="hero-stat-value">&lt;<span><CountUp to={24} suffix="h" /></span></span>
            <span className="hero-stat-label">Tiempo de respuesta</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
