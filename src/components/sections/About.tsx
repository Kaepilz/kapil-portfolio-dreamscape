import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("about");
  
  return (
    <section id="about" className="section-padding">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">{t('about.title')}</h2>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-12">
          <motion.div className="md:col-span-5 lg:col-span-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
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
            
            <div className="space-y-4">
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
            </div>
          </motion.div>
          
          <motion.div className="md:col-span-7 lg:col-span-8" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <Tabs defaultValue="about" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="about">{t('about.tabs.about') || 'About Me'}</TabsTrigger>
                <TabsTrigger value="skills">{t('about.tabs.skills') || 'Skills'}</TabsTrigger>
                <TabsTrigger value="experience">{t('about.tabs.experience') || 'Experience'}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about" className="space-y-4">
                <p>{t('about.description')}</p>
              </TabsContent>
              
              <TabsContent value="skills">
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Skills section integrated into main portfolio</p>
                </div>
              </TabsContent>
              
              <TabsContent value="experience">
                <div className="space-y-8">
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
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;

