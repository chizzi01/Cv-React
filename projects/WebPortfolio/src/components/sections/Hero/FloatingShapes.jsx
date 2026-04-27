import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

function lerp(a, b, t) { return a + (b - a) * t }

function TorusShape() {
  const meshRef = useRef()
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    meshRef.current.rotation.x = lerp(meshRef.current.rotation.x, Math.sin(t * 0.3) * 0.4, 0.008)
    meshRef.current.rotation.y += 0.004
    meshRef.current.position.y = Math.sin(t * 0.4) * 0.35 + 1.2
  })
  return (
    <mesh ref={meshRef} position={[-3.5, 1.2, -3]}>
      <torusGeometry args={[1.3, 0.28, 18, 70]} />
      <meshStandardMaterial
        color="#BF00FF"
        emissive="#BF00FF"
        emissiveIntensity={0.55}
        wireframe
        transparent
        opacity={0.55}
      />
    </mesh>
  )
}

function IcosahedronShape() {
  const meshRef = useRef()
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    meshRef.current.rotation.x = Math.sin(t * 0.25) * 0.5
    meshRef.current.rotation.z += 0.003
    meshRef.current.rotation.y = Math.cos(t * 0.2) * 0.3
    meshRef.current.position.y = Math.cos(t * 0.35) * 0.4 - 1.2
  })
  return (
    <mesh ref={meshRef} position={[3.8, -1.2, -4]}>
      <icosahedronGeometry args={[1.5, 0]} />
      <meshStandardMaterial
        color="#00FFFF"
        emissive="#00FFFF"
        emissiveIntensity={0.45}
        wireframe
        transparent
        opacity={0.48}
      />
    </mesh>
  )
}

function OctahedronShape() {
  const meshRef = useRef()
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    meshRef.current.rotation.x += 0.005
    meshRef.current.rotation.y = Math.sin(t * 0.4) * 0.6
    meshRef.current.position.y = Math.sin(t * 0.6) * 0.5 + 2.0
    meshRef.current.position.x = Math.cos(t * 0.2) * 0.3 + 0.5
  })
  return (
    <mesh ref={meshRef} position={[0.5, 2.0, -5]}>
      <octahedronGeometry args={[0.75, 0]} />
      <meshStandardMaterial
        color="#FF00A8"
        emissive="#FF00A8"
        emissiveIntensity={0.65}
        wireframe
        transparent
        opacity={0.6}
      />
    </mesh>
  )
}

function DodecahedronShape() {
  const meshRef = useRef()
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    meshRef.current.rotation.y += 0.002
    meshRef.current.rotation.z = Math.sin(t * 0.3) * 0.3
    meshRef.current.position.y = Math.cos(t * 0.45) * 0.4 - 2.5
  })
  return (
    <mesh ref={meshRef} position={[-1.5, -2.5, -6]}>
      <dodecahedronGeometry args={[0.9, 0]} />
      <meshStandardMaterial
        color="#00FF88"
        emissive="#00FF88"
        emissiveIntensity={0.4}
        wireframe
        transparent
        opacity={0.35}
      />
    </mesh>
  )
}

export default function FloatingShapes() {
  return (
    <>
      <TorusShape />
      <IcosahedronShape />
      <OctahedronShape />
      <DodecahedronShape />
    </>
  )
}
