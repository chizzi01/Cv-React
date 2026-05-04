import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const lerp = (a, b, t) => a + (b - a) * t

// Frame-rate independent exponential smoothing factor
const smooth = (delta, speed) => 1 - Math.exp(-delta * speed)

function pt(p, vals) {
  const n = vals.length - 1
  const i = Math.min(Math.floor(p * n), n - 1)
  const t = p * n - i
  return lerp(vals[i], vals[i + 1], t)
}

// ─── Scatter envelope ─────────────────────────────────────────────────────────
function getScatterT(ss) {
  if (ss < 2.5) return 0
  if (ss < 3.0) return (ss - 2.5) * 2
  if (ss < 3.5) return 1
  if (ss < 4.2) return (4.2 - ss) / 0.7
  return 0
}

// ─── Section material targets ─────────────────────────────────────────────────
function secTarget(sec) {
  switch (sec) {
    case 0: return { wf: true,  mOp: 1.0, pOp: 0.0, ei: 2.0, metal: 0.00, rough: 1.00, cc: 0.00, ccRough: 1.0, irid: 0.00, envI: 0.0 }
    case 1: return { wf: false, mOp: 1.0, pOp: 0.0, ei: 0.5, metal: 1.00, rough: 0.08, cc: 1.00, ccRough: 0.0, irid: 0.25, envI: 3.5 }
    case 2: return { wf: false, mOp: 0.0, pOp: 1.0, ei: 0.0, metal: 0.05, rough: 0.90, cc: 0.00, ccRough: 1.0, irid: 0.00, envI: 0.0 }
    case 3: return { wf: false, mOp: 1.0, pOp: 0.0, ei: 4.0, metal: 0.50, rough: 0.30, cc: 1.00, ccRough: 0.2, irid: 0.00, envI: 1.5 }
    case 4: return { wf: false, mOp: 0.6, pOp: 0.0, ei: 2.5, metal: 0.10, rough: 0.00, cc: 1.00, ccRough: 0.0, irid: 1.00, envI: 2.0 }
    default:return { wf: true,  mOp: 0.0, pOp: 0.0, ei: 0.0, metal: 0.00, rough: 1.00, cc: 0.00, ccRough: 1.0, irid: 0.00, envI: 0.0 }
  }
}

function applyMaterial(mat, pmat, ss, baseOp, baseEI) {
  const a = Math.min(Math.floor(ss), 5)
  const b = Math.min(a + 1, 5)
  const f = ss - a
  const tA = secTarget(a)
  const tB = secTarget(b)
  const newWf = f < 0.5 ? tA.wf : tB.wf
  if (mat.wireframe !== newWf) mat.wireframe = newWf
  mat.opacity              = lerp(tA.mOp * baseOp,  tB.mOp * baseOp,  f)
  mat.emissiveIntensity    = lerp(tA.ei  * baseEI,  tB.ei  * baseEI,  f)
  mat.metalness            = lerp(tA.metal,          tB.metal,          f)
  mat.roughness            = lerp(tA.rough,          tB.rough,          f)
  mat.clearcoat            = lerp(tA.cc,             tB.cc,             f)
  mat.clearcoatRoughness   = lerp(tA.ccRough,        tB.ccRough,        f)
  mat.iridescence          = lerp(tA.irid,           tB.irid,           f)
  mat.envMapIntensity      = lerp(tA.envI,           tB.envI,           f)
  pmat.opacity             = lerp(tA.pOp * baseOp,  tB.pOp * baseOp,  f)
}

// ─── Constellation builder ────────────────────────────────────────────────────
function makeConstellation(srcGeo, count, sx, sy, sz) {
  const srcPos = srcGeo.attributes.position.array
  const vCount = Math.floor(srcPos.length / 3)

  const base    = new Float32Array(count * 3)
  const scatter = new Float32Array(count * 3)
  const current = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    const vi = Math.floor(Math.random() * vCount) * 3
    base[i*3]   = srcPos[vi];     base[i*3+1] = srcPos[vi+1]; base[i*3+2] = srcPos[vi+2]
    scatter[i*3]   = (Math.random() - 0.5) * sx * 2
    scatter[i*3+1] = (Math.random() - 0.5) * sy * 2
    scatter[i*3+2] = (Math.random() - 0.5) * sz * 2
    current[i*3]   = base[i*3]; current[i*3+1] = base[i*3+1]; current[i*3+2] = base[i*3+2]
  }

  const THRESH_SQ = 2.6 * 2.6
  const pairs = []
  for (let i = 0; i < count - 1; i++) {
    for (let j = i + 1; j < count; j++) {
      const dx = scatter[i*3]   - scatter[j*3]
      const dy = scatter[i*3+1] - scatter[j*3+1]
      const dz = scatter[i*3+2] - scatter[j*3+2]
      if (dx*dx + dy*dy + dz*dz < THRESH_SQ) pairs.push(i, j)
    }
  }

  const lineCount = pairs.length >> 1
  const linePos   = new Float32Array(lineCount * 6)

  const pGeo = new THREE.BufferGeometry()
  pGeo.setAttribute('position', new THREE.BufferAttribute(current, 3))

  const lGeo = new THREE.BufferGeometry()
  lGeo.setAttribute('position', new THREE.BufferAttribute(linePos, 3))

  return { base, scatter, current, pairs, pGeo, lGeo }
}

function tickConstellation(constel, scatterT) {
  const { base, scatter, current, pairs, pGeo, lGeo } = constel
  const n = current.length / 3

  for (let i = 0; i < n; i++) {
    current[i*3]   = lerp(base[i*3],   scatter[i*3],   scatterT)
    current[i*3+1] = lerp(base[i*3+1], scatter[i*3+1], scatterT)
    current[i*3+2] = lerp(base[i*3+2], scatter[i*3+2], scatterT)
  }
  pGeo.attributes.position.needsUpdate = true

  const la = lGeo.attributes.position.array
  for (let k = 0; k < pairs.length; k += 2) {
    const ai = pairs[k], bi = pairs[k + 1]
    const off = k * 3
    la[off]   = current[ai*3];     la[off+1] = current[ai*3+1]; la[off+2] = current[ai*3+2]
    la[off+3] = current[bi*3];     la[off+4] = current[bi*3+1]; la[off+5] = current[bi*3+2]
  }
  lGeo.attributes.position.needsUpdate = true
}

// ─── Torus (green) ────────────────────────────────────────────────────────────
function TorusShape({ scrollRef }) {
  const groupRef  = useRef()
  const meshRef   = useRef()
  const gPtsRef   = useRef()
  const cPtsRef   = useRef()
  const cLinesRef = useRef()
  const s  = useRef(0)
  const ss = useRef(0)

  const { gGeo, constel } = useMemo(() => {
    const src    = new THREE.TorusGeometry(1.3, 0.28, 18, 70)
    const gGeo   = new THREE.BufferGeometry()
    gGeo.setAttribute('position', src.attributes.position.clone())
    const constel = makeConstellation(src, 100, 8, 5, 2)
    src.dispose()
    return { gGeo, constel }
  }, [])

  useFrame((state, delta) => {
    const elapsed = state.clock.getElapsedTime()
    s.current  = lerp(s.current,  scrollRef.current.progress,     smooth(delta, 2.4))
    ss.current = lerp(ss.current, scrollRef.current.section ?? 0, smooth(delta, 3.0))
    const p = s.current

    groupRef.current.position.set(
      pt(p, [-3.5, -5.0, -5.5, -4.5, -6.5]),
      pt(p, [ 1.2,  0.5, -0.5,  1.5, -1.5]),
      pt(p, [-3.0, -4.0, -3.5, -4.5, -5.5])
    )
    // Scroll-linked rotation + continuous self-rotation for organic motion
    meshRef.current.rotation.x = pt(p, [0, 0.6, 1.2, 2.0, 2.8]) + elapsed * 0.11
    meshRef.current.rotation.y = pt(p, [0, 1.2, 2.8, 4.2, 6.0]) + elapsed * 0.07

    // Subtle breathing scale pulse
    groupRef.current.scale.setScalar(1 + Math.sin(elapsed * 0.9) * 0.04)

    applyMaterial(meshRef.current.material, gPtsRef.current.material, ss.current, 0.65, 2.0)

    const scatterT = getScatterT(ss.current)
    meshRef.current.material.opacity *= (1 - scatterT)
    gPtsRef.current.material.opacity *= (1 - scatterT)

    if (scatterT > 0.001) tickConstellation(constel, scatterT)
    cPtsRef.current.material.opacity   = scatterT * 0.95
    cLinesRef.current.material.opacity = scatterT * 0.55
  })

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <torusGeometry args={[1.3, 0.28, 18, 70]} />
        <meshPhysicalMaterial color="#98FF58" emissive="#98FF58" emissiveIntensity={2.0}
          metalness={0} roughness={1} clearcoat={0} clearcoatRoughness={1} iridescence={0}
          envMapIntensity={0} wireframe transparent opacity={0.65} toneMapped={false} />
      </mesh>
      <points ref={gPtsRef} geometry={gGeo}>
        <pointsMaterial color="#98FF58" size={0.03} transparent opacity={0} sizeAttenuation />
      </points>
      <points ref={cPtsRef} geometry={constel.pGeo}>
        <pointsMaterial color="#98FF58" size={0.055} transparent opacity={0} sizeAttenuation toneMapped={false} />
      </points>
      <lineSegments ref={cLinesRef} geometry={constel.lGeo}>
        <lineBasicMaterial color="#98FF58" transparent opacity={0} toneMapped={false} />
      </lineSegments>
    </group>
  )
}

// ─── Icosahedron (cyan) ───────────────────────────────────────────────────────
function IcosahedronShape({ scrollRef }) {
  const groupRef  = useRef()
  const meshRef   = useRef()
  const gPtsRef   = useRef()
  const cPtsRef   = useRef()
  const cLinesRef = useRef()
  const s  = useRef(0)
  const ss = useRef(0)

  const { gGeo, constel } = useMemo(() => {
    const src    = new THREE.IcosahedronGeometry(1.5, 2)
    const gGeo   = new THREE.BufferGeometry()
    gGeo.setAttribute('position', src.attributes.position.clone())
    const constel = makeConstellation(src, 100, 8, 5, 2)
    src.dispose()
    return { gGeo, constel }
  }, [])

  useFrame((state, delta) => {
    const elapsed = state.clock.getElapsedTime()
    s.current  = lerp(s.current,  scrollRef.current.progress,     smooth(delta, 2.1))
    ss.current = lerp(ss.current, scrollRef.current.section ?? 0, smooth(delta, 3.0))
    const p = s.current

    groupRef.current.position.set(
      pt(p, [ 3.8,  5.5,  6.0,  5.0,  7.0]),
      pt(p, [-1.2,  0.5,  1.5, -0.5, -2.0]),
      pt(p, [-4.0, -3.5, -5.0, -4.0, -6.0])
    )
    meshRef.current.rotation.x = pt(p, [0, 1.0, 2.5, 3.8, 5.5]) + elapsed * 0.09
    meshRef.current.rotation.z = pt(p, [0, 0.5, 1.2, 2.0, 2.8]) + elapsed * 0.13

    groupRef.current.scale.setScalar(1 + Math.sin(elapsed * 1.1 + 1.2) * 0.04)

    applyMaterial(meshRef.current.material, gPtsRef.current.material, ss.current, 0.58, 1.8)

    const scatterT = getScatterT(ss.current)
    meshRef.current.material.opacity *= (1 - scatterT)
    gPtsRef.current.material.opacity *= (1 - scatterT)

    if (scatterT > 0.001) tickConstellation(constel, scatterT)
    cPtsRef.current.material.opacity   = scatterT * 0.95
    cLinesRef.current.material.opacity = scatterT * 0.55
  })

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.5, 0]} />
        <meshPhysicalMaterial color="#00FFFF" emissive="#00FFFF" emissiveIntensity={1.8}
          metalness={0} roughness={1} clearcoat={0} clearcoatRoughness={1} iridescence={0}
          envMapIntensity={0} wireframe transparent opacity={0.58} toneMapped={false} />
      </mesh>
      <points ref={gPtsRef} geometry={gGeo}>
        <pointsMaterial color="#00FFFF" size={0.06} transparent opacity={0} sizeAttenuation />
      </points>
      <points ref={cPtsRef} geometry={constel.pGeo}>
        <pointsMaterial color="#00FFFF" size={0.055} transparent opacity={0} sizeAttenuation toneMapped={false} />
      </points>
      <lineSegments ref={cLinesRef} geometry={constel.lGeo}>
        <lineBasicMaterial color="#00FFFF" transparent opacity={0} toneMapped={false} />
      </lineSegments>
    </group>
  )
}

// ─── Octahedron (pink) ────────────────────────────────────────────────────────
function OctahedronShape({ scrollRef }) {
  const groupRef  = useRef()
  const meshRef   = useRef()
  const gPtsRef   = useRef()
  const cPtsRef   = useRef()
  const cLinesRef = useRef()
  const s  = useRef(0)
  const ss = useRef(0)

  const { gGeo, constel } = useMemo(() => {
    const src    = new THREE.OctahedronGeometry(0.75, 3)
    const gGeo   = new THREE.BufferGeometry()
    gGeo.setAttribute('position', src.attributes.position.clone())
    const constel = makeConstellation(src, 100, 8, 5, 2)
    src.dispose()
    return { gGeo, constel }
  }, [])

  useFrame((state, delta) => {
    const elapsed = state.clock.getElapsedTime()
    s.current  = lerp(s.current,  scrollRef.current.progress,     smooth(delta, 3.0))
    ss.current = lerp(ss.current, scrollRef.current.section ?? 0, smooth(delta, 3.0))
    const p = s.current

    groupRef.current.position.set(
      pt(p, [ 0.5,  4.0,  5.5,  4.5,  6.0]),
      pt(p, [ 2.0,  1.0,  0.5,  2.0, -1.0]),
      pt(p, [-5.0, -3.5, -5.0, -4.0, -6.0])
    )
    meshRef.current.rotation.x = pt(p, [0, 0.9, 2.1, 3.5, 5.0]) + elapsed * 0.13
    meshRef.current.rotation.y = pt(p, [0, 1.5, 2.5, 4.0, 5.5]) + elapsed * 0.17

    groupRef.current.scale.setScalar(1 + Math.sin(elapsed * 1.3 + 2.4) * 0.04)

    applyMaterial(meshRef.current.material, gPtsRef.current.material, ss.current, 0.70, 2.2)

    const scatterT = getScatterT(ss.current)
    meshRef.current.material.opacity *= (1 - scatterT)
    gPtsRef.current.material.opacity *= (1 - scatterT)

    if (scatterT > 0.001) tickConstellation(constel, scatterT)
    cPtsRef.current.material.opacity   = scatterT * 0.95
    cLinesRef.current.material.opacity = scatterT * 0.55
  })

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <octahedronGeometry args={[0.75, 0]} />
        <meshPhysicalMaterial color="#FF00A8" emissive="#FF00A8" emissiveIntensity={2.2}
          metalness={0} roughness={1} clearcoat={0} clearcoatRoughness={1} iridescence={0}
          envMapIntensity={0} wireframe transparent opacity={0.70} toneMapped={false} />
      </mesh>
      <points ref={gPtsRef} geometry={gGeo}>
        <pointsMaterial color="#FF00A8" size={0.05} transparent opacity={0} sizeAttenuation />
      </points>
      <points ref={cPtsRef} geometry={constel.pGeo}>
        <pointsMaterial color="#FF00A8" size={0.055} transparent opacity={0} sizeAttenuation toneMapped={false} />
      </points>
      <lineSegments ref={cLinesRef} geometry={constel.lGeo}>
        <lineBasicMaterial color="#FF00A8" transparent opacity={0} toneMapped={false} />
      </lineSegments>
    </group>
  )
}

// ─── Dodecahedron (green) ─────────────────────────────────────────────────────
function DodecahedronShape({ scrollRef }) {
  const groupRef  = useRef()
  const meshRef   = useRef()
  const gPtsRef   = useRef()
  const cPtsRef   = useRef()
  const cLinesRef = useRef()
  const s  = useRef(0)
  const ss = useRef(0)

  const { gGeo, constel } = useMemo(() => {
    const src    = new THREE.DodecahedronGeometry(0.9, 2)
    const gGeo   = new THREE.BufferGeometry()
    gGeo.setAttribute('position', src.attributes.position.clone())
    const constel = makeConstellation(src, 100, 8, 5, 2)
    src.dispose()
    return { gGeo, constel }
  }, [])

  useFrame((state, delta) => {
    const elapsed = state.clock.getElapsedTime()
    s.current  = lerp(s.current,  scrollRef.current.progress,     smooth(delta, 1.8))
    ss.current = lerp(ss.current, scrollRef.current.section ?? 0, smooth(delta, 3.0))
    const p = s.current

    groupRef.current.position.set(
      pt(p, [-1.5, -4.5, -6.0, -5.0, -7.0]),
      pt(p, [-2.5, -1.0,  0.5, -1.5, -3.0]),
      pt(p, [-6.0, -4.5, -5.0, -4.5, -6.5])
    )
    meshRef.current.rotation.y = pt(p, [0, 1.0, 2.2, 3.8, 5.2]) + elapsed * 0.10
    meshRef.current.rotation.z = pt(p, [0, 0.4, 0.9, 1.6, 2.4]) + elapsed * 0.08

    groupRef.current.scale.setScalar(1 + Math.sin(elapsed * 0.8 + 0.6) * 0.04)

    applyMaterial(meshRef.current.material, gPtsRef.current.material, ss.current, 0.50, 1.6)

    const scatterT = getScatterT(ss.current)
    meshRef.current.material.opacity *= (1 - scatterT)
    gPtsRef.current.material.opacity *= (1 - scatterT)

    if (scatterT > 0.001) tickConstellation(constel, scatterT)
    cPtsRef.current.material.opacity   = scatterT * 0.95
    cLinesRef.current.material.opacity = scatterT * 0.55
  })

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <dodecahedronGeometry args={[0.9, 0]} />
        <meshPhysicalMaterial color="#00FF88" emissive="#00FF88" emissiveIntensity={1.6}
          metalness={0} roughness={1} clearcoat={0} clearcoatRoughness={1} iridescence={0}
          envMapIntensity={0} wireframe transparent opacity={0.50} toneMapped={false} />
      </mesh>
      <points ref={gPtsRef} geometry={gGeo}>
        <pointsMaterial color="#00FF88" size={0.06} transparent opacity={0} sizeAttenuation />
      </points>
      <points ref={cPtsRef} geometry={constel.pGeo}>
        <pointsMaterial color="#00FF88" size={0.055} transparent opacity={0} sizeAttenuation toneMapped={false} />
      </points>
      <lineSegments ref={cLinesRef} geometry={constel.lGeo}>
        <lineBasicMaterial color="#00FF88" transparent opacity={0} toneMapped={false} />
      </lineSegments>
    </group>
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
