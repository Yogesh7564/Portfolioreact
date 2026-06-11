import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

interface FloatingOrbProps {
  position?: [number, number, number]
  color?: string
  speed?: number
  distort?: number
  size?: number
}

export default function FloatingOrb({
  position = [0, 0, 0],
  color = '#00F5FF',
  speed = 1,
  distort = 0.4,
  size = 1,
}: FloatingOrbProps) {
  const mesh = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (!mesh.current) return
    mesh.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.3
    mesh.current.rotation.z = state.clock.elapsedTime * 0.2 * speed
  })

  return (
    <Sphere ref={mesh} args={[size, 64, 64]} position={position}>
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={distort}
        speed={2}
        roughness={0}
        metalness={0.1}
        transparent
        opacity={0.15}
        wireframe={false}
      />
    </Sphere>
  )
}
