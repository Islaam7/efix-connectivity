
import React from 'react';
import { Bell, Sun, Moon } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [theme, setTheme] = React.useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    }
    return 'light';
  });

  const toggleTheme = () => {
    if (theme === 'light') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setTheme('light');
    }
  };

  if (!isHomePage) {
    return null;
  }

  return (
    <header className="bg-white dark:bg-gray-900 p-4 shadow-sm">
      <div className="container mx-auto max-w-lg flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Hi there! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Welcome to eFix</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full px-4 py-2 flex items-center shadow-md">
            <span className="text-white font-semibold mr-2">120</span>
            <span className="text-yellow-300">⚡</span>
          </div>
          <div className="flex items-center space-x-3">
            <button onClick={toggleTheme} className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
              {theme === 'light' ? (
                <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <Sun className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              )}
            </button>
            <button className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
              <Bell className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
