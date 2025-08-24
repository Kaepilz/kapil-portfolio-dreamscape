import { motion } from 'framer-motion';
import { CheckCircle, Clock, Target, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'in-progress' | 'future';
  skills: string[];
  progress: number;
  category: string;
  estimatedCompletion?: string;
}

const roadmapData: RoadmapItem[] = [
  {
    id: '1',
    title: 'Web Development Fundamentals',
    description: 'Master the core technologies for modern web development',
    status: 'current',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'TypeScript'],
    progress: 75,
    category: 'Frontend Development',
    estimatedCompletion: 'Present'
  },
  {
    id: '2',
    title: 'Full-Stack Development',
    description: 'Build complete web applications with backend integration',
    status: 'in-progress',
    skills: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'REST APIs'],
    progress: 45,
    category: 'Backend Development',
    estimatedCompletion: '2025'
  },
  {
    id: '3',
    title: 'Software Engineering',
    description: 'Learn system design and programming fundamentals',
    status: 'future',
    skills: ['Python', 'C++', 'Data Structures', 'Algorithms', 'System Design'],
    progress: 10,
    category: 'Computer Science',
    estimatedCompletion: '2026'
  },
  {
    id: '4',
    title: 'AI/ML Engineering',
    description: 'Explore artificial intelligence and machine learning',
    status: 'future',
    skills: ['TensorFlow', 'PyTorch', 'Neural Networks', 'Deep Learning', 'NLP'],
    progress: 0,
    category: 'Artificial Intelligence',
    estimatedCompletion: '2027'
  },
  {
    id: '5',
    title: 'Cloud & DevOps',
    description: 'Master cloud platforms and deployment strategies',
    status: 'future',
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Microservices'],
    progress: 0,
    category: 'Infrastructure',
    estimatedCompletion: '2026'
  }
];

const StatusBadge = ({ status }: { status: RoadmapItem['status'] }) => {
  const getStatusConfig = (status: RoadmapItem['status']) => {
    switch (status) {
      case 'completed':
        return { 
          icon: CheckCircle, 
          label: 'Completed', 
          className: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800' 
        };
      case 'current':
        return { 
          icon: Star, 
          label: 'Current', 
          className: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800' 
        };
      case 'in-progress':
        return { 
          icon: Clock, 
          label: 'In Progress', 
          className: 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800' 
        };
      case 'future':
        return { 
          icon: Target, 
          label: 'Future', 
          className: 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800' 
        };
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${config.className}`}>
      <Icon className="w-3 h-3" />
      {config.label}
    </span>
  );
};

const ProgressCircle = ({ progress, className }: { progress: number; className?: string }) => {
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className={`relative w-12 h-12 ${className}`}>
      <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 44 44">
        <circle
          cx="22"
          cy="22"
          r={radius}
          stroke="currentColor"
          strokeWidth="3"
          fill="transparent"
          className="text-muted-foreground/20"
        />
        <motion.circle
          cx="22"
          cy="22"
          r={radius}
          stroke="currentColor"
          strokeWidth="3"
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="text-primary"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-medium">{progress}%</span>
      </div>
    </div>
  );
};

export const Roadmap = () => {
  const { t } = useTranslation();

  return (
    <section id="roadmap" className="section-padding bg-muted/30">
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
            Learning Roadmap
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            My journey of continuous learning and skill development in technology
          </motion.p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-blue-500 to-purple-500 hidden md:block" />
          
          <div className="space-y-8">
            {roadmapData.map((item, index) => (
              <motion.div
                key={item.id}
                className="relative"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                {/* Timeline dot */}
                <div className="absolute left-6 w-3 h-3 bg-primary rounded-full transform -translate-x-1/2 border-4 border-background hidden md:block" />
                
                <div className="md:ml-16">
                  <motion.div
                    className="bg-background border border-border rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold">{item.title}</h3>
                          <StatusBadge status={item.status} />
                        </div>
                        <p className="text-muted-foreground mb-3">{item.description}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="font-medium">{item.category}</span>
                          {item.estimatedCompletion && (
                            <>
                              <span>•</span>
                              <span>Target: {item.estimatedCompletion}</span>
                            </>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <ProgressCircle progress={item.progress} />
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                        Key Technologies
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {item.skills.map((skill, skillIndex) => (
                          <motion.span
                            key={skill}
                            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: (index * 0.1) + (skillIndex * 0.05), duration: 0.3 }}
                            whileHover={{ scale: 1.05 }}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Overall Progress</span>
                        <span className="font-medium">{item.progress}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-primary to-blue-500 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.progress}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-muted-foreground mb-6">
            Interested in my journey or want to collaborate on projects?
          </p>
          <motion.a
            href="#contact"
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-primary to-blue-500 text-primary-foreground rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Let's Connect
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};