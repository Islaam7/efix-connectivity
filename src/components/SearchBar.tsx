
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type SearchBarProps = {
  placeholder?: string;
  onSearch?: (query: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ 
  placeholder = "Search for a service...", 
  onSearch 
}) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (query.trim()) {
      if (onSearch) {
        onSearch(query);
      } else {
        // Default behavior: navigate to search results
        navigate(`/services?search=${encodeURIComponent(query)}`);
      }
    }
  };

  return (
    <form 
      className="relative w-full" 
      onSubmit={handleSearch}
    >
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type="search"
          className="w-full p-3 pl-10 text-sm rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:border-efix-primary focus:ring-1 focus:ring-efix-primary"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </form>
  );
};

export default SearchBar;
