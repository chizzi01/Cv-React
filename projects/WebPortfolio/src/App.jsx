import { useEffect, useRef } from 'react'
import './index.css'
import Stars from './components/Stars'
import HeroScene from './components/sections/Hero/HeroScene'
import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero/Hero'
import Services from './components/sections/Services/Services'
import Projects from './components/sections/Projects/Projects'
import Process from './components/sections/Process/Process'
import Trust from './components/sections/Trust/Trust'
import Contact from './components/sections/Contact/Contact'
import Footer from './components/layout/Footer'

export default function App() {
  const dotRef      = useRef()
  const ringRef     = useRef()
  const progressRef = useRef()

  /* ── Custom cursor ─────────────────────────── */
  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mx = 0, my = 0, rx = 0, ry = 0, rafId
    const lerp = (a, b, t) => a + (b - a) * t

    const onMove = (e) => { mx = e.clientX; my = e.clientY }

    const tick = () => {
      rx = lerp(rx, mx, 0.1)
      ry = lerp(ry, my, 0.1)
      dot.style.transform  = `translate(${mx - 3}px, ${my - 3}px)`
      ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`
      rafId = requestAnimationFrame(tick)
    }

    /* ring grows on interactive elements */
    const onOver = (e) => {
      if (e.target.closest('a, button, .project-card, .service-card, [role="button"]')) {
        ring.classList.add('cursor-ring--hover')
      }
    }
    const onOut = (e) => {
      if (e.target.closest('a, button, .project-card, .service-card, [role="button"]')) {
        ring.classList.remove('cursor-ring--hover')
      }
    }

    window.addEventListener('mousemove', onMove,  { passive: true })
    document.addEventListener('mouseover',  onOver)
    document.addEventListener('mouseout',   onOut)
    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover',  onOver)
      document.removeEventListener('mouseout',   onOut)
      cancelAnimationFrame(rafId)
    }
  }, [])

  /* ── Scroll progress bar ───────────────────── */
  useEffect(() => {
    const bar = progressRef.current
    if (!bar) return
    const update = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      bar.style.transform = `scaleX(${h ? window.scrollY / h : 0})`
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <>
      <Stars />
      <HeroScene />
      {/* Scroll progress */}
      <div ref={progressRef} className="scroll-progress" aria-hidden="true" />
      {/* Custom cursor (hidden on touch via CSS) */}
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />

      <Navbar />
      <main>
        <Hero />
        <Trust />
        <Services />
        <Projects />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
