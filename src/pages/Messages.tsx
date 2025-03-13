
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

  // Get badge color for unread messages based on theme
  const getUnreadBadgeClass = () => {
    if (theme.startsWith('dark-')) {
      switch(theme) {
        case 'dark-blue': return 'bg-blue-600';
        case 'dark-emerald': return 'bg-emerald-600';
        case 'dark-rose': return 'bg-rose-600';
        default: return 'bg-primary';
      }
    } else {
      switch(theme) {
        case 'purple': return 'bg-purple-600';
        case 'oceanic': return 'bg-cyan-600';
        case 'sunset': return 'bg-orange-600';
        default: return 'bg-primary';
      }
    }
  };

  return (
    <div className="min-h-screen text-foreground pb-16 theme-aware" data-theme={theme}>
      <header className="bg-card p-4 border-b border-border shadow-sm">
        <div className="container mx-auto max-w-lg">
          <h1 className="text-2xl font-bold">Messages</h1>
        </div>
      </header>
      
      <main className="container mx-auto max-w-lg">
        <div className="p-4">
          <SearchBar placeholder="Search conversations..." />
          
          <div className="mt-6">
            {conversations.map((conversation) => (
              <div 
                key={conversation.id}
                className="flex items-center p-4 border-b border-border hover:bg-accent/30 transition-colors"
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
                    <div className={`absolute -top-1 -right-1 w-5 h-5 ${getUnreadBadgeClass()} text-white text-xs rounded-full flex items-center justify-center`}>
                      {conversation.unread}
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{conversation.name}</h3>
                    <span className="text-xs text-muted-foreground">{conversation.time}</span>
                  </div>
                  <div className="flex items-center">
                    <p className={`text-sm ${conversation.unread > 0 ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
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
