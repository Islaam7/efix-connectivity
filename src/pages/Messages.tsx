
import React from 'react';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import SearchBar from '@/components/SearchBar';
import { Circle } from 'lucide-react';

const Messages = () => {
  const conversations = [
    {
      id: '1',
      name: 'John Smith',
      lastMessage: 'I'll be there in 10 minutes',
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

  return (
    <div className="min-h-screen bg-efix-background-light dark:bg-efix-background-dark pb-16">
      <Header />
      
      <main className="container mx-auto max-w-lg">
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Messages</h1>
          <SearchBar placeholder="Search conversations..." />
          
          <div className="mt-6">
            {conversations.map((conversation) => (
              <div 
                key={conversation.id}
                className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700"
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
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-efix-primary text-white text-xs rounded-full flex items-center justify-center">
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
                      <Circle className="w-2 h-2 ml-1 fill-efix-primary text-efix-primary" />
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
