import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';

interface SkillTextProps {
  text: string;
  color: string;
}

export function SkillText({ text, color }: SkillTextProps) {
  const textRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (textRef.current) {
      textRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <Float speed={4} rotationIntensity={1} floatIntensity={1.5}>
      <Text
        ref={textRef}
        fontSize={0.8}
        color={color}
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
    </Float>
  );
} 