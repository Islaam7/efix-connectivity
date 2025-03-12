
import React from 'react';
import { Home, Search, Calendar, MessageSquare, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useThemeStore } from '@/lib/theme';

const BottomNavigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { theme } = useThemeStore();

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

  // تحديد لون الخلفية والنص بناءً على السمة
  const getNavBarStyles = () => {
    let bgClass = 'bg-white dark:bg-gray-900';
    let borderClass = 'border-gray-200 dark:border-gray-800';
    
    // تخصيص الألوان حسب السمة
    if (theme.startsWith('dark-')) {
      switch(theme) {
        case 'dark-blue':
          bgClass = 'bg-[#151b35] border-blue-900';
          borderClass = 'border-blue-900/60';
          break;
        case 'dark-emerald':
          bgClass = 'bg-[#0a1f1a] border-emerald-900';
          borderClass = 'border-emerald-900/60';
          break;
        case 'dark-rose':
          bgClass = 'bg-[#200f16] border-rose-900';
          borderClass = 'border-rose-900/60';
          break;
        default:
          bgClass = 'bg-gray-900';
          borderClass = 'border-gray-800';
      }
    } else if (theme !== 'light') {
      switch(theme) {
        case 'purple':
          bgClass = 'bg-purple-50 dark:bg-purple-900';
          borderClass = 'border-purple-200 dark:border-purple-800';
          break;
        case 'oceanic':
          bgClass = 'bg-blue-50 dark:bg-blue-900';
          borderClass = 'border-blue-200 dark:border-blue-800';
          break;
        case 'sunset':
          bgClass = 'bg-orange-50 dark:bg-orange-900';
          borderClass = 'border-orange-200 dark:border-orange-800';
          break;
      }
    }
    
    return { bgClass, borderClass };
  };

  const { bgClass, borderClass } = getNavBarStyles();

  // تخصيص لون العناصر النشطة حسب السمة
  const getActiveColor = () => {
    if (theme === 'dark' || theme === 'light') {
      return 'text-blue-600 dark:text-blue-500';
    }
    
    if (theme.startsWith('dark-')) {
      switch(theme) {
        case 'dark-blue': return 'text-blue-400';
        case 'dark-emerald': return 'text-emerald-400';
        case 'dark-rose': return 'text-rose-400';
        default: return 'text-blue-500';
      }
    } else {
      switch(theme) {
        case 'purple': return 'text-purple-600 dark:text-purple-400';
        case 'oceanic': return 'text-cyan-600 dark:text-cyan-400';
        case 'sunset': return 'text-orange-600 dark:text-orange-400';
        default: return 'text-blue-600 dark:text-blue-500';
      }
    }
  };
  
  const getInactiveColor = () => {
    return 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300';
  };

  const getActiveDotColor = () => {
    if (theme === 'dark' || theme === 'light') {
      return 'bg-blue-600 dark:bg-blue-500';
    }
    
    if (theme.startsWith('dark-')) {
      switch(theme) {
        case 'dark-blue': return 'bg-blue-400';
        case 'dark-emerald': return 'bg-emerald-400';
        case 'dark-rose': return 'bg-rose-400';
        default: return 'bg-blue-500';
      }
    } else {
      switch(theme) {
        case 'purple': return 'bg-purple-600 dark:bg-purple-400';
        case 'oceanic': return 'bg-cyan-600 dark:bg-cyan-400';
        case 'sunset': return 'bg-orange-600 dark:bg-orange-400';
        default: return 'bg-blue-600 dark:bg-blue-500';
      }
    }
  };

  return (
    <div className={`fixed bottom-0 left-0 right-0 ${bgClass} border-t ${borderClass} p-2 flex items-center justify-around z-10 shadow-lg theme-aware`} data-theme={theme}>
      {navItems.map((item) => {
        const isActive = currentPath === item.path || currentPath.startsWith(item.path + '/');
        const activeColorClass = getActiveColor();
        const inactiveColorClass = getInactiveColor();
        const activeDotClass = getActiveDotColor();
        
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center p-2 transition-colors ${
              isActive ? activeColorClass : inactiveColorClass
            }`}
          >
            <div className={`w-6 h-6 mb-1 ${isActive ? 'animate-pulse-subtle' : ''}`}>
              {item.icon}
            </div>
            <span className={`text-xs ${isActive ? 'font-semibold' : ''}`}>{item.label}</span>
            {isActive && (
              <div className={`w-1.5 h-1.5 ${activeDotClass} rounded-full mt-1`}></div>
            )}
          </Link>
        );
      })}
    </div>
  );
};

export default BottomNavigation;
