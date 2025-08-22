
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import { LoadingScreen } from "@/components/LoadingScreen";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ModeToggle } from "@/components/ModeToggle";
import { FloatingShapes } from "@/components/FloatingShapes";
import { Skills } from "@/components/sections/Skills";
import { ClientOnly } from "@/components/ClientOnly";
import { AIAssistant } from "@/components/AIAssistant";
import { LanguageToggle } from "@/components/LanguageToggle";
import { SEOManager } from "@/components/SEOManager";
import { PerformanceMonitor, BehaviorTracker } from "@/components/Analytics";
import { SecurityHeaders } from "@/components/SecurityHeaders";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Update document title and meta tags for SEO
    document.title = "Kapil Niure - Web Developer & Designer | Portfolio";
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Kapil Niure - Professional Web Developer & Designer specializing in React, TypeScript, and modern web technologies. View my portfolio and get in touch.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Kapil Niure - Professional Web Developer & Designer specializing in React, TypeScript, and modern web technologies. View my portfolio and get in touch.';
      document.head.appendChild(meta);
    }

    // Add keywords meta tag
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = 'kapil niure, website, portfolio, web developer, designer, react, typescript, javascript, frontend, fullstack';
      document.head.appendChild(meta);
    }
  }, [isLoading]);

  return (
    <>
      <SEOManager />
      <SecurityHeaders />
      <PerformanceMonitor />
      <BehaviorTracker />
      
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <motion.div 
          className="min-h-screen flex flex-col relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Enhanced background effects */}
          <FloatingShapes />
          <ScrollProgress />
          
          {/* Fixed elements */}
          <ModeToggle />
          <LanguageToggle />
          <Navbar />
          
          <main className="flex-grow relative z-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <Hero />
              <About />
              <ClientOnly>
                <Skills />
              </ClientOnly>
              <Services />
              <Projects />
              <Contact />
            </motion.div>
          </main>
          
          <Footer />
          <AIAssistant />
        </motion.div>
      )}
    </>
  );
};

export default Index;
