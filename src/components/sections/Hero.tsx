import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion } from "framer-motion";
import { FloatingShapes } from "@/components/FloatingShapes";
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();
  const [imageError, setImageError] = useState(false);

  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const TypewriterText = ({ text, className }: { text: string; className?: string }) => {
    return (
      <motion.span className={className} variants={titleVariants} initial="hidden" animate="visible">
        {text.split('').map((char, index) => (
          <motion.span key={index} variants={letterVariants}>
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.span>
    );
  };

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center pt-20 pb-16 overflow-hidden relative"
    >
      <div 
        className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-kapil-blue-medium/20 -z-10 clip-path-polygon"
        style={{
          clipPath: "polygon(100% 0, 100% 100%, 25% 100%, 0 55%, 25% 0)"
        }}
      />
      
      <div className="container mx-auto relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center min-h-[80vh]">
          <motion.div 
            className="md:col-span-7 lg:col-span-6 z-10"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Floating elements around the text */}
            <FloatingShapes />
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight text-foreground">
              <TypewriterText text={t('hero.greeting')} />
              {" "}
              <span className="bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent">
                <TypewriterText text={t('hero.name')} className="bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent" />
              </span>
              <motion.span 
                className="text-primary inline-block"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ delay: 2, duration: 0.5 }}
              >
                .
              </motion.span>
            </h1>
            
            <motion.h2 
              className="text-2xl md:text-3xl lg:text-4xl font-medium mb-6 text-foreground/80"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {t('hero.title')}
            </motion.h2>
            
            <motion.p 
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              {t('hero.description')}
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
            >
              <Button 
                asChild
                size="lg" 
                className="bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <a href="#projects">
                  {t('hero.viewWork')} <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button 
                asChild
                size="lg" 
                variant="outline" 
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-105"
              >
                <a href="#contact">
                  {t('hero.contactMe')}
                </a>
              </Button>
              <Button 
                asChild
                size="lg" 
                variant="secondary" 
                className="hover:bg-secondary/80 transition-all duration-300 transform hover:scale-105"
              >
                <a href="/resume.pdf" download>
                  <Download className="mr-2 h-4 w-4" /> {t('hero.resume')}
                </a>
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="md:col-span-5 lg:col-span-6 flex justify-center md:justify-end relative"
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
          >
            {/* Floating geometric shapes around the profile */}
            <FloatingShapes />
            
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
              {/* Animated rings around profile */}
              <motion.div 
                className="absolute inset-0 border-2 border-primary/30 rounded-full"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 180, 360] 
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity,
                  ease: "linear" 
                }}
              />
              <motion.div 
                className="absolute inset-4 border-2 border-blue-500/20 rounded-full"
                animate={{ 
                  scale: [1.1, 1, 1.1],
                  rotate: [360, 180, 0] 
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity,
                  ease: "linear" 
                }}
              />
              
              {/* Profile image container */}
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-blue-500/20 to-purple-500/20 rounded-full blur-xl scale-110" />
                  
                  <div className="relative w-60 h-60 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-gradient-to-br from-primary via-blue-500 to-purple-500 shadow-2xl">
                    {imageError ? (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-card to-card/80 text-muted-foreground">
                        <div className="text-center">
                          <div className="text-4xl mb-2">👨‍💻</div>
                          <div>Kapil Niure</div>
                        </div>
                      </div>
                    ) : (
                      <img 
                        src="/images/profile.jpg" 
                        alt="Kapil Niure - Web Developer & Designer" 
                        className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                        onError={() => setImageError(true)}
                      />
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Enhanced scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.a 
          href="#about" 
          className="flex flex-col items-center text-sm text-muted-foreground hover:text-primary transition-all duration-300 group"
          aria-label="Scroll down to learn more"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="mb-3 font-medium group-hover:font-semibold transition-all">{t('hero.discoverMore')}</span>
          <motion.div
            className="w-6 h-10 border-2 border-current rounded-full flex justify-center"
            whileHover={{ scale: 1.1 }}
          >
            <motion.div
              className="w-1 h-3 bg-current rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Hero;
