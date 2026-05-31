'use client'

import { Suspense, useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

function Kart({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const { scene } = useGLTF('/kart_final.glb')
  const ref = useRef<THREE.Group>(null)
  const targetRotX = useRef(0)
  const targetRotY = useRef(0)

  useFrame(() => {
    if (!ref.current) return
    // Auto-rotate on Y
    ref.current.rotation.y += 0.003
    // Mouse tilt: max 5 degrees (0.0873 rad) on each axis
    targetRotX.current = -mouseY * 0.0873
    targetRotY.current = mouseX * 0.0873
    ref.current.rotation.x += (targetRotX.current - ref.current.rotation.x) * 0.05
    // additive offset on top of auto-rotate
    const baseRotY = ref.current.rotation.y
    ref.current.rotation.y = baseRotY + (targetRotY.current - targetRotY.current) * 0.05
  })

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={0.012}
      position={[1.2, -0.6, 0]}
    />
  )
}

function SceneContent({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  return (
    <>
      <color attach="background" args={['#0a0a0f']} />
      <ambientLight intensity={0.2} />
      {/* Bright spotlight from above-front */}
      <spotLight
        position={[0, 8, 4]}
        intensity={6}
        angle={0.4}
        penumbra={0.5}
        color="#ffffff"
        castShadow
      />
      {/* Red fill from below */}
      <pointLight position={[1, -2, 2]} intensity={4} color="#e63946" />
      {/* Subtle rim from behind */}
      <pointLight position={[0, 3, -5]} intensity={2} color="#330008" />

      <Suspense fallback={null}>
        <Kart mouseX={mouseX} mouseY={mouseY} />
        <ContactShadows
          position={[1.2, -0.62, 0]}
          opacity={0.6}
          scale={8}
          blur={2.5}
          far={3}
          color="#000000"
        />
      </Suspense>
    </>
  )
}

export default function KartCanvas() {
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  const [webGLSupported, setWebGLSupported] = useState(true)

  useEffect(() => {
    // Check WebGL support
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      if (!gl) setWebGLSupported(false)
    } catch {
      setWebGLSupported(false)
    }

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize -1 to 1
      setMouseX((e.clientX / window.innerWidth) * 2 - 1)
      setMouseY((e.clientY / window.innerHeight) * 2 - 1)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  if (!webGLSupported) {
    return (
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/hero.jpg)' }}
      />
    )
  }

  return (
    <Canvas
      camera={{ position: [0, 1.5, 5], fov: 42 }}
      gl={{ antialias: true, alpha: false }}
      dpr={[1, 2]}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    >
      <SceneContent mouseX={mouseX} mouseY={mouseY} />
    </Canvas>
  )
}

useGLTF.preload('/kart_final.glb')
