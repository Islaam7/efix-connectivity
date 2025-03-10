
import React from 'react';
import SearchBar from './SearchBar';

const HeroSection = () => {
  return (
    <div className="relative py-6 px-4">
      <div className="relative z-10">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900 dark:text-white">
          Expert Home Services At Your Fingertips
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Connect with trusted professionals for all your home needs
        </p>
        <SearchBar />
      </div>
      
      {/* Background gradient */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50 to-transparent dark:from-blue-900/20 dark:to-transparent -z-0 rounded-l-full opacity-70"></div>
    </div>
  );
};

export default HeroSection;
