import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { Suspense } from 'react'
import ParticleField from './ParticleField'
import FloatingOrb from './FloatingOrb'

export default function HeroCanvas() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.2} />
          <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
          <ParticleField count={1500} />
          <FloatingOrb position={[-4, 0, -3]} color="#00F5FF" speed={0.8} size={2.5} distort={0.3} />
          <FloatingOrb position={[4, 1, -4]} color="#7C3AED" speed={1.2} size={3} distort={0.5} />
          <FloatingOrb position={[0, -2, -2]} color="#38BDF8" speed={0.6} size={1.5} distort={0.2} />
        </Suspense>
      </Canvas>
    </div>
  )
}
