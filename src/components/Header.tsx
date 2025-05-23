
import React from 'react';
import { Bell } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useThemeStore } from '@/lib/theme';

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { theme } = useThemeStore();
  
  // Determine background color based on theme
  const getHeaderStyles = () => {
    let bgClass = 'bg-card';
    let borderClass = 'border-border';
    let textClass = 'text-foreground';
    
    if (theme.startsWith('dark-')) {
      switch(theme) {
        case 'dark-blue':
          bgClass = 'bg-[#151b35]';
          borderClass = 'border-blue-900/60';
          break;
        case 'dark-emerald':
          bgClass = 'bg-[#0a1f1a]';
          borderClass = 'border-emerald-900/60';
          break;
        case 'dark-rose':
          bgClass = 'bg-[#200f16]';
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
    
    return { bgClass, borderClass, textClass };
  };
  
  // Get color for hi there text
  const getHiThereColor = () => {
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
        case 'oceanic': return 'text-blue-600 dark:text-blue-400';
        case 'sunset': return 'text-orange-600 dark:text-orange-400';
        default: return 'text-blue-600';
      }
    }
  };
  
  // Get button gradient
  const getButtonGradient = () => {
    if (theme.startsWith('dark-')) {
      switch(theme) {
        case 'dark-blue': return 'bg-gradient-to-r from-blue-600 to-blue-500';
        case 'dark-emerald': return 'bg-gradient-to-r from-emerald-600 to-emerald-500';
        case 'dark-rose': return 'bg-gradient-to-r from-rose-600 to-rose-500';
        default: return 'bg-gradient-to-r from-blue-600 to-blue-500';
      }
    } else {
      switch(theme) {
        case 'purple': return 'bg-gradient-to-r from-purple-600 to-indigo-600';
        case 'oceanic': return 'bg-gradient-to-r from-blue-500 to-cyan-500';
        case 'sunset': return 'bg-gradient-to-r from-orange-500 to-amber-500';
        default: return 'bg-gradient-to-r from-blue-500 to-indigo-600';
      }
    }
  };
  
  // Get notification badge color based on theme
  const getNotificationBadgeColor = () => {
    if (theme.startsWith('dark-')) {
      switch(theme) {
        case 'dark-blue': return 'bg-blue-600';
        case 'dark-emerald': return 'bg-emerald-600';
        case 'dark-rose': return 'bg-rose-600';
        default: return 'bg-blue-600';
      }
    } else {
      switch(theme) {
        case 'purple': return 'bg-purple-600';
        case 'oceanic': return 'bg-blue-600';
        case 'sunset': return 'bg-orange-600';
        default: return 'bg-blue-600';
      }
    }
  };

  const { bgClass, borderClass } = getHeaderStyles();
  const hiThereColor = getHiThereColor();
  const buttonGradient = getButtonGradient();
  const notificationBadgeColor = getNotificationBadgeColor();

  if (!isHomePage) {
    return null;
  }

  return (
    <header className={`${bgClass} p-4 shadow-sm border-b ${borderClass} theme-aware`} data-theme={theme}>
      <div className="container mx-auto max-w-lg flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">
            <span className={hiThereColor}>Hi there!</span> 
            <span className="ml-2 text-yellow-500">👋</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Welcome to eFix</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className={`${buttonGradient} rounded-full px-4 py-2 flex items-center shadow-md`}>
            <span className="text-white font-semibold mr-2">120</span>
            <span className="text-yellow-300">⚡</span>
          </div>
          <div className="flex items-center">
            <button className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
              <Bell className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              <span className={`absolute -top-1 -right-1 w-4 h-4 ${notificationBadgeColor} text-white text-xs rounded-full flex items-center justify-center`}>
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
