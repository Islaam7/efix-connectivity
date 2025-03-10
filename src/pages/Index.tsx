
import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ServiceCategory from '@/components/ServiceCategory';
import ProfessionalCard from '@/components/ProfessionalCard';
import BottomNavigation from '@/components/BottomNavigation';
import { serviceCategories, professionals } from '@/data/mockData';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-efix-background-light dark:bg-efix-background-dark pb-16">
      <Header />
      
      <main className="container mx-auto max-w-lg">
        <HeroSection />
        
        {/* Service Categories */}
        <section className="px-4 py-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Service Categories</h2>
            <button className="text-efix-primary text-sm font-medium flex items-center">
              View All
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          
          <div className="flex space-x-4 overflow-x-auto pb-4 -mx-4 px-4">
            {serviceCategories.map((category) => (
              <ServiceCategory
                key={category.id}
                title={category.title}
                icon={category.icon}
                description={category.description}
                color={category.color}
                onClick={() => console.log(`Clicked on ${category.title}`)}
              />
            ))}
          </div>
        </section>
        
        {/* Top Professionals */}
        <section className="px-4 py-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Top Professionals</h2>
            <button className="text-efix-primary text-sm font-medium flex items-center">
              View All
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          
          <div className="space-y-4">
            {professionals.map((professional) => (
              <ProfessionalCard
                key={professional.id}
                {...professional}
                onClick={() => console.log(`Clicked on ${professional.name}`)}
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
