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
                <img 
                  src="/images/profile.jpg" 
                  alt="Kapil Niure" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-kapil-blue-dark to-transparent p-4">
                <h3 className="text-xl font-bold">Kapil Niure</h3>
                <p className="text-sm text-muted-foreground">Web Developer</p>
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
                <span className="text-muted-foreground">Experience:</span>
                <span className="font-medium">1 Year</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Availability:</span>
                <span className="font-medium text-green-500">Open to Work</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Languages:</span>
                <span className="font-medium">English (fluent), Nepali (native), Japanese (conversational)</span>
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
                  I'm a web developer with 1 year of experience, passionate about creating 
                  functional websites and digital experiences. My journey in web development 
                  is just beginning, and I'm eager to learn and grow in this exciting field.
                </p>
                <p>
                  I specialize in building responsive websites using modern technologies. 
                  Although I'm still developing my skills, I'm committed to creating clean, 
                  user-friendly web applications.
                </p>
                <p>
                  When I'm not coding, I enjoy exploring new technologies and looking for 
                  opportunities to expand my skills.
                </p>
              </TabsContent>
              
              <TabsContent value="skills">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Technical Skills</h3>
                    <ul className="space-y-3">
                      {[
                        { name: "HTML & CSS", level: 70 },
                        { name: "JavaScript", level: 60 },
                        { name: "React.js", level: 55 },
                        { name: "Node.js", level: 30 },
                        { name: "Next.js", level: 30 },
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
                        { name: "UI/UX Design", level: 50 },
                        { name: "Figma", level: 60 },
                        { name: "Adobe XD", level: 40 },
                        { name: "Photoshop", level: 30 },
                        { name: "Responsive Design", level: 65 },
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
                    <h3 className="text-lg font-medium">Junior Web Developer</h3>
                    <p className="text-kapil-red">First Professional Role (2023 - Present)</p>
                    <p className="mt-2 text-muted-foreground">
                      Developing web applications, learning modern frontend technologies, 
                      and gaining hands-on experience in web development.
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

