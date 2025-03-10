
import React from 'react';
import SearchBar from './SearchBar';
import HeroSlider from './HeroSlider';

const HeroSection = () => {
  return (
    <div className="relative">
      {/* Glass-effect SearchBar */}
      <div className="absolute top-4 left-0 right-0 z-10 px-4">
        <SearchBar />
      </div>
      
      {/* Hero Slider */}
      <HeroSlider />
    </div>
  );
};

export default HeroSection;
