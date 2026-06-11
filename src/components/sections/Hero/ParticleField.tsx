import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ParticleFieldProps {
  count?: number
}

export default function ParticleField({ count = 2000 }: ParticleFieldProps) {
  const mesh = useRef<THREE.Points>(null!)
  const light = useRef<THREE.PointLight>(null!)

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const scales = new Float32Array(count)

    const color1 = new THREE.Color('#00F5FF')
    const color2 = new THREE.Color('#7C3AED')
    const color3 = new THREE.Color('#38BDF8')

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      // Sphere distribution
      const radius = Math.random() * 15 + 2
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.5
      positions[i3 + 2] = radius * Math.cos(phi) - 5

      // Random color from palette
      const colorChoice = Math.random()
      const chosenColor = colorChoice < 0.4 ? color1 : colorChoice < 0.7 ? color2 : color3
      colors[i3] = chosenColor.r
      colors[i3 + 1] = chosenColor.g
      colors[i3 + 2] = chosenColor.b

      scales[i] = Math.random()
    }

    return { positions, colors, scales }
  }, [count])

  useFrame((state) => {
    if (!mesh.current) return
    mesh.current.rotation.y = state.clock.elapsedTime * 0.03
    mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1

    if (light.current) {
      light.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 5
      light.current.position.y = Math.cos(state.clock.elapsedTime * 0.3) * 3
    }
  })

  return (
    <>
      <pointLight ref={light} color="#00F5FF" intensity={2} distance={15} />
      <points ref={mesh}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.positions.length / 3}
            array={particles.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particles.colors.length / 3}
            array={particles.colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    </>
  )
}
