import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface SvgLogoProps {
  src: string;
  color: string;
}

export function SvgLogo({ src, color }: SvgLogoProps) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <Float speed={4} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={groupRef}>
        <mesh>
          <planeGeometry args={[2, 2]} />
          <meshBasicMaterial 
            color={color} 
            transparent
            opacity={0.8}
          />
        </mesh>
        {/* Simple icon representation */}
        <mesh position={[0, 0, 0.01]}>
          <boxGeometry args={[0.5, 0.5, 0.1]} />
          <meshBasicMaterial color={color} />
        </mesh>
      </group>
    </Float>
  );
}