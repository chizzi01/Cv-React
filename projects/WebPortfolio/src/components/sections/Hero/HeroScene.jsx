import { Canvas } from '@react-three/fiber'
import FloatingShapes from './FloatingShapes'
import ParticleField from './ParticleField'

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]}   color="#00FFFF" intensity={1.5} />
      <pointLight position={[-5, -3, 3]} color="#BF00FF" intensity={1.0} />
      <pointLight position={[0, -2, 2]}  color="#FF00A8" intensity={0.6} />
      <FloatingShapes />
      <ParticleField />
    </Canvas>
  )
}
