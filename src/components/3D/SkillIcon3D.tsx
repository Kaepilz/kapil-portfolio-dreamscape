import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Box, Sphere } from '@react-three/drei';
import { Group, Mesh } from 'three';
import { motion } from 'framer-motion';

interface SkillIcon3DProps {
  skill: {
    name: string;
    level: number;
    color: string;
    icon: string;
  };
  index: number;
}

const FloatingIcon = ({ skill, index }: { skill: any; index: number }) => {
  const meshRef = useRef<Group>(null);
  const boxRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime + index) * 0.2;
    }
    if (boxRef.current) {
      boxRef.current.rotation.x += 0.005;
      boxRef.current.rotation.z += 0.005;
    }
  });

  return (
    <group ref={meshRef}>
      <Box ref={boxRef} args={[1, 1, 1]} position={[0, 0, 0]}>
        <meshStandardMaterial color={skill.color} transparent opacity={0.8} />
      </Box>
      <Text
        position={[0, 0, 0.6]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
      >
        {skill.icon}
      </Text>
    </group>
  );
};

export const SkillIcon3D: React.FC<SkillIcon3DProps> = ({ skill, index }) => {
  return (
    <motion.div
      className="h-32 w-32"
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100 
      }}
      whileHover={{ scale: 1.1 }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ borderRadius: '12px' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />
        <FloatingIcon skill={skill} index={index} />
      </Canvas>
      <p className="text-center mt-2 text-sm font-medium">{skill.name}</p>
      <div className="w-full bg-muted rounded-full h-2 mt-1">
        <motion.div
          className="h-2 rounded-full"
          style={{ backgroundColor: skill.color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
        />
      </div>
    </motion.div>
  );
};