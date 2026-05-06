import { useState, useEffect, useRef } from 'react'
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

// ─── Text-particle system ───────────────────────────────────────────────────
// Plain class (outside React) so particle mutations are lint-safe.
const SAMPLE_STEP = 3   // sample every Nth pixel — lower = more particles

class TitleParticleSystem {
  particles   = []
  sampled     = false
  rafId       = null
  switchTimer = null

  canvas  = null
  ctx     = null
  h1      = null
  holder  = null  // h1 wrapper — hidden after switch
  content = null  // .hero-content div — canvas sized to this

  mouseX = -9999
  mouseY = -9999

  // Physics tuning
  RADIUS   = 60    // px of mouse influence
  STRENGTH = 3     // repulsion push per frame
  SPRING   = 0.12  // pull toward origin
  DAMPING  = 0.78  // velocity decay

  attach(canvas, h1, holder, content) {
    this.canvas  = canvas
    this.ctx     = canvas.getContext('2d')
    this.h1      = h1
    this.holder  = holder
    this.content = content
    this.loop()
    // Switch from DOM text to canvas after entrance animation finishes
    this.switchTimer = setTimeout(() => this.switchToCanvas(), 1350)
  }

  detach() {
    cancelAnimationFrame(this.rafId)
    clearTimeout(this.switchTimer)
  }

  switchToCanvas() {
    this.sampleText()
    if (!this.sampled) return
    if (this.holder) this.holder.style.opacity = '0'
    if (this.canvas) this.canvas.style.opacity = '1'
  }

  sampleText() {
    if (this.sampled) return
    const { h1, canvas, content } = this
    if (!h1 || !canvas || !content) return

    const style      = getComputedStyle(h1)
    const fontSize   = parseFloat(style.fontSize)
    const fontWeight = style.fontWeight
    const fontFamily = style.fontFamily
    const lhRaw      = style.lineHeight
    const lineHeight = lhRaw === 'normal' ? fontSize * 1.25 : parseFloat(lhRaw)

    const h1Rect      = h1.getBoundingClientRect()
    const contentRect = content.getBoundingClientRect()

    // Size the visible canvas to the full content div
    canvas.width  = contentRect.width
    canvas.height = contentRect.height

    // Measure both lines on canvas first so the offscreen canvas is wide enough
    const probe    = document.createElement('canvas').getContext('2d')
    probe.font     = `${fontWeight} ${fontSize}px ${fontFamily}`
    const line1W   = probe.measureText('¿Tu web trabaja').width
    const line2W   = probe.measureText('mientras').width
    const line3W   = probe.measureText('vos dormís?').width
    const W        = Math.ceil(Math.max(h1Rect.width, line1W, line2W, line3W)) + 4
    const H        = Math.ceil(h1Rect.height + lineHeight * 0.5)

    const off = document.createElement('canvas')
    off.width  = W
    off.height = H
    const ctx  = off.getContext('2d')
    ctx.font         = `${fontWeight} ${fontSize}px ${fontFamily}`
    ctx.textBaseline = 'top'

    ctx.fillStyle = '#ffffff'
    ctx.fillText('¿Tu web trabaja', 0, 0)

    const grad = ctx.createLinearGradient(0, 0, W, 0)
    grad.addColorStop(0,    '#00c8ff')
    grad.addColorStop(0.45, '#bf00ff')
    grad.addColorStop(1,    '#ff0090')
    ctx.fillStyle = grad
    ctx.fillText('mientras', 0, lineHeight)
    ctx.fillText('vos dormís?', 0, lineHeight * 2)

    const { data } = ctx.getImageData(0, 0, W, H)
    const ox = h1Rect.left - contentRect.left
    const oy = h1Rect.top  - contentRect.top

    this.particles = []
    for (let y = 0; y < H; y += SAMPLE_STEP) {
      for (let x = 0; x < W; x += SAMPLE_STEP) {
        const i = (y * W + x) * 4
        if (data[i + 3] > 80) {
          const px = ox + x
          const py = oy + y
          this.particles.push({
            x: px, y: py, ox: px, oy: py,
            vx: 0,  vy: 0,
            color: `rgb(${data[i]},${data[i + 1]},${data[i + 2]})`,
          })
        }
      }
    }
    this.sampled = true
  }

  onMouseMove(x, y) {
    this.mouseX = x
    this.mouseY = y
  }

  onMouseLeave() {
    this.mouseX = -9999
    this.mouseY = -9999
  }

  loop() {
    const tick = () => {
      const { ctx, canvas, particles, sampled } = this
      if (!ctx || !canvas || !sampled) {
        this.rafId = requestAnimationFrame(tick)
        return
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const { mouseX, mouseY, RADIUS, STRENGTH, SPRING, DAMPING } = this

      for (const p of particles) {
        // Spring back to origin
        p.vx += (p.ox - p.x) * SPRING
        p.vy += (p.oy - p.y) * SPRING

        // Mouse repulsion (only when inside radius)
        const mdx  = p.x - mouseX
        const mdy  = p.y - mouseY
        const dist = Math.sqrt(mdx * mdx + mdy * mdy)
        if (dist < RADIUS && dist > 0.5) {
          const force = (1 - dist / RADIUS) * STRENGTH
          p.vx += (mdx / dist) * force
          p.vy += (mdy / dist) * force
        }

        p.vx *= DAMPING
        p.vy *= DAMPING
        p.x  += p.vx
        p.y  += p.vy
      }

      // Draw — batch shadow state
      ctx.shadowBlur = 5
      for (const p of particles) {
        ctx.shadowColor = p.color
        ctx.fillStyle   = p.color
        ctx.fillRect(p.x, p.y, 2.5, 2.5)
      }

      this.rafId = requestAnimationFrame(tick)
    }
    this.rafId = requestAnimationFrame(tick)
  }
}

// ─── Component ──────────────────────────────────────────────────────────────
export default function HeroContent() {
  const contentRef = useRef()
  const canvasRef  = useRef()
  const h1Ref      = useRef()
  const holderRef  = useRef()
  const sysRef     = useRef(null)

  useEffect(() => {
    const sys = new TitleParticleSystem()
    sysRef.current = sys
    sys.attach(canvasRef.current, h1Ref.current, holderRef.current, contentRef.current)
    return () => sys.detach()
  }, [])

  const handleMouseMove = (e) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (rect) sysRef.current?.onMouseMove(e.clientX - rect.left, e.clientY - rect.top)
  }
  const handleMouseLeave = () => sysRef.current?.onMouseLeave()

  return (
    <div
      className="hero-content"
      ref={contentRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Particle canvas — full content width, pointer-events:none so clicks pass through */}
      <canvas ref={canvasRef} className="hero-particle-canvas" />

      <div className="hero-text-col">
        <motion.span
          className="hero-eyebrow label-sm"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="hero-eyebrow-dot" />
          Desarrollo Web &nbsp;·&nbsp; Buenos Aires &nbsp;·&nbsp; Disponible ahora
        </motion.span>

        {/* overflow:hidden clips the slide-in entrance; holderRef is hidden after switch */}
        <div style={{ overflow: 'hidden' }}>
          <div ref={holderRef}>
            <motion.h1
              ref={h1Ref}
              className="hero-title display-xl"
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.28, ease: [0.76, 0, 0.24, 1] }}
              style={{ userSelect: 'none' }}
            >
              ¿Tu web trabaja
              <br />
              <span className="hero-title-neon">mientras<br />vos dormís?</span>
            </motion.h1>
          </div>
        </div>

        <motion.p
          className="hero-subtitle body-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          Somos ACM — desarrolladores web. Construimos sitios rápidos, únicos y de alto impacto
          que convierten visitas en clientes reales. Sin templates. Sin excusas.
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
