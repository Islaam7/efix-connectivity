
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ServiceCategory from '@/components/ServiceCategory';
import ProfessionalCard from '@/components/ProfessionalCard';
import BottomNavigation from '@/components/BottomNavigation';
import FaultDetection from '@/components/FaultDetection';
import { serviceCategories, professionals } from '@/data/mockData';
import { ArrowRight } from 'lucide-react';
import { useThemeStore } from '@/lib/theme';

const Index = () => {
  const navigate = useNavigate();
  const { theme } = useThemeStore();

  const handleViewAllServices = () => {
    navigate('/services');
  };

  const handleViewAllProfessionals = () => {
    navigate('/professionals');
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-16 theme-aware" data-theme={theme}>
      <Header />
      
      <main className="container mx-auto max-w-lg">
        <HeroSection />
        
        {/* Service Categories */}
        <section className="px-4 py-6 animate-fade-in" style={{animationDelay: '0.1s'}}>
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-bold flex items-center">
              <span className="w-1.5 h-6 bg-primary rounded-full mr-2 opacity-80"></span>
              Service Categories
            </h2>
            <button 
              className="text-primary text-sm font-medium flex items-center hover:text-primary/80 transition-colors press-effect"
              onClick={handleViewAllServices}
              aria-label="View all services"
            >
              View All
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          
          <div className="flex space-x-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-none">
            {serviceCategories.map((category, index) => (
              <div key={category.id} className="animate-slide-up" style={{animationDelay: `${100 + index * 100}ms`, minWidth: '280px'}}>
                <ServiceCategory
                  id={category.id}
                  title={category.title}
                  icon={category.icon}
                  description={category.description}
                  color={category.color}
                />
              </div>
            ))}
          </div>
        </section>
        
        {/* Fault Detection Section */}
        <div className="animate-fade-in" style={{animationDelay: '0.3s'}}>
          <FaultDetection />
        </div>
        
        {/* Top Professionals */}
        <section className="px-4 py-5 animate-fade-in" style={{animationDelay: '0.4s'}}>
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-bold flex items-center">
              <span className="w-1.5 h-6 bg-primary rounded-full mr-2 opacity-80"></span>
              Top Professionals
            </h2>
            <button 
              className="text-primary text-sm font-medium flex items-center hover:text-primary/80 transition-colors press-effect"
              onClick={handleViewAllProfessionals}
              aria-label="View all professionals"
            >
              View All
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          
          <div className="space-y-4">
            {professionals.slice(0, 3).map((professional, index) => (
              <div key={professional.id} className="animate-slide-up" style={{animationDelay: `${400 + index * 100}ms`}}>
                <ProfessionalCard
                  {...professional}
                  onClick={() => navigate(`/professionals/${professional.id}`)}
                />
              </div>
            ))}
          </div>
        </section>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default Index;
