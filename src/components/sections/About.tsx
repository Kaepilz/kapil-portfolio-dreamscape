import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { MapPin, Calendar, Coffee, Code } from "lucide-react";

const About = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("about");
  
  return (
    <section id="about" className="section-padding bg-gradient-to-br from-background via-background/50 to-primary/5">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">{t('about.title')}</h2>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12">
          {/* Profile Card */}
          <motion.div 
            className="lg:col-span-4" 
            initial={{ opacity: 0, x: -50 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border border-border/50 hover:shadow-xl transition-all duration-500">
              <div className="relative">
                <div className="aspect-[4/5] bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center overflow-hidden">
                  <motion.img 
                    src="/images/profile.jpg" 
                    alt="Kapil Niure - Web Developer" 
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/95 via-background/80 to-transparent p-6">
                  <motion.h3 
                    className="text-2xl font-bold text-foreground"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Kapil Niure
                  </motion.h3>
                  <motion.p 
                    className="text-primary font-medium"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    Web Developer & Designer
                  </motion.p>
                </div>
              </div>
              
              <CardContent className="p-6 space-y-4">
                {/* Bio Card */}
                <motion.div 
                  className="p-4 bg-primary/5 rounded-lg border border-primary/10"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <h4 className="font-semibold mb-2 text-primary flex items-center gap-2">
                    <Coffee className="w-4 h-4" />
                    {t('about.bio.title')}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t('about.bio.description')}
                  </p>
                </motion.div>
                
                {/* Quick Info Grid */}
                <div className="grid grid-cols-1 gap-3 text-sm">
                  <motion.div 
                    className="flex items-center gap-3 p-3 rounded-lg bg-accent/5 border border-accent/10"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <MapPin className="w-4 h-4 text-accent flex-shrink-0" />
                    <div>
                      <span className="font-medium text-foreground">{t('about.bio.location')}</span>
                      <p className="text-muted-foreground">Tokyo, Japan</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center gap-3 p-3 rounded-lg bg-green-500/5 border border-green-500/10"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Code className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-foreground">{t('about.bio.status')}</span>
                      <p className="text-green-600 dark:text-green-400 font-medium">{t('about.bio.available')}</p>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Content Tabs */}
          <motion.div 
            className="lg:col-span-8" 
            initial={{ opacity: 0, x: 50 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="bg-card/50 backdrop-blur-sm border border-border/50 h-full">
              <CardContent className="p-6">
                <Tabs defaultValue="about" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-3 mb-8 bg-muted/50">
                    <TabsTrigger value="about" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      {t('about.tabs.about')}
                    </TabsTrigger>
                    <TabsTrigger value="skills" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      {t('about.tabs.skills')}
                    </TabsTrigger>
                    <TabsTrigger value="experience" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      {t('about.tabs.experience')}
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="about" className="space-y-6 min-h-[300px]">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="prose prose-gray dark:prose-invert max-w-none">
                        <p className="text-lg leading-relaxed text-muted-foreground">
                          {t('about.description')}
                        </p>
                      </div>
                      
                      {/* Feature highlights */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                        {[
                          { icon: "🎨", title: "Creative Design", desc: "User-centered design approach" },
                          { icon: "⚡", title: "Modern Tech", desc: "Latest web technologies" },
                          { icon: "🚀", title: "Performance", desc: "Optimized for speed" },
                          { icon: "📱", title: "Responsive", desc: "Works on all devices" }
                        ].map((item, index) => (
                          <motion.div
                            key={item.title}
                            className="flex items-start gap-3 p-4 rounded-lg bg-muted/20 border border-muted/20"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                          >
                            <span className="text-2xl">{item.icon}</span>
                            <div>
                              <h4 className="font-semibold text-foreground">{item.title}</h4>
                              <p className="text-sm text-muted-foreground">{item.desc}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </TabsContent>
                  
                  <TabsContent value="skills" className="min-h-[300px]">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-center py-12"
                    >
                      <div className="max-w-md mx-auto">
                        <motion.div
                          className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.8 }}
                        >
                          <Code className="w-10 h-10 text-primary" />
                        </motion.div>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                          {t('about.skillsIntegrated')}
                        </p>
                        <motion.p 
                          className="text-sm text-primary mt-4 font-medium"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          ↓ Check out the Skills section below ↓
                        </motion.p>
                      </div>
                    </motion.div>
                  </TabsContent>
                  
                  <TabsContent value="experience" className="min-h-[300px]">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-8"
                    >
                      <motion.div 
                        className="relative border-l-2 border-primary/30 pl-8 pb-8"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                      >
                        <motion.div 
                          className="absolute w-6 h-6 bg-primary rounded-full -left-[13px] top-0 border-4 border-background shadow-lg"
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
                        />
                        <div className="bg-card/30 p-6 rounded-lg border border-border/30">
                          <div className="flex items-center gap-2 mb-2">
                            <Calendar className="w-4 h-4 text-primary" />
                            <span className="text-primary font-medium text-sm">
                              {t('about.experience.period')}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-foreground mb-3">
                            {t('about.experience.title')}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {t('about.experience.description')}
                          </p>
                        </div>
                      </motion.div>
                    </motion.div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;

