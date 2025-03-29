
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
                {/* Placeholder for profile picture */}
                <span className="text-6xl font-bold text-kapil-red">K</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-kapil-blue-dark to-transparent p-4">
                <h3 className="text-xl font-bold">Kapil</h3>
                <p className="text-sm text-muted-foreground">Web Developer & Designer</p>
              </div>
            </div>
            
            <div className="space-y-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Name:</span>
                <span className="font-medium">Kapil</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email:</span>
                <span className="font-medium">hello@kapil.dev</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Location:</span>
                <span className="font-medium">Kiyose Tokyo</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Availability:</span>
                <span className="font-medium text-green-500">Open to Work</span>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-7 lg:col-span-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Tabs defaultValue="about" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="about">About Me</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about" className="space-y-4">
                <p>
                  I'm a passionate web developer and designer with over 5 years of experience 
                  in creating beautiful, functional websites and digital experiences. My journey
                  in web development started when I was in college, and since then I've been 
                  constantly learning and growing in this ever-evolving field.
                </p>
                <p>
                  I specialize in building modern, responsive websites and web applications using
                  the latest technologies and best practices. I believe in creating websites that
                  not only look great but also provide an exceptional user experience.
                </p>
                <p>
                  When I'm not coding, you can find me exploring new design trends, contributing
                  to open-source projects, or enjoying outdoor activities to recharge my creative
                  energy.
                </p>
              </TabsContent>
              
              <TabsContent value="skills">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Technical Skills</h3>
                    <ul className="space-y-3">
                      {[
                        { name: "HTML & CSS", level: 95 },
                        { name: "JavaScript / TypeScript", level: 90 },
                        { name: "React.js", level: 88 },
                        { name: "Node.js", level: 82 },
                        { name: "Next.js", level: 85 },
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
                    <h3 className="text-lg font-medium mb-4">Design Skills</h3>
                    <ul className="space-y-3">
                      {[
                        { name: "UI/UX Design", level: 88 },
                        { name: "Figma", level: 92 },
                        { name: "Adobe XD", level: 85 },
                        { name: "Photoshop", level: 80 },
                        { name: "Responsive Design", level: 95 },
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
                    <h3 className="text-lg font-medium">Senior Frontend Developer</h3>
                    <p className="text-kapil-red">TechInnovate Inc. (2021 - Present)</p>
                    <p className="mt-2 text-muted-foreground">
                      Leading frontend development for enterprise web applications.
                      Implementing modern UI/UX designs with React, TypeScript, and Next.js.
                    </p>
                  </div>
                  
                  <div className="relative border-l-2 border-kapil-blue-light/50 pl-6 pb-6">
                    <div className="absolute w-4 h-4 bg-kapil-blue-light/50 rounded-full -left-[9px] top-0" />
                    <h3 className="text-lg font-medium">UI/UX Designer & Developer</h3>
                    <p className="text-blue-400">Creative Solutions (2018 - 2021)</p>
                    <p className="mt-2 text-muted-foreground">
                      Designed and developed responsive websites for various clients.
                      Created user interfaces focused on accessibility and user experience.
                    </p>
                  </div>
                  
                  <div className="relative border-l-2 border-kapil-blue-light/50 pl-6">
                    <div className="absolute w-4 h-4 bg-kapil-blue-light/50 rounded-full -left-[9px] top-0" />
                    <h3 className="text-lg font-medium">Web Developer Intern</h3>
                    <p className="text-blue-400">Digital Wizards (2017 - 2018)</p>
                    <p className="mt-2 text-muted-foreground">
                      Assisted in developing websites and web applications.
                      Learned the fundamentals of frontend and backend development.
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
