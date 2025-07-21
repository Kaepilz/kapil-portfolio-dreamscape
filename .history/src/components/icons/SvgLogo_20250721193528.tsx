import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Svg } from '@react-three/drei';
import * as THREE from 'three';

interface SvgLogoProps {
  src: string;
  color: string;
}

export function SvgLogo({ src, color }: SvgLogoProps) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <Float speed={4} rotationIntensity={0.5} floatIntensity={1}>
      <Svg
        ref={meshRef}
        src={src}
        scale={0.1}
        fill={color}
      />
    </Float>
  );
} 