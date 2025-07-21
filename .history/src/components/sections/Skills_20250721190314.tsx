import { motion } from 'framer-motion';
import { useState, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { SvgIcon } from './icons/SvgIcon';

// Enhanced skill data with actual logos and better organization
const technicalSkills = [
  { 
    name: "HTML5", 
    level: 95, 
    color: "#E34F26",
    logo: "M0 16 L 20 0 L 236 0 L 256 16 L 256 240 L 236 256 L 20 256 L 0 240 Z M 32 32 L 32 224 L 224 224 L 224 32 Z M 128 48 L 128 80 L 160 80 L 160 112 L 128 112 L 128 144 L 192 144 L 192 112 L 160 112 L 160 80 L 192 80 L 192 48 Z M 48 48 L 48 144 L 80 144 L 80 80 L 112 80 L 112 48 Z",
    description: "Semantic markup & accessibility"
  },
  { 
    name: "CSS3", 
    level: 90, 
    color: "#1572B6",
    logo: "M0 16 L 20 0 L 236 0 L 256 16 L 256 240 L 236 256 L 20 256 L 0 240 Z M 32 32 L 32 224 L 224 224 L 224 32 Z M 128 48 L 128 80 L 160 80 L 160 112 L 128 112 L 128 144 L 192 144 L 192 112 L 160 112 L 160 80 L 192 80 L 192 48 Z M 48 48 L 48 144 L 80 144 L 80 80 L 112 80 L 112 48 Z",
    description: "Advanced styling & animations"
  },
  { 
    name: "JavaScript", 
    level: 88, 
    color: "#F7DF1E",
    logo: "M0 0h256v256H0z",
    description: "ES6+ & modern frameworks"
  },
  { 
    name: "TypeScript", 
    level: 85, 
    color: "#3178C6",
    logo: "M0 0h256v256H0z",
    description: "Type-safe development"
  },
  { 
    name: "React", 
    level: 90, 
    color: "#61DAFB",
    logo: "M128 256 A 128 128 0 1 0 128 0 A 128 128 0 1 0 128 256 Z M 128 32 A 96 96 0 1 1 128 224 A 96 96 0 1 1 128 32 Z M 128 128 m -32 0 a 32 32 0 1 0 64 0 a 32 32 0 1 0 -64 0",
    description: "Component-based architecture"
  },
  { 
    name: "Node.js", 
    level: 80, 
    color: "#339933",
    logo: "M128 0 L 248 72 L 248 216 L 128 288 L 8 216 L 8 72 Z",
    description: "Server-side JavaScript"
  },
  { 
    name: "Tailwind CSS", 
    level: 92, 
    color: "#06B6D4",
    logo: "M128 64c-35.3 0-64 28.7-64 64s28.7 64 64 64c35.3 0 64-28.7 64-64S163.3 64 128 64zm0 96c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z M64 192c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z",
    description: "Utility-first CSS framework"
  },
  { 
    name: "Firebase", 
    level: 75, 
    color: "#FFCA28",
    logo: "M32 96l96-96 96 96-32 32-64-64-64 64z m192 64l-96 96-96-96 32-32 64 64 64-64z",
    description: "Backend as a Service"
  },
];

const designSkills = [
  { 
    name: "UI/UX Design", 
    level: 85, 
    color: "#FF6B6B",
    logo: "M0 0h256v256H0z", // Placeholder, will be replaced
    description: "User-centered design"
  },
  { 
    name: "Figma", 
    level: 88, 
    color: "#F24E1E",
    logo: "M0 0h256v256H0z", // Placeholder, will be replaced
    description: "Design & prototyping"
  },
  { 
    name: "Adobe XD", 
    level: 75, 
    color: "#FF61F6",
    logo: "M0 0h256v256H0z", // Placeholder, will be replaced
    description: "Experience design"
  },
  { 
    name: "Photoshop", 
    level: 70, 
    color: "#31A8FF",
    logo: "M0 0h256v256H0z", // Placeholder, will be replaced
    description: "Image editing & manipulation"
  },
];

const SkillCard = ({ skill, index }: { skill: any; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Skill card */}
      <motion.div
        className="relative p-6 rounded-xl bg-card border border-border shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
        style={{
          background: isHovered 
            ? `linear-gradient(135deg, ${skill.color}15, ${skill.color}05)` 
            : undefined
        }}
      >
        {/* Background glow effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${skill.color}20, transparent 70%)`
          }}
        />
        
        {/* Skill logo and name */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-16 h-16">
              <Canvas>
                <Suspense fallback={null}>
                  <ambientLight intensity={0.5} />
                  <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                  <pointLight position={[-10, -10, -10]} />
                  <SvgIcon svgPath={skill.logo} color={skill.color} />
                  <OrbitControls enableZoom={false} enablePan={false} />
                </Suspense>
              </Canvas>
            </div>
            <h3 className="font-semibold text-lg">{skill.name}</h3>
          </div>
          
          <p className="text-sm text-muted-foreground mb-4">{skill.description}</p>
          
          {/* Skill level bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Proficiency</span>
              <span className="font-medium">{skill.level}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full relative"
                style={{ backgroundColor: skill.color }}
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
              >
                {/* Animated shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Corner decoration */}
        <motion.div
          className="absolute top-0 right-0 w-20 h-20 opacity-10"
          style={{ 
            background: `linear-gradient(135deg, ${skill.color}, transparent)`,
            clipPath: 'polygon(100% 0%, 0% 0%, 100% 100%)'
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export const Skills = () => {
  return (
    <section id="skills" className="section-padding">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Skills & Expertise
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            A comprehensive toolkit for creating exceptional digital experiences
          </motion.p>
        </motion.div>

        {/* Technical Skills */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h3 
            className="text-2xl font-bold mb-8 flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-2xl">💻</span>
            Technical Skills
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technicalSkills.map((skill, index) => (
              <SkillCard key={skill.name} skill={skill} index={index} />
            ))}
          </div>
        </motion.div>

        {/* Design Skills */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h3 
            className="text-2xl font-bold mb-8 flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-2xl">🎨</span>
            Design Skills
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {designSkills.map((skill, index) => (
              <SkillCard key={skill.name} skill={skill} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};