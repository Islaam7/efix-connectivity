
import React from 'react';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import SearchBar from '@/components/SearchBar';
import { serviceCategories } from '@/data/mockData';
import { Filter } from 'lucide-react';

const Services = () => {
  return (
    <div className="min-h-screen bg-efix-background-light dark:bg-efix-background-dark pb-16">
      <Header />
      
      <main className="container mx-auto max-w-lg">
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Services</h1>
          <SearchBar placeholder="Search for services..." />
          
          <div className="flex items-center justify-between my-4">
            <h2 className="text-lg font-medium">All Services</h2>
            <button className="flex items-center text-sm bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>
          </div>
          
          <div className="space-y-4 mt-6">
            {serviceCategories.map((category) => (
              <div 
                key={category.id}
                className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm"
                style={{ borderLeftColor: category.color, borderLeftWidth: '4px' }}
              >
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mr-4" 
                  style={{ backgroundColor: `${category.color}20` }}
                >
                  {category.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{category.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{category.description}</p>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  $25-$75/hr
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default Services;
