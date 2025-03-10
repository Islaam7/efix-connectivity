
import React from 'react';
import { Home, Search, Calendar, MessageSquare, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const BottomNavigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    {
      icon: <Home />,
      label: 'Home',
      path: '/',
    },
    {
      icon: <Search />,
      label: 'Services',
      path: '/services',
    },
    {
      icon: <Calendar />,
      label: 'Bookings',
      path: '/bookings',
    },
    {
      icon: <MessageSquare />,
      label: 'Messages',
      path: '/messages',
    },
    {
      icon: <User />,
      label: 'Profile',
      path: '/profile',
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-2 flex items-center justify-around z-10 shadow-lg">
      {navItems.map((item) => {
        const isActive = currentPath === item.path || currentPath.startsWith(item.path + '/');
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center p-2 transition-colors ${
              isActive 
                ? 'text-blue-600 dark:text-blue-500' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <div className={`w-6 h-6 mb-1 ${isActive ? 'animate-pulse' : ''}`}>
              {item.icon}
            </div>
            <span className={`text-xs ${isActive ? 'font-semibold' : ''}`}>{item.label}</span>
            {isActive && (
              <div className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-500 rounded-full mt-1"></div>
            )}
          </Link>
        );
      })}
    </div>
  );
};

export default BottomNavigation;
