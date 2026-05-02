import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const lerp = (a, b, t) => a + (b - a) * t

function pt(p, vals) {
  const n = vals.length - 1
  const i = Math.min(Math.floor(p * n), n - 1)
  const t = p * n - i
  return lerp(vals[i], vals[i + 1], t)
}

// ─── Material targets per section ────────────────────────────────────────────
//
//  sec 0  Hero     → wireframe neon lines
//  sec 1  Trust    → polished metal (metalness 0.95, roughness 0.1)
//  sec 2  Services → granular dots  (mesh hidden, points shown)
//  sec 3  Projects → solid 3D with clearcoat glow
//  sec 4  Process  → crystal glass  (iridescence + clearcoat)
//  sec 5  Contact  → fade to nothing
//
// mOp = mesh opacity multiplier   pOp = points opacity multiplier
// ei  = emissiveIntensity mult    metal / rough / cc / irid = PBR values

function secTarget(sec) {
  switch (sec) {
    case 0: return { wf: true,  mOp: 1.0, pOp: 0.0, ei: 3.0, metal: 0.00, rough: 1.00, cc: 0.00, irid: 0.00 }
    case 1: return { wf: false, mOp: 1.0, pOp: 0.0, ei: 1.2, metal: 0.95, rough: 0.08, cc: 0.60, irid: 0.20 }
    case 2: return { wf: false, mOp: 0.0, pOp: 1.0, ei: 0.0, metal: 0.05, rough: 0.90, cc: 0.00, irid: 0.00 }
    case 3: return { wf: false, mOp: 1.0, pOp: 0.0, ei: 4.0, metal: 0.50, rough: 0.30, cc: 1.00, irid: 0.00 }
    case 4: return { wf: false, mOp: 0.6, pOp: 0.0, ei: 2.5, metal: 0.10, rough: 0.00, cc: 1.00, irid: 1.00 }
    default:return { wf: true,  mOp: 0.0, pOp: 0.0, ei: 0.0, metal: 0.00, rough: 1.00, cc: 0.00, irid: 0.00 }
  }
}

// Interpolate all PBR properties between two adjacent section targets
function applyMaterial(mat, pmat, ss, baseOp, baseEI) {
  const a = Math.min(Math.floor(ss), 5)
  const b = Math.min(a + 1, 5)
  const f = ss - a

  const tA = secTarget(a)
  const tB = secTarget(b)

  const newWf = f < 0.5 ? tA.wf : tB.wf
  if (mat.wireframe !== newWf) mat.wireframe = newWf

  mat.opacity           = lerp(tA.mOp * baseOp, tB.mOp * baseOp, f)
  mat.emissiveIntensity = lerp(tA.ei  * baseEI, tB.ei  * baseEI, f)
  mat.metalness         = lerp(tA.metal, tB.metal, f)
  mat.roughness         = lerp(tA.rough, tB.rough, f)
  mat.clearcoat         = lerp(tA.cc,   tB.cc,   f)
  mat.iridescence       = lerp(tA.irid, tB.irid, f)

  pmat.opacity = lerp(tA.pOp * baseOp, tB.pOp * baseOp, f)
}

// Dense point cloud from a geometry's own vertex positions (granular look)
function makePoints(GeoClass, args) {
  const src = new GeoClass(...args)
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', src.attributes.position.clone())
  src.dispose()
  return geo
}

// ─── Torus  (purple) ──────────────────────────────────────────────────────────
function TorusShape({ scrollRef }) {
  const meshRef   = useRef()
  const pointsRef = useRef()
  const s  = useRef(0)
  const ss = useRef(0)
  const pGeo = useMemo(() => makePoints(THREE.TorusGeometry, [1.3, 0.28, 18, 70]), [])

  useFrame(() => {
    s.current  = lerp(s.current,  scrollRef.current.progress,        0.04)
    ss.current = lerp(ss.current, scrollRef.current.section ?? 0,    0.05)
    const p = s.current

    const bx = pt(p, [-3.5, -5.0, -5.5, -4.5, -6.5])
    const by = pt(p, [ 1.2,  0.5, -0.5,  1.5, -1.5])
    const bz = pt(p, [-3.0, -4.0, -3.5, -4.5, -5.5])
    meshRef.current.position.set(bx, by, bz)
    meshRef.current.rotation.x = pt(p, [0, 0.6, 1.2, 2.0, 2.8])
    meshRef.current.rotation.y = pt(p, [0, 1.2, 2.8, 4.2, 6.0])
    pointsRef.current.position.copy(meshRef.current.position)
    pointsRef.current.rotation.copy(meshRef.current.rotation)

    applyMaterial(meshRef.current.material, pointsRef.current.material, ss.current, 0.65, 2.0)
  })

  return (
    <>
      <mesh ref={meshRef} position={[-3.5, 1.2, -3]}>
        <torusGeometry args={[1.3, 0.28, 18, 70]} />
        <meshPhysicalMaterial
          color="#BF00FF" emissive="#BF00FF" emissiveIntensity={2.0}
          metalness={0} roughness={1} clearcoat={0} iridescence={0}
          wireframe transparent opacity={0.65} toneMapped={false}
        />
      </mesh>
      <points ref={pointsRef} geometry={pGeo} position={[-3.5, 1.2, -3]}>
        <pointsMaterial color="#BF00FF" size={0.03} transparent opacity={0} sizeAttenuation />
      </points>
    </>
  )
}

// ─── Icosahedron  (cyan) ──────────────────────────────────────────────────────
function IcosahedronShape({ scrollRef }) {
  const meshRef   = useRef()
  const pointsRef = useRef()
  const s  = useRef(0)
  const ss = useRef(0)
  // detail=2 gives ~162 verts — visible dots in granular mode
  const pGeo = useMemo(() => makePoints(THREE.IcosahedronGeometry, [1.5, 2]), [])

  useFrame(() => {
    s.current  = lerp(s.current,  scrollRef.current.progress,        0.035)
    ss.current = lerp(ss.current, scrollRef.current.section ?? 0,    0.05)
    const p = s.current

    const bx = pt(p, [ 3.8,  5.5,  6.0,  5.0,  7.0])
    const by = pt(p, [-1.2,  0.5,  1.5, -0.5, -2.0])
    const bz = pt(p, [-4.0, -3.5, -5.0, -4.0, -6.0])
    meshRef.current.position.set(bx, by, bz)
    meshRef.current.rotation.x = pt(p, [0, 1.0, 2.5, 3.8, 5.5])
    meshRef.current.rotation.z = pt(p, [0, 0.5, 1.2, 2.0, 2.8])
    pointsRef.current.position.copy(meshRef.current.position)
    pointsRef.current.rotation.copy(meshRef.current.rotation)

    applyMaterial(meshRef.current.material, pointsRef.current.material, ss.current, 0.58, 1.8)
  })

  return (
    <>
      <mesh ref={meshRef} position={[3.8, -1.2, -4]}>
        <icosahedronGeometry args={[1.5, 0]} />
        <meshPhysicalMaterial
          color="#00FFFF" emissive="#00FFFF" emissiveIntensity={1.8}
          metalness={0} roughness={1} clearcoat={0} iridescence={0}
          wireframe transparent opacity={0.58} toneMapped={false}
        />
      </mesh>
      <points ref={pointsRef} geometry={pGeo} position={[3.8, -1.2, -4]}>
        <pointsMaterial color="#00FFFF" size={0.06} transparent opacity={0} sizeAttenuation />
      </points>
    </>
  )
}

// ─── Octahedron  (pink) ───────────────────────────────────────────────────────
function OctahedronShape({ scrollRef }) {
  const meshRef   = useRef()
  const pointsRef = useRef()
  const s  = useRef(0)
  const ss = useRef(0)
  // detail=3 → 258 verts
  const pGeo = useMemo(() => makePoints(THREE.OctahedronGeometry, [0.75, 3]), [])

  useFrame(() => {
    s.current  = lerp(s.current,  scrollRef.current.progress,        0.05)
    ss.current = lerp(ss.current, scrollRef.current.section ?? 0,    0.05)
    const p = s.current

    meshRef.current.position.x = pt(p, [ 0.5,  4.0,  5.5,  4.5,  6.0])
    meshRef.current.position.y = pt(p, [ 2.0,  1.0,  0.5,  2.0, -1.0])
    meshRef.current.position.z = pt(p, [-5.0, -3.5, -5.0, -4.0, -6.0])
    meshRef.current.rotation.x = pt(p, [0, 0.9, 2.1, 3.5, 5.0])
    meshRef.current.rotation.y = pt(p, [0, 1.5, 2.5, 4.0, 5.5])
    pointsRef.current.position.copy(meshRef.current.position)
    pointsRef.current.rotation.copy(meshRef.current.rotation)

    applyMaterial(meshRef.current.material, pointsRef.current.material, ss.current, 0.70, 2.2)
  })

  return (
    <>
      <mesh ref={meshRef} position={[0.5, 2.0, -5]}>
        <octahedronGeometry args={[0.75, 0]} />
        <meshPhysicalMaterial
          color="#FF00A8" emissive="#FF00A8" emissiveIntensity={2.2}
          metalness={0} roughness={1} clearcoat={0} iridescence={0}
          wireframe transparent opacity={0.70} toneMapped={false}
        />
      </mesh>
      <points ref={pointsRef} geometry={pGeo} position={[0.5, 2.0, -5]}>
        <pointsMaterial color="#FF00A8" size={0.05} transparent opacity={0} sizeAttenuation />
      </points>
    </>
  )
}

// ─── Dodecahedron  (green) ────────────────────────────────────────────────────
function DodecahedronShape({ scrollRef }) {
  const meshRef   = useRef()
  const pointsRef = useRef()
  const s  = useRef(0)
  const ss = useRef(0)
  // detail=2 for a denser dot cloud
  const pGeo = useMemo(() => makePoints(THREE.DodecahedronGeometry, [0.9, 2]), [])

  useFrame(() => {
    s.current  = lerp(s.current,  scrollRef.current.progress,        0.03)
    ss.current = lerp(ss.current, scrollRef.current.section ?? 0,    0.05)
    const p = s.current

    meshRef.current.position.x = pt(p, [-1.5, -4.5, -6.0, -5.0, -7.0])
    meshRef.current.position.y = pt(p, [-2.5, -1.0,  0.5, -1.5, -3.0])
    meshRef.current.position.z = pt(p, [-6.0, -4.5, -5.0, -4.5, -6.5])
    meshRef.current.rotation.y = pt(p, [0, 1.0, 2.2, 3.8, 5.2])
    meshRef.current.rotation.z = pt(p, [0, 0.4, 0.9, 1.6, 2.4])
    pointsRef.current.position.copy(meshRef.current.position)
    pointsRef.current.rotation.copy(meshRef.current.rotation)

    applyMaterial(meshRef.current.material, pointsRef.current.material, ss.current, 0.50, 1.6)
  })

  return (
    <>
      <mesh ref={meshRef} position={[-1.5, -2.5, -6]}>
        <dodecahedronGeometry args={[0.9, 0]} />
        <meshPhysicalMaterial
          color="#00FF88" emissive="#00FF88" emissiveIntensity={1.6}
          metalness={0} roughness={1} clearcoat={0} iridescence={0}
          wireframe transparent opacity={0.50} toneMapped={false}
        />
      </mesh>
      <points ref={pointsRef} geometry={pGeo} position={[-1.5, -2.5, -6]}>
        <pointsMaterial color="#00FF88" size={0.06} transparent opacity={0} sizeAttenuation />
      </points>
    </>
  )
}

export default function FloatingShapes({ scrollRef }) {
  return (
    <>
      <TorusShape        scrollRef={scrollRef} />
      <IcosahedronShape  scrollRef={scrollRef} />
      <OctahedronShape   scrollRef={scrollRef} />
      <DodecahedronShape scrollRef={scrollRef} />
    </>
  )
}
