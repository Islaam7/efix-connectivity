
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import SearchBar from '@/components/SearchBar';
import { serviceCategories } from '@/data/mockData';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ServiceCategory from '@/components/ServiceCategory';
import { useThemeStore } from '@/lib/theme';

const Services = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useThemeStore();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category');
  const searchParam = queryParams.get('search');

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryParam ? [categoryParam] : []
  );
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [rating, setRating] = useState(0);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 100]);
    setRating(0);
  };

  const applyFilters = () => {
    setIsFilterOpen(false);
    // Here you'd typically fetch filtered data
  };
  
  // Get button class based on theme
  const getButtonClass = () => {
    if (theme === 'dark') return 'bg-primary text-primary-foreground';
    if (theme.startsWith('dark-')) {
      switch(theme) {
        case 'dark-blue': return 'button-gradient-dark-blue';
        case 'dark-emerald': return 'button-gradient-dark-emerald';
        case 'dark-rose': return 'button-gradient-dark-rose';
        default: return 'bg-primary';
      }
    } else {
      switch(theme) {
        case 'purple': return 'button-gradient-purple';
        case 'oceanic': return 'button-gradient-oceanic';
        case 'sunset': return 'button-gradient-sunset';
        default: return 'bg-primary';
      }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-16 theme-aware" data-theme={theme}>
      {/* Using the standard Header component for consistency */}
      <Header />
      
      <main className="container mx-auto max-w-lg animate-fade-in">
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-5 animate-slide-up">Services</h1>
          
          <div className="mb-4">
            <SearchBar 
              placeholder="Search for services..." 
              onSearch={(query) => navigate(`/services?search=${query}`)}
            />
          </div>
          
          {/* Active filters */}
          {(selectedCategories.length > 0 || searchParam) && (
            <div className="flex flex-wrap gap-2 mb-4 animate-slide-up" style={{animationDelay: '50ms'}}>
              {searchParam && (
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                  Search: {searchParam}
                  <button 
                    className="ml-2" 
                    onClick={() => navigate('/services')}
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
              {selectedCategories.map(catId => {
                const category = serviceCategories.find(c => c.id === catId);
                return category ? (
                  <div 
                    key={catId}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm"
                    style={{ 
                      backgroundColor: `${category.color}20`, 
                      color: category.color 
                    }}
                  >
                    {category.title}
                    <button 
                      className="ml-2" 
                      onClick={() => toggleCategory(catId)}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : null;
              })}
              {(selectedCategories.length > 0 || searchParam) && (
                <button 
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                  onClick={clearFilters}
                >
                  Clear All
                </button>
              )}
            </div>
          )}
          
          <div className="flex items-center justify-between my-4 animate-slide-up" style={{animationDelay: '100ms'}}>
            <h2 className="text-lg font-semibold flex items-center">
              <span className="w-1.5 h-6 bg-primary rounded-full mr-2 opacity-80"></span>
              All Services
            </h2>
            <button 
              className={`flex items-center text-sm px-3 py-2 rounded-lg transition-colors ${
                isFilterOpen
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-accent text-accent-foreground'
              }`}
              onClick={toggleFilter}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>
          </div>
          
          {/* Filter panel */}
          {isFilterOpen && (
            <div className="bg-card rounded-xl p-4 mb-4 shadow-md border border-border animate-slide-up" style={{animationDelay: '150ms'}}>
              <h3 className="font-semibold mb-3">Categories</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {serviceCategories.map(category => (
                  <button
                    key={category.id}
                    className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                      selectedCategories.includes(category.id)
                        ? `bg-[${category.color}] text-white`
                        : `bg-[${category.color}20] text-[${category.color}]`
                    }`}
                    style={{ 
                      backgroundColor: selectedCategories.includes(category.id) 
                        ? category.color 
                        : `${category.color}20`,
                      color: selectedCategories.includes(category.id) 
                        ? 'white' 
                        : category.color
                    }}
                    onClick={() => toggleCategory(category.id)}
                  >
                    {category.title}
                  </button>
                ))}
              </div>
              
              <h3 className="font-semibold mb-3">Price Range</h3>
              <div className="mb-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full accent-primary"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>${priceRange[0]}/hr</span>
                  <span>${priceRange[1]}/hr</span>
                </div>
              </div>
              
              <h3 className="font-semibold mb-3">Minimum Rating</h3>
              <div className="flex items-center mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className={`w-8 h-8 ${
                      star <= rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
                    }`}
                    onClick={() => setRating(star)}
                  >
                    ★
                  </button>
                ))}
              </div>
              
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={clearFilters}
                >
                  Clear All
                </Button>
                <Button
                  className={`flex-1 ${getButtonClass()}`}
                  onClick={applyFilters}
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 gap-4 mt-6">
            {serviceCategories
              .filter(category => selectedCategories.length === 0 || selectedCategories.includes(category.id))
              .filter(category => !searchParam || category.title.toLowerCase().includes(searchParam.toLowerCase()))
              .map((category, index) => (
                <div 
                  key={category.id}
                  className="animate-slide-up" 
                  style={{animationDelay: `${(index + 2) * 75}ms`}}
                >
                  <ServiceCategory 
                    id={category.id}
                    title={category.title}
                    icon={category.icon}
                    description={category.description}
                    color={category.color}
                  />
                </div>
              ))}
              
            {serviceCategories
              .filter(category => selectedCategories.length === 0 || selectedCategories.includes(category.id))
              .filter(category => !searchParam || category.title.toLowerCase().includes(searchParam.toLowerCase()))
              .length === 0 && (
              <div className="text-center py-10 animate-fade-in" style={{animationDelay: '300ms'}}>
                <div className="text-muted-foreground text-5xl mb-4">¯\_(ツ)_/¯</div>
                <h3 className="text-lg font-semibold mb-2">No services found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default Services;
