import { useAnimationMode } from '@/contexts/AnimationModeContext';
import { SkillIcon3D } from './3D/SkillIcon3D';
import { MotionWrapper } from './MotionWrapper';
import { motion } from 'framer-motion';

const skills = [
  { name: "HTML", level: 90, color: "#E34F26", icon: "H" },
  { name: "CSS", level: 85, color: "#1572B6", icon: "C" },
  { name: "JavaScript", level: 80, color: "#F7DF1E", icon: "JS" },
  { name: "React", level: 75, color: "#61DAFB", icon: "R" },
  { name: "TypeScript", level: 70, color: "#3178C6", icon: "TS" },
  { name: "Node.js", level: 65, color: "#339933", icon: "N" },
  { name: "Tailwind", level: 80, color: "#06B6D4", icon: "T" },
  { name: "Firebase", level: 60, color: "#FFCA28", icon: "F" },
];

const designSkills = [
  { name: "UI/UX Design", level: 75, color: "#FF6B6B", icon: "U" },
  { name: "Figma", level: 80, color: "#F24E1E", icon: "Fi" },
  { name: "Adobe XD", level: 65, color: "#FF61F6", icon: "XD" },
  { name: "Photoshop", level: 70, color: "#31A8FF", icon: "Ps" },
];

export const SkillsSection = () => {
  const { isAnimated } = useAnimationMode();

  const SkillBar = ({ skill, index }: { skill: any; index: number }) => (
    <MotionWrapper delay={index * 0.1} className="space-y-2">
      <div className="flex justify-between">
        <span className="font-medium">{skill.name}</span>
        <span className="text-muted-foreground">{skill.level}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-2 rounded-full"
          style={{ backgroundColor: skill.color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: index * 0.1 }}
        />
      </div>
    </MotionWrapper>
  );

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold mb-6">Technical Skills</h3>
        {isAnimated ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <SkillIcon3D key={skill.name} skill={skill} index={index} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {skills.map((skill, index) => (
              <SkillBar key={skill.name} skill={skill} index={index} />
            ))}
          </div>
        )}
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-6">Design Skills</h3>
        {isAnimated ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {designSkills.map((skill, index) => (
              <SkillIcon3D key={skill.name} skill={skill} index={index} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {designSkills.map((skill, index) => (
              <SkillBar key={skill.name} skill={skill} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};