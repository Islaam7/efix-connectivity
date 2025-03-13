
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
          return 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600';
        case 'dark-emerald': 
          return 'bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600';
        case 'dark-rose': 
          return 'bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-700 hover:to-rose-600';
        default: 
          return 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600';
      }
    } else {
      switch(theme) {
        case 'purple': 
          return 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700';
        case 'oceanic': 
          return 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600';
        case 'sunset': 
          return 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600';
        default: 
          return 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700';
      }
    }
  };

  const buttonGradient = getButtonGradient();

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
      
      {isOpen && <ChatbotModal onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default ChatbotButton;
