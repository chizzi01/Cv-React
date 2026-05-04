import { useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import FloatingShapes from './FloatingShapes'
import ParticleField from './ParticleField'

const isMobile = window.matchMedia('(max-width: 768px)').matches

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
      gl={{ antialias: !isMobile, alpha: true }}
      performance={{ min: 0.5 }}
    >
      <Environment preset="city" background={false} />

      <hemisphereLight args={['#1a0833', '#000000', 0.5]} />

      <pointLight position={[0,   8,  5]} color="#FFFFFF" intensity={12} />
      <pointLight position={[7,   3,  4]} color="#FFFFFF" intensity={6}  />
      <pointLight position={[-7,  2,  4]} color="#E0E8FF" intensity={5}  />

      <pointLight position={[5,   5,  5]} color="#00FFFF" intensity={2}  />
      <pointLight position={[-5, -3,  3]} color="#BF00FF" intensity={1.5} />

      <FloatingShapes scrollRef={scrollRef} />
      <ParticleField scrollRef={scrollRef} />
    </Canvas>
  )
}
