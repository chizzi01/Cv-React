import { useRef, useEffect, useCallback } from 'react'
import HeroContent from './HeroContent'
import LaptopScreen from './LaptopScreen'
import FlyingPhones from './FlyingPhones'
import './Hero.css'

const easeOutCubic    = t => 1 - Math.pow(1 - t, 3)
const easeInOutCubic  = t => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2, 3) / 2
const clamp           = (v, lo, hi) => Math.max(lo, Math.min(hi, v))
const invlerp         = (v, lo, hi) => clamp((v - lo) / (hi - lo), 0, 1)

export default function Hero() {
  const sectionRef      = useRef()
  const laptopRef       = useRef()
  const contentRef      = useRef()
  const rafRef          = useRef()
  const scaleStart      = useRef(4)   // computed on mount
  const rawRef          = useRef(0)
  const sourcePhonesRef = useRef()

  const tick = useCallback(() => {
    const section = sectionRef.current
    if (!section) return

    const rect   = section.getBoundingClientRect()
    const travel = section.offsetHeight - window.innerHeight
    const raw    = clamp(-rect.top / travel, 0, 1)
    rawRef.current = raw
    const S0     = scaleStart.current

    // Phase 1 (0 → 0.72): zoom out + reveal frame
    const zoomT  = easeOutCubic(invlerp(raw, 0, 0.72))
    const scale  = S0 - (S0 - 1) * zoomT

    // Bezel / hinge / base fade in at 0.08 → 0.55
    const bezelOp = easeInOutCubic(invlerp(raw, 0.08, 0.55))

    // Phase 2 (0.62 → 1): shift RIGHT, content in
    const shiftT  = easeOutCubic(invlerp(raw, 0.62, 1))
    const laptopX = 28 * shiftT
    const contentOp = invlerp(raw, 0.68, 1)
    const contentY  = (1 - easeOutCubic(invlerp(raw, 0.68, 1))) * 28

    if (laptopRef.current) {
      laptopRef.current.style.transform =
        `scale(${scale}) translateX(${laptopX}%)`

      const bezel = laptopRef.current.querySelector('.hl-bezel')
      const hinge = laptopRef.current.querySelector('.hl-hinge')
      const base  = laptopRef.current.querySelector('.hl-base')
      if (bezel) bezel.style.opacity = bezelOp
      if (hinge) hinge.style.opacity = bezelOp
      if (base)  base.style.opacity  = bezelOp
    }
    if (contentRef.current) {
      contentRef.current.style.opacity   = contentOp
      contentRef.current.style.transform = `translateY(${contentY}px)`
    }
    const hint = sectionRef.current?.querySelector('.hero-scroll-hint')
    if (hint) hint.style.opacity = contentOp
  }, [])

  useEffect(() => {
    // Compute the scale needed for the screen to fill the viewport
    const computeScale = () => {
      const screenEl = laptopRef.current?.querySelector('.hl-screen')
      if (!screenEl) return
      const sw = screenEl.offsetWidth
      const sh = screenEl.offsetHeight
      scaleStart.current = Math.max(
        window.innerWidth  / sw,
        window.innerHeight / sh
      ) * 0.70  // start "far away" — laptop visible, then zooms to scale 1
      tick()
    }

    computeScale()
    window.addEventListener('resize', computeScale)

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(tick)
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('resize', computeScale)
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [tick])

  return (
    <section ref={sectionRef} className="hero-section" id="inicio">
      <div className="hero-sticky">

        {/* ── Laptop ──────────────────────────── */}
        <div ref={laptopRef} className="hero-laptop">

          {/* Lid */}
          <div className="hl-lid">
            <div className="hl-camera" />
            <div className="hl-screen">
              <LaptopScreen phonesRef={sourcePhonesRef} />
              <div className="hl-scanline" />
              <div className="hl-screen-glow" />
            </div>
          </div>

          {/* Frame elements — fade in as it zooms out */}
          <div className="hl-bezel" style={{ opacity: 0 }} />
          <div className="hl-hinge" style={{ opacity: 0 }} />
          <div className="hl-base"  style={{ opacity: 0 }}>
            <div className="hl-trackpad" />
          </div>

        </div>

        {/* ── Hero text ───────────────────────── */}
        <div ref={contentRef} className="hero-content-overlay" style={{ opacity: 0 }}>
          <HeroContent />
        </div>

        {/* ── Flying phones ───────────────────── */}
        <FlyingPhones rawRef={rawRef} sourcePhonesRef={sourcePhonesRef} />

        {/* ── Scroll hint ─────────────────────── */}
        <div className="hero-scroll-hint" style={{ opacity: 0 }}>
          <div className="scroll-track"><div className="scroll-dot" /></div>
          <span className="scroll-label">scroll</span>
        </div>

      </div>
    </section>
  )
}
