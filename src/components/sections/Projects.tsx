
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

const CATEGORIES = ["All", "Web Development", "UI/UX Design", "Brand Identity"];

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
    liveUrl: "#",
    githubUrl: "#",
    tags: ["React", "Next.js", "Stripe", "Tailwind CSS"],
  },
  {
    id: 2,
    title: "Travel Agency Website",
    category: "UI/UX Design",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=870",
    description: "A beautiful travel agency website design with booking functionality and destination showcase.",
    liveUrl: "#",
    tags: ["Figma", "UI Design", "UX Research"],
  },
  {
    id: 3,
    title: "Finance Dashboard",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=870",
    description: "A comprehensive finance dashboard with data visualization and user analytics.",
    liveUrl: "#",
    githubUrl: "#",
    tags: ["TypeScript", "React", "Chart.js", "Firebase"],
  },
  {
    id: 4,
    title: "Coffee Brand Identity",
    category: "Brand Identity",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=870",
    description: "Complete brand identity for a premium coffee company, including logo, packaging, and web design.",
    liveUrl: "#",
    tags: ["Branding", "Logo Design", "Packaging"],
  },
  {
    id: 5,
    title: "Fitness App Interface",
    category: "UI/UX Design",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=870",
    description: "User interface design for a fitness tracking application with workout plans and progress tracking.",
    liveUrl: "#",
    tags: ["Mobile UI", "App Design", "User Testing"],
  },
  {
    id: 6,
    title: "Portfolio Website Template",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=870",
    description: "A customizable portfolio website template for creative professionals.",
    liveUrl: "#",
    githubUrl: "#",
    tags: ["HTML/CSS", "JavaScript", "Bootstrap"],
  },
];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleProjects, setVisibleProjects] = useState(6);

  const filteredProjects = PROJECTS.filter(
    (project) => activeCategory === "All" || project.category === activeCategory
  );

  const handleShowMore = () => {
    setVisibleProjects((prev) => Math.min(prev + 3, filteredProjects.length));
  };

  return (
    <section id="projects" className="section-padding bg-kapil-blue-medium/20">
      <div className="container mx-auto">
        <h2 className="section-title">My Projects</h2>
        <p className="text-muted-foreground max-w-2xl mb-12">
          Check out some of my recent projects. Each project represents my dedication to 
          creating beautiful and functional digital experiences.
        </p>
        
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              className={
                activeCategory === category 
                  ? "bg-kapil-red hover:bg-kapil-red/90" 
                  : "border-kapil-blue-light/30 hover:border-kapil-red hover:text-kapil-red"
              }
              onClick={() => {
                setActiveCategory(category);
                setVisibleProjects(6);
              }}
            >
              {category}
            </Button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.slice(0, visibleProjects).map((project, index) => (
            <div 
              key={project.id} 
              className="animate-fade-in" 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="group relative overflow-hidden rounded-lg bg-kapil-blue-medium border border-kapil-blue-light/20 hover:border-kapil-red transition-all duration-300">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-kapil-blue-dark via-kapil-blue-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="text-xs bg-kapil-blue-dark/80 px-2 py-1 rounded-full text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-4">
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm flex items-center gap-1 bg-kapil-red hover:bg-kapil-red/90 text-white px-3 py-1 rounded-full"
                      >
                        Live Demo <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm flex items-center gap-1 bg-kapil-blue-dark hover:bg-kapil-blue-light/30 text-white px-3 py-1 rounded-full"
                      >
                        Code <Github className="w-3 h-3 ml-1" />
                      </a>
                    )}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold">{project.title}</h3>
                  <p className="text-sm text-kapil-red">{project.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {visibleProjects < filteredProjects.length && (
          <div className="flex justify-center mt-12">
            <Button 
              onClick={handleShowMore}
              className="bg-kapil-red hover:bg-kapil-red/90"
            >
              Load More Projects
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
