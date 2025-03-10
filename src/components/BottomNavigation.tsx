
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
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-2 flex items-center justify-around z-10">
      {navItems.map((item) => {
        const isActive = currentPath === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center p-2 ${
              isActive 
                ? 'text-efix-primary' 
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            <div className="w-6 h-6">
              {item.icon}
            </div>
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default BottomNavigation;
