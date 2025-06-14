
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import HeroSection from '@/components/HeroSection';
import ServiceCategory from '@/components/ServiceCategory';
import HowItWorks from '@/components/HowItWorks';
import ProfessionalList from '@/components/ProfessionalList';
import FaultDetection from '@/components/FaultDetection';
import ChatbotButton from '@/components/ChatbotButton';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import { useNavigate } from 'react-router-dom';
import { serviceCategories } from '@/data/mockData';

const Index = () => {
  const { user } = useAuth();
  const { profile } = useProfile();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user needs to complete onboarding
    if (user && profile && !profile.onboarding_completed) {
      navigate('/onboarding');
    }
  }, [user, profile, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-efix-background-light to-blue-50 dark:from-efix-background-dark dark:to-gray-900">
      <Header />
      
      <main className="container mx-auto max-w-lg pb-16">
        <HeroSection />
        
        <div className="py-4 space-y-4">
          <h2 className="text-xl font-semibold mb-4">Our Services</h2>
          {serviceCategories.map((category) => (
            <ServiceCategory
              key={category.id}
              id={category.id}
              title={category.title}
              icon={category.icon}
              description={category.description}
              color={category.color}
            />
          ))}
        </div>
        
        <HowItWorks />
        <ProfessionalList />
        <FaultDetection />
      </main>
      
      <BottomNavigation />
      <ChatbotButton />
    </div>
  );
};

export default Index;
