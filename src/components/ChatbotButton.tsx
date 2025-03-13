
import React, { useState } from 'react';
import { Bot, X } from 'lucide-react';
import ChatbotModal from './ChatbotModal';
import { useThemeStore } from '@/lib/theme';

const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useThemeStore();

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  
  // Get theme-specific gradient for the button
  const getButtonGradient = () => {
    if (theme.startsWith('dark-')) {
      switch(theme) {
        case 'dark-blue': 
          return 'bg-blue-600 hover:bg-blue-700';
        case 'dark-emerald': 
          return 'bg-emerald-600 hover:bg-emerald-700';
        case 'dark-rose': 
          return 'bg-rose-600 hover:bg-rose-700';
        default: 
          return 'bg-blue-600 hover:bg-blue-700';
      }
    } else {
      switch(theme) {
        case 'purple': 
          return 'bg-purple-600 hover:bg-purple-700';
        case 'oceanic': 
          return 'bg-cyan-600 hover:bg-cyan-700';
        case 'sunset': 
          return 'bg-orange-600 hover:bg-orange-700';
        default: 
          return 'bg-blue-600 hover:bg-blue-700';
      }
    }
  };

  const buttonGradient = getButtonGradient();

  // Get theme-specific header for chat modal
  const getChatHeaderClass = () => {
    if (theme.startsWith('dark-')) {
      switch(theme) {
        case 'dark-blue': 
          return 'bg-blue-600';
        case 'dark-emerald': 
          return 'bg-emerald-600';
        case 'dark-rose': 
          return 'bg-rose-600';
        default: 
          return 'bg-blue-600';
      }
    } else {
      switch(theme) {
        case 'purple': 
          return 'bg-purple-600';
        case 'oceanic': 
          return 'bg-cyan-600';
        case 'sunset': 
          return 'bg-orange-600';
        default: 
          return 'bg-blue-600';
      }
    }
  };

  return (
    <>
      <button
        onClick={toggleChat}
        className={`fixed bottom-20 right-4 z-50 w-14 h-14 rounded-full ${buttonGradient} text-white shadow-lg flex items-center justify-center transition-all hover:scale-105 hover:shadow-xl theme-aware`}
        aria-label="Open chatbot"
        data-theme={theme}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
      </button>
      
      {isOpen && (
        <div className="fixed bottom-20 right-4 z-50 w-80 rounded-xl overflow-hidden shadow-xl border border-border animate-slide-up theme-aware" data-theme={theme}>
          <div className={`${getChatHeaderClass()} p-4 text-white flex justify-between items-center`}>
            <div className="flex items-center">
              <Bot className="w-5 h-5 mr-2" />
              <span className="font-medium">Virtual Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-white/80">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="bg-gray-900 text-white h-72 overflow-y-auto p-4">
            <div className="bg-gray-800 rounded-lg p-3 mb-2 max-w-[85%]">
              <p>Hello! I am your virtual assistant. How can I help you today?</p>
              <div className="text-xs text-gray-400 mt-1">03:59 PM</div>
            </div>
          </div>
          
          <div className="bg-gray-900 p-2 flex">
            <input 
              type="text" 
              placeholder="Type your message here..." 
              className="flex-1 bg-gray-800 border-none rounded-full py-2 px-4 text-white focus:outline-none focus:ring-1 focus:ring-blue-500" 
            />
            <button className={`w-10 h-10 ${buttonGradient} rounded-full ml-2 flex items-center justify-center text-white`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform rotate-90">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotButton;
