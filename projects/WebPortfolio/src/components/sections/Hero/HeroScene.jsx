import { useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import FloatingShapes from './FloatingShapes'
import ParticleField from './ParticleField'

export default function HeroScene() {
  const scrollRef = useRef({ progress: 0, section: 0 })

  useEffect(() => {
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      scrollRef.current.progress = max > 0 ? window.scrollY / max : 0
    }
    window.addEventListener('scroll', updateProgress, { passive: true })

    // Track which section of <main> is most visible
    const sectionEls = Array.from(document.querySelectorAll('main > *'))
    const ratios = new Array(sectionEls.length).fill(0)

    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        const idx = sectionEls.indexOf(e.target)
        if (idx >= 0) ratios[idx] = e.intersectionRatio
      })
      const best = ratios.reduce((b, r, i) => (r > ratios[b] ? i : b), 0)
      scrollRef.current.section = best
    }, { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] })

    sectionEls.forEach(el => obs.observe(el))

    return () => {
      window.removeEventListener('scroll', updateProgress)
      obs.disconnect()
    }
  }, [])

  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      {/* Ambient + hemisphere for metallic sky/ground tones */}
      <ambientLight intensity={0.15} />
      <hemisphereLight args={['#1a0a3a', '#000000', 0.6]} />

      {/* White key light — critical for metallic highlights */}
      <pointLight position={[0,  8,  5]} color="#FFFFFF" intensity={5.0} />
      <pointLight position={[6,  4,  3]} color="#FFFFFF" intensity={2.5} />

      {/* Neon accent lights */}
      <pointLight position={[5,  5,  5]} color="#00FFFF" intensity={1.2} />
      <pointLight position={[-5,-3,  3]} color="#BF00FF" intensity={0.9} />
      <pointLight position={[0, -2,  2]} color="#FF00A8" intensity={0.5} />

      <FloatingShapes scrollRef={scrollRef} />
      <ParticleField />
    </Canvas>
  )
}
