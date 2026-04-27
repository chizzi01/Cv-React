import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'

export default function ParticleField() {
  const pointsRef = useRef()
  const isMobile = useMemo(() => window.matchMedia('(max-width: 768px)').matches, [])
  const count = isMobile ? 500 : 1500

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      const r     = 8 + Math.random() * 6
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [count])

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0004
      pointsRef.current.rotation.x += 0.0001
    }
  })

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#00FFFF"
        size={0.022}
        sizeAttenuation
        depthWrite={false}
        opacity={0.7}
      />
    </Points>
  )
}
