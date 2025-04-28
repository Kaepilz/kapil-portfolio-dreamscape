
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const projects = [
  {
    title: "Project 1",
    category: "Web Design",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=870",
    description: "A modern web application built with React and TypeScript."
  },
  {
    title: "Project 2",
    category: "Mobile App",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=870",
    description: "An innovative mobile app design for fitness tracking."
  },
  {
    title: "Project 3",
    category: "Brand Identity",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=870",
    description: "Complete brand identity design for a coffee company."
  }
];

const PortfolioTemplate = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-kapil-blue-dark to-kapil-blue-medium p-6">
      <div className="container mx-auto max-w-6xl">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 text-gradient">John Doe</h1>
          <p className="text-xl text-muted-foreground">Web Developer & Designer</p>
        </header>

        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Card key={index} className="overflow-hidden bg-kapil-blue-medium/50 border-kapil-blue-light/20 hover:border-kapil-red transition-all duration-300">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-kapil-red mb-2">{project.category}</p>
                  <p className="text-muted-foreground">{project.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PortfolioTemplate;

