
import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send } from 'lucide-react';
import { useThemeStore } from '@/lib/theme';
import { useChatbot } from '@/hooks/useChatbot';
import { Button } from '@/components/ui/button';

type Message = {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
};

const initialMessages: Message[] = [
  {
    id: '1',
    text: 'مرحباً! أنا مساعدك الافتراضي. كيف يمكنني مساعدتك اليوم؟',
    isUser: false,
    timestamp: new Date(),
  },
];

const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { theme } = useThemeStore();
  const { sendMessage, isLoading } = useChatbot();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');

    try {
      // Get AI response
      const aiResponse = await sendMessage(currentInput, 'ar');
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
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
        <div className="fixed bottom-20 right-4 z-50 w-80 h-96 bg-white dark:bg-gray-800 rounded-xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700 animate-slide-up theme-aware" data-theme={theme}>
          {/* Header */}
          <div className={`${getChatHeaderClass()} text-white px-4 py-3 flex justify-between items-center`}>
            <div className="flex items-center">
              <Bot className="w-5 h-5 mr-2" />
              <span className="font-medium">المساعد الافتراضي</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-white/80">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-gray-50 dark:bg-gray-900">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.isUser
                      ? `${buttonGradient} text-white rounded-tr-none`
                      : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-tl-none shadow-sm'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg p-3 shadow-sm">
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                    <span className="text-sm">جاري الكتابة...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-3 flex items-center gap-2 bg-white dark:bg-gray-800">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="اكتب رسالتك هنا..."
              className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
              disabled={isLoading}
            />
            <Button
              size="icon"
              variant="ghost"
              className={`${buttonGradient} text-white hover:opacity-90 rounded-full p-2 flex items-center justify-center`}
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotButton;
