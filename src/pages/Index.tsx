
import { Helmet } from 'react-helmet-async';
import Navbar from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { EnhancedContact } from "@/components/sections/EnhancedContact";
import Projects from "@/components/sections/Projects";
import { AIAssistant } from "@/components/AIAssistant";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Kapil Niure - Full-Stack Developer & UI/UX Designer | Tokyo</title>
        <meta name="description" content="16-year-old passionate developer from Tokyo creating beautiful and functional digital experiences with React, TypeScript, and modern web technologies." />
        <meta name="keywords" content="Kapil Niure, Full-Stack Developer, UI/UX Designer, React, TypeScript, Web Development, Tokyo, Japan" />
        <meta name="author" content="Kapil Niure" />
        <meta property="og:title" content="Kapil Niure - Full-Stack Developer & UI/UX Designer" />
        <meta property="og:description" content="16-year-old passionate developer from Tokyo creating beautiful and functional digital experiences." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kapilniure.dev" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kapil Niure - Full-Stack Developer & UI/UX Designer" />
        <meta name="twitter:description" content="16-year-old passionate developer from Tokyo creating beautiful digital experiences." />
        <link rel="canonical" href="https://kapilniure.dev" />
      </Helmet>
      
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <EnhancedContact />
        </main>
        <AIAssistant />
      </div>
    </>
  );
};

export default Index;
