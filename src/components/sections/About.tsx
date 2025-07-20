import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MotionWrapper } from "@/components/MotionWrapper";
import { SkillsSection } from "@/components/SkillsSection";
import { motion } from "framer-motion";

const About = () => {
  const [activeTab, setActiveTab] = useState("about");
  
  return (
    <section id="about" className="section-padding bg-secondary/20">
      <div className="container mx-auto">
        <MotionWrapper>
          <h2 className="section-title">About Me</h2>
        </MotionWrapper>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-12">
          <MotionWrapper delay={0.2} className="md:col-span-5 lg:col-span-4">
            <div className="relative rounded-lg overflow-hidden mb-6">
              <div className="aspect-[3/4] bg-secondary rounded-lg flex items-center justify-center">
                <img 
                  src="/images/profile.jpg" 
                  alt="Kapil Niure" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-4">
                <h3 className="text-xl font-bold">Kapil Niure</h3>
                <p className="text-sm text-muted-foreground">Web Developer</p>
              </div>
            </div>
            
            <MotionWrapper delay={0.4} className="space-y-4">
              {[
                { label: "Name", value: "Kapil Niure" },
                { label: "Email", value: "kapilniure4@gmail.com" },
                { label: "Location", value: "Kiyose, Tokyo" },
                { label: "Experience", value: "1 Year" },
                { label: "Availability", value: "Open to Work", isGreen: true },
                { label: "Languages", value: "English (fluent), Nepali (native), Japanese (conversational)" },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  className="flex justify-between"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="text-muted-foreground">{item.label}:</span>
                  <span className={`font-medium ${item.isGreen ? 'text-green-500' : ''}`}>
                    {item.value}
                  </span>
                </motion.div>
              ))}
            </MotionWrapper>
          </MotionWrapper>
          
          <MotionWrapper delay={0.3} className="md:col-span-7 lg:col-span-8">
            <Tabs defaultValue="about" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="about">About Me</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about" className="space-y-4">
                <MotionWrapper>
                  <p>
                    I'm a web developer with 1 year of experience, passionate about creating 
                    functional websites and digital experiences. My journey in web development 
                    is just beginning, and I'm eager to learn and grow in this exciting field.
                  </p>
                </MotionWrapper>
                <MotionWrapper delay={0.2}>
                  <p>
                    I specialize in building responsive websites using modern technologies. 
                    Although I'm still developing my skills, I'm committed to creating clean, 
                    user-friendly web applications.
                  </p>
                </MotionWrapper>
                <MotionWrapper delay={0.4}>
                  <p>
                    When I'm not coding, I enjoy exploring new technologies and looking for 
                    opportunities to expand my skills.
                  </p>
                </MotionWrapper>
              </TabsContent>
              
              <TabsContent value="skills">
                <SkillsSection />
              </TabsContent>
              
              <TabsContent value="experience">
                <MotionWrapper className="space-y-8">
                  <motion.div 
                    className="relative border-l-2 border-primary pl-6 pb-6"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                  >
                    <motion.div 
                      className="absolute w-4 h-4 bg-primary rounded-full -left-[9px] top-0"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                    />
                    <h3 className="text-lg font-medium">Junior Web Developer</h3>
                    <p className="text-primary">First Professional Role (2023 - Present)</p>
                    <p className="mt-2 text-muted-foreground">
                      Developing web applications, learning modern frontend technologies, 
                      and gaining hands-on experience in web development.
                    </p>
                  </motion.div>
                </MotionWrapper>
              </TabsContent>
            </Tabs>
          </MotionWrapper>
        </div>
      </div>
    </section>
  );
};

export default About;

