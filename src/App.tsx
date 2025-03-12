
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Bookings from "./pages/Bookings";
import BookingNew from "./pages/BookingNew";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import ProfessionalProfile from "./pages/ProfessionalProfile";
import NotFound from "./pages/NotFound";
import ProfessionalList from "./components/ProfessionalList";
import ChatbotButton from "./components/ChatbotButton";
import { useEffect } from "react";
import { initializeTheme } from "./lib/theme";

const queryClient = new QueryClient();

const App = () => {
  // Initialize theme on app start
  useEffect(() => {
    initializeTheme();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:serviceId/professionals" element={<ProfessionalList />} />
            <Route path="/professionals" element={<ProfessionalList title="All Professionals" showAllProfessionals={true} />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/bookings/new" element={<BookingNew />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/professionals/:id" element={<ProfessionalProfile />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ChatbotButton />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
