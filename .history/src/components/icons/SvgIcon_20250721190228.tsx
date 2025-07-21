import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface SvgIconProps {
  svgPath: string;
  color: string;
}

export function SvgIcon({ svgPath, color }: SvgIconProps) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  const shape = new THREE.Shape();
  const path = new THREE.Path(svgPath);
  shape.add(path);

  const extrudeSettings = {
    steps: 2,
    depth: 1,
    bevelEnabled: true,
    bevelThickness: 0.2,
    bevelSize: 0.2,
    bevelOffset: 0,
    bevelSegments: 5,
  };

  return (
    <Float speed={4} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        <extrudeGeometry args={[shape, extrudeSettings]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </Float>
  );
} 