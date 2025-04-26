
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import EcommercePlatform from "./pages/projects/EcommercePlatform";
import FinanceDashboard from "./pages/projects/FinanceDashboard";
import PortfolioTemplate from "./pages/projects/PortfolioTemplate";
import TravelAgency from "./pages/projects/TravelAgency";
import CoffeeBrand from "./pages/projects/CoffeeBrand";
import FitnessApp from "./pages/projects/FitnessApp";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/projects/ecommerce-platform" element={<EcommercePlatform />} />
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
);

export default App;
