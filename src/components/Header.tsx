
import React from 'react';
import { Bell } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-black text-white p-4">
      <div className="container mx-auto max-w-lg flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">Hi there! 👋</h1>
          <p className="text-gray-400 text-sm">Welcome to eFix</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-zinc-900 rounded-full px-4 py-2 flex items-center">
            <span className="text-pink-500 font-semibold mr-2">120</span>
            <span className="text-yellow-500">⚡</span>
          </div>
          <button className="relative">
            <Bell className="h-6 w-6 text-gray-300" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
