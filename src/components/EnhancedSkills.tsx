import React, { Suspense } from 'react';
import { motion, useInView } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { SvgLogo } from './icons/SvgLogo';
import { Player } from '@lottiefiles/react-lottie-player';

interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'design' | 'tools';
  icon: string;
  color: string;
  description: string;
}

const SKILLS: Skill[] = [
  { name: 'HTML5', level: 90, category: 'frontend', icon: '/icons/html5.svg', color: '#E34F26', description: 'Semantic markup and accessibility' },
  { name: 'CSS3', level: 85, category: 'frontend', icon: '/icons/css3.svg', color: '#1572B6', description: 'Modern styling and animations' },
  { name: 'JavaScript', level: 80, category: 'frontend', icon: '/icons/javascript.svg', color: '#F7DF1E', description: 'ES6+ and DOM manipulation' },
  { name: 'TypeScript', level: 75, category: 'frontend', icon: '/icons/typescript.svg', color: '#3178C6', description: 'Type-safe development' },
  { name: 'React', level: 85, category: 'frontend', icon: '/icons/react.svg', color: '#61DAFB', description: 'Component-based architecture' },
  { name: 'Node.js', level: 70, category: 'backend', icon: '/icons/nodejs.svg', color: '#339933', description: 'Server-side JavaScript' },
  { name: 'Firebase', level: 75, category: 'backend', icon: '/icons/firebase.svg', color: '#FFCA28', description: 'Cloud database and hosting' },
  { name: 'Tailwind CSS', level: 90, category: 'frontend', icon: '/icons/tailwind.svg', color: '#06B6D4', description: 'Utility-first CSS framework' },
  { name: 'Figma', level: 80, category: 'design', icon: '/icons/figma.svg', color: '#F24E1E', description: 'UI/UX design and prototyping' },
  { name: 'Adobe XD', level: 75, category: 'design', icon: '/icons/adobexd.svg', color: '#FF61F6', description: 'Design and wireframing' },
  { name: 'Photoshop', level: 70, category: 'design', icon: '/icons/photoshop.svg', color: '#31A8FF', description: 'Image editing and graphics' },
  { name: 'UI/UX Design', level: 85, category: 'design', icon: '/icons/uiux.svg', color: '#FF6B6B', description: 'User-centered design' }
];

const SkillCard: React.FC<{ skill: Skill; index: number }> = ({ skill, index }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="group relative overflow-hidden rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
      initial={{ opacity: 0, y: 50, rotateY: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.05, 
        rotateY: 5,
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)" 
      }}
    >
      {/* 3D Icon Container */}
      <div className="relative h-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
        
        {/* 3D Canvas for SVG Icons */}
        <Canvas className="w-full h-full">
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Suspense fallback={null}>
            <SvgLogo src={skill.icon} color={skill.color} />
          </Suspense>
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            autoRotate 
            autoRotateSpeed={2}
          />
        </Canvas>
        
        {/* Fallback 2D Icon */}
        <div className="absolute top-4 left-4 w-8 h-8 opacity-70">
          <img 
            src={skill.icon} 
            alt={skill.name} 
            className="w-full h-full object-contain filter brightness-0 invert"
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {skill.name}
          </h3>
          <div className="text-sm font-medium text-muted-foreground">
            {skill.level}%
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4">{skill.description}</p>
        
        {/* Animated Progress Bar */}
        <div className="space-y-2">
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary to-blue-500"
              initial={{ width: 0 }}
              animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
              transition={{ duration: 1, delay: index * 0.1 + 0.5, ease: "easeOut" }}
            />
          </div>
        </div>
        
        {/* Category Badge */}
        <motion.div
          className="inline-block mt-3 px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary"
          whileHover={{ scale: 1.05 }}
        >
          {skill.category}
        </motion.div>
      </div>
      
      {/* Hover Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
};

const CategoryFilter: React.FC<{
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}> = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <motion.div 
      className="flex flex-wrap justify-center gap-2 mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {categories.map((category, index) => (
        <motion.button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            activeCategory === category
              ? 'bg-primary text-primary-foreground shadow-lg'
              : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'
          }`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </motion.button>
      ))}
    </motion.div>
  );
};

const SkillsRadarChart: React.FC<{ skills: Skill[] }> = ({ skills }) => {
  const categories = ['frontend', 'backend', 'design', 'tools'];
  const averages = categories.map(category => {
    const categorySkills = skills.filter(skill => skill.category === category);
    return categorySkills.length > 0 
      ? categorySkills.reduce((sum, skill) => sum + skill.level, 0) / categorySkills.length 
      : 0;
  });

  return (
    <div className="relative w-64 h-64 mx-auto mb-12">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Background circles */}
        {[20, 40, 60, 80].map((radius, index) => (
          <circle
            key={radius}
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="1"
            opacity={0.3}
          />
        ))}
        
        {/* Category lines */}
        {categories.map((_, index) => {
          const angle = (index * 360) / categories.length - 90;
          const x = 100 + 80 * Math.cos((angle * Math.PI) / 180);
          const y = 100 + 80 * Math.sin((angle * Math.PI) / 180);
          
          return (
            <line
              key={index}
              x1="100"
              y1="100"
              x2={x}
              y2={y}
              stroke="hsl(var(--border))"
              strokeWidth="1"
              opacity={0.3}
            />
          );
        })}
        
        {/* Skill polygon */}
        <motion.polygon
          points={categories.map((_, index) => {
            const angle = (index * 360) / categories.length - 90;
            const radius = (averages[index] / 100) * 80;
            const x = 100 + radius * Math.cos((angle * Math.PI) / 180);
            const y = 100 + radius * Math.sin((angle * Math.PI) / 180);
            return `${x},${y}`;
          }).join(' ')}
          fill="hsl(var(--primary) / 0.2)"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        
        {/* Category labels */}
        {categories.map((category, index) => {
          const angle = (index * 360) / categories.length - 90;
          const x = 100 + 95 * Math.cos((angle * Math.PI) / 180);
          const y = 100 + 95 * Math.sin((angle * Math.PI) / 180);
          
          return (
            <text
              key={category}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-foreground text-xs font-medium"
            >
              {category}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

export const EnhancedSkills: React.FC = () => {
  const [activeCategory, setActiveCategory] = React.useState('all');
  
  const categories = ['all', 'frontend', 'backend', 'design', 'tools'];
  const filteredSkills = activeCategory === 'all' 
    ? SKILLS 
    : SKILLS.filter(skill => skill.category === activeCategory);

  return (
    <section id="skills" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent">
            Technical Skills
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            A comprehensive overview of my technical expertise and design capabilities, 
            constantly evolving with the latest technologies and best practices.
          </p>
          
          {/* Skills Overview Radar Chart */}
          <SkillsRadarChart skills={SKILLS} />
        </motion.div>

        {/* Category Filter */}
        <CategoryFilter 
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Skills Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          layout
        >
          {filteredSkills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-muted-foreground mb-6">
            Interested in working together? Let's discuss your project requirements.
          </p>
          <motion.a
            href="#contact"
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-primary to-blue-500 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Get in Touch
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};