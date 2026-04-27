import { useMotionValue, useSpring, motion } from 'framer-motion'
import './NeonButton.css'

function useMagnetic(strength = 0.3) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 280, damping: 22, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 280, damping: 22, mass: 0.6 })

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - rect.left - rect.width  / 2) * strength)
    y.set((e.clientY - rect.top  - rect.height / 2) * strength)
  }
  const onLeave = () => { x.set(0); y.set(0) }

  return { style: { x: sx, y: sy }, onMouseMove: onMove, onMouseLeave: onLeave }
}

export default function NeonButton({ href, onClick, variant = 'solid', color = 'cyan', children, type = 'button' }) {
  const cls      = `neon-btn neon-btn--${variant} neon-btn--${color}`
  const magnetic = useMagnetic()

  if (href) {
    return (
      <motion.a
        href={href}
        className={cls}
        whileTap={{ scale: 0.96 }}
        {...magnetic}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={cls}
      whileTap={{ scale: 0.96 }}
      {...magnetic}
    >
      {children}
    </motion.button>
  )
}
