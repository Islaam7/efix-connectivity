
import React from 'react';
import SearchBar from './SearchBar';
import HeroSlider from './HeroSlider';

const HeroSection = () => {
  return (
    <div className="relative mb-4">
      {/* Glass-effect SearchBar */}
      <div className="absolute top-4 left-0 right-0 z-10 px-4">
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-full shadow-lg p-1">
          <SearchBar />
        </div>
      </div>
      
      {/* Hero Slider */}
      <div className="rounded-b-3xl overflow-hidden">
        <HeroSlider />
      </div>
    </div>
  );
};

export default HeroSection;
