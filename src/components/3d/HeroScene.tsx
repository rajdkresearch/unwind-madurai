'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Stars, Environment } from '@react-three/drei';
import * as THREE from 'three';

function GoldenOrb() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.2;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.15;
    }
  });
  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
      <Sphere ref={meshRef} args={[1.8, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#C9A84C"
          attach="material"
          distort={0.35}
          speed={2}
          roughness={0.1}
          metalness={0.9}
          envMapIntensity={1.5}
        />
      </Sphere>
    </Float>
  );
}

function FloatingRings() {
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ring1.current) { ring1.current.rotation.x = t * 0.4; ring1.current.rotation.z = t * 0.2; }
    if (ring2.current) { ring2.current.rotation.y = t * 0.3; ring2.current.rotation.x = t * -0.15; }
  });
  return (
    <>
      <mesh ref={ring1} position={[0, 0, 0]}>
        <torusGeometry args={[2.6, 0.03, 16, 100]} />
        <meshStandardMaterial color="#C9A84C" metalness={1} roughness={0.1} opacity={0.5} transparent />
      </mesh>
      <mesh ref={ring2} position={[0, 0, 0]}>
        <torusGeometry args={[3.2, 0.02, 16, 100]} />
        <meshStandardMaterial color="#E8D5A3" metalness={1} roughness={0.2} opacity={0.3} transparent />
      </mesh>
    </>
  );
}

function ParticleField() {
  const count = 200;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;
    }
    return arr;
  }, []);

  const geoRef = useRef<THREE.BufferGeometry>(null);
  useFrame(({ clock }) => {
    if (geoRef.current) {
      geoRef.current.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points>
      <bufferGeometry ref={geoRef}>
        <bufferAttribute args={[positions, 3]} attach="attributes-position" />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#C9A84C" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={2} color="#C9A84C" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#4A3580" />
      <pointLight position={[0, 5, 0]} intensity={1} color="#ffffff" />
      <Environment preset="city" />
      <Stars radius={80} depth={50} count={3000} factor={3} saturation={0} fade speed={0.5} />
      <GoldenOrb />
      <FloatingRings />
      <ParticleField />
    </Canvas>
  );
}
