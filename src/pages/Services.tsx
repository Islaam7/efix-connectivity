
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BottomNavigation from '@/components/BottomNavigation';
import SearchBar from '@/components/SearchBar';
import { serviceCategories } from '@/data/mockData';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ServiceCategory from '@/components/ServiceCategory';

const Services = () => {
  const navigate = useNavigate();
  const location = useLocation();
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f9fa] to-[#e9ecef] dark:from-gray-900 dark:to-gray-800 pb-16">
      {/* Custom header for this page */}
      <div className="bg-white dark:bg-gray-900 shadow-sm">
        <div className="container mx-auto max-w-lg px-4 py-3 flex items-center">
          <h1 className="text-lg font-bold">Services</h1>
        </div>
      </div>
      
      <main className="container mx-auto max-w-lg">
        <div className="p-4">
          <div className="mb-4">
            <SearchBar 
              placeholder="Search for services..." 
              onSearch={(query) => navigate(`/services?search=${query}`)}
            />
          </div>
          
          {/* Active filters */}
          {(selectedCategories.length > 0 || searchParam) && (
            <div className="flex flex-wrap gap-2 mb-4">
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
          
          <div className="flex items-center justify-between my-4">
            <h2 className="text-lg font-bold">All Services</h2>
            <button 
              className={`flex items-center text-sm px-3 py-2 rounded-lg transition-colors ${
                isFilterOpen
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300'
              }`}
              onClick={toggleFilter}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>
          </div>
          
          {/* Filter panel */}
          {isFilterOpen && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 shadow-md">
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
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
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
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600"
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
              .map((category) => (
                <ServiceCategory 
                  key={category.id}
                  id={category.id}
                  title={category.title}
                  icon={category.icon}
                  description={category.description}
                  color={category.color}
                />
              ))}
              
            {serviceCategories
              .filter(category => selectedCategories.length === 0 || selectedCategories.includes(category.id))
              .filter(category => !searchParam || category.title.toLowerCase().includes(searchParam.toLowerCase()))
              .length === 0 && (
              <div className="text-center py-10">
                <div className="text-gray-400 dark:text-gray-500 text-5xl mb-4">¯\_(ツ)_/¯</div>
                <h3 className="text-lg font-semibold mb-2">No services found</h3>
                <p className="text-gray-500 dark:text-gray-400">
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
