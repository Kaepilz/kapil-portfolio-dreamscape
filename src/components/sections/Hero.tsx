
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Hero = () => {
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
          <div className="md:col-span-7 lg:col-span-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Hi, I'm <span className="text-kapil-red">Kapil</span>
              <span className="text-kapil-red">.</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-medium mb-6 text-foreground/80">
              Web Developer <span className="text-kapil-red">&</span> Designer
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              I craft beautiful, functional websites and digital experiences 
              that help businesses grow and succeed in the digital world.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                asChild
                size="lg" 
                className="bg-kapil-red hover:bg-kapil-red/90 text-white font-medium"
              >
                <a href="#projects">
                  View My Work <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button 
                asChild
                size="lg" 
                variant="outline" 
                className="border-kapil-red text-kapil-red hover:bg-kapil-red/10"
              >
                <a href="#contact">
                  Contact Me
                </a>
              </Button>
            </div>
          </div>
          
          <div className="md:col-span-5 lg:col-span-6 flex justify-center md:justify-end animate-fade-in">
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
              <div className="absolute inset-0 bg-gradient-to-br from-kapil-red/20 to-blue-500/20 rounded-full animate-pulse" style={{ animationDuration: '4s' }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-kapil-blue-medium p-2 rounded-full">
                  <div className="relative w-60 h-60 md:w-72 md:h-72 lg:w-88 lg:h-88 rounded-full overflow-hidden border-4 border-kapil-blue-dark">
                    <Avatar className="w-full h-full">
                      <AvatarImage 
                        src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=687&auto=format&fit=crop" 
                        alt="Kapil Niure" 
                        className="object-cover w-full h-full"
                      />
                      <AvatarFallback className="bg-kapil-blue-light text-4xl">KN</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a 
          href="#about" 
          className="flex flex-col items-center text-sm text-muted-foreground hover:text-kapil-red transition-colors"
          aria-label="Scroll down"
        >
          <span className="mb-2">Scroll Down</span>
          <ArrowRight className="rotate-90 w-4 h-4" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
