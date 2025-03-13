
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Bookings from "./pages/Bookings";
import BookingNew from "./pages/BookingNew";
import BookingDetails from "./pages/BookingDetails";
import BookingReschedule from "./pages/BookingReschedule";
import BookingReview from "./pages/BookingReview";
import BookingContact from "./pages/BookingContact";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import ProfessionalProfile from "./pages/ProfessionalProfile";
import NotFound from "./pages/NotFound";
import ProfessionalList from "./components/ProfessionalList";
import ChatbotButton from "./components/ChatbotButton";
import { useEffect } from "react";
import { initializeTheme, useThemeStore } from "./lib/theme";

const queryClient = new QueryClient();

const App = () => {
  // Initialize theme on app start
  useEffect(() => {
    if (typeof window !== 'undefined') {
      initializeTheme();
      
      // Fix for theme issues by adding the theme-aware class to body
      document.body.classList.add('theme-aware');
      
      // Apply smooth transitions to the entire app
      document.documentElement.style.transition = "background-color 0.3s ease, color 0.3s ease";
    }
  }, []);
  
  const { theme } = useThemeStore();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="theme-aware" data-theme={theme}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:serviceId/professionals" element={<ProfessionalList />} />
              <Route path="/professionals" element={<ProfessionalList title="All Professionals" showAllProfessionals={true} />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/bookings/new" element={<BookingNew />} />
              <Route path="/bookings/:bookingId" element={<BookingDetails />} />
              <Route path="/bookings/:bookingId/reschedule" element={<BookingReschedule />} />
              <Route path="/bookings/:bookingId/review" element={<BookingReview />} />
              <Route path="/bookings/:bookingId/contact" element={<BookingContact />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/professionals/:id" element={<ProfessionalProfile />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <ChatbotButton />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
