import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function HtmlIcon(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials } = useGLTF('/models/html.glb');

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.HTML as THREE.Mesh).geometry}
        material={materials.html_color}
        position={[0, 0, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={1}
      />
    </group>
  );
}

useGLTF.preload('/models/html.glb'); 