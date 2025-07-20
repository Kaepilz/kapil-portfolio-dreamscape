
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import { ModeToggle } from "@/components/ModeToggle";
import { AnimatedBackground } from "@/components/AnimatedBackground";

const Index = () => {
  useEffect(() => {
    // Update document title
    document.title = "Kapil - Web Developer & Designer";
    
    // Check if there's a hash in the URL and scroll to that section
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
    
    // Smooth scroll for anchor links
    const handleClick = function(e: Event) {
      e.preventDefault();
      
      const href = this.getAttribute('href');
      if (href?.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          window.history.pushState({}, '', href);
          target.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    };
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleClick);
    });
    
    // Intersection Observer for animation on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    // Observe all section headings and important elements
    document.querySelectorAll('section h2, .animate-on-scroll').forEach(el => {
      el.classList.remove('animate-fade-in');
      observer.observe(el);
    });
    
    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleClick);
      });
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative">
      <AnimatedBackground />
      <ModeToggle />
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <Services />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
