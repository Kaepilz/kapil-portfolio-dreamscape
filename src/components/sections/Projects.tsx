import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

type Project = {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  liveUrl?: string;
  githubUrl?: string;
  tags: string[];
};

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=864",
    description: "A modern e-commerce platform with full shopping cart functionality and payment integration.",
    liveUrl: "https://ecommerce-demo.lovable.dev",
    githubUrl: "https://github.com/kapilniure/ecommerce-platform",
    tags: ["React", "Next.js", "Stripe", "Tailwind CSS"],
  },
  {
    id: 2,
    title: "Travel Agency Website",
    category: "UI/UX Design",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=870",
    description: "A beautiful travel agency website design with booking functionality and destination showcase.",
    liveUrl: "https://travel-demo.lovable.dev",
    tags: ["Figma", "UI Design", "UX Research"],
  },
  {
    id: 3,
    title: "Finance Dashboard",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=870",
    description: "A comprehensive finance dashboard with data visualization and user analytics.",
    liveUrl: "https://finance-demo.lovable.dev",
    githubUrl: "https://github.com/kapilniure/finance-dashboard",
    tags: ["TypeScript", "React", "Chart.js", "Firebase"],
  },
  {
    id: 4,
    title: "Coffee Brand Identity",
    category: "Brand Identity",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=870",
    description: "Complete brand identity for a premium coffee company, including logo, packaging, and web design.",
    liveUrl: "https://coffee-brand.lovable.dev",
    tags: ["Branding", "Logo Design", "Packaging"],
  },
  {
    id: 5,
    title: "Fitness App Interface",
    category: "UI/UX Design",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=870",
    description: "User interface design for a fitness tracking application with workout plans and progress tracking.",
    liveUrl: "https://fitness-ui.lovable.dev",
    tags: ["Mobile UI", "App Design", "User Testing"],
  },
  {
    id: 6,
    title: "Portfolio Website Template",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=870",
    description: "A customizable portfolio website template for creative professionals.",
    liveUrl: "https://portfolio-template.lovable.dev",
    githubUrl: "https://github.com/kapilniure/portfolio-template",
    tags: ["HTML/CSS", "JavaScript", "Bootstrap"],
  },
];

const CATEGORIES = ["All", "Web Development", "UI/UX Design", "Brand Identity"];

const Projects = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleProjects, setVisibleProjects] = useState(6);

  const filteredProjects = PROJECTS.filter(
    (project) => activeCategory === "All" || project.category === activeCategory
  );

  const handleShowMore = () => {
    setVisibleProjects((prev) => Math.min(prev + 3, filteredProjects.length));
  };

  return (
    <section id="projects" className="section-padding">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">{t('projects.title')}</h2>
          <p className="text-muted-foreground max-w-2xl mb-12">
            {t('projects.subtitle')}
          </p>
        </motion.div>
        
        <motion.div 
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Filter className="h-5 w-5 text-kapil-red mr-2" />
          {CATEGORIES.map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Button
                variant={activeCategory === category ? "default" : "outline"}
                className={
                  activeCategory === category 
                    ? "bg-kapil-red hover:bg-kapil-red/90 transform hover:scale-105 transition-all duration-200" 
                    : "border-kapil-blue-light/30 hover:border-kapil-red hover:text-kapil-red transform hover:scale-105 transition-all duration-200"
                }
                onClick={() => {
                  setActiveCategory(category);
                  setVisibleProjects(6);
                }}
              >
                {category === "All" ? t('projects.categories.all') :
                 category === "Web Development" ? t('projects.categories.web') :
                 category === "UI/UX Design" ? t('projects.categories.design') :
                 category === "Brand Identity" ? t('projects.categories.brand') : category}
              </Button>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.slice(0, visibleProjects).map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.2 }
              }}
            >
              <div 
                className="group relative overflow-hidden rounded-lg bg-kapil-blue-medium border border-kapil-blue-light/20 hover:border-kapil-red hover:shadow-2xl transition-all duration-300"
              >
                <div className="aspect-video overflow-hidden relative">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-kapil-blue-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-kapil-blue-dark via-kapil-blue-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6"
                  initial={{ y: 20, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.h3 
                    className="text-xl font-bold"
                    initial={{ y: 10, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    {project.title}
                  </motion.h3>
                  <motion.p 
                    className="text-sm text-muted-foreground mt-2"
                    initial={{ y: 10, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    {project.description}
                  </motion.p>
                  <motion.div 
                    className="flex flex-wrap gap-2 mt-4"
                    initial={{ y: 10, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    {project.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="text-xs bg-kapil-blue-dark/80 px-2 py-1 rounded-full text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </motion.div>
                  <motion.div 
                    className="flex gap-2 mt-4"
                    initial={{ y: 10, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                  >
                    {project.liveUrl && (
                      <motion.a 
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm flex items-center gap-1 bg-kapil-red hover:bg-kapil-red/90 text-white px-3 py-1 rounded-full"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {t('projects.viewLive')} <ExternalLink className="w-3 h-3 ml-1" />
                      </motion.a>
                    )}
                    {project.githubUrl && (
                      <motion.a 
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm flex items-center gap-1 bg-kapil-blue-dark hover:bg-kapil-blue-light/30 text-white px-3 py-1 rounded-full"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {t('projects.viewCode')} <Github className="w-3 h-3 ml-1" />
                      </motion.a>
                    )}
                  </motion.div>
                </motion.div>
              </div>
              
              <Link
                to={`/projects/${project.title.toLowerCase().replace(/ /g, "-")}`}
                className="block p-4"
                onClick={() => window.scrollTo(0, 0)}
              >
                <h3 className="text-lg font-bold group-hover:text-kapil-red transition-colors duration-200">{project.title}</h3>
                <p className="text-sm text-kapil-red">{project.category}</p>
              </Link>
            </motion.div>
          ))}
        </div>
        
        {visibleProjects < filteredProjects.length && (
          <motion.div 
            className="flex justify-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={handleShowMore}
                className="bg-kapil-red hover:bg-kapil-red/90 px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {t('projects.loadMore')}
              </Button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
