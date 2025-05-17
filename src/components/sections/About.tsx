
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const About = () => {
  const [activeTab, setActiveTab] = useState("about");
  
  return (
    <section id="about" className="section-padding bg-kapil-blue-medium/20">
      <div className="container mx-auto">
        <h2 className="section-title">About Me</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-12">
          <div className="md:col-span-5 lg:col-span-4">
            <div className="relative rounded-lg overflow-hidden mb-6 animate-fade-in">
              <div className="aspect-[3/4] bg-kapil-blue-medium rounded-lg flex items-center justify-center">
                <Avatar className="w-full h-full rounded-none">
                  <AvatarImage 
                    src="https://photos.fife.usercontent.google.com/pw/AP1GczM9EqUzCPihNmpXEHbiQdUKkAcpyChM3qPMN2UHdkzWuofC8A0Fz2xh=w809-h1079-s-no-gm?authuser=0" 
                    alt="Kapil Niure" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=687&auto=format&fit=crop";
                    }}
                  />
                  <AvatarFallback className="bg-kapil-blue-light text-4xl w-full h-full">KN</AvatarFallback>
                </Avatar>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-kapil-blue-dark to-transparent p-4">
                <h3 className="text-xl font-bold">Kapil Niure</h3>
                <p className="text-sm text-muted-foreground">Web Design Enthusiast</p>
              </div>
            </div>
            
            <div className="space-y-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Name:</span>
                <span className="font-medium">Kapil Niure</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email:</span>
                <span className="font-medium">kapilniure4@gmail.com</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Location:</span>
                <span className="font-medium">Kiyose, Tokyo</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Interests:</span>
                <span className="font-medium">Web Design, Digital Art</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Availability:</span>
                <span className="font-medium text-green-500">Open to Opportunities</span>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-7 lg:col-span-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Tabs defaultValue="about" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="about">About Me</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="experience">Background</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about" className="space-y-4">
                <p>
                  I'm a creative and enthusiastic web design enthusiast with a passion for learning
                  how to create beautiful, user-friendly websites. I'm at the beginning of my journey
                  in web design and development, and I'm eager to grow my skills in this exciting field.
                </p>
                <p>
                  I focus on understanding the basics of website creation, including layout design, 
                  color theory, and user experience. I enjoy working on simple projects that help me
                  build my knowledge step by step.
                </p>
                <p>
                  When I'm not exploring web design, I enjoy learning about digital art and finding
                  inspiration in everyday life that I can incorporate into my creative work.
                </p>
              </TabsContent>
              
              <TabsContent value="skills">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Web Skills</h3>
                    <ul className="space-y-3">
                      {[
                        { name: "HTML & CSS Basics", level: 35 },
                        { name: "Website Layout", level: 30 },
                        { name: "Web Design Principles", level: 25 },
                        { name: "Color Theory", level: 20 },
                        { name: "Digital Graphics", level: 15 },
                      ].map((skill) => (
                        <li key={skill.name}>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium">{skill.name}</span>
                            <span className="text-muted-foreground">{skill.level}%</span>
                          </div>
                          <div className="h-2 bg-kapil-blue-light/30 rounded-full">
                            <div 
                              className="h-2 bg-kapil-red rounded-full"
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Creative Skills</h3>
                    <ul className="space-y-3">
                      {[
                        { name: "Visual Design", level: 30 },
                        { name: "Basic Image Editing", level: 25 },
                        { name: "Content Creation", level: 20 },
                        { name: "Typography", level: 15 },
                        { name: "Responsive Design", level: 10 },
                      ].map((skill) => (
                        <li key={skill.name}>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium">{skill.name}</span>
                            <span className="text-muted-foreground">{skill.level}%</span>
                          </div>
                          <div className="h-2 bg-kapil-blue-light/30 rounded-full">
                            <div 
                              className="h-2 bg-blue-500 rounded-full"
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="experience">
                <div className="space-y-8">
                  <div className="relative border-l-2 border-kapil-red pl-6 pb-6">
                    <div className="absolute w-4 h-4 bg-kapil-red rounded-full -left-[9px] top-0" />
                    <h3 className="text-lg font-medium">Self-Taught Learning Journey</h3>
                    <p className="text-kapil-red">Ongoing</p>
                    <p className="mt-2 text-muted-foreground">
                      Teaching myself web design fundamentals through online resources, practicing 
                      with small projects, and developing a better understanding of creating visually 
                      appealing websites.
                    </p>
                  </div>
                  
                  <div className="relative border-l-2 border-kapil-red pl-6 pb-6">
                    <div className="absolute w-4 h-4 bg-kapil-red rounded-full -left-[9px] top-0" />
                    <h3 className="text-lg font-medium">Personal Projects</h3>
                    <p className="text-kapil-red">Building Portfolio</p>
                    <p className="mt-2 text-muted-foreground">
                      Working on personal design projects to improve my skills, demonstrate my 
                      dedication and work ethic, and build a portfolio that showcases my growth 
                      and creativity.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
