'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Plane, Float, Environment, Stars } from '@react-three/drei';
import * as THREE from 'three';

function RoomModel({ color = '#C9A84C' }: { color?: string }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.4) * 0.3;
    }
  });

  return (
    <Float speed={1.2} floatIntensity={0.5}>
      <group ref={groupRef}>
        {/* Floor */}
        <Plane args={[4, 4]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]}>
          <meshStandardMaterial color="#1A1A2E" metalness={0.5} roughness={0.5} />
        </Plane>
        {/* Back wall */}
        <Plane args={[4, 2.5]} position={[0, 0.05, -2]}>
          <meshStandardMaterial color="#0A1A0D" />
        </Plane>
        {/* Left wall */}
        <Plane args={[4, 2.5]} rotation={[0, Math.PI / 2, 0]} position={[-2, 0.05, 0]}>
          <meshStandardMaterial color="#0F0F1A" />
        </Plane>
        {/* Table */}
        <Box args={[2, 0.08, 1]} position={[0, -0.5, 0]}>
          <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
        </Box>
        {/* Table legs */}
        {[[-0.85, -0.4], [0.85, -0.4], [-0.85, 0.4], [0.85, 0.4]].map(([x, z], i) => (
          <Box key={i} args={[0.06, 0.7, 0.06]} position={[x, -0.85, z]}>
            <meshStandardMaterial color="#8B6914" metalness={0.9} roughness={0.1} />
          </Box>
        ))}
        {/* Chair shapes */}
        {[-1.4, 1.4].map((x, i) => (
          <group key={i} position={[x, -0.7, 0]}>
            <Box args={[0.6, 0.08, 0.6]}>
              <meshStandardMaterial color="#0F2213" roughness={0.6} />
            </Box>
            <Box args={[0.6, 0.6, 0.08]} position={[0, 0.35, -0.26]}>
              <meshStandardMaterial color="#0F2213" roughness={0.6} />
            </Box>
          </group>
        ))}
        {/* Candle / centerpiece glow */}
        <pointLight position={[0, 0, 0]} intensity={1.5} color={color} distance={3} />
        <Box args={[0.05, 0.2, 0.05]} position={[0, -0.3, 0]}>
          <meshStandardMaterial color="#ffffff" emissive="#ffddaa" emissiveIntensity={2} />
        </Box>
      </group>
    </Float>
  );
}

export default function RoomCanvas({ color }: { color?: string }) {
  return (
    <Canvas camera={{ position: [3, 2, 4], fov: 40 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.15} />
      <pointLight position={[4, 4, 4]} intensity={1.5} color="#C9A84C" />
      <pointLight position={[-4, 2, 2]} intensity={0.5} color="#ffffff" />
      <Environment preset="city" />
      <RoomModel color={color} />
    </Canvas>
  );
}
