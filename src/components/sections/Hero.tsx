import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion } from "framer-motion";
import { useAnimationMode } from "@/contexts/AnimationModeContext";
import { MotionWrapper } from "@/components/MotionWrapper";

const Hero = () => {
  const [imageError, setImageError] = useState(false);
  const { isAnimated } = useAnimationMode();

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
    if (!isAnimated) return <span className={className}>{text}</span>;
    
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
      
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <MotionWrapper className="md:col-span-7 lg:col-span-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <TypewriterText text="Hi, I'm " />
              <span className="text-primary">
                <TypewriterText text="Kapil" className="text-primary" />
              </span>
              <span className="text-primary">.</span>
            </h1>
            
            <MotionWrapper delay={0.3}>
              <h2 className="text-2xl md:text-3xl font-medium mb-6 text-foreground/80">
                Web Developer <span className="text-primary">&</span> Designer
              </h2>
            </MotionWrapper>
            
            <MotionWrapper delay={0.5}>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                I craft beautiful, functional websites and digital experiences 
                that help businesses grow and succeed in the digital world.
              </p>
            </MotionWrapper>
            
            <MotionWrapper delay={0.7} className="flex flex-wrap gap-4">
              <Button 
                asChild
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-white font-medium"
              >
                <a href="#projects">
                  View My Work <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button 
                asChild
                size="lg" 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary/10"
              >
                <a href="#contact">
                  Contact Me
                </a>
              </Button>
            </MotionWrapper>
          </MotionWrapper>
          
          <MotionWrapper delay={0.4} direction="right" className="md:col-span-5 lg:col-span-6 flex justify-center md:justify-end">
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
              {isAnimated && (
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-full"
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
              )}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-kapil-blue-medium p-2 rounded-full">
                  <div className="relative w-60 h-60 md:w-72 md:h-72 lg:w-88 lg:h-88 rounded-full overflow-hidden border-4 border-kapil-blue-dark">
                    {imageError ? (
                      <div className="w-full h-full flex items-center justify-center bg-kapil-blue-medium text-muted-foreground">
                        Image not available
                      </div>
                    ) : (
                      <img 
                        src="/images/profile.jpg" 
                        alt="Kapil Niure" 
                        className="object-cover w-full h-full"
                        onError={() => setImageError(true)}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </MotionWrapper>
        </div>
      </div>
      
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <a 
          href="#about" 
          className="flex flex-col items-center text-sm text-muted-foreground hover:text-primary transition-colors"
          aria-label="Scroll down"
        >
          <span className="mb-2">Scroll Down</span>
          <ArrowRight className="rotate-90 w-4 h-4" />
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
