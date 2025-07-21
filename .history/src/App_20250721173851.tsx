
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import EcommercePlatform from "./pages/projects/EcommercePlatform";
import FinanceDashboard from "./pages/projects/FinanceDashboard";
import PortfolioTemplate from "./pages/projects/PortfolioTemplate";
import TravelAgency from "./pages/projects/TravelAgency";
import CoffeeBrand from "./pages/projects/CoffeeBrand";
import FitnessApp from "./pages/projects/FitnessApp";
import { CustomCursor } from "@/components/CustomCursor";

const queryClient = new QueryClient();

// ScrollToTop component to handle scrolling to top on navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  // This will run only once when the component mounts
  React.useEffect(() => {
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);

  return null;
};

const App = () => (
  <div className="cursor-none">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <CustomCursor />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/projects/ecommerce-platform" element={<EcommercePlatform />} />
            <Route path="/projects/e-commerce-platform" element={<EcommercePlatform />} />
            <Route path="/projects/finance-dashboard" element={<FinanceDashboard />} />
            <Route path="/projects/portfolio-website-template" element={<PortfolioTemplate />} />
            <Route path="/projects/travel-agency-website" element={<TravelAgency />} />
            <Route path="/projects/coffee-brand-identity" element={<CoffeeBrand />} />
            <Route path="/projects/fitness-app-interface" element={<FitnessApp />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </div>
);

export default App;
