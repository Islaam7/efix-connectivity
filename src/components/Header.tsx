
import React from 'react';
import { Bell } from 'lucide-react';

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-efix-primary text-white font-bold">
          eF
        </div>
        <h1 className="ml-2 text-xl font-semibold">eFix</h1>
      </div>
      <div className="flex items-center space-x-4">
        <button className="relative">
          <Bell className="h-6 w-6 text-gray-700 dark:text-gray-300" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            3
          </span>
        </button>
        <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden">
          <img 
            src="https://randomuser.me/api/portraits/men/32.jpg" 
            alt="User avatar" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
