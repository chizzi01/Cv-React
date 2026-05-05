import { useRef, useEffect } from 'react'
import schreiberMobileImg from '../../../assets/images/schreiber-mobile.png'
import nearbyMobileImg    from '../../../assets/images/nearby-mobile.png'
import fitcMobileImg      from '../../../assets/images/fitc-mobile.png'
import './FlyingPhones.css'

const PHONES = [
  { img: schreiberMobileImg, border: 'rgba(191,0,255,', glow: 'rgba(191,0,255,', rotSrc: -8,  rotDst: -10, xDst:  0 },
  { img: nearbyMobileImg,    border: 'rgba(0,255,136,', glow: 'rgba(0,255,136,', rotSrc:  3,  rotDst:   4, xDst: -8 },
  { img: fitcMobileImg,      border: 'rgba(0,255,255,', glow: 'rgba(0,255,255,', rotSrc: -4,  rotDst:  -5, xDst:  0 },
]

const SCALE_START = 44 / 110
const lerp     = (a, b, t) => a + (b - a) * t
const clamp    = (v, lo, hi) => Math.max(lo, Math.min(hi, v))
const invlerp  = (v, lo, hi) => clamp((v - lo) / (hi - lo), 0, 1)
const easeOut  = t => 1 - Math.pow(1 - t, 3)

export default function FlyingPhones({ rawRef, sourcePhonesRef }) {
  const phoneRefs = useRef([])
  const naturalX  = useRef([0, 0, 0])
  const naturalY  = useRef([0, 0, 0])

  useEffect(() => {
    function measureNatural() {
      const els = phoneRefs.current
      const saves = els.map(el => el?.style.transform ?? '')
      els.forEach(el => { if (el) el.style.transform = '' })
      els.forEach((el, i) => {
        if (!el) return
        const r = el.getBoundingClientRect()
        naturalX.current[i] = r.left + r.width  / 2
        naturalY.current[i] = r.top  + r.height / 2
      })
      els.forEach((el, i) => { if (el) el.style.transform = saves[i] })
    }

    measureNatural()
    window.addEventListener('resize', measureNatural)

    let raf
    const miniX = [0, 0, 0]
    const miniY = [0, 0, 0]

    function tick() {
      raf = requestAnimationFrame(tick)
      const raw  = rawRef?.current ?? 0
      const flyT = easeOut(invlerp(raw, 0.68, 1.0))
      const t    = performance.now() / 1000

      const src = sourcePhonesRef?.current
      if (src) {
        const kids = src.children
        for (let i = 0; i < 3; i++) {
          const ph = kids[i]
          if (!ph) continue
          const r = ph.getBoundingClientRect()
          miniX[i] = r.left + r.width  / 2
          miniY[i] = r.top  + r.height / 2
        }
        src.style.opacity = String(clamp(1 - flyT * 6, 0, 1))
      }

      for (let i = 0; i < 3; i++) {
        const el = phoneRefs.current[i]
        if (!el) continue
        const ph = PHONES[i]
        const nx = naturalX.current[i]
        const ny = naturalY.current[i]

        const floatY   = flyT >= 0.99 ? Math.sin(t * 1.2 + i * 1.5) * 5 : 0
        const dx       = lerp(miniX[i] - nx, ph.xDst,   flyT)
        const dy       = lerp(miniY[i] - ny, 0,         flyT) + floatY
        const scale    = lerp(SCALE_START,   1,         flyT)
        const rot      = lerp(ph.rotSrc,     ph.rotDst, flyT)
        const op       = clamp(flyT * 6, 0, 1)
        const borderA  = lerp(0.6,  0.35, flyT)
        const glowA    = lerp(0.25, 0.12, flyT)
        const glowPx   = lerp(8,    40,   flyT)
        const shadowY  = lerp(0,    24,   flyT)
        const shadowB  = lerp(0,    60,   flyT)

        el.style.transform = `translate(${dx}px,${dy}px) rotate(${rot}deg) scale(${scale})`
        el.style.opacity   = String(op)
        el.style.border    = `1.5px solid ${ph.border}${borderA})`
        el.style.boxShadow = `0 0 ${glowPx}px ${ph.glow}${glowA}), 0 ${shadowY}px ${shadowB}px rgba(0,0,0,0.6)`
      }
    }

    tick()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', measureNatural)
      const src = sourcePhonesRef?.current
      if (src) src.style.opacity = '1'
    }
  }, [rawRef, sourcePhonesRef])

  return (
    <div className="fp-container">
      {PHONES.map((ph, i) => (
        <div
          key={i}
          ref={el => (phoneRefs.current[i] = el)}
          className="fp-phone"
          style={{ opacity: 0 }}
        >
          <div className="fp-inner">
            <img src={ph.img} alt="" className="fp-screen-img" />
            <div className="fp-island" />
            <div className="fp-home-bar" />
          </div>
        </div>
      ))}
    </div>
  )
}
