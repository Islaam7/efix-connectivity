
import React from 'react';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import SearchBar from '@/components/SearchBar';
import { Circle } from 'lucide-react';
import { useThemeStore } from '@/lib/theme';

const Messages = () => {
  const { theme } = useThemeStore();
  
  const conversations = [
    {
      id: '1',
      name: 'John Smith',
      lastMessage: "I'll be there in 10 minutes",
      time: '10:25 AM',
      unread: 2,
      image: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      lastMessage: 'Thanks for scheduling the appointment',
      time: 'Yesterday',
      unread: 0,
      image: 'https://randomuser.me/api/portraits/women/1.jpg'
    },
    {
      id: '3',
      name: 'David Wilson',
      lastMessage: 'The job has been completed.',
      time: 'Oct 5',
      unread: 0,
      image: 'https://randomuser.me/api/portraits/men/2.jpg'
    },
    {
      id: '4',
      name: 'Lisa Brown',
      lastMessage: 'Can we reschedule for next week?',
      time: 'Oct 3',
      unread: 0,
      image: 'https://randomuser.me/api/portraits/women/2.jpg'
    }
  ];
  
  // Determine appropriate background and text colors based on theme
  const getThemeClasses = () => {
    let bgClass = 'bg-white dark:bg-gray-900';
    let borderClass = 'border-gray-200 dark:border-gray-700';
    
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
          borderClass = 'border-gray-700';
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

  const { bgClass, borderClass } = getThemeClasses();
  
  // Get appropriate primary color based on theme
  const getPrimaryColorClass = () => {
    if (theme.startsWith('dark-')) {
      switch(theme) {
        case 'dark-blue': return 'text-blue-400 fill-blue-400';
        case 'dark-emerald': return 'text-emerald-400 fill-emerald-400';
        case 'dark-rose': return 'text-rose-400 fill-rose-400';
        default: return 'text-blue-500 fill-blue-500';
      }
    } else {
      switch(theme) {
        case 'purple': return 'text-purple-600 fill-purple-600 dark:text-purple-400 dark:fill-purple-400';
        case 'oceanic': return 'text-cyan-600 fill-cyan-600 dark:text-cyan-400 dark:fill-cyan-400';
        case 'sunset': return 'text-orange-600 fill-orange-600 dark:text-orange-400 dark:fill-orange-400';
        default: return 'text-blue-600 fill-blue-600 dark:text-blue-400 dark:fill-blue-400';
      }
    }
  };

  const primaryColorClass = getPrimaryColorClass();

  return (
    <div className={`min-h-screen ${bgClass} text-foreground pb-16 theme-aware`} data-theme={theme}>
      <Header />
      
      <main className="container mx-auto max-w-lg">
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Messages</h1>
          <SearchBar placeholder="Search conversations..." />
          
          <div className="mt-6">
            {conversations.map((conversation) => (
              <div 
                key={conversation.id}
                className={`flex items-center p-4 border-b ${borderClass}`}
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                    <img 
                      src={conversation.image} 
                      alt={conversation.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {conversation.unread > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                      {conversation.unread}
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{conversation.name}</h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{conversation.time}</span>
                  </div>
                  <div className="flex items-center">
                    <p className={`text-sm ${conversation.unread > 0 ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
                      {conversation.lastMessage}
                    </p>
                    {conversation.unread > 0 && (
                      <Circle className={`w-2 h-2 ml-1 ${primaryColorClass}`} />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default Messages;
