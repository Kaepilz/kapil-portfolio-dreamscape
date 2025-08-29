import { motion } from 'framer-motion';
import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { SvgLogo } from '../icons/SvgLogo';

// Enhanced skill data with actual logos and updated percentages
const technicalSkills = [
  { 
    name: "HTML5", 
    level: 85, 
    color: "#E34F26",
    logo: "/icons/html5.svg",
    description: "Semantic markup & accessibility"
  },
  { 
    name: "CSS3", 
    level: 85, 
    color: "#1572B6",
    logo: "/icons/css3.svg",
    description: "Advanced styling & animations"
  },
  { 
    name: "JavaScript", 
    level: 85, 
    color: "#F7DF1E",
    logo: "/icons/javascript.svg",
    description: "ES6+ & modern frameworks"
  },
  { 
    name: "TypeScript", 
    level: 50, 
    color: "#3178C6",
    logo: "/icons/typescript.svg",
    description: "Type-safe development"
  },
  { 
    name: "React", 
    level: 50, 
    color: "#61DAFB",
    logo: "/icons/react.svg",
    description: "Component-based architecture"
  },
  { 
    name: "Node.js", 
    level: 50, 
    color: "#339933",
    logo: "/icons/nodejs.svg",
    description: "Server-side JavaScript"
  },
  { 
    name: "Tailwind CSS", 
    level: 50, 
    color: "#06B6D4",
    logo: "/icons/tailwind.svg",
    description: "Utility-first CSS framework"
  },
  { 
    name: "Firebase", 
    level: 50, 
    color: "#FFCA28",
    logo: "/icons/firebase.svg",
    description: "Backend as a Service"
  },
];

const designSkills = [
  { 
    name: "UI/UX Design", 
    level: 90, 
    color: "#FF6B6B",
    logo: "/icons/uiux.svg",
    description: "User-centered design"
  },
  { 
    name: "Figma", 
    level: 88, 
    color: "#F24E1E",
    logo: "/icons/figma.svg",
    description: "Design & prototyping"
  },
  { 
    name: "Canva", 
    level: 75, 
    color: "#00C4CC",
    logo: "/icons/canva.svg",
    description: "Graphic design & templates"
  },
  { 
    name: "Photoshop", 
    level: 70, 
    color: "#31A8FF",
    logo: "/icons/photoshop.svg",
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
            <motion.div 
              className="w-16 h-16 relative group-hover:scale-110 transition-transform duration-300"
              whileHover={{ 
                rotateY: 360,
                scale: 1.1,
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <motion.img 
                src={skill.logo} 
                alt={skill.name}
                className="w-full h-full object-contain filter drop-shadow-lg group-hover:drop-shadow-xl transition-all duration-300"
                style={{ filter: `drop-shadow(0 4px 8px ${skill.color}40)` }}
                whileHover={{
                  rotate: 360,
                }}
                transition={{ 
                  duration: 0.8,
                  ease: "easeInOut"
                }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `<div class="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center text-primary font-bold text-sm">${skill.name.charAt(0)}</div>`;
                  }
                }}
              />
            </motion.div>
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