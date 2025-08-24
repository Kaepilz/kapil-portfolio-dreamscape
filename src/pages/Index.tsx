
import { Helmet } from 'react-helmet-async';
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Roadmap } from "@/components/sections/Roadmap";
import { Feedback } from "@/components/sections/Feedback";
import { EnhancedContact } from "@/components/sections/EnhancedContact";
import Projects from "@/components/sections/Projects";
import Services from "@/components/sections/Services";
import Footer from "@/components/Footer";
import { FloatingShapes } from "@/components/FloatingShapes";
import { ChatBot } from "@/components/ChatBot";
import { PrivacyConsent } from "@/components/PrivacyConsent";
import { EnhancedAnalytics } from "@/components/EnhancedAnalytics";
import { LoadingScreen } from "@/components/LoadingScreen";
import { SecurityHeaders } from "@/components/SecurityHeaders";
import { useState } from 'react';

const Index = () => {
  const [showContent, setShowContent] = useState(false);
  const [consents, setConsents] = useState({
    analytics: false,
    marketing: false,
    chatbot: false
  });

  const handleAnalyticsEvent = (category: string, action: string, label?: string) => {
    // Analytics event handling - will be processed by EnhancedAnalytics component
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('analytics-event', {
        detail: { category, action, label }
      }));
    }
  };

  const handleConsentChange = (newConsents: typeof consents) => {
    setConsents(newConsents);
  };

  if (!showContent) {
    return <LoadingScreen onComplete={() => setShowContent(true)} />;
  }

  return (
    <>
      <LoadingScreen />
      <SecurityHeaders />
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
        <FloatingShapes />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Roadmap />
          <Services />
          <Projects />
          <Feedback onAnalyticsEvent={handleAnalyticsEvent} />
          <EnhancedContact />
        </main>
        <Footer />
        <ChatBot onAnalyticsEvent={handleAnalyticsEvent} />
        <PrivacyConsent onConsentChange={handleConsentChange} />
        <EnhancedAnalytics consents={consents} />
      </div>
    </>
  );
};

export default Index;
