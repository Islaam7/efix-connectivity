
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ServiceCategory from '@/components/ServiceCategory';
import ProfessionalCard from '@/components/ProfessionalCard';
import BottomNavigation from '@/components/BottomNavigation';
import { serviceCategories, professionals } from '@/data/mockData';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const handleViewAllServices = () => {
    navigate('/services');
  };

  const handleViewAllProfessionals = () => {
    navigate('/services');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f9fa] to-[#e9ecef] dark:from-gray-900 dark:to-gray-800 pb-16">
      <Header />
      
      <main className="container mx-auto max-w-lg">
        <HeroSection />
        
        {/* Service Categories */}
        <section className="px-4 py-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Service Categories</h2>
            <button 
              className="text-blue-600 text-sm font-medium flex items-center hover:text-blue-700 transition-colors"
              onClick={handleViewAllServices}
            >
              View All
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          
          <div className="flex space-x-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-none">
            {serviceCategories.map((category) => (
              <ServiceCategory
                key={category.id}
                title={category.title}
                icon={category.icon}
                description={category.description}
                color={category.color}
                onClick={() => navigate(`/services?category=${category.id}`)}
              />
            ))}
          </div>
        </section>
        
        {/* Top Professionals */}
        <section className="px-4 py-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Top Professionals</h2>
            <button 
              className="text-blue-600 text-sm font-medium flex items-center hover:text-blue-700 transition-colors"
              onClick={handleViewAllProfessionals}
            >
              View All
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          
          <div className="space-y-4">
            {professionals.slice(0, 3).map((professional) => (
              <ProfessionalCard
                key={professional.id}
                {...professional}
                onClick={() => navigate(`/professionals/${professional.id}`)}
              />
            ))}
          </div>
        </section>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default Index;
